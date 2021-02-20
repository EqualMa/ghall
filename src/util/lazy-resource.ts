export type ResourceLoader<T> = () => Promise<T> | T;
export default class LazyResource<T> {
  #resource: Promise<T> | undefined;

  #loadResource: ResourceLoader<T> | undefined;
  constructor(loadResource?: ResourceLoader<T>) {
    this.#loadResource = loadResource;
  }

  async use(): Promise<T> {
    if (!this.#resource) this.#resource = this.loadResource();

    return this.#resource;
  }

  protected async loadResource(): Promise<T> {
    if (!this.#loadResource)
      throw new Error("LazyResource.loadResource not implemented");

    return this.#loadResource();
  }
}

export function lazyResource<T>(loadResource: ResourceLoader<T>) {
  return new LazyResource(loadResource);
}
