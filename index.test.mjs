import assert from 'node:assert/strict';
import test from 'node:test';
import worker from './index.js';

const proxies = [
  { name: '🇭🇰 HK-A', type: 'ss', server: 'a.example.com', port: 443, cipher: 'aes-128-gcm', password: 'a' },
  { name: '香港-B', type: 'ss', server: 'b.example.com', port: 443, cipher: 'aes-128-gcm', password: 'b' },
  { name: '🇺🇸 US-A', type: 'ss', server: 'c.example.com', port: 443, cipher: 'aes-128-gcm', password: 'c' },
  { name: 'Japan-A', type: 'ss', server: '203.0.113.9', port: 443, cipher: 'aes-128-gcm', password: 'd' },
  { name: 'Singapore-A', type: 'ss', server: 'e.example.com', port: 443, cipher: 'aes-128-gcm', password: 'e' },
  { name: 'Germany-A', type: 'ss', server: 'f.example.com', port: 443, cipher: 'aes-128-gcm', password: 'f' }
];

const manyProxies = Array.from({ length: 25 }, (_, index) => ({
  name: `${['HK', 'TW', 'US', 'JP', 'KR', 'SG', 'GB', 'DE', 'MO', 'ID'][index % 10]}-node-${index}`,
  type: 'ss',
  server: `198.51.100.${index + 1}`,
  port: 443,
  cipher: 'aes-128-gcm',
  password: 'x'
}));

function yamlFor(items = proxies) {
  return `proxies:\n${items.map((proxy) => [
    `  - name: ${proxy.name}`,
    `    type: ${proxy.type}`,
    `    server: ${proxy.server}`,
    `    port: ${proxy.port}`,
    `    cipher: ${proxy.cipher}`,
    `    password: ${proxy.password}`
  ].join('\n')).join('\n')}\n`;
}

function dnsFetch(records = {}, failures = new Set()) {
  return async (input) => {
    const host = new URL(input).searchParams.get('name');
    if (failures.has(host)) throw new Error('DNS unavailable');
    return {
      ok: true,
      async json() {
        return { Answer: (records[host] || []).map((address) => ({ type: 1, data: address })) };
      }
    };
  };
}

