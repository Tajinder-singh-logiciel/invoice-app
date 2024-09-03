import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, FormikErrors } from "formik";
import * as Yup from "yup";
import Delete from "../../assets/icon-delete.svg";
import { IInvoiceList } from "../../interfaces/InvoiceList";
import { API_URLS } from "../../configs/urls";
import { httpPost, httpPut } from "../../utils/http";
import InputField from "../../components/InputField";
import { showSuccessMsg } from "../../utils/notifications";
import Button from "../../components/Button";

interface IInvoiceForm {
  onClose: () => void;
  refetchData: () => void;
  selectedInvoice: IInvoiceList | null;
}

const initialInvoice: IInvoiceList = {
  id: "",
  description: "",
  paymentTerms: 1,
  clientName: "",
  clientEmail: "",
  status: "pending",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [
    {
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
    },
  ],
  total: 0,
  createdAt: new Date().toISOString().split("T")[0],
  paymentDue: "",
};

const validationSchema = Yup.object().shape({
  senderAddress: Yup.object().shape({
    street: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    postCode: Yup.string().required("Post code is required"),
    country: Yup.string().required("Country is required"),
  }),
  clientName: Yup.string().required("Client's name is required"),
  clientEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  clientAddress: Yup.object().shape({
    street: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    postCode: Yup.string().required("Post code is required"),
    country: Yup.string().required("Country is required"),
  }),
  createdAt: Yup.date().required("Invoice date is required"),
  paymentTerms: Yup.number().required("Payment terms is required"),
  description: Yup.string().required("Project description is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
        price: Yup.number()
          .min(1, "Price must be non-negative")
          .required("Price is required"),
      })
    )
    .min(1, "At least one item is required"),
});

