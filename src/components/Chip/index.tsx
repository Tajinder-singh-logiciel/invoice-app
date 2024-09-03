import React from "react";

interface ChipProps {
  status: string;
}

const Chip: React.FC<ChipProps> = ({ status }) => {
  const statusConfig: {
    [key: string]: {
      bgColor: string;
      dotColor: string;
      textColor: string;
    };
  } = {
    paid: {
      bgColor: "bg-[#33d69f]",
      dotColor: "bg-[#33d69f]",
      textColor: "text-[#33d69f]",
    },
    pending: {
      bgColor: "bg-[#ff8f00]",
      dotColor: "bg-[#ff8f00]",
      textColor: "text-[#ff8f00]",
    },
    draft: {
      bgColor: "bg-[#dfe3fa0f]",
      dotColor: "bg-[#dfe3fa]",
      textColor: "text-[#dfe3fa]",
    },
  };

  const defaultConfig = {
    bgColor: "bg-gray-700",
    dotColor: "bg-white",
    textColor: "text-white",
  };

  const { bgColor, dotColor, textColor } =
    statusConfig[status.toLowerCase()] || defaultConfig;

  return (
    <div
      className={`w-full min-w-[104px] max-w-min flex items-center gap-2 justify-center rounded bg-opacity-[0.0571] px-4 py-3 ${bgColor}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColor}`}></span>
      <span className={`text-sm font-bold capitalize ${textColor}`}>
        {status}
      </span>
    </div>
  );
};

export default Chip;
