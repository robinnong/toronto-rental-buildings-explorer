import { ReactElement, ReactNode, useState } from "react";

type Props = {
  header: string;
  children?: ReactNode;
};

/**
 * Reusable Accordion component with collapse/expand toggle functionality
 *
 * @param header - The title of the accordion
 * @param children - The content to display inside the accordion
 */
export default function Accordion({ header, children }: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col gap-1 items-start">
      <button
        type="button"
        className="text-cyan-700 flex items-center justify-between px-2 py-1 bg-gray-50 border border-cyan-700 rounded-lg hover:bg-gray-100 focus:outline-none"
        data-bs-toggle="collapse"
        aria-expanded={isOpen}
        onClick={toggleAccordion}
      >
        <h2>{header}</h2>
        <i className={`ml-1 fa-solid fa-chevron-${isOpen ? "up" : "down"}`} />
      </button>

      {isOpen && <div>{children}</div>}
    </div>
  );
}
