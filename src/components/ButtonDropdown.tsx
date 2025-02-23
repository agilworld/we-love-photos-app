import { useState } from "react";

type ItemsProps = {
  buttonText: string;
  key: string | number;
  link?: string;
  handleClick?: (key: string | number) => void;
};
export default function ButtonDropdown({
  buttonText = "",
  buttonDisabled = false,
  items,
}: {
  buttonText: string;
  buttonDisabled: boolean;
  items?: ItemsProps[];
}) {
  const [open, setOpen] = useState(false);
  const handleButton = () => {
    setOpen(!open);
  };
  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownButton"
        onClick={handleButton}
        disabled={buttonDisabled}
        className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        {buttonText} ▼
      </button>
      {open && (
        <div
          id="dropdownMenu"
          className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
        >
          {items?.map((item) => (
            <a
              href={item.link}
              key={item.key}
              onClick={
                item?.handleClick
                  ? () => item?.handleClick(item.key)
                  : undefined
              }
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {item.buttonText}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
