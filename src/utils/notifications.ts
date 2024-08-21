import { ToastPosition, toast } from "react-toastify";
import { ERROR_MESSAGES } from "../constants/messages";

const toastConfig = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  position: "bottom-right" as ToastPosition,
};

/**
 * Show Success Message
 * @param msg
 */
export const showSuccessMsg = (msg: string): void => {
  toast.success(msg, toastConfig);
};

/**
 * Show Error Message
 * @param msg
 */
export const showErrorMsg = (
  msg: string = ERROR_MESSAGES.internalError
): void => {
  toast.error(msg, toastConfig);
};

/**
 * Show Warn Message
 * @param msg
 */
export const showWarnMsg = (msg: string): void => {
  toast.warn(msg, toastConfig);
};

/**
 * Show Info Message
 * @param msg
 */
export const showInfoMsg = (msg: string): void => {
  toast.info(msg, toastConfig);
};
