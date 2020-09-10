import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { AppError } from "./app-error";
import { CustomResponse } from "./response";
import { StatusCodes as sc } from "http-status-codes";
import * as yup from "yup";

export class MethodNotAllowedError extends AppError {
  httpStatusCode = sc.METHOD_NOT_ALLOWED;

  constructor(
    //
    public receivedMethod: string,
    public allowedMethods: string[],
  ) {
    super(`HTTP request method ${receivedMethod} not allowed`);
  }
}

export interface ApiRequestMetaType<
  M extends string = string,
  TQuery = unknown,
  TBody = unknown
> {
  QueryType: TQuery;
  BodyType: TBody;
  MethodType: M;
}

export class ApiRequestWithUtil<
  T extends ApiRequestMetaType = ApiRequestMetaType
> {
  readonly method: T["MethodType"];
  readonly query: T["QueryType"];
  readonly body: T["BodyType"];

  constructor(
    readonly request: NextApiRequest,
    meta: {
      method: T["MethodType"];
      query: T["QueryType"];
      body: T["BodyType"];
    },
  ) {
    this.method = meta.method;
    this.query = meta.query;
    this.body = meta.body;
  }
}

function validateRequestMethod<M extends string>(
  method: string | undefined,
  allowedMethods?: M | M[],
): M {
  if (
    allowedMethods &&
    method &&
    !(Array.isArray(allowedMethods)
      ? allowedMethods.includes(method as M)
      : method === allowedMethods)
  ) {
    // method invalid
    throw new MethodNotAllowedError(
      method,
      typeof allowedMethods === "string" ? [allowedMethods] : allowedMethods,
    );
  }

  return method as M;
}

async function validateRequest<
  T extends ApiRequestMetaType = ApiRequestMetaType
>(
  req: NextApiRequest,
  opts?: ApiDefOptions<T>,
): Promise<ApiRequestWithUtil<T>> {
  try {
    const method: T["MethodType"] = validateRequestMethod(
      req.method,
      opts?.allowedMethods,
    );
    const query: T["QueryType"] = opts?.querySchema
      ? await opts.querySchema.validate(req.query)
      : req.query;

    const body: T["QueryType"] = opts?.bodySchema
      ? await opts.bodySchema.validate(req.body)
      : req.body;

    return new ApiRequestWithUtil(req, {
      method,
      query,
      body,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      throw new AppError(
        {
          message: err.message,
          errors: err.errors,
        },
        sc.BAD_REQUEST,
      );
    } else throw err;
  }
}

export interface ApiDefOptions<
  T extends ApiRequestMetaType = ApiRequestMetaType
> {
  querySchema?: import("yup").Schema<T["QueryType"]>;
  bodySchema?: import("yup").Schema<T["BodyType"]>;
  allowedMethods?: T["MethodType"] | T["MethodType"][];
}

export function defApi<
  T,
  M extends string = string,
  TQuery = unknown,
  TBody = unknown
>(
  handler: (
    reqUtil: ApiRequestWithUtil<ApiRequestMetaType<M, TQuery, TBody>>,
  ) => Promise<T> | T,
  opts?: ApiDefOptions<ApiRequestMetaType<M, TQuery, TBody>>,
): NextApiHandler {
  return async (req, resp) => {
    try {
      const reqUtil = await validateRequest(req, opts);
      const data = await handler(reqUtil);

      if (data === undefined) resp.end();
      else if (data instanceof CustomResponse) {
        data.doResponse(resp);
      } else resp.json(data);
    } catch (err) {
      if (err instanceof AppError) {
        err.response.doResponse(resp);
      } else throw err;
    }
  };
}
