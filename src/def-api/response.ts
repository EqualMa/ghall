import { NextApiResponse } from "next";

export type ResponseAction = (resp: NextApiResponse) => void | Promise<void>;
export type ResponseHeaders = Record<string, string | number | string[]>;

export class CustomResponse {
  status?: number;
  headers?: ResponseHeaders;

  constructor(
    opts?:
      | ResponseAction
      | {
          onResponse?: ResponseAction;
          headers?: ResponseHeaders;
          status?: number;
        },
  ) {
    if (typeof opts === "function") opts = { onResponse: opts };

    const onResponse = opts?.onResponse;
    if (onResponse) this.onResponse = onResponse;
    this.headers = opts?.headers;
    this.status = opts?.status;
  }

  onResponse(resp: NextApiResponse): void | Promise<void> {
    return new Promise((resolve) => {
      resp.end(resolve);
    });
  }

  async doResponse(resp: NextApiResponse): Promise<void> {
    if (this.headers)
      for (const [k, v] of Object.entries(this.headers)) {
        resp.setHeader(k, v);
      }

    if (typeof this.status === "number") resp.status(this.status);

    await this.onResponse?.(resp);
  }
}

export class DataResponse<T = string | Buffer> extends CustomResponse {
  constructor(data: T, status?: number, headers?: ResponseHeaders);
  constructor(data: T, headers?: ResponseHeaders);

  constructor(
    public data: T,
    statusOrHeaders?: number | ResponseHeaders,
    headers?: ResponseHeaders,
  ) {
    super(
      typeof statusOrHeaders === "object" && statusOrHeaders
        ? { headers: statusOrHeaders }
        : { status: statusOrHeaders, headers },
    );
  }

  onResponse(resp: NextApiResponse<T>): void | Promise<void> {
    resp.send(this.data);
  }
}

export class JsonResponse<T> extends DataResponse<T> {
  onResponse(resp: NextApiResponse<T>): void | Promise<void> {
    resp.json(this.data);
  }
}
