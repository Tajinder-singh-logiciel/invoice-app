import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import IconPlus from "../../../src/assets/icon-plus.svg";
import { IInvoiceList } from "../../interfaces/InvoiceList";
import { API_URLS } from "../../configs/urls";
import { httpDelete, httpGet, httpPut } from "../../utils/http";
import InvoiceLists from "./invoiceList";
import InvoicesEmptyState from "./InvoicesEmptyState";
import Drawer from "../../components/Drawer";
import AddEditInvoiceForm from "./AddEditInvoiceForm";
import InvoiceDetails from "./InvoiceDetails";
import FilterDropdown from "../../components/DropDown";
import { showSuccessMsg } from "../../utils/notifications";
import ConfirmationModal from "../../components/ConfirmationModal";

const Invoice = () => {
  const [invoiceList, setInvoiceList] = useState<IInvoiceList[]>([]);
  const [isOpenAddEditForm, setIsOpenAddEditForm] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoiceList | null>(
    null
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenMarkAsPaidModal, setIsOpenMarkAsPaidModal] =
    useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getInvoiceList = async () => {
    let url = API_URLS.GET_INVOICE;

    if (status) {
      url += `?status=${status}`;
    }

    try {
      const { data } = await httpGet(url);

      setInvoiceList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedInvoice?.id) {
      setSelectedInvoice(
        invoiceList.find((invoice) => invoice.id === selectedInvoice.id) || null
      );
    }
  }, [invoiceList, selectedInvoice?.id]);

  useEffect(() => {
    getInvoiceList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleInvoiceAction = async (
    action: "delete" | "markAsPaid",
    invoiceId: string
  ) => {
    let url = "";
    let httpMethod = httpDelete;
    let successMessage = "";

    if (action === "delete") {
      url = API_URLS.DELETE_INVOICE + `/${invoiceId}`;
      httpMethod = httpDelete;
      successMessage = "Invoice deleted successfully";
    } else if (action === "markAsPaid") {
      url = API_URLS.MARK_AS_PAID.replace(":id", invoiceId);
      httpMethod = httpPut;
      successMessage = "Invoice marked as paid successfully";
    }

    setIsSubmitting(true);
    try {
      const { status, message } = await httpMethod(url, {});

      if (status === "success") {
        if (action === "delete") {
          setIsOpenDeleteModal(false);
          setSelectedInvoice(null);
        } else if (action === "markAsPaid") {
          setIsOpenMarkAsPaidModal(false);
        }
        getInvoiceList();
        showSuccessMsg(successMessage || message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      {!selectedInvoice && (
        <>
          <div className="flex flex-wrap items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-main-bg">
            <div className="text-white text-xs mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-semibold">Invoices</h1>
              {invoiceList.length > 0 ? (
                <p>There are {invoiceList?.length} total invoices</p>
              ) : (
                <p>No invoices</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <FilterDropdown
                onChange={(value: string) => {
                  setStatus(value);
                }}
              />
              <button
                onClick={() => setIsOpenAddEditForm(true)}
                className="flex items-center text-xs font-bold bg-purple-light pl-2 pr-4 py-2 rounded-full text-white"
              >
                <span className="mr-2 text-xl bg-white w-8 h-8 rounded-full flex items-center justify-center">
                  <img src={IconPlus} alt="Add" className="w-3 h-3" />
                </span>
                New Invoice
              </button>
            </div>
          </div>
          {invoiceList?.length > 0 ? (
            <InvoiceLists
              invoices={invoiceList}
              setSelectedInvoice={setSelectedInvoice}
            />
          ) : (
            <InvoicesEmptyState />
          )}
        </>
      )}

      {selectedInvoice?.id && (
        <InvoiceDetails
          selectedInvoice={selectedInvoice}
          onClose={() => {
            setSelectedInvoice(null);
          }}
          onEdit={() => setIsOpenAddEditForm(true)}
          onRemove={() => setIsOpenDeleteModal(true)}
          onMarkAsPaid={() => setIsOpenMarkAsPaidModal(true)}
        />
      )}

      <ConfirmationModal
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        onConfirm={() =>
          handleInvoiceAction("delete", selectedInvoice?.id || "")
        }
        title="Confirm Deletion"
        message={`Are you sure you want to delete invoice #${selectedInvoice?.id}? This action cannot be undone.`}
        isSubmitting={isSubmitting}
      />

      <ConfirmationModal
        isOpen={isOpenMarkAsPaidModal}
        onClose={() => setIsOpenMarkAsPaidModal(false)}
        onConfirm={() =>
          handleInvoiceAction("markAsPaid", selectedInvoice?.id || "")
        }
        title="Mark as Paid"
        message={`Are you sure you want to mark this invoice as paid?`}
        isSubmitting={isSubmitting}
      />

      <Drawer
        size="sm"
        isOpen={isOpenAddEditForm}
        closeDrawer={() => setIsOpenAddEditForm(false)}
      >
        <AddEditInvoiceForm
          onClose={() => setIsOpenAddEditForm(false)}
          selectedInvoice={selectedInvoice}
          refetchData={() => getInvoiceList()}
        />
      </Drawer>
    </>
  );
};

export default Invoice;
