import React from "react";
import Button from "../Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isSubmitting?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isSubmitting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-[3] flex h-full w-full items-center justify-center mobile:px-8">
      <div className="z-20 max-w-[500px] rounded px-12 py-10 shadow-invoiceSh mobile:p-12 bg-drawer-bg">
        <h2 className="pb-5 text-white text-2xl font-bold">{title}</h2>
        <p className="pb-3 text-[#dfe3fa] text-sm font-medium">{message}</p>
        <div className="flex items-center justify-end gap-6 pt-6">
          <button
            className="rounded-full bg-[#252945] px-6 py-4 text-sm font-bold text-[#dfe3fa]  hover:bg-[#373b53] mobile:px-6 mobile:py-5"
            onClick={onClose}
          >
            Cancel
          </button>
          <Button
            type="submit"
            isSubmitting={isSubmitting}
            onClick={onConfirm}
            className="rounded-full min-w-[120px] bg-[#ec5757] px-6 py-4 text-sm font-bold text-white  hover:bg-[#ff9797] mobile:px-6 mobile:py-5"
          >
            Confirm
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 z-[11] h-full w-full bg-black bg-opacity-50"></div>
    </div>
  );
};

export default ConfirmationModal;
