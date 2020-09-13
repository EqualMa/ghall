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

type AnyFunc = (this: any, ...args: any[]) => any;
type GetKeyForFunc<F extends AnyFunc, K> = (
  this: ThisParameterType<F>,
  ...args: Parameters<F>
) => K;

type NormFunc<F extends AnyFunc> = (
  this: ThisParameterType<F>,
  ...args: Parameters<F>
) => ReturnType<F>;

type CacheLikeForFunc<F extends AnyFunc, K> = CacheLike<K, ReturnType<F>>;

function memoizeImpl<F extends AnyFunc, K>(
  func: F,
  getKey: GetKeyForFunc<F, K>,
  cache: CacheLikeForFunc<F, K>,
): NormFunc<F> {
  return function (this, ...args) {
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

export function memoize<F extends AnyFunc>(
  func: F,
  getKey?: undefined,
  cache?: CacheLikeForFunc<F, Parameters<F>[0]>,
): NormFunc<F>;
export function memoize<F extends AnyFunc, K = unknown>(
  func: F,
  getKey: GetKeyForFunc<F, K>,
  cache?: CacheLikeForFunc<F, K>,
): NormFunc<F>;
export function memoize<F extends AnyFunc, K = unknown>(
  func: F,
  getKey: GetKeyForFunc<F, K> = defaultGetKey as never,
  cache: CacheLikeForFunc<F, K> = new Map(),
): NormFunc<F> {
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

type GetThisCacheForFunc<F extends AnyFunc, K> = (
  this: ThisParameterType<F>,
) => CacheLikeForFunc<F, K>;

function memoizeWithThisImpl<F extends AnyFunc, K>(
  func: F,
  getKey: GetKeyForFunc<F, K>,
  getThisCache: GetThisCacheForFunc<F, K> = () => new Map(),
): NormFunc<F> {
  const getSelfCache = memoizeImpl<
    (self: ThisParameterType<F>) => CacheLikeForFunc<F, K>,
    ThisParameterType<F>
  >(
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

export function memoizeWithThis<F extends AnyFunc>(
  func: F,
  getKey?: undefined,
  getThisCache?: GetThisCacheForFunc<F, Parameters<F>[0]>,
): NormFunc<F>;
export function memoizeWithThis<F extends AnyFunc, K = unknown>(
  func: F,
  getKey: GetKeyForFunc<F, K>,
  getThisCache?: GetThisCacheForFunc<F, K>,
): NormFunc<F>;
export function memoizeWithThis<F extends AnyFunc, K = unknown>(
  func: F,
  getKey: GetKeyForFunc<F, K> = defaultGetKey as never,
  getThisCache: GetThisCacheForFunc<F, K> = defaultGetThisCache,
): NormFunc<F> {
  return memoizeWithThisImpl(func, getKey, getThisCache);
}
