"use client";

import { ReactElement, ReactNode } from "react";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";

type Props = { onClose: () => void; children: ReactNode };

/**
 * A reusable modal wrapper component with a transparent background overlay
 * and functionality to close the modal when clicking outside of it.
 *
 * Props for Modal
 * @param {function} onClickOutside - Function to call when clicking outside the modal
 * @param {ReactNode} children - The content to display inside the modal
 */
export default function Modal({ onClose, children }: Props): ReactElement {
  const ref = useOnClickOutside({ onClick: onClose });

  return (
    // Transparent background overlay
    <div className="fixed z-20 right-0 top-0 left-0 bottom-0 w-full h-full flex items-center justify-center bg-gray-600/60 p-4">
      {/* Modal wrapper */}
      <div
        ref={ref}
        className="flex flex-col h-full rounded-lg bg-white w-full max-w-100 max-h-150"
      >
        {children}
      </div>
    </div>
  );
}
