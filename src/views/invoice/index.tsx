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
import DeleteInvoice from "./DeleteInvoice";
import FilterDropdown from "../../components/DropDown";
import { showSuccessMsg } from "../../utils/notifications";

const Invoice = () => {
  const [invoiceList, setInvoiceList] = useState<IInvoiceList[]>([]);
  const [isOpenAddEditForm, setIsOpenAddEditForm] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoiceList | null>(
    null
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

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
  }, []);

  useEffect(() => {
    if (status) {
      getInvoiceList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleMarkAsPaid = async () => {
    const url = API_URLS.MARK_AS_PAID.replace(":id", selectedInvoice?.id || "");

    try {
      const { status, message } = await httpPut(url, {});

      if (status === "success") {
        getInvoiceList();

        showSuccessMsg(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteInvoice = async () => {
    const url = API_URLS.DELETE_INVOICE + `/${selectedInvoice?.id}`;

    try {
      const { status, message } = await httpDelete(url);

      if (status === "success") {
        setIsOpenDeleteModal(false);
        getInvoiceList();
        setSelectedInvoice(null);

        showSuccessMsg(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Header */}
      {!selectedInvoice && (
        <>
          <div className="flex items-center justify-between px-8 py-6 bg-main-bg">
            <div className="text-white text-xs">
              <h1 className="text-3xl font-semibold">Invoices</h1>
              {invoiceList.length > 0 ? (
                <p>There are {invoiceList?.length} total invoices</p>
              ) : (
                <p>No invoices</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
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
          onMarkAsPaid={handleMarkAsPaid}
        />
      )}

      {isOpenDeleteModal && (
        <DeleteInvoice
          onClose={() => setIsOpenDeleteModal(false)}
          onConfirm={handleDeleteInvoice}
          id={selectedInvoice?.id || ""}
        />
      )}

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
