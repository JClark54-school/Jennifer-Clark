"use strict";
/**
 * Simple in-memory cache
 *
 * There are probably a lot of existing and much more advanced packages in npm,
 * but I had too much fun in implementing it on my own.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = exports.CacheItem = void 0;
class CacheItem {
    constructor(key, value) {
        this._key = key;
        this._value = value;
        this.storeDate = new Date();
    }
    get key() {
        return this._key;
    }
    get value() {
        return this._value;
    }
    isExpired(expirationInterval) {
        return this.storeDate.getTime() + expirationInterval * 1000 < Date.now();
    }
}
exports.CacheItem = CacheItem;
class Cache {
    constructor(cacheExpirationInterval) {
        this._store = {};
        this._cacheExpirationInterval = cacheExpirationInterval;
    }
    add(item) {
        this._store[item.key] = item;
    }
    get(key) {
        const item = this._store[key];
        // Check expiration
        if (typeof item === 'undefined' || item.isExpired(this._cacheExpirationInterval)) {
            return undefined;
        }
        else {
            return item.value;
        }
    }
    getCacheItem(key) {
        const item = this._store[key];
        // Check expiration
        if (typeof item === 'undefined' || item.isExpired(this._cacheExpirationInterval)) {
            return undefined;
        }
        else {
            return item;
        }
    }
}
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map