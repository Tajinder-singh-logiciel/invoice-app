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
    <>
      <div className="bg-main-bg px-8 py-12 min-h-screen p-4 md:p-8 text-white flex flex-col overflow-auto">
        <div
          className="inline-flex cursor-pointer items-center mb-4 md:mb-8 gap-4 md:gap-6"
          onClick={onClose}
        >
          <img src={LeftArrow} alt="Logo" />
          <div className="text-white font-bold text-sm">Go back</div>
        </div>

        <div className="bg-drawer-bg flex items-center justify-between w-full px-6 py-6 mt-8 mb-4 rounded-md shadow-modal">
          <div className="flex items-center justify-between w-full md:justify-start md:w-fit md:gap-5">
            <span className="mr-4">Status</span>
            <StatusChip status={status} />
          </div>
          <div className="hidden md:flex md:h-12 space-x-2 md:space-x-4">
            <button
              className={clsx(
                status === "paid" && "hidden",
                "bg-blue-dark px-4 md:px-6 py-2 md:py-4 font-bold text-xs rounded-full"
              )}
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="bg-red px-4 md:px-6 py-2 md:py-4 font-bold text-xs rounded-full"
              onClick={onRemove}
            >
              Delete
            </button>
            <button
              className={clsx(
                "bg-purple-light px-4 md:px-6 py-2 md:py-4 font-bold text-xs rounded-full",
                status !== "pending" && "hidden"
              )}
              onClick={onMarkAsPaid}
            >
              Mark as Paid
            </button>
          </div>
        </div>

        <div className="bg-drawer-bg p-4 md:p-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
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

          <div className="flex flex-col md:flex-row mt-8">
            <div className="w-full md:w-60 mb-4 md:mb-0">
              <div className="mb-6">
                <h4 className="text-grey-blue mb-4">Invoice Date</h4>
                <p className="text-xl font-bold">
                  {getFormattedDate(createdAt)}
                </p>
              </div>
              <div>
                <h4 className="text-grey-blue mb-4">Payment Due</h4>
                <p className="text-xl font-bold">
                  {getFormattedDate(paymentDue)}
                </p>
              </div>
            </div>
            <div className="w-full md:w-72 md:pr-28 mb-4 md:mb-0">
              <h4 className="text-grey-blue mb-4">Bill To</h4>
              <p className="text-xl font-bold">{clientName}</p>
              <p className="text-grey-blue">{clientAddress.street}</p>
              <p className="text-grey-blue">{clientAddress.city}</p>
              <p className="text-grey-blue">{clientAddress.postCode}</p>
              <p className="text-grey-blue">{clientAddress.country}</p>
            </div>
            <div className="w-full md:w-52">
              <h4 className="text-grey-blue mb-4">Sent to</h4>
              <p className="text-xl font-bold">{clientEmail}</p>
            </div>
          </div>

          <div className="bg-input-bg mt-8 rounded-t-lg p-4 md:p-6 gap-4 flex flex-col">
            <div className="hidden md:flex justify-between mb-4">
              <p className="w-1/2 md:w-48">Item Name</p>
              <p className="text-center w-1/4 md:w-40">QTY.</p>
              <p className="text-right w-1/4 md:w-28">Price</p>
              <p className="text-right w-1/4 md:w-28">Total</p>
            </div>
            {items.map((item, index) => (
              <>
                <div
                  key={index}
                  className="hidden md:flex justify-between mb-4"
                >
                  <p className="font-bold w-1/2 md:w-48">{item.name}</p>
                  <p className="font-bold w-1/4 md:w-40 text-center">
                    {item.quantity}
                  </p>
                  <p className="font-bold w-1/4 md:w-28 text-right">
                    £ {item.price.toFixed(2)}
                  </p>
                  <p className="font-bold w-1/4 md:w-28 text-right">
                    £ {item.total.toFixed(2)}
                  </p>
                </div>
                <div className="md:hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-[50%] items-start">
                      <p className="font-bold truncate">{item.name}</p>
                      <p className="font-normal">
                        {item.quantity} x £ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold w-1/4 md:w-28 text-right">
                      £ {item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="bg-black text-right p-4 md:p-6 rounded-b-lg">
            <p className="text-grey-blue">Amount Due</p>
            <p className="text-2xl font-bold">£ {total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-white gap-4 bg-drawer-bg px-5 py-5 w-full md:hidden">
        <button
          className={clsx(
            status === "paid" && "hidden",
            "bg-blue-dark px-4 md:px-6 py-3 md:py-4 font-bold text-xs rounded-full"
          )}
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red px-4 md:px-6 py-3 md:py-4 font-bold text-xs rounded-full"
          onClick={onRemove}
        >
          Delete
        </button>
        <button
          className={clsx(
            "bg-purple-light px-4 md:px-6 py-3 md:py-4 font-bold text-xs rounded-full",
            status !== "pending" && "hidden"
          )}
          onClick={onMarkAsPaid}
        >
          Mark as Paid
        </button>
      </div>
    </>
  );
};

export default InvoiceDetails;
