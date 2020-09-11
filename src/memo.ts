// modified from https://github.com/mgechev/memo-decorator/blob/master/index.ts

export type Resolver<T, A extends unknown[], R> = (
  this: unknown,
  ...args: A
) => R;

export interface CacheLike<K, V> {
  set(key: K, v: V): unknown;
  get(key: K): V | undefined;
  has(key: K): boolean;
}

const defaultGetKey = (v: unknown) => v;

function memoizeImpl<R, TThis, TArgs extends unknown[], K>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey: (this: TThis, ...args: TArgs) => K,
  cache: CacheLike<K, R>,
): typeof func {
  return function (this, ...args: TArgs) {
    const key = getKey.apply(this, args);
    if (cache.has(key)) {
      return cache.get(key)!;
    } else {
      const res = func.apply(this, args);
      cache.set(key, res);
      return res;
    }
  };
}

export function memoize<
  R,
  TThis = unknown,
  TArgs extends unknown[] = unknown[]
>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey?: undefined,
  cache?: CacheLike<TArgs[0], R>,
): typeof func;
export function memoize<
  R,
  TThis = unknown,
  TArgs extends unknown[] = unknown[],
  K = unknown
>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey: (this: TThis, ...args: TArgs) => K,
  cache?: CacheLike<K, R>,
): typeof func;
export function memoize<R, TThis, TArgs extends unknown[], K>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey: (this: TThis, ...args: TArgs) => K = defaultGetKey as never,
  cache: CacheLike<K, R> = new Map(),
): typeof func {
  return memoizeImpl(func, getKey, cache);
}

export class SmartCacheMap<K, V> implements CacheLike<K, V> {
  #map = new Map<K, V>();
  #weakMap = new WeakMap<Extract<K, object>, V>();

  private getCache(k: K): CacheLike<K, V> {
    return typeof k === "function" || (typeof k === "object" && k !== null)
      ? this.#weakMap
      : this.#map;
  }

  set(k: K, v: V) {
    return this.getCache(k).set(k, v);
  }

  get(k: K) {
    return this.getCache(k).get(k);
  }

  has(k: K) {
    return this.getCache(k).has(k);
  }
}

function memoizeWithThisImpl<TThis, R, TArgs extends unknown[], K>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey: (this: TThis, ...args: TArgs) => K,
  getThisCache: (this: TThis) => CacheLike<K, R> = () => new Map(),
): typeof func {
  const getSelfCache = memoizeImpl<CacheLike<K, R>, unknown, [TThis], TThis>(
    (self) => getThisCache.apply(self),
    (self) => self,
    new SmartCacheMap(),
  );

  return memoizeImpl(
    func,
    function (...args) {
      return [this, args] as const;
    },
    {
      get(k) {
        const self = k[0];
        return getSelfCache(self).get(getKey.apply(self, k[1]));
      },
      set(k, v) {
        const self = k[0];
        const selfCache = getSelfCache(self);
        const key = getKey.apply(self, k[1]);

        selfCache.set(key, v);

        return this;
      },
      has(k) {
        const self = k[0];
        const selfCache = getSelfCache(self);
        const key = getKey.apply(self, k[1]);

        return selfCache.has(key);
      },
    },
  );
}

const defaultGetThisCache = <K, V>() => new Map<K, V>();

export function memoizeWithThis<
  R,
  TThis = unknown,
  TArgs extends unknown[] = unknown[]
>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey?: undefined,
  getThisCache?: (this: TThis) => CacheLike<TArgs[0], R>,
): typeof func;
export function memoizeWithThis<
  R,
  TThis = unknown,
  TArgs extends unknown[] = unknown[],
  K = unknown
>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey: (this: TThis, ...args: TArgs) => K,
  getThisCache?: (this: TThis) => CacheLike<K, R>,
): typeof func;
export function memoizeWithThis<R, TThis, TArgs extends unknown[], K>(
  func: (this: TThis, ...args: TArgs) => R,
  getKey: (this: TThis, ...args: TArgs) => K = defaultGetKey as never,
  getThisCache: (this: TThis) => CacheLike<K, R> = defaultGetThisCache,
): typeof func {
  return memoizeWithThisImpl(func, getKey, getThisCache);
}
