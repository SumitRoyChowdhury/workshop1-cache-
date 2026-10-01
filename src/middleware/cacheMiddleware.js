const CACHE_TTL_MS = 60 * 1000;
const cacheStore = new Map();

function invalidateCache() {
  cacheStore.clear();
}

function getCacheValue(key) {
  const entry = cacheStore.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cacheStore.delete(key);
    return null;
  }

  return entry.value;
}

function setCacheValue(key, value) {
  cacheStore.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function cacheMiddleware(req, res, next) {
  if (req.method !== 'GET') {
    return next();
  }

  const cacheKey = req.originalUrl || req.url;
  const cachedValue = getCacheValue(cacheKey);

  if (cachedValue) {
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('X-Cache-TTL', String(CACHE_TTL_MS));
    return res.json(cachedValue);
  }

  res.setHeader('X-Cache', 'MISS');
  res.setHeader('X-Cache-TTL', String(CACHE_TTL_MS));

  const originalJson = res.json.bind(res);
  res.json = (payload) => {
    setCacheValue(cacheKey, payload);
    return originalJson(payload);
  };

  return next();
}

module.exports = {
  CACHE_TTL_MS,
  invalidateCache,
  setCacheValue,
  getCacheValue,
  cacheMiddleware,
};
