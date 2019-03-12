import { HttpErrorResponse } from "@angular/common/http";
import { ErrorMessage } from "../models/error-message";
import { defaultErrorMessage } from "../models/constants/default-values";

export function httpErrorResponseHandler(httpErrorResponse: HttpErrorResponse): ErrorMessage {

  let message: string;

  switch(httpErrorResponse.status) {
    case 403: {
      message = '超过访问限额了，过一会再试吧。';
      break;
    }
    case 404: {
      message = "页面找不到了 QAQ";
      break;
    }
    default: {
      message = defaultErrorMessage;
      break;
    }
  }

  return {
    title: `${httpErrorResponse.status}: ${httpErrorResponse.statusText}`,
    message: message,
  };
}