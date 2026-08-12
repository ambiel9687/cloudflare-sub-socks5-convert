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
});

test('balances nodes once across ordinary groups and builds local best failover groups', async () => {
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
  const ordinaryFallbacks = groups.filter((group) => /^PORT-3100[01]$/.test(group.name));
  const ordinaryBest = groups.filter((group) => /^PORT-3100[01]-BEST$/.test(group.name));
  const assigned = ordinaryBest.flatMap((group) => group.proxies);

  assert.equal(response.status, 200);
  assert.equal(data.genericPortCount, 2);
  assert.equal(data.listenerCount, 12);
  assert.equal(data.uniqueIPv4Count, 5);
  assert.equal(data.unresolvedHostCount, 0);
  assert.equal(new Set(assigned).size, proxies.length);
  assert.deepEqual([...assigned].sort(), proxies.map((proxy) => proxy.name).sort());
  assert.deepEqual(ordinaryBest.map((group) => group.proxies.length), [3, 3]);
  assert.ok(ordinaryFallbacks.every((group) => group.proxies.at(-1) === 'AUTO-BEST'));
  assert.ok(ordinaryFallbacks.every((group) => group.proxies[0].endsWith('-BEST')));
  assert.equal(listeners.find((listener) => listener.port === '31000').proxy, 'PORT-31000');
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
  const { groups } = parseConfig(data.config);
  const hk = groups.find((group) => group.name === 'REGION-HK');
  const hkBest = groups.find((group) => group.name === 'REGION-HK-BEST');
  const tw = groups.find((group) => group.name === 'REGION-TW');
  const us = groups.find((group) => group.name === 'REGION-US');
  const jp = groups.find((group) => group.name === 'REGION-JP');
  const gb = groups.find((group) => group.name === 'REGION-GB');
  const de = groups.find((group) => group.name === 'REGION-DE');

  assert.equal(response.status, 200);
  assert.deepEqual(hkBest.proxies.sort(), ['🇭🇰 HK-A', '香港-B'].sort());
  assert.deepEqual(hk.proxies, ['REGION-HK-BEST', '🇭🇰 HK-A', '香港-B', 'AUTO-BEST']);
  assert.deepEqual(tw.proxies, ['AUTO-BEST']);
  assert.deepEqual(us.proxies, ['🇺🇸 US-A', 'AUTO-BEST']);
  assert.deepEqual(jp.proxies, ['Japan-A', 'AUTO-BEST']);
  assert.deepEqual(gb.proxies, ['AUTO-BEST']);
  assert.deepEqual(de.proxies, ['AUTO-BEST']);
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
