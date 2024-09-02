import { useEffect, useState } from "react";
import Delete from "../../assets/icon-delete.svg";
import { IInvoiceList, InvoiceItem } from "../../interfaces/InvoiceList";
import { API_URLS } from "../../configs/urls";
import { httpPost, httpPut } from "../../utils/http";
import InputField from "../../components/InputField";
import clsx from "clsx";
import { showSuccessMsg } from "../../utils/notifications";
import isValidEmail from "../../utils/isValidEmail";

interface IInvoiceForm {
  onClose: () => void;
  refetchData: () => void;
  selectedInvoice: IInvoiceList | null;
}

const initialInvoice = {
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
  createdAt: "",
  paymentDue: "",
};

interface IErrors {
  // Bill From
  senderAddress: {
    street?: string;
    city?: string;
    postCode?: string;
    country?: string;
  };
  // Bill To
  clientName?: string;
  clientEmail?: string;
  clientAddress: {
    street?: string;
    city?: string;
    postCode?: string;
    country?: string;
  };
  // Invoice Details
  createdAt?: string;
  paymentTerms?: string;
  // Project Description
  description?: string;
  // Item List
  items?: string;
  [key: string]:
    | string
    | undefined
    | IErrors["senderAddress"]
    | IErrors["clientAddress"];
}

