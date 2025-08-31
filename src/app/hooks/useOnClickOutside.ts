import { useEffect, useRef } from "react";

type Props = {
  onClick: (event: Event) => void;
};
/**
 * Custom hook to detect clicks outside of a referenced element
 *
 * @param {Function} onClick - Callback function to execute on outside click
 * @returns {RefObject<any>} A ref to attach to the element to monitor for outside clicks
 */
export default function useOnClickOutside({
  onClick,
}: Props): React.RefObject<any> {
  const ref = useRef(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick(event);
    }
  };

  useEffect(() => {
    if (!ref || !ref.current) return;

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClick]);

  return ref;
}