const InvoiceForm: React.FC<IInvoiceForm> = ({
  onClose,
  refetchData,
  selectedInvoice,
}) => {
  const [isDraftSaving, setIsDraftSaving] = useState<boolean>(false);
  const initialValues = selectedInvoice
    ? {
        ...selectedInvoice,
        createdAt: selectedInvoice.createdAt
          ? new Date(selectedInvoice.createdAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      }
    : initialInvoice;

  const handleSubmit = async (values: IInvoiceList, isDraft: boolean) => {
    if (isDraft) {
      setIsDraftSaving(true);
    }

    const url = values.id
      ? `${API_URLS.UPDATE_INVOICE}/${values.id}`
      : API_URLS.CREATE_INVOICE;
    const method = values.id ? httpPut : httpPost;

    try {
      const { status, message } = await method(url, {
        ...values,
        createdAt: new Date(values.createdAt),
        paymentTerms: Number(values.paymentTerms),
        status: isDraft ? "draft" : "pending",
      });

      if (status === "success") {
        showSuccessMsg(message);
        refetchData();
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black-grey text-white rounded-r-3xl flex flex-col h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values, false)}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => {
          console.log(errors, "errors");
          return (
            <Form className="flex-1 overflow-auto max-w-[550px] px-6 sm:px-3 py-12 pb-40 mx-auto custom-scrollbar">
              <h1 className="text-2xl font-bold mb-4">
                {values.id ? `Edit #${values.id}` : "New Invoice"}
              </h1>

              {/* Bill From */}
              <div>
                <h2 className="text-xs font-bold mb-4 text-purple">
                  Bill From
                </h2>
                <Field
                  as={InputField}
                  type="text"
                  id="senderAddressStreet"
                  name="senderAddress.street"
                  label="Street Address"
                  className="mb-2"
                  error={
                    touched.senderAddress?.street &&
                    (
                      errors.senderAddress as FormikErrors<
                        typeof initialInvoice.senderAddress
                      >
                    )?.street
                  }
                />
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <Field
                    as={InputField}
                    type="text"
                    id="senderAddressCity"
                    name="senderAddress.city"
                    label="City"
                    className="flex-1"
                    error={
                      touched.senderAddress?.city &&
                      (
                        errors.senderAddress as FormikErrors<
                          typeof initialInvoice.senderAddress
                        >
                      )?.city
                    }
                  />
                  <Field
                    as={InputField}
                    type="text"
                    id="senderAddressPostCode"
                    name="senderAddress.postCode"
                    label="Post Code"
                    className="flex-1"
                    error={
                      touched.senderAddress?.postCode &&
                      (
                        errors.senderAddress as FormikErrors<
                          typeof initialInvoice.senderAddress
                        >
                      )?.postCode
                    }
                  />
                  <Field
                    as={InputField}
                    type="text"
                    id="senderAddressCountry"
                    name="senderAddress.country"
                    label="Country"
                    className="flex-1"
                    error={
                      touched.senderAddress?.country &&
                      (
                        errors.senderAddress as FormikErrors<
                          typeof initialInvoice.senderAddress
                        >
                      )?.country
                    }
                  />
                </div>
              </div>

              {/* Bill To */}
              <div>
                <h2 className="text-xs font-bold mb-4 text-purple">Bill To</h2>
                <Field
                  as={InputField}
                  type="text"
                  id="clientName"
                  name="clientName"
                  label="Client's Name"
                  className="mb-2"
                  error={touched.clientName && errors.clientName}
                />
                <Field
                  as={InputField}
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  label="Client's Email"
                  className="mb-2"
                  error={touched.clientEmail && errors.clientEmail}
                />
                <Field
                  as={InputField}
                  type="text"
                  id="clientAddressStreet"
                  name="clientAddress.street"
                  label="Street Address"
                  className="mb-2"
                  error={
                    touched.clientAddress?.street &&
                    (
                      errors.clientAddress as FormikErrors<
                        typeof initialInvoice.clientAddress
                      >
                    )?.street
                  }
                />
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <Field
                    as={InputField}
                    type="text"
                    id="clientAddressCity"
                    name="clientAddress.city"
                    label="City"
                    className="flex-1"
                    error={
                      touched.clientAddress?.city &&
                      (
                        errors.clientAddress as FormikErrors<
                          typeof initialInvoice.clientAddress
                        >
                      )?.city
                    }
                  />
                  <Field
                    as={InputField}
                    type="text"
                    id="clientAddressPostCode"
                    name="clientAddress.postCode"
                    label="Post Code"
                    className="flex-1"
                    error={
                      touched.clientAddress?.postCode &&
                      (
                        errors.clientAddress as FormikErrors<
                          typeof initialInvoice.clientAddress
                        >
                      )?.postCode
                    }
                  />
                  <Field
                    as={InputField}
                    type="text"
                    id="clientAddressCountry"
                    name="clientAddress.country"
                    label="Country"
                    className="flex-1"
                    error={
                      touched.clientAddress?.country &&
                      (
                        errors.clientAddress as FormikErrors<
                          typeof initialInvoice.clientAddress
                        >
                      )?.country
                    }
                  />
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <h2 className="text-xs font-normal mb-2">Invoice Date</h2>
                  <Field
                    as={InputField}
                    type="date"
                    id="invoiceDate"
                    name="createdAt"
                    className="flex-1"
                    error={touched.createdAt && errors.createdAt}
                  />
                </div>
                <div>
                  <h2 className="text-xs font-normal mb-2">Payment Terms</h2>
                  <Field
                    as="select"
                    id="paymentTerms"
                    name="paymentTerms"
                    className="shadow text-xs appearance-none border-[#252945] focus:border-[#9277ff] border border-transparent rounded w-full py-[12px] px-3 bg-input-bg leading-tight focus:outline-none focus:shadow-outline focus:border"
                  >
                    <option value="1">Net 1 Day</option>
                    <option value="7">Net 7 Days</option>
                    <option value="14">Net 14 Days</option>
                    <option value="30">Net 30 Days</option>
                  </Field>
                </div>
              </div>

              {/* Project Description */}
              <div className="mt-8">
                <Field
                  as={InputField}
                  type="textarea"
                  id="description"
                  name="description"
                  label="Project Description"
                  error={touched.description && errors.description}
                />
              </div>

              {/* Item List */}
              <div className="mt-4 flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-1 text-gray-500">
                  Item List
                </h2>
                <FieldArray name="items">
                  {({ remove, push }) => (
                    <>
                      {values.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex w-full flex-col sm:flex-row sm:items-center gap-2 mb-2"
                        >
                          <div className="flex [&>div]:w-full">
                            <Field
                              as={InputField}
                              name={`items.${index}.name`}
                              placeholder="Item name"
                              className="w-full sm:max-w-[150px]"
                              error={
                                touched.items?.[index]?.name &&
                                (
                                  errors.items as FormikErrors<
                                    typeof initialInvoice.items
                                  >
                                )?.[index]?.name
                              }
                            />
                          </div>
                          <div className="flex gap-2 items-center">
                            <Field
                              as={InputField}
                              type="number"
                              name={`items.${index}.quantity`}
                              placeholder="Qty"
                              min={1}
                              className="max-w-24"
                              error={
                                touched.items?.[index]?.quantity &&
                                (
                                  errors.items as FormikErrors<
                                    typeof initialInvoice.items
                                  >
                                )?.[index]?.quantity
                              }
                            />
                            <Field
                              as={InputField}
                              type="number"
                              name={`items.${index}.price`}
                              placeholder="price"
                              min={1}
                              className="max-w-24"
                              error={
                                touched.items?.[index]?.price &&
                                (
                                  errors.items as FormikErrors<
                                    typeof initialInvoice.items
                                  >
                                )?.[index]?.price
                              }
                            />
                            <div className="w-28 truncate">
                              {(item.quantity * item.price).toFixed(2)}
                            </div>
                            <div
                              onClick={() => remove(index)}
                              className="w-8 h-8 flex justify-end items-center"
                            >
                              <img
                                src={Delete}
                                alt="Delete"
                                className="w-4 h-5"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({ name: "", quantity: 0, price: 0, total: 0 })
                        }
                        className="bg-input-bg justify-center items-center flex w-full rounded-full text-white font-bold py-4 px-4 focus:outline-none focus:shadow-outline focus:border"
                      >
                        + Add New Item
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Actions */}
              <div className="mt-8 lg:left-[76px] left-0 flex justify-end fixed bottom-0 w-full max-w-[630px] mx-auto bg-input-bg rounded-r-3xl p-4">
                <div className="flex justify-between flex-col sm:flex-row gap-4 w-full max-w-[500px] mx-auto items-center">
                  <Button
                    type="button"
                    onClick={onClose}
                    className="bg-white min-w-[120px] hover:bg-gray-100 text-gray-400 text-xs font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline mr-2"
                  >
                    Discard
                  </Button>
                  <div className="flex flex-row gap-4">
                    <Button
                      type="button"
                      onClick={() => handleSubmit(values, true)}
                      isSubmitting={isDraftSaving}
                      className="bg-gray-400  min-w-[120px] hover:bg-gray-600 text-white text-xs font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline mr-2"
                    >
                      Save As Draft
                    </Button>
                    <Button
                      type="submit"
                      isSubmitting={isSubmitting}
                      className="bg-purple-light min-w-[120px] hover:bg-purple text-white text-xs font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      Save & Send
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InvoiceForm;
