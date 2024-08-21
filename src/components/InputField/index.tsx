import clsx from "clsx";
import React from "react";

interface InputFieldProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  value,
  onChange,
  label,
  className,
  placeholder,
  error,
  errorMessage,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-xs mt-2 mb-1 font-normal">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={clsx(
          "shadow appearance-none border-1 text-xs focus:border-[#9277ff] rounded w-full py-2 px-3 bg-input-bg leading-tight focus:border focus:outline-none focus:shadow-outline",
          error ? "border border-red" : "border-transparent",
          className
        )}
        placeholder={placeholder}
      />
      {error && errorMessage && (
        <p className="text-red-500 text-xs italic mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
