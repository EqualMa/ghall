export function cached<V>(func: () => V): () => V {
  let shouldRun = true;
  let v: V;
  return () => {
    if (shouldRun) {
      shouldRun = false;
      v = func();
    }

    return v;
  };
}
