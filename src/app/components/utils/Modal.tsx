"use client";

import { ReactElement, ReactNode } from "react";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";

type Props = { onClickOutside: () => void; children: ReactNode };

/**
 * A reusable modal component with a transparent background overlay
 * and functionality to close the modal when clicking outside of it.
 *
 * @param {function} onClickOutside - Function to call when clicking outside the modal
 * @param {ReactNode} children - The content to display inside the modal
 * @returns The modal component
 */
export default function Modal({
  onClickOutside,
  children,
}: Props): ReactElement {
  const ref = useOnClickOutside(onClickOutside);

  return (
    // Transparent background overlay
    <div className="fixed z-20 right-0 top-0 left-0 bottom-0 w-full h-full flex items-center justify-center bg-gray-600/60">
      {/* Modal wrapper */}
      <div
        ref={ref}
        className="flex flex-col overflow-hidden rounded-lg bg-white max-w-sm"
      >
        {children}
      </div>
    </div>
  );
}
