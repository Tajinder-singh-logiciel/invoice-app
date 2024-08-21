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
    <div className="flex items-center justify-between p-4 text-white rounded-lg bg-drawer-bg mb-2 hover:border-purple-light hover:border">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-[80px] text-left">
          <span className="font-bold text-sm text-grey-blue">#</span>
          <span className="text-sm">{id}</span>
        </div>
        <div className="text-sm w-[160px] text-left">{formattedDate}</div>
        <div className="text-sm w-[120px] truncate text-left">{clientName}</div>
        <div className="text-sm font-bold w-[120px] text-right">
          £{total.toFixed(2)}
        </div>
        <div className="flex items-center gap-6 justify-end w-[140px] text-left">
          <Chip status={status} />
          <img src={ArrowRight} alt="Arrow Right" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
