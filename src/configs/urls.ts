export const BASE_URL = process.env.REACT_API_BASE_URL;

// Define your URL configuration
export const API_URLS = {
  GET_INVOICE: `${BASE_URL}/invoices`,
  CREATE_INVOICE: `${BASE_URL}/invoice`,
  UPDATE_INVOICE: `${BASE_URL}/invoice`,
  DELETE_INVOICE: `${BASE_URL}/invoice`,
  MARK_AS_PAID: `${BASE_URL}/invoice/:id/markAsPaid`,
};
