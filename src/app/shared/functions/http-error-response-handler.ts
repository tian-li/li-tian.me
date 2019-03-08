import { HttpErrorResponse } from "@angular/common/http";
import { ErrorMessage } from "../models/error-message";

export function httpErrorResponseHandler(httpErrorResponse: HttpErrorResponse): ErrorMessage {
  return {
    title: `${httpErrorResponse.status}: ${httpErrorResponse.statusText}`,
    message: 'An error occurs',
  };
}