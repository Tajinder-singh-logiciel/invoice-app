interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IInvoiceList {
  id: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "unpaid" | "pending" | string; // Adjust status options as needed
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
  createdAt: string;
  paymentDue: string;
}
