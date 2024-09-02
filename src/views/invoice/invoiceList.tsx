import React, { Dispatch, SetStateAction } from "react";
import InvoiceItem from "./InvoiceItem";
import { IInvoiceList } from "../../interfaces/InvoiceList";

interface IInvoiceListProps {
  invoices: IInvoiceList[];
  setSelectedInvoice: Dispatch<SetStateAction<IInvoiceList | null>>;
}

const InvoiceLists: React.FC<IInvoiceListProps> = ({
  invoices,
  setSelectedInvoice,
}) => {
  return (
    <div className="mx-auto px-4 overflow-auto custom-scrollbar">
      <div className="min-w-[800px]">
        <div className="flex flex-col gap-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => setSelectedInvoice(invoice)}
              className="cursor-pointer"
            >
              <InvoiceItem invoiceList={invoice} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceLists;
