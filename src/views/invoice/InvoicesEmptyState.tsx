import React from "react";
import EmptySvg from "../../assets/illustration-empty.svg";

const InvoicesEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Illustration and Message */}
      <div className="flex flex-col items-center mt-24 justify-center flex-1 text-center bg-main-bg">
        <img src={EmptySvg} alt="Illustration" className="mb-8 w-72 h-60" />
        <p className="text-xl font-medium text-white">There is nothing here</p>
        <p className="text-sm text-gray-400 mt-2">
          Create an invoice by clicking the
          <br />
          <span className="text-white font-semibold">New Invoice</span> button
          and get started
        </p>
      </div>

      {/* <InvoiceList /> */}

      {/* <DeleteInvoice /> */}

      {/* <InvoiceDetails {...invoiceData} /> */}
    </div>
  );
};

export default InvoicesEmptyState;