async function convert(body, fetchImpl = dnsFetch()) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    const response = await worker.fetch(new Request('https://example.com/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }), {}, {});
    return { response, data: await response.json() };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function parseConfig(config) {
  const listeners = [];
  const groups = [];
  let section = null;
  let current = null;
  for (const line of config.split('\n')) {
    if (line === 'listeners:') section = listeners;
    else if (line === 'proxy-groups:') section = groups;
    else if (/^[^\s]/.test(line)) section = null;
    else if (section && line.startsWith('  - name: ')) {
      current = { name: line.slice(10), proxies: [] };
      section.push(current);
    } else if (section && current) {
      const property = line.match(/^    ([\w-]+): (.+)$/);
      if (property) current[property[1]] = property[2];
      const proxy = line.match(/^      - (.+)$/);
      if (proxy) current.proxies.push(proxy[1]);
    }
  }
  return { listeners, groups };
}

test('uses default 20 ordinary ports plus ten fixed region ports', async () => {
  const { response, data } = await convert({ content: yamlFor(manyProxies), auth: null });
  const { listeners, groups } = parseConfig(data.config);

  assert.equal(response.status, 200);
  assert.equal(data.genericPortCount, 20);
  assert.equal(data.regionPortCount, 10);
  assert.equal(data.listenerCount, 30);
  assert.deepEqual(data.portRange, { start: 30001, end: 30020 });
  assert.deepEqual(data.regionPorts, { HK: 20001, TW: 20002, US: 20003, JP: 20004, KR: 20005, SG: 20006, GB: 20007, DE: 20008, MO: 20009, ID: 20010 });
  assert.deepEqual(listeners.map((listener) => Number(listener.port)), [
    ...Array.from({ length: 20 }, (_, index) => 30001 + index),
    ...Array.from({ length: 10 }, (_, index) => 20001 + index)
  ]);
  assert.ok(groups.some((group) => group.name === 'AUTO-BEST' && group.type === 'url-test'));
  assert.ok(listeners.every((listener) => listener.proxy.endsWith('-ROUTE')));
  assert.match(data.config, /profile:\n  store-selected: true/);
});

test('balances nodes once and builds manual select groups with hidden failover routes', async () => {
  const { response, data } = await convert({
    content: yamlFor(),
    startPort: 31000,
    maxPorts: 2,
    auth: { username: 'user', password: 'pass' }
  }, dnsFetch({
    'a.example.com': ['198.51.100.20'],
    'b.example.com': ['198.51.100.20'],
    'c.example.com': ['198.51.100.10'],
    'e.example.com': ['198.51.100.30'],
    'f.example.com': ['198.51.100.40']
  }));
  const { listeners, groups } = parseConfig(data.config);
  const ordinarySelects = groups.filter((group) => /^PORT-3100[01]$/.test(group.name));
  const ordinaryRoutes = groups.filter((group) => /^PORT-3100[01]-ROUTE$/.test(group.name));
  const assigned = ordinarySelects.flatMap((group) => group.proxies);

  assert.equal(response.status, 200);
  assert.equal(data.genericPortCount, 2);
  assert.equal(data.listenerCount, 12);
  assert.equal(data.uniqueEndpointCount, 6);
  assert.equal('uniqueIPv4Count' in data, false);
  assert.equal('unresolvedHostCount' in data, false);
  assert.equal(new Set(assigned).size, proxies.length);
  assert.deepEqual([...assigned].sort(), proxies.map((proxy) => proxy.name).sort());
  assert.deepEqual(ordinarySelects.map((group) => group.proxies.length), [3, 3]);
  assert.ok(ordinarySelects.every((group) => group.type === 'select'));
  assert.ok(ordinaryRoutes.every((group) => group.type === 'fallback' && group.hidden === 'true'));
  for (const select of ordinarySelects) {
    const route = groups.find((group) => group.name === `${select.name}-ROUTE`);
    assert.deepEqual(route.proxies, [select.name, ...select.proxies, 'AUTO-BEST']);
  }
  assert.equal(groups.some((group) => /^(?:PORT-|REGION-).+-BEST$/.test(group.name)), false);
  assert.equal(listeners.find((listener) => listener.port === '31000').proxy, 'PORT-31000-ROUTE');
  assert.match(data.config, /expected-status: 204/);
  assert.match(data.config, /username: user/);
});

test('recognizes fixed region ports by node name and lets empty regions fall back globally', async () => {
  const { response, data } = await convert({
    content: yamlFor(proxies.slice(0, 4)),
    maxPorts: 2
  }, dnsFetch({
    'a.example.com': ['198.51.100.20'],
    'b.example.com': ['198.51.100.21'],
    'c.example.com': ['198.51.100.10']
  }));
  const { listeners, groups } = parseConfig(data.config);
  const hk = groups.find((group) => group.name === 'REGION-HK-20001');
  const hkRoute = groups.find((group) => group.name === 'REGION-HK-20001-ROUTE');
  const tw = groups.find((group) => group.name === 'REGION-TW-20002');
  const twRoute = groups.find((group) => group.name === 'REGION-TW-20002-ROUTE');
  const us = groups.find((group) => group.name === 'REGION-US-20003');
  const usRoute = groups.find((group) => group.name === 'REGION-US-20003-ROUTE');
  const jp = groups.find((group) => group.name === 'REGION-JP-20004');
  const gb = groups.find((group) => group.name === 'REGION-GB-20007');
  const de = groups.find((group) => group.name === 'REGION-DE-20008');

  assert.equal(response.status, 200);
  assert.deepEqual(hk.proxies, ['🇭🇰 HK-A', '香港-B']);
  assert.deepEqual(hkRoute.proxies, ['REGION-HK-20001', '🇭🇰 HK-A', '香港-B', 'AUTO-BEST']);
  assert.deepEqual(tw.proxies, ['AUTO-BEST']);
  assert.deepEqual(twRoute.proxies, ['REGION-TW-20002', 'AUTO-BEST']);
  assert.deepEqual(us.proxies, ['🇺🇸 US-A']);
  assert.deepEqual(usRoute.proxies, ['REGION-US-20003', '🇺🇸 US-A', 'AUTO-BEST']);
  assert.deepEqual(jp.proxies, ['Japan-A']);
  assert.deepEqual(gb.proxies, ['AUTO-BEST']);
  assert.deepEqual(de.proxies, ['AUTO-BEST']);
  assert.equal(listeners.find((listener) => listener.port === '20001').proxy, 'REGION-HK-20001-ROUTE');
});


test('keeps equal node hashes in one ordinary port group', async () => {
  const shared = { ...proxies[0], server: 'shared.example.com', password: 'same' };
  const items = [
    { ...shared, name: 'SubA-HK-shared-1' },
    { ...shared, name: 'SubB-US-shared-1' },
    { ...shared, name: 'SubA-HK-shared-2' },
    { ...shared, name: 'SubA-HK-distinct-1', password: 'one' },
    { ...shared, name: 'SubA-HK-distinct-2', password: 'two' }
  ];
  const { response, data } = await convert({ content: yamlFor(items), startPort: 31000, maxPorts: 3 });
  const ordinarySelects = parseConfig(data.config).groups.filter((group) => /^PORT-3100[0-2]$/.test(group.name));
  const sharedGroups = ordinarySelects.filter((group) => group.proxies.some((name) => name.includes('-shared-')));

  assert.equal(response.status, 200);
  assert.equal(data.uniqueEndpointCount, 1);
  assert.equal(sharedGroups.length, 1);
  assert.deepEqual(sharedGroups[0].proxies.filter((name) => name.includes('-shared-')), [
    'SubA-HK-shared-1',
    'SubA-HK-shared-2',
    'SubB-US-shared-1'
  ]);
  assert.deepEqual(ordinarySelects.flatMap((group) => group.proxies).sort(), items.map((item) => item.name).sort());
});

test('treats changed connection parameters as different hash buckets', async () => {
  const shared = { ...proxies[0], server: 'shared.example.com' };
  const items = [
    { ...shared, name: 'SubA-HK-1', password: 'one' },
    { ...shared, name: 'SubA-HK-2', password: 'two' },
    { ...shared, name: 'SubA-HK-3', password: 'three' }
  ];
  const { response, data } = await convert({ content: yamlFor(items), startPort: 31000, maxPorts: 3 });
  const ordinarySelects = parseConfig(data.config).groups.filter((group) => /^PORT-3100[0-2]$/.test(group.name));

  assert.equal(response.status, 200);
  assert.deepEqual(ordinarySelects.map((group) => group.proxies.length), [1, 1, 1]);
});

test('does not resolve DNS when assigning nodes', async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    throw new Error('DNS must not be queried');
  };
  const { response, data } = await convert({ content: yamlFor(proxies.slice(0, 2)), maxPorts: 2 }, fetchImpl);

  assert.equal(response.status, 200);
  assert.equal(calls, 0);
  assert.equal(data.uniqueEndpointCount, 2);
});

