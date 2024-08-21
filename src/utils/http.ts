import axios, { AxiosResponse, Canceler } from "axios";

import { showErrorMsg } from "./notifications";

import { BASE_URL } from "../configs/urls";
import { ErrorResponse, HelperParams } from "../interfaces/utils/https";
import { ERROR_MESSAGES } from "../constants/messages";

/**
 * Cancel Token
 */
const { CancelToken } = axios;

/**
 * Use to cancel Http Requests
 */
let cancelHttpTokens: Canceler[] = [];

/**
 * Helper Params used in Request
 */
const HELPER_PARAMS = {
  callback: null,
  hideError: false,
  headers: {
    Accept: "application/json",
  },
};

/**
 * Axios instance for all API requests
 */
const appAxios = axios.create({
  baseURL: BASE_URL,
});

/**
 * Get Common Headers for Request
 *
 * @param additionalHeaders
 *
 * @return common headers
 */
export const getCommonHeaders = (
  additionalHeaders: Record<string, string> = {}
): Record<string, string> => {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      /* Additional Headers */
      ...additionalHeaders,
    };

    return headers;
  } catch (e) {
    return {};
  }
};

/**
 * Perform a GET request.
 *
 * @param url - The URL for the PATCH request.
 * @param HelperParams - Additional helper parameters.
 *
 * @return A Promise that resolves to the response data.
 */
export const httpGet = async (
  url: string,
  { callback, headers }: HelperParams = HELPER_PARAMS
): Promise<any> => {
  try {
    if (!headers) ({ headers } = HELPER_PARAMS);

    return appAxios
      .get(url, {
        headers: getCommonHeaders(headers),
        cancelToken: new CancelToken((c) => {
          cancelHttpTokens.push(c);
          if (callback) callback(c);
        }),
      })
      .then(httpHandleResponse)
      .catch(httpHandleError);
  } catch (e) {
    console.error("-- HTTP GET -- ", e);
    return Promise.reject({});
  }
};

/**
 * Post Request
 *
 * @param url
 * @param params
 * @param HelperParams
 *
 * @return A Promise
 */
export const httpPost = (
  url: string,
  params: any,
  {
    callback,
    headers,
    onUploadProgress,
    hideError,
    responseType,
  }: HelperParams = HELPER_PARAMS
): Promise<any> => {
  try {
    if (!headers) ({ headers } = HELPER_PARAMS);

    return appAxios
      .post(url, params, {
        onUploadProgress,
        headers: getCommonHeaders(headers),
        cancelToken: new CancelToken((c) => {
          cancelHttpTokens.push(c);
          if (callback) callback(c);
        }),
        ...(responseType && { responseType }),
      })
      .then(httpHandleResponse)
      .catch(httpHandleError);
  } catch (e) {
    console.error("-- HTTP POST -- ", e);
    return Promise.reject({});
  }
};

/**
 * Perform a PUT request.
 *
 * @param url - The URL for the PATCH request.
 * @param params - The parameters for the PATCH request.
 * @param HelperParams - Additional helper parameters.
 *
 * @return A Promise that resolves to the response data.
 */
export const httpPut = (
  url: string,
  params: any,
  { callback, headers }: HelperParams = HELPER_PARAMS
): Promise<any> => {
  try {
    if (!headers) ({ headers } = HELPER_PARAMS);

    return appAxios
      .put(url, params, {
        headers: getCommonHeaders(headers),
        cancelToken: new CancelToken((c) => {
          cancelHttpTokens.push(c);
          if (callback) callback(c);
        }),
      })
      .then(httpHandleResponse)
      .catch(httpHandleError);
  } catch (e) {
    console.error("-- HTTP PUT -- ", e);
    return Promise.reject({});
  }
};

/**
 * Perform a PATCH request.
 *
 * @param url - The URL for the PATCH request.
 * @param HelperParams - Additional helper parameters.
 *
 * @return A Promise that resolves to the response data.
 */
export const httpDelete = (
  url: string,
  { callback, headers, data }: HelperParams = HELPER_PARAMS
): Promise<any> => {
  try {
    if (!headers) ({ headers } = HELPER_PARAMS);

    return appAxios
      .delete(url, {
        data,
        headers: getCommonHeaders(headers),
        cancelToken: new CancelToken((c) => {
          cancelHttpTokens.push(c);
          if (callback) callback(c);
        }),
      })
      .then(httpHandleResponse)
      .catch(httpHandleError);
  } catch (e) {
    console.error("-- HTTP DELETE -- ", e);
    return Promise.reject({});
  }
};

/**
 * Handle Success Response
 */
export const httpHandleResponse = (res: AxiosResponse): object | null => {
  cancelHttpTokens = [];

  if (!res) return Promise.reject(null);

  return Promise.resolve(res.data);
};

/**
 * Handle Error Response
 */
export const httpHandleError = (
  error: any,
  { hideError }: { hideError?: boolean } = {}
): object | null => {
  try {
    if (hideError) return Promise.reject(error);

    if (!error) return Promise.reject({});

    /**
     * Show Error Message and send error to Gleap
     * @param msg
     */
    const showErrorSnack = (
      msg: string = ERROR_MESSAGES.internalError
    ): void => {
      showErrorMsg(msg);
    };

    /* Handle Cancel Request */
    cancelHttpTokens = [];
    if (!error.request) return Promise.reject("cancelled");

    const xhr = error.request;
    let err: ErrorResponse = {};
    if (xhr.response) err = extractJSON(xhr.response);
    /*handle different error codes here right now handled only 401 and 404*/
    if (xhr) {
      switch (xhr.status) {
        case 401:
          showErrorSnack(err.error);

          // window.location.href = "./create-account";

          break;
        case 402:
          showErrorSnack(err?.errors?.message);
          break;

        case 404:
          showErrorSnack(err.error);
          break;
        case 400:
          const errorMessage: string[] = Object.values(err).reduce(
            (acc, value) => {
              if (Array.isArray(value)) {
                return acc.concat(value);
              }
              if (typeof value === "object") {
                return acc.concat(Object.values(value).flat());
              }
              return acc;
            },
            []
          );
          errorMessage.length
            ? showErrorSnack(errorMessage[1])
            : showErrorSnack();
          break;

        case 406:
          window.location.href = "./";

          break;

        case 422:
          if (err?.errors) {
            Object.entries(err.errors).forEach(([error, errorValues]) => {
              const errors = errorValues as string[];
              showErrorSnack(errors[0]);
            });
          } else {
            showErrorSnack(err?.message || ERROR_MESSAGES.internalError);
          }
          break;
        default:
          showErrorSnack(err?.message);
      }
    }
    return Promise.reject(error);
  } catch (e) {
    console.error("-- HTTP HANDLE ERROR -- ", e);
    return Promise.reject({});
  }
};

/**
 * Cancel Http Request
 */
export const httpCancel = (): void => {
  try {
    cancelHttpTokens.forEach((cancel) => cancel());
    cancelHttpTokens = [];
  } catch (e) {
    cancelHttpTokens = [];
  }
};

/**
 * Extract JSON Response
 */
export const extractJSON = (json: string): any => {
  try {
    const data = JSON.parse(json);
    if (typeof data == "object" && data !== null) return data;
  } catch (e) {
    return {};
  }
  return {};
};
