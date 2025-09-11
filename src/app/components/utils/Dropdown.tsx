"use client";

import { ReactElement, useState } from "react";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";

type Props<T> = {
  selectedOption: {
    key: T;
    label: string;
  };
  options: Array<{ key: T; label: string }>;
  disabled: boolean;
  onSelect: (key: T) => void;
};

/**
 * A reusable dropdown component.
 *
 * Props for Dropdown
 * @param selectedOption - The currently selected option.
 * @param options - List of options to choose from.
 * @param disabled - Whether the dropdown is disabled.
 * @param onClose - Function to call when the dropdown is closed.
 * @param onSelect - Function to call when an option is selected.
 */
export default function Dropdown<T>({
  selectedOption,
  options,
  disabled,
  onSelect,
}: Props<T>): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnClickOutside({ onClick: () => setIsOpen(false) });

  return (
    <div className="relative">
      <button
        type="button"
        className="flex cursor-pointer border border-gray-300 hover:border-cyan-600 hover:bg-sky-50 hover:text-cyan-700 py-1 rounded-full px-3 w-50 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white disabled:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="mr-1 grow-1">{selectedOption.label}</span>
        {isOpen ? (
          <i className="fas fa-times" />
        ) : (
          <i className="fas fa-chevron-down" />
        )}
      </button>

      {isOpen && (
        <ul
          ref={ref}
          className="absolute top-7 left-0 cursor-pointer rounded-md bg-white border border-gray-300 shadow-md hover:border-cyan-600 w-50 max-h-60 overflow-y-auto"
        >
          {options.map(({ key, label }) => (
            <li
              key={key.toString()}
              className={`rounded-md hover:bg-sky-50 hover:text-cyan-700 pt-2 p-2 ${
                selectedOption.key === key ? "bg-sky-50 text-cyan-700" : ""
              }`}
              onClick={() => {
                onSelect(key);
                setIsOpen(false);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