test('derives subscription priority and region order from node names', async () => {
  const items = [
    { ...proxies[0], name: 'SubB-JP-1' },
    { ...proxies[1], name: 'SubA-US-1' },
    { ...proxies[2], name: 'SubB-HK-2' },
    { ...proxies[3], name: 'SubB-TW-3' },
    { ...proxies[4], name: 'SubC-Other-1' },
    { ...proxies[5], name: 'SubB-SG-4' },
    { ...proxies[0], name: 'SubB-KR-5' },
    { ...proxies[1], name: 'SubB-US-6' },
    { ...proxies[2], name: 'NoSeparator' }
  ].map((item, index) => ({ ...item, server: `priority-${index}.example.com` }));
  const { response, data } = await convert({ content: yamlFor(items), startPort: 31000, maxPorts: 6 });
  const { groups } = parseConfig(data.config);
  const autoBest = groups.find((group) => group.name === 'AUTO-BEST');
  const ordinarySelects = groups.filter((group) => /^PORT-3100[0-5]$/.test(group.name));

  assert.equal(response.status, 200);
  assert.equal(autoBest.type, 'url-test');
  assert.deepEqual(autoBest.proxies, [
    'SubB-HK-2',
    'SubB-US-6',
    'SubB-TW-3',
    'SubB-SG-4',
    'SubB-KR-5',
    'SubB-JP-1',
    'SubA-US-1',
    'SubC-Other-1',
    'NoSeparator'
  ]);
  assert.ok(ordinarySelects.every((group) => group.proxies.filter((name) => name.startsWith('SubB-')).length <= 1));
  assert.ok(ordinarySelects.every((group) => group.proxies[0].startsWith('SubB-')));
  assert.deepEqual(ordinarySelects.flatMap((group) => group.proxies).sort(), items.map((item) => item.name).sort());
});

