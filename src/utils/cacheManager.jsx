class CacheManager {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes default
  }

  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      console.log('Cache miss:', key);
      return null;
    }

    const age = Date.now() - item.timestamp;
    
    if (age > item.ttl) {
      console.log('Cache expired:', key, '- age:', age, 'ms');
      this.cache.delete(key);
      return null;
    }

    console.log('Cache hit:', key, '- age:', age, 'ms');
    return item.data;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      entries: Array.from(this.cache.entries()).map(([key, value]) => ({
        key,
        age: Date.now() - value.timestamp,
        ttl: value.ttl,
        expired: Date.now() - value.timestamp > value.ttl
      }))
    };
  }
}

export const cacheManager = new CacheManager();