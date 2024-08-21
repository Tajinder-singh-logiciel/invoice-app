import React from "react";
import clsx from "clsx";

import StatusChip from "../../components/Chip";
import LeftArrow from "../../assets/icon-arrow-left.svg";

import { IInvoiceList } from "../../interfaces/InvoiceList";
import { getFormattedDate } from "../../utils/getFormattedDate";

interface InvoiceDetailsProps {
  selectedInvoice: IInvoiceList;
  onClose: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onMarkAsPaid: () => void;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  selectedInvoice,
  onClose,
  onEdit,
  onRemove,
  onMarkAsPaid,
}) => {
  const {
    id,
    clientName,
    clientEmail,
    senderAddress,
    clientAddress,
    status,
    paymentDue,
    createdAt,
    items,
    total,
    description,
  } = selectedInvoice;

  return (
    <div className="bg-main-bg min-h-screen p-8 text-white flex flex-col overflow-auto">
      <div
        className="inline-flex cursor-pointer items-center mb-8 gap-6"
        onClick={onClose}
      >
        <img src={LeftArrow} alt="Logo" />
        <div className="text-white font-bold text-sm">Go back</div>
      </div>

      <div className="bg-drawer-bg p-6 rounded-lg mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-4">Status</span>
          <StatusChip status={status} />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-dark px-6 py-4 font-bold text-xs rounded-full"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="bg-red px-6 py-4 font-bold text-xs rounded-full"
            onClick={onRemove}
          >
            Delete
          </button>
          <button
            className={clsx(
              "bg-purple-light px-6 py-4 font-bold text-xs rounded-full",
              status !== "pending" &&
                "opacity-50 cursor-not-allowed pointer-events-none"
            )}
            onClick={onMarkAsPaid}
          >
            Mark as Paid
          </button>
        </div>
      </div>

      <div className="bg-drawer-bg p-8 rounded-lg">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold [&>span]:text-grey-blue">
              <span>#</span>
              {id}
            </h2>
            <p className="text-grey-blue">{description}</p>
          </div>
          <div className="text-right text-grey-blue">
            <p>{senderAddress.street}</p>
            <p>{senderAddress.city}</p>
            <p>{senderAddress.postCode}</p>
            <p>{senderAddress.country}</p>
          </div>
        </div>

        <div className="flex mt-8">
          <div className="w-60">
            <div className="mb-6">
              <h4 className="text-grey-blue mb-4">Invoice Date</h4>
              <p className="text-xl font-bold">{getFormattedDate(createdAt)}</p>
            </div>
            <div>
              <h4 className="text-grey-blue  mb-4">Payment Due</h4>
              <p className="text-xl font-bold">
                {getFormattedDate(paymentDue)}
              </p>
            </div>
          </div>
          <div className="w-72 pr-28">
            <h4 className="text-grey-blue  mb-4">Bill To</h4>
            <p className="text-xl font-bold">{clientName}</p>
            <p className="text-grey-blue">{clientAddress.street}</p>
            <p className="text-grey-blue">{clientAddress.city}</p>
            <p className="text-grey-blue">{clientAddress.postCode}</p>
            <p className="text-grey-blue">{clientAddress.country}</p>
          </div>
          <div className="w-52">
            <h4 className="text-grey-blue  mb-4">Sent to</h4>
            <p className="text-xl font-bold">{clientEmail}</p>
          </div>
        </div>

        <div className="bg-input-bg mt-8 rounded-t-lg p-6 gap-4 flex flex-col">
          <div className="flex justify-between mb-4">
            <p className="w-48">Item Name</p>
            <p className="text-center w-40">QTY.</p>
            <p className="text-right w-28">Price</p>
            <p className="text-right w-28">Total</p>
          </div>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between mb-4">
              <p className="font-bold w-48">{item.name}</p>
              <p className="font-bold w-40 text-center">{item.quantity}</p>
              <p className="font-bold w-28 text-right">
                £ {item.price.toFixed(2)}
              </p>
              <p className="font-bold w-28 text-right">
                £ {item.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-black text-right p-6 rounded-b-lg">
          <p className="text-grey-blue">Amount Due</p>
          <p className="text-2xl font-bold">£ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
