import React from "react";
import { formatDate } from "date-fns";

import ArrowRight from "../../assets/icon-arrow-right.svg";
import { IInvoiceList } from "../../interfaces/InvoiceList";
import Chip from "../../components/Chip";

interface InvoiceItemProps {
  invoiceList: IInvoiceList;
}

const InvoiceItem: React.FC<InvoiceItemProps> = (props) => {
  const { id, paymentDue, clientName, total, status } = props.invoiceList;

  const formattedDate = paymentDue
    ? `Due ${formatDate(paymentDue, "dd MMM yyyy")}`
    : "";

  return (
    <div className="grid grid-cols-2 md:items-center mb-4 px-6 py-6 text-white rounded-lg shadow-modal bg-drawer-bg border border-transparent hover:border-purple-light hover:border hover:opacity-60 md:grid-cols-6 md:grid-rows-1 md:py-4">
      <div className="grid grid-cols-1 justify-between place-items-start md:grid-cols-2 md:col-span-2 md:items-center">
        <p className="font-bold text-base">
          <span className="text-grey-blue">#</span>
          {id}
        </p>
        <p className="pt-6 md:pt-0 md:text-sm">{formattedDate}</p>
      </div>
      <div className="justify-self-end md:justify-self-center md:text-sm md:col-span-2 md:self-center">
        {clientName}
      </div>
      <p className="font-bold text-base pt-2 md:pt-0 md:self-center">
        £{total.toFixed(2)}
      </p>
      <div className="flex gap-5 justify-end">
        <div className="flex items-center justify-center justify-self-end w-[104px] h-[40px] bg-pendingColor bg-opacity-5 dark:bg-opacity-5 rounded-md">
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-pendingColor mr-1"></div>
            <p className="text-pendingColor first-letter:uppercase font-bold">
              <Chip status={status} />
            </p>
          </div>
        </div>
        <img
          src={ArrowRight}
          alt="arrow-right"
          className="hidden self-center justify-self-end md:block"
        />
      </div>
    </div>
  );
};

export default InvoiceItem;
