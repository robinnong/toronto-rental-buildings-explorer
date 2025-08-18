"use client";

import { ReactElement, ReactNode } from "react";

type Props = {
  label: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

export default function SearchBarAppliedFilterPill({
  label,
  disabled = false,
  onClick,
}: Props): ReactElement {
  return (
    <div className="rounded-lg full bg-blue-50 hover:bg-blue-100 border border-blue-800 px-2 py-1 text-sm text-blue-800 text-nowrap">
      {label}
      <button type="button" onClick={onClick} disabled={disabled}>
        <span className="sr-only">Remove</span>
        <i className="fas fa-times ml-1" />
      </button>
    </div>
  );
}