const InvoiceForm = ({
  onClose,
  refetchData,
  selectedInvoice,
}: IInvoiceForm) => {
  const [invoiceData, setInvoiceData] = useState<IInvoiceList>(initialInvoice);
  const [errors, setErrors] = useState<IErrors>({
    senderAddress: {},
    clientAddress: {},
  });

  const { senderAddress, clientAddress, items } = invoiceData || {};

  useEffect(() => {
    if (selectedInvoice) {
      setInvoiceData(selectedInvoice);
    }
  }, [selectedInvoice]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleSenderAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      senderAddress: {
        ...errors.senderAddress,
        [name]: "",
      },
    });

    setInvoiceData({
      ...invoiceData,
      senderAddress: {
        ...invoiceData.senderAddress,
        [name]: value,
      },
    });
  };

  const handleClientAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      clientAddress: {
        ...errors.clientAddress,
        [name]: "",
      },
    });

    setInvoiceData({
      ...invoiceData,
      clientAddress: {
        ...invoiceData.clientAddress,
        [name]: value,
      },
    });
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { name: "", quantity: 0, price: 0, total: 0 },
      ],
    });
  };

  const handleSaveItem = (index: number, item: InvoiceItem) => {
    const updatedItems = [...items];
    updatedItems[index] = item;

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
    });
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
    });
  };

  const validateFields = () => {
    let errors: IErrors = {
      senderAddress: {},
      clientAddress: {},
    };

    // Bill From
    if (!senderAddress.street) {
      errors.senderAddress.street = "Street address is required";
    }
    if (!senderAddress.city) {
      errors.senderAddress.city = "City is required";
    }
    if (!senderAddress.postCode) {
      errors.senderAddress.postCode = "Post code is required";
    }
    if (!senderAddress.country) {
      errors.senderAddress.country = "Country is required";
    }

    // Bill To
    if (!invoiceData.clientName) {
      errors.clientName = "Client's name is required";
    }
    if (!isValidEmail(invoiceData.clientEmail)) {
      errors.clientEmail = "Please enter a valid email address";
    }
    if (!clientAddress.street) {
      errors.clientAddress.street = "Street address is required";
    }
    if (!clientAddress.city) {
      errors.clientAddress.city = "City is required";
    }
    if (!clientAddress.postCode) {
      errors.clientAddress.postCode = "Post code is required";
    }
    if (!clientAddress.country) {
      errors.clientAddress.country = "Country is required";
    }

    // Invoice Details
    if (!invoiceData.createdAt) {
      errors.createdAt = "Invoice date is required";
    }
    if (!invoiceData.paymentTerms) {
      errors.paymentTerms = "Payment terms is required";
    }

    // Project Description
    if (!invoiceData.description) {
      errors.description = "Project description is required";
    }

    // Item List
    if (items.length === 0) {
      errors.items = "At least one item is required";
    } else {
      items.forEach((item, index) => {
        if (!item.name) {
          errors[`itemName${index}`] = `Item ${index + 1} name is required`;
        }
        if (!item.quantity) {
          errors[`itemQuantity${index}`] = `Item ${
            index + 1
          } quantity is required`;
        }
        if (!item.price) {
          errors[`itemPrice${index}`] = `Item ${index + 1} price is required`;
        }
      });
    }

    // Check if there are any errors
    const hasErrors = Object.keys(errors).some((key) => {
      const value = errors[key];
      return typeof value === "object" ? Object.keys(value).length > 0 : value;
    });

    setErrors(errors);

    return !hasErrors;
  };

  const handleSaveInvoice = async (isDraft = false) => {
    if (!isDraft && !validateFields()) return;

    const url = invoiceData?.id
      ? `${API_URLS.UPDATE_INVOICE}/${invoiceData?.id}`
      : API_URLS.CREATE_INVOICE;

    const data = {
      ...invoiceData,
      createdAt: new Date(invoiceData?.createdAt),
      paymentTerms: Number(invoiceData?.paymentTerms),
      status: isDraft ? "draft" : "pending",
    };

    const method = invoiceData?.id ? httpPut : httpPost;

    try {
      const { status, message } = await method(url, data);

      if (status === "success") {
        showSuccessMsg(message);
        refetchData();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black-grey text-white rounded-r-3xl flex flex-col h-screen">
      <div className="flex-1 overflow-auto max-w-[500px] px-3 py-12 pb-40 mx-auto custom-scrollbar">
        {invoiceData?.id ? (
          <h1 className="text-2xl font-bold mb-4 [&>span]:text-grey-blue">
            Edit <span>#</span>
            {invoiceData?.id}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">New Invoice</h1>
        )}

        <div className="grid grid-cols-1 gap-4">
          {/* Bill From */}
          <div>
            <h2 className="text-xs font-bold mb-4 text-purple">Bill From</h2>
            <InputField
              type="text"
              id="senderAddressStreet"
              name="street"
              value={senderAddress?.street}
              onChange={handleSenderAddressChange}
              label="Street Address"
              className="mb-2"
              error={Boolean(errors?.senderAddress?.street)}
              errorMessage={errors?.senderAddress?.street}
            />
            <div className="flex gap-2 mb-2">
              <InputField
                type="text"
                id="senderAddressCity"
                name="city"
                value={senderAddress?.city}
                onChange={handleSenderAddressChange}
                label="City"
                className="flex-1"
                error={Boolean(errors?.senderAddress?.city)}
                errorMessage={errors?.senderAddress?.city}
              />
              <InputField
                type="text"
                id="senderAddressPostCode"
                name="postCode"
                value={senderAddress?.postCode}
                onChange={handleSenderAddressChange}
                label="Post Code"
                className="flex-1"
                error={Boolean(errors?.senderAddress?.postCode)}
                errorMessage={errors?.senderAddress?.postCode}
              />
              <InputField
                type="text"
                id="senderAddressCountry"
                name="country"
                value={senderAddress?.country}
                onChange={handleSenderAddressChange}
                label="Country"
                className="flex-1"
                error={Boolean(errors?.senderAddress?.country)}
                errorMessage={errors?.senderAddress?.country}
              />
            </div>
          </div>

          {/* Bill To */}
          <div>
            <h2 className="text-xs font-bold mb-4 text-purple">Bill To</h2>
            <InputField
              type="text"
              id="clientName"
              name="clientName"
              value={invoiceData?.clientName}
              onChange={handleInputChange}
              label="Client's Name"
              className="mb-2"
              error={Boolean(errors?.clientName)}
              errorMessage={errors?.clientName}
            />
            <InputField
              type="email"
              id="clientEmail"
              name="clientEmail"
              value={invoiceData?.clientEmail}
              onChange={handleInputChange}
              label="Client's Email"
              className="mb-2"
              error={Boolean(errors?.clientEmail)}
              errorMessage={errors?.clientEmail}
            />
            <InputField
              type="text"
              id="clientAddressStreet"
              name="street"
              value={clientAddress?.street}
              onChange={handleClientAddressChange}
              label="Street Address"
              className="mb-2"
              error={Boolean(errors?.clientAddress?.street)}
              errorMessage={errors?.clientAddress?.street}
            />
            <div className="flex gap-2 mb-2">
              <InputField
                type="text"
                id="clientAddressCity"
                name="city"
                value={clientAddress?.city}
                onChange={handleClientAddressChange}
                label="City"
                className="flex-1"
                error={Boolean(errors?.clientAddress?.city)}
                errorMessage={errors?.clientAddress?.city}
              />
              <InputField
                type="text"
                id="clientAddressPostCode"
                name="postCode"
                value={clientAddress?.postCode}
                onChange={handleClientAddressChange}
                label="Post Code"
                className="flex-1"
                error={Boolean(errors?.clientAddress?.postCode)}
                errorMessage={errors?.clientAddress?.postCode}
              />
              <InputField
                type="text"
                id="clientAddressCountry"
                name="country"
                value={clientAddress?.country}
                onChange={handleClientAddressChange}
                label="Country"
                className="flex-1"
                error={Boolean(errors?.clientAddress?.country)}
                errorMessage={errors?.clientAddress?.country}
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h2 className="text-xs font-normal mb-2">Invoice Date</h2>
            <div className="relative">
              <InputField
                type="date"
                id="invoiceDate"
                name="createdAt"
                value={invoiceData?.createdAt}
                onChange={handleInputChange}
                className="flex-1"
                error={Boolean(errors.createdAt)}
                errorMessage={errors?.createdAt}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xs font-normal mb-2">Payment Terms</h2>
            <select
              id="paymentTerms"
              name="paymentTerms"
              value={invoiceData?.paymentTerms}
              onChange={handleInputChange}
              className="shadow text-xs appearance-none border-[#252945] focus:border-[#9277ff] border border-transparent rounded w-full py-[12px] px-3 bg-input-bg leading-tight focus:outline-none focus:shadow-outline focus:border"
            >
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-8">
          <label
            htmlFor="projectDescription"
            className="block text-xs mt-2 mb-1 font-normal"
          >
            Project Description
          </label>
          <textarea
            id="projectDescription"
            name="description"
            value={invoiceData?.description}
            onChange={handleInputChange}
            className={clsx(
              errors?.description ? "border-red" : "border-transparent",
              "shadow appearance-none text-xs border-[#252945] border focus:border-[#9277ff]  rounded w-full py-2 px-3 bg-input-bg leading-tight focus:outline-none focus:shadow-outline focus:border"
            )}
          />
          {errors?.description && (
            <p className="text-red text-end text-xs italic mt-1">
              {errors?.description}
            </p>
          )}
        </div>

        {/* Item List */}
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-1 text-gray-500">Item List</h2>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="pr-4 py-2 w-36 font-normal text-xs">
                  Item Name
                </th>
                <th className="px-4 py-2 w-24 font-normal text-xs">Qty.</th>
                <th className="px-4 py-2 w-28 font-normal text-xs">Price</th>
                <th className="px-4 py-2 w-12 font-normal text-xs">Total</th>
                <th className="px-4 py-2 w-12 font-normal text-xs"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="pr-4 py-2">
                    <InputField
                      type="text"
                      id="itemName"
                      name="name"
                      value={item?.name}
                      onChange={(e) => {
                        handleSaveItem(index, {
                          ...item,
                          name: e.target.value,
                        });

                        setErrors({
                          ...errors,
                          [`itemName${index}`]: "",
                        });
                      }}
                      error={Boolean(errors?.[`itemName${index}`])}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <InputField
                      id="itemQuantity"
                      type="number"
                      name="quantity"
                      value={item?.quantity}
                      min={0}
                      max={99}
                      onChange={(e) => {
                        handleSaveItem(index, {
                          ...item,
                          quantity: parseInt(e.target.value, 10),
                        });

                        setErrors({
                          ...errors,
                          [`itemQuantity${index}`]: "",
                        });
                      }}
                      error={Boolean(errors?.[`itemQuantity${index}`])}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <InputField
                      id="itemQuantity"
                      type="number"
                      name="price"
                      value={item?.price}
                      min={0}
                      onChange={(e) => {
                        handleSaveItem(index, {
                          ...item,
                          price: parseInt(e.target.value, 10),
                        });

                        setErrors({
                          ...errors,
                          [`itemPrice${index}`]: "",
                        });
                      }}
                      error={Boolean(errors?.[`itemPrice${index}`])}
                    />
                  </td>
                  <td className="px-4 py-2">
                    {((item?.quantity || 0) * (item?.price || 0)).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <div
                      onClick={() => handleDeleteItem(index)}
                      className="cursor-pointer"
                    >
                      <img src={Delete} alt="Delete" className="w-4 h-5" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleAddItem}
            className="bg-input-bg justify-center items-center flex w-full rounded-full text-white font-bold py-4 px-4 focus:outline-none focus:shadow-outline focus:border"
          >
            + Add New Item
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end fixed bottom-0 w-full max-w-[600px] mx-auto bg-input-bg rounded-r-3xl p-4">
        <div className="flex justify-between w-full max-w-[500px] mx-auto items-center">
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-100 text-gray-400 text-xs font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline focus:border mr-2"
          >
            Discard
          </button>
          <div>
            <button
              onClick={() => handleSaveInvoice(true)}
              className="bg-gray-400 hover:bg-gray-600 text-white text-xs font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline focus:border mr-2"
            >
              Save As Draft
            </button>
            <button
              onClick={() => handleSaveInvoice(false)}
              className="bg-purple-light hover:bg-purple text-white text-xs font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline focus:border"
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
