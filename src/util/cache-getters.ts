export function cacheOwnGetters<T extends {}>(obj: T): T {
  const keys = Reflect.ownKeys(obj);
  const kvs = keys
    .map((k) => [k, Reflect.getOwnPropertyDescriptor(obj, k)] as const)
    .filter(([_k, pd]) => pd && pd.get && !pd.set);

  for (const [k, pd] of kvs) {
    const oldGet = pd!.get!;
    Reflect.defineProperty(obj, k, {
      configurable: true,
      enumerable: pd!.enumerable,
      get() {
        const value = oldGet.call(this);
        Reflect.defineProperty(this, k, {
          value,
          writable: false,
          configurable: true,
        });
        return value;
      },

      set: undefined,
    });
  }

  return obj;
}
