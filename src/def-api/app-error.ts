import {
  CustomResponse,
  DataResponse,
  JsonResponse,
  ResponseAction,
} from "./response";

type RespOrData<T> = string | CustomResponse | ResponseAction | T;

function createResponse<T>(respOrData: RespOrData<T>, status: number) {
  if (typeof respOrData === "string" || Buffer.isBuffer(respOrData)) {
    return new DataResponse(respOrData, status);
  } else if (respOrData instanceof CustomResponse) {
    respOrData.status = status;
    return respOrData;
  } else if (typeof respOrData === "function") {
    return new CustomResponse({
      onResponse: respOrData as ResponseAction,
      status,
    });
  } else {
    return new JsonResponse(respOrData, status);
  }
}

export class AppError<T = string> extends Error {
  private _resp: CustomResponse | undefined;

  httpStatusCode = 500;

  get response(): CustomResponse {
    if (!this._resp) {
      this._resp = createResponse(this.respOrData, this.httpStatusCode);
    }

    return this._resp;
  }

  constructor(
    private readonly respOrData: string | CustomResponse | ResponseAction | T,
    status?: number,
  ) {
    super(typeof respOrData === "string" ? respOrData : undefined);

    if (typeof status === "number") {
      this.httpStatusCode = status;
    }
  }
}
