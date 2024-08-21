import { ResponseType } from "axios";

export interface HelperParams {
  // eslint-disable-next-line no-unused-vars
  callback?: ((cancel: () => void) => void) | null;
  hideError?: boolean;
  headers?: Record<string, string>;
  onUploadProgress?: () => void;
  data?: any;
  responseType?: ResponseType | undefined;
}

export interface Error412Response {
  status_code?: string;
  error_details?: string;
  message?: string;
}

export interface ErrorResponse {
  detail?: string;
  error?: string;
  message?: string;
  errors?: Error412Response;
}
