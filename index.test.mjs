import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
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

class FakeKV {
  constructor({ failGet = false, failPut = false } = {}) {
    this.store = new Map();
    this.getCalls = [];
    this.putCalls = [];
    this.failGet = failGet;
    this.failPut = failPut;
  }

  async get(key, type) {
    this.getCalls.push(key);
    if (this.failGet) throw new Error('KV get failed');
    const value = this.store.get(key);
    if (value === undefined) return null;
    return type === 'json' ? JSON.parse(value) : value;
  }

  async put(key, value, options) {
    this.putCalls.push({ key, value, options });
    if (this.failPut) throw new Error('KV put failed');
    this.store.set(key, value);
  }
}

function createUpstream(contents, headers = {}) {
  let calls = 0;
  return {
    fetch: async () => new Response(contents[Math.min(calls++, contents.length - 1)], { headers }),
    calls: () => calls
  };
}

async function subscribe({ kv, fetchImpl, cache, filename, auth, startPort = 31000, maxPorts = 3 }) {
  const params = new URLSearchParams({
    url: btoa('https://subscription.example.com/clash'),
    port: String(startPort),
    maxPorts: String(maxPorts)
  });
  if (cache === false) params.set('cache', 'false');
  if (filename) params.set('filename', filename);
  if (auth) params.set('auth', btoa(`${auth.username}:${auth.password}`));
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await worker.fetch(new Request(`https://example.com/api/subscribe?${params}`), kv ? { PORT_ASSIGNMENT_KV: kv } : {}, {});
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function fetchPreview({ kv, fetchImpl, cache = true }) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    const response = await worker.fetch(new Request('https://example.com/api/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://subscription.example.com/clash', cache })
    }), kv ? { PORT_ASSIGNMENT_KV: kv } : {}, {});
    return { response, data: await response.json() };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function persistentNodeHash(proxy) {
  const canonicalize = (value, omitName = false) => {
    if (Array.isArray(value)) return value.map((item) => canonicalize(item));
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.keys(value).sort().filter((key) => !omitName || key !== 'name').map((key) => [key, canonicalize(value[key])]));
  };
  return createHash('sha256').update(JSON.stringify(canonicalize(proxy, true))).digest('hex');
}

function assignedGroupMap(kv, items, startPort = 31000) {
  const assignmentKey = [...kv.store.keys()].find((key) => key.startsWith('assignment:v1:'));
  const state = JSON.parse(kv.store.get(assignmentKey));
  return new Map(items.map((item) => [item.name, `PORT-${startPort + state.assignments[persistentNodeHash(item)].group}`]));
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

function referencedNodeNames(groups, items) {
  const names = new Set(items.map((item) => item.name));
  return new Set(groups.flatMap((group) => group.proxies).filter((name) => names.has(name)));
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
  assert.ok(listeners.every((listener) => /^(?:PORT-|REGION-)/.test(listener.proxy) && !listener.proxy.endsWith('-ROUTE')));
  assert.ok(groups.filter((group) => /^(?:PORT-|REGION-)/.test(group.name)).every((group) => group.type === 'fallback'));
  assert.match(data.config, /profile:\n  store-selected: true/);
});

test('builds direct fallback port groups with optimized health checks', async () => {
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
  const ordinaryGroups = groups.filter((group) => /^PORT-3100[01]$/.test(group.name));
  const referencedNodes = referencedNodeNames(ordinaryGroups, proxies);

  assert.equal(response.status, 200);
  assert.equal(data.genericPortCount, 2);
  assert.equal(data.listenerCount, 12);
  assert.equal(data.uniqueEndpointCount, 6);
  assert.equal('uniqueIPv4Count' in data, false);
  assert.equal('unresolvedHostCount' in data, false);
  assert.deepEqual([...referencedNodes].sort(), proxies.map((proxy) => proxy.name).sort());
  assert.ok(ordinaryGroups.every((group) => group.type === 'fallback' && group.proxies.at(-1) === 'AUTO-BEST'));
  assert.equal(groups.some((group) => group.name.endsWith('-ROUTE')), false);
  assert.equal(listeners.find((listener) => listener.port === '31000').proxy, 'PORT-31000');
  assert.match(data.config, /expected-status: 204/);
  assert.match(data.config, /interval: 60/);
  assert.match(data.config, /timeout: 3000/);
  assert.match(data.config, /max-failed-times: 2/);
  assert.match(data.config, /username: user/);
});

test('cycles HK TW US JP KR SG region groups across ordinary ports', async () => {
  const codes = ['HK', 'TW', 'US', 'JP', 'KR', 'SG'];
  const items = codes.flatMap((code) => [0, 1].map((index) => ({
    ...proxies[0],
    name: `SubA-${code}-${index}`,
    server: `${code.toLowerCase()}-${index}.example.com`,
    password: `${code}-${index}`
  })));
  const { data } = await convert({ content: yamlFor(items), startPort: 31000, maxPorts: 12 });
  const groups = parseConfig(data.config).groups.filter((group) => /^PORT-310(?:0[0-9]|1[01])$/.test(group.name));

  assert.equal(groups.length, 12);
  groups.forEach((group, index) => {
    const code = codes[index % codes.length];
    assert.equal(group.type, 'fallback');
    assert.equal(group.proxies.at(-2), `REGION-${code}-${20001 + codes.indexOf(code)}`);
    assert.equal(group.proxies.at(-1), 'AUTO-BEST');
    assert.equal(group.proxies.length, 3);
  });
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
  const tw = groups.find((group) => group.name === 'REGION-TW-20002');
  const us = groups.find((group) => group.name === 'REGION-US-20003');
  const jp = groups.find((group) => group.name === 'REGION-JP-20004');
  const gb = groups.find((group) => group.name === 'REGION-GB-20007');
  const de = groups.find((group) => group.name === 'REGION-DE-20008');

  assert.equal(response.status, 200);
  assert.deepEqual(hk.proxies, ['🇭🇰 HK-A', '香港-B', 'AUTO-BEST']);
  assert.deepEqual(tw.proxies, ['AUTO-BEST']);
  assert.deepEqual(us.proxies, ['🇺🇸 US-A', 'AUTO-BEST']);
  assert.deepEqual(jp.proxies, ['Japan-A', 'AUTO-BEST']);
  assert.deepEqual(gb.proxies, ['AUTO-BEST']);
  assert.deepEqual(de.proxies, ['AUTO-BEST']);
  assert.ok([hk, tw, us, jp, gb, de].every((group) => group.type === 'fallback'));
  assert.equal(listeners.find((listener) => listener.port === '20001').proxy, 'REGION-HK-20001');
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
  const ordinaryGroups = parseConfig(data.config).groups.filter((group) => /^PORT-3100[0-2]$/.test(group.name));
  const sharedNames = ['SubA-HK-shared-1', 'SubA-HK-shared-2', 'SubB-US-shared-1'];
  const sharedGroups = ordinaryGroups.filter((group) => sharedNames.every((name) => group.proxies.includes(name)));
  const referencedNodes = referencedNodeNames(ordinaryGroups, items);

  assert.equal(response.status, 200);
  assert.equal(data.uniqueEndpointCount, 1);
  assert.equal(sharedGroups.length, 1);
  assert.deepEqual(sharedGroups[0].proxies.filter((name) => sharedNames.includes(name)), sharedNames);
  assert.ok(ordinaryGroups.filter((group) => group !== sharedGroups[0]).every((group) => group.proxies.filter((name) => sharedNames.includes(name)).length <= 1));
  assert.deepEqual([...referencedNodes].sort(), items.map((item) => item.name).sort());
});

test('treats changed connection parameters as different hash buckets', async () => {
  const shared = { ...proxies[0], server: 'shared.example.com' };
  const items = [
    { ...shared, name: 'SubA-HK-1', password: 'one' },
    { ...shared, name: 'SubA-HK-2', password: 'two' },
    { ...shared, name: 'SubA-HK-3', password: 'three' }
  ];
  const { response, data } = await convert({ content: yamlFor(items), startPort: 31000, maxPorts: 3 });
  const ordinaryGroups = parseConfig(data.config).groups.filter((group) => /^PORT-3100[0-2]$/.test(group.name));

  assert.equal(response.status, 200);
  assert.deepEqual(ordinaryGroups.map((group) => group.proxies[0]).sort(), items.map((item) => item.name).sort());
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
  const ordinaryGroups = groups.filter((group) => /^PORT-3100[0-5]$/.test(group.name));

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
  assert.ok(ordinaryGroups.every((group) => group.proxies[0].startsWith('SubB-')));
  assert.deepEqual([...referencedNodeNames(ordinaryGroups, items)].sort(), items.map((item) => item.name).sort());
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
  const ordinaryGroups = parseConfig(data.config).groups.filter((group) => /^PORT-310(?:0[0-9]|1[0-9])$/.test(group.name));
  const referencedNodes = referencedNodeNames(ordinaryGroups, items);

  assert.equal(response.status, 200);
  assert.equal(referencedNodes.size, items.length);
  for (let identity = 0; identity < 250; identity++) {
    const bucketNames = items.filter((_, index) => index % 250 === identity).map((item) => item.name);
    assert.equal(ordinaryGroups.filter((group) => bucketNames.every((name) => group.proxies.includes(name))).length, 1);
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

test('keeps compact UI and subscribe parameter defaults in sync', async () => {
  const page = await worker.fetch(new Request('https://example.com/'), {}, {});
  const html = await page.text();
  assert.match(html, /id="startPort"[^>]+value="30001"/);
  assert.match(html, /id="maxPorts"[^>]+value="20"/);
  assert.match(html, /class="tab-button active" data-tab="subscription"/);
  assert.match(html, /class="tab-content active" id="subscription-tab"/);
  assert.match(html, /class="quick-config-grid"/);
  assert.match(html, /class="config-panel input-section"/);
  assert.match(html, /class="workspace-grid"/);
  assert.match(html, /<details class="help-section">/);
  assert.equal((html.match(/id="inputYAML"/g) || []).length, 1);
  assert.doesNotMatch(html, /subscriptionPreview/);
  assert.doesNotMatch(html, /id="namePreview"|class="config-name-preview"/);
  assert.ok(html.indexOf('id="subscribeSection"') < html.indexOf('id="outputYAML"'));
  assert.match(html, /this\.showFetchStatus\('loading'/);
  assert.doesNotMatch(html, /this\.showInfo\(forceRefresh/);
  assert.ok(html.indexOf('class="quick-config"') < html.indexOf('class="source-section"'));
  assert.ok(html.indexOf('class="source-section"') < html.indexOf('class="workspace-grid"'));
  assert.ok(html.indexOf('id="processButton"') < html.indexOf('class="source-section"'));
  assert.match(html, /max-width: 1440px/);
  assert.match(html, /id="themeToggle"/);
  assert.match(html, /id="forceRefreshButton"/);
  assert.match(html, /localStorage\.getItem\('clash2socks5\.subscriptionUrl'\)/);
  assert.match(html, /searchParams\.set\('maxPorts'/);

  const defaults = await worker.fetch(new Request('https://example.com/api/subscribe?mode=manual&hash=x'), {}, {});
  assert.match(await defaults.text(), /端口=30001, 最多端口数=20/);

  const custom = await worker.fetch(new Request('https://example.com/api/subscribe?mode=manual&hash=x&port=31000&maxPorts=7'), {}, {});
  assert.match(await custom.text(), /端口=31000, 最多端口数=7/);
});


test('caches subscription previews for five minutes and supports forced refresh', async () => {
  const kv = new FakeKV();
  const upstream = createUpstream([
    yamlFor([{ ...proxies[0], name: 'Preview-A' }]),
    yamlFor([{ ...proxies[1], name: 'Preview-B' }])
  ]);

  const first = await fetchPreview({ kv, fetchImpl: upstream.fetch });
  assert.equal(first.response.status, 200);
  assert.equal(first.data.cached, false);
  assert.equal(upstream.calls(), 1);

  const cached = await fetchPreview({ kv, fetchImpl: upstream.fetch });
  assert.equal(cached.data.cached, true);
  assert.equal(cached.data.content, first.data.content);
  assert.equal(cached.data.generatedAt, first.data.generatedAt);
  assert.equal(upstream.calls(), 1);

  const refreshed = await fetchPreview({ kv, fetchImpl: upstream.fetch, cache: false });
  assert.equal(refreshed.data.cached, false);
  assert.notEqual(refreshed.data.content, first.data.content);
  assert.equal(upstream.calls(), 2);

  const cachedRefresh = await fetchPreview({ kv, fetchImpl: upstream.fetch });
  assert.equal(cachedRefresh.data.cached, true);
  assert.equal(cachedRefresh.data.content, refreshed.data.content);
  assert.equal(upstream.calls(), 2);
  assert.ok(kv.putCalls.some((call) => call.key.startsWith('source:v1:') && call.options.expirationTtl === 300));
});

test('falls back to live preview fetching when KV is unavailable', async () => {
  const kv = new FakeKV({ failGet: true, failPut: true });
  const upstream = createUpstream([yamlFor([{ ...proxies[0], name: 'Live-A' }])]);
  const result = await fetchPreview({ kv, fetchImpl: upstream.fetch });

  assert.equal(result.response.status, 200);
  assert.equal(result.data.cached, false);
  assert.equal(upstream.calls(), 1);
});

test('caches generated subscriptions for five minutes and supports cache=false refresh', async () => {
  const kv = new FakeKV();
  const contentA = yamlFor([{ ...proxies[0], name: 'SubA-HK-A' }]);
  const contentB = yamlFor([{ ...proxies[1], name: 'SubA-HK-B' }]);
  const contentC = yamlFor([{ ...proxies[2], name: 'SubA-US-C' }]);
  const upstream = createUpstream([contentA, contentB, contentC], {
    'profile-title': 'Example',
    'profile-update-interval': '12'
  });

  const first = await subscribe({ kv, fetchImpl: upstream.fetch, filename: 'first' });
  const firstBody = await first.text();
  const firstGeneratedAt = first.headers.get('x-generated-at');
  const writesAfterFirst = kv.putCalls.length;
  const cached = await subscribe({ kv, fetchImpl: upstream.fetch, filename: 'cached-name' });
  const cachedBody = await cached.text();

  assert.equal(upstream.calls(), 1);
  assert.equal(cachedBody, firstBody);
  assert.equal(cached.headers.get('x-generated-at'), firstGeneratedAt);
  assert.match(cached.headers.get('content-disposition'), /cached-name/);
  assert.equal(cached.headers.get('profile-update-interval'), '12');
  assert.equal(kv.putCalls.length, writesAfterFirst);

  const refreshed = await subscribe({ kv, fetchImpl: upstream.fetch, cache: false });
  const refreshedBody = await refreshed.text();
  assert.equal(upstream.calls(), 2);
  assert.notEqual(refreshedBody, firstBody);

  const cachedRefresh = await subscribe({ kv, fetchImpl: upstream.fetch });
  assert.equal(await cachedRefresh.text(), refreshedBody);
  assert.equal(upstream.calls(), 2);

  const resultKey = [...kv.store.keys()].find((key) => key.startsWith('result:v3:'));
  const stale = JSON.parse(kv.store.get(resultKey));
  stale.generatedAt = new Date(Date.now() - 301_000).toISOString();
  kv.store.set(resultKey, JSON.stringify(stale));
  await subscribe({ kv, fetchImpl: upstream.fetch });
  assert.equal(upstream.calls(), 3);

  await subscribe({ kv, fetchImpl: upstream.fetch, auth: { username: 'user', password: 'pass' } });
  assert.equal(upstream.calls(), 4);
  assert.ok(kv.putCalls.some((call) => call.key.startsWith('result:v3:') && call.options.expirationTtl === 300));
  assert.ok(kv.putCalls.some((call) => call.key.startsWith('assignment:v1:') && call.options.expirationTtl === 7_776_000));
});

test('keeps prior ports but always reapplies subscription and region priority', async () => {
  const kv = new FakeKV();
  const ldcatA = { ...proxies[0], name: 'LDCAT-HK-1', server: 'legacy-ldcat-a.example.com' };
  const ldcatB = { ...proxies[1], name: 'LDCAT-US-2', server: 'legacy-ldcat-b.example.com' };
  const redA = { ...proxies[2], name: '红杏2-HK-1', server: 'legacy-red-a.example.com' };
  const redB = { ...proxies[3], name: '红杏2-US-2', server: 'legacy-red-b.example.com' };
  const allNodes = [ldcatA, ldcatB, redA, redB];
  const upstream = createUpstream([
    yamlFor(allNodes),
    yamlFor(allNodes),
    yamlFor([redA, redB]),
    yamlFor(allNodes)
  ]);
  const readGroups = async () => {
    const response = await subscribe({ kv, fetchImpl: upstream.fetch, cache: false, maxPorts: 2 });
    return parseConfig(await response.text()).groups.filter((group) => /^PORT-3100[01]$/.test(group.name));
  };
  const initialGroups = await readGroups();
  const initialMap = assignedGroupMap(kv, allNodes);
  assert.ok(initialGroups.every((group) => group.proxies[0].startsWith('LDCAT-')));

  const assignmentKey = [...kv.store.keys()].find((key) => key.startsWith('assignment:v1:'));
  const savedState = JSON.parse(kv.store.get(assignmentKey));
  for (const group of [0, 1]) {
    const assignments = Object.values(savedState.assignments).filter((assignment) => assignment.group === group).sort((left, right) => left.order - right.order);
    assert.equal(assignments.length, 2);
    assignments[0].order = 1;
    assignments[1].order = 0;
  }
  kv.store.set(assignmentKey, JSON.stringify(savedState));

  const reorderedGroups = await readGroups();
  const reorderedMap = assignedGroupMap(kv, allNodes);
  for (const node of allNodes) assert.equal(reorderedMap.get(node.name), initialMap.get(node.name));
  assert.ok(reorderedGroups.every((group) => group.proxies[0].startsWith('LDCAT-')));
  assert.equal(JSON.parse(kv.store.get(assignmentKey)).version, 2);

  const replacementGroups = await readGroups();
  assert.ok(replacementGroups.every((group) => group.proxies[0].startsWith('红杏2-')));

  const restoredGroups = await readGroups();
  const restoredMap = assignedGroupMap(kv, allNodes);
  assert.ok(restoredGroups.every((group) => group.proxies[0].startsWith('LDCAT-')));
  for (const node of allNodes) assert.equal(restoredMap.get(node.name), initialMap.get(node.name));
});

test('keeps surviving nodes on the same ports and prunes missing history after 30 days', async () => {
  const kv = new FakeKV();
  const a = { ...proxies[0], name: 'SubA-HK-A', server: 'sticky-a.example.com' };
  const b = { ...proxies[1], name: 'SubA-US-B', server: 'sticky-b.example.com' };
  const c = { ...proxies[2], name: 'SubA-TW-C', server: 'sticky-c.example.com' };
  const d = { ...proxies[3], name: 'SubA-SG-D', server: 'sticky-d.example.com' };
  const upstream = createUpstream([
    yamlFor([a, b, c]),
    yamlFor([c, a, d]),
    yamlFor([b, d, c, a]),
    yamlFor([a, b, c, d])
  ]);
  const ordinaryGroups = async () => {
    const response = await subscribe({ kv, fetchImpl: upstream.fetch, cache: false });
    return parseConfig(await response.text()).groups.filter((group) => /^PORT-3100[0-2]$/.test(group.name));
  };
  const firstGroups = await ordinaryGroups();
  const firstMap = assignedGroupMap(kv, [a, b, c]);
  const secondGroups = await ordinaryGroups();
  const secondMap = assignedGroupMap(kv, [a, c, d]);

  assert.equal(secondMap.get(a.name), firstMap.get(a.name));
  assert.equal(secondMap.get(c.name), firstMap.get(c.name));
  assert.equal(secondMap.get(d.name), firstMap.get(b.name));

  const thirdGroups = await ordinaryGroups();
  const thirdMap = assignedGroupMap(kv, [a, b, c, d]);
  assert.equal(thirdMap.get(a.name), firstMap.get(a.name));
  assert.equal(thirdMap.get(b.name), firstMap.get(b.name));
  assert.equal(thirdMap.get(c.name), firstMap.get(c.name));
  assert.equal(thirdMap.get(d.name), firstMap.get(b.name));
  const sharedGroup = thirdGroups.find((group) => group.name === firstMap.get(b.name));
  assert.ok(sharedGroup.proxies.indexOf(b.name) < sharedGroup.proxies.indexOf(d.name));

  const assignmentKey = [...kv.store.keys()].find((key) => key.startsWith('assignment:v1:'));
  const state = JSON.parse(kv.store.get(assignmentKey));
  const dayMs = 24 * 60 * 60 * 1000;
  state.assignments['e'.repeat(64)] = { group: 0, order: 98, lastSeenAt: state.updatedAt - 29 * dayMs };
  state.assignments['f'.repeat(64)] = { group: 0, order: 99, lastSeenAt: state.updatedAt - 31 * dayMs };
  kv.store.set(assignmentKey, JSON.stringify(state));
  await ordinaryGroups();
  const prunedState = JSON.parse(kv.store.get(assignmentKey));
  assert.equal('e'.repeat(64) in prunedState.assignments, true);
  assert.equal('f'.repeat(64) in prunedState.assignments, false);
  assert.ok(Object.keys(prunedState.assignments).every((hash) => /^[a-f0-9]{64}$/.test(hash)));
  assert.doesNotMatch(kv.store.get(assignmentKey), /sticky-|secret-/);
});

test('degrades to a fresh stateless response when KV fails', async () => {
  const kv = new FakeKV({ failGet: true, failPut: true });
  const upstream = createUpstream([yamlFor(proxies.slice(0, 2))]);
  const response = await subscribe({ kv, fetchImpl: upstream.fetch, cache: false, maxPorts: 2 });

  assert.equal(response.status, 200);
  assert.match(await response.text(), /PORT-31000/);
  assert.equal(upstream.calls(), 1);
});

test('keeps 1000-node assignments stable across forced refreshes', { timeout: 10000 }, async () => {
  const items = Array.from({ length: 1000 }, (_, index) => ({
    name: `Sub${Math.floor(index / 200)}-${['HK', 'US', 'TW', 'SG', 'KR', 'JP'][index % 6]}-${index}`,
    type: 'ss',
    server: `memory-${index % 250}.example.com`,
    port: 443,
    cipher: 'aes-128-gcm',
    password: `secret-${index % 250}`
  }));
  const kv = new FakeKV();
  const upstream = createUpstream([yamlFor(items), yamlFor([...items].reverse())]);
  const readAssignments = async () => {
    const response = await subscribe({ kv, fetchImpl: upstream.fetch, cache: false, startPort: 31000, maxPorts: 20 });
    await response.text();
    return assignedGroupMap(kv, items);
  };

  const first = await readAssignments();
  const second = await readAssignments();
  assert.equal(first.size, 1000);
  assert.equal(second.size, 1000);
  for (const item of items) assert.equal(second.get(item.name), first.get(item.name));
});
