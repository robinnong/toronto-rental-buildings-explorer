"use client";

import { ReactElement } from "react";
import Modal from "@/app/components/utils/Modal";
import { EMBEDDED_MAP_URL } from "@/app/constants/general";

type Props = {
  address: string;
  postalCode: string;
  onClose: () => void;
};

/**
 * MapModal component displays a modal with an embedded Google Map
 * based on the provided building address and postal code.
 *
 * @param {string} address - The building address.
 * @param {string} postalCode - The building postal code.
 * @param {Function} onClose - Callback function to close the modal.
 */
export default function MapModal({
  address,
  postalCode,
  onClose,
}: Props): ReactElement {
  const mapQuery = encodeURIComponent(`${address}, Toronto, ON ${postalCode}`);
  const googleMapSrc = `${EMBEDDED_MAP_URL}?key=${process.env.GOOGLE_API_KEY}&q=${mapQuery}`;

  return (
    <Modal onClickOutside={onClose}>
      {/* Modal header */}
      <div className="p-3 flex justify-between">
        <h4 className="text-lg font-semibold">Map</h4>

        <button type="button" onClick={onClose}>
          <span className="sr-only">Close</span>
          <i className="fa-solid fa-xmark fa-xl text-cyan-600" />
        </button>
      </div>

      {/* Embedded Google Map */}
      <iframe
        className="w-150 h-100"
        height="300"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        title="Google Maps Preview"
        src={googleMapSrc}
      />
    </Modal>
  );
}
