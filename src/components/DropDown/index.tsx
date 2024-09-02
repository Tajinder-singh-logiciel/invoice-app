import { useState } from "react";
import { Menu } from "@headlessui/react";
import ArrowDown from "../../assets/icon-arrow-down.svg";
import CheckIcon from "../../assets/icon-check.svg";

const FilterDropdown = ({
  onChange,
}: {
  onChange: (status: string) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const statuses = [
    { name: "Paid", value: "paid" },
    { name: "Pending", value: "pending" },
    { name: "Draft", value: "draft" },
    { name: "All", value: "" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center text-sm font-medium px-4 py-2 border-0 focus:border-0 text-white">
          Filter by status
          <span className="ml-3 mt-0.5">
            <img src={ArrowDown} alt="Arrow Down" />
          </span>
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute mt-2 w-36 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {statuses.map((status) => (
            <Menu.Item key={status.value}>
              {({ active }) => (
                <div
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer justify-between ${
                    active ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedStatus(status.value);
                    onChange(status.value);
                  }}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={selectedStatus === status.value}
                      onChange={() => setSelectedStatus(status.value)}
                      className="inline-flex form-radio text-purple h-4 w-4"
                    />
                    <span className="inline-flex ml-2">{status.name}</span>
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default FilterDropdown;
