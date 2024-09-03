import InvoiceForm from "./InvoiceForm";
import { IInvoiceList } from "../../interfaces/InvoiceList";

const AddEditInvoiceForm = ({
  onClose,
  refetchData,
  selectedInvoice,
}: {
  onClose: () => void;
  refetchData: () => void;
  selectedInvoice: IInvoiceList | null;
}) => {
  return (
    <div className="relative overflow-y-auto grow">
      <InvoiceForm
        onClose={onClose}
        refetchData={refetchData}
        selectedInvoice={selectedInvoice}
      />
      {/* <div className="w-full lg:max-w-[700px] custom-scrollbar-2 bg-main-bg fixed inset-0 z-50 flex flex-col" /> */}
    </div>
  );
};

export default AddEditInvoiceForm;