test('uses lower-priority subscriptions only after higher-priority hashes run out', async () => {
  const items = [
    { ...proxies[0], name: 'SubA-HK-1', server: 'sub-a-1.example.com' },
    { ...proxies[1], name: 'SubA-US-2', server: 'sub-a-2.example.com' },
    { ...proxies[2], name: 'SubB-HK-1', server: 'sub-b-1.example.com' },
    { ...proxies[3], name: 'SubB-US-2', server: 'sub-b-2.example.com' }
  ];
  const { response, data } = await convert({ content: yamlFor(items), startPort: 31000, maxPorts: 3 });
  const ordinarySelects = parseConfig(data.config).groups.filter((group) => /^PORT-3100[0-2]$/.test(group.name));

  assert.equal(response.status, 200);
  assert.deepEqual(ordinarySelects.map((group) => group.proxies[0]), ['SubA-HK-1', 'SubA-US-2', 'SubB-HK-1']);
});

test('handles 1000 nodes while keeping each hash bucket atomic', { timeout: 10000 }, async () => {
  const items = Array.from({ length: 1000 }, (_, index) => {
    const identity = index % 250;
    const source = `Sub${Math.floor(index / 200)}`;
    return {
      name: `${source}-${['HK', 'US', 'TW', 'SG', 'KR', 'JP'][identity % 6]}-${identity}-${index}`,
      type: 'ss',
      server: `bulk-${identity}.example.com`,
      port: 443,
      cipher: 'aes-128-gcm',
      password: `secret-${identity}`
    };
  });
  const { response, data } = await convert({ content: yamlFor(items), startPort: 31000, maxPorts: 20 });
  const ordinarySelects = parseConfig(data.config).groups.filter((group) => /^PORT-310(?:0[0-9]|1[0-9])$/.test(group.name));
  const groupByNode = new Map(ordinarySelects.flatMap((group) => group.proxies.map((name) => [name, group.name])));

  assert.equal(response.status, 200);
  assert.equal(groupByNode.size, items.length);
  for (let identity = 0; identity < 250; identity++) {
    assert.equal(new Set(items.filter((_, index) => index % 250 === identity).map((item) => groupByNode.get(item.name))).size, 1);
  }
});

test('validates max ports, port range and fixed region overlap', async () => {
  const invalidMax = await convert({ content: yamlFor(proxies.slice(0, 1)), maxPorts: 101 });
  assert.equal(invalidMax.response.status, 400);
  assert.match(invalidMax.data.message, /端口数量必须在1-100之间/);

  const overflow = await convert({ content: yamlFor(proxies.slice(0, 2)), startPort: 65535, maxPorts: 2 });
  assert.equal(overflow.response.status, 400);
  assert.match(overflow.data.message, /端口范围超出限制/);

  const overlap = await convert({ content: yamlFor(proxies.slice(0, 2)), startPort: 20005, maxPorts: 2 });
  assert.equal(overlap.response.status, 400);
  assert.match(overlap.data.message, /固定地区端口/);
});

test('keeps UI and subscribe parameter defaults in sync', async () => {
  const page = await worker.fetch(new Request('https://example.com/'), {}, {});
  const html = await page.text();
  assert.match(html, /id="startPort"[^>]+value="30001"/);
  assert.match(html, /id="maxPorts"[^>]+value="20"/);
  assert.match(html, /searchParams\.set\('maxPorts'/);

  const defaults = await worker.fetch(new Request('https://example.com/api/subscribe?mode=manual&hash=x'), {}, {});
  assert.match(await defaults.text(), /端口=30001, 最多端口数=20/);

  const custom = await worker.fetch(new Request('https://example.com/api/subscribe?mode=manual&hash=x&port=31000&maxPorts=7'), {}, {});
  assert.match(await custom.text(), /端口=31000, 最多端口数=7/);
});
