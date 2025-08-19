"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";

type Props = {
  title: string;
  defaultSliderMin: number;
  defaultSliderMax: number;
  rangeStartValue: number;
  setRangeStartValue: Dispatch<SetStateAction<number>>;
  rangeEndValue: number;
  setRangeEndValue: Dispatch<SetStateAction<number>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
};

/**
 * A reusable dual range slider that allows users to select a range
 * between defined minimum and maximum values.
 *
 * Props for DualRangeSlider
 * @param {string} title - The title of the slider
 * @param {number} defaultSliderMin - The minimum allowable value of the slider and inputs
 * @param {number} defaultSliderMax - The maximum allowable value of the slider and inputs
 * @param {number} rangeStartValue - Range start (controlled value)
 * @param {Dispatch<SetStateAction<number>>} setRangeStartValue - Function to set the range start value
 * @param {number} rangeEndValue - Range end (controlled value)
 * @param {Dispatch<SetStateAction<number>>} setRangeEndValue - Function to set the range end value
 * @param {boolean} disabled - Disabled state
 * @returns The dual range slider component
 */
export default function DualRangeSlider({
  title,
  defaultSliderMin = 0,
  defaultSliderMax = 100,
  rangeStartValue,
  setRangeStartValue,
  rangeEndValue,
  setRangeEndValue,
  setIsValid,
  disabled,
}: Props): ReactElement {
  const sliderBaseColour = "#d1d1d1";
  const sliderFillColour = "#0092b8";

  // Dynamically calculate the slider background fill between the two handles
  // as the user drags the handles
  const sliderStyle = useMemo(() => {
    const rangeDistance = defaultSliderMax - defaultSliderMin;
    const fromPosition = rangeStartValue - defaultSliderMin;
    const toPosition = rangeEndValue - defaultSliderMin;

    const leftHandlePosition = ((fromPosition / rangeDistance) * 100).toFixed(
      0
    );
    const rightHandlePosition = ((toPosition / rangeDistance) * 100).toFixed(0);
    const leftFillPosition = ((fromPosition / rangeDistance) * 100).toFixed(0);
    const rightFillPosition = ((toPosition / rangeDistance) * 100).toFixed(0);

    return `linear-gradient(
      to right,
      ${sliderBaseColour} 0%,
      ${sliderBaseColour} ${leftHandlePosition}%,
      ${sliderFillColour} ${leftFillPosition}%,
      ${sliderFillColour} ${rightFillPosition}%,
      ${sliderBaseColour} ${rightHandlePosition}%,
      ${sliderBaseColour} 100%
    )`;
  }, [rangeStartValue, rangeEndValue]);

  const isMinValid = useMemo(
    () =>
      !!(
        rangeStartValue < rangeEndValue && rangeStartValue >= defaultSliderMin
      ),
    [rangeStartValue, rangeEndValue]
  );

  const isMaxValid = useMemo(
    () =>
      !!(rangeEndValue > rangeStartValue && rangeEndValue <= defaultSliderMax),
    [rangeStartValue, rangeEndValue]
  );

  useEffect(() => {
    setIsValid(isMinValid && isMaxValid);
  }, [isMinValid, isMaxValid]);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-bold">{title}</h4>
      <div className="relative">
        <label htmlFor="minSlider" className="sr-only">
          Min
        </label>
        <input
          type="range"
          id="minSlider"
          name="minSlider"
          min={defaultSliderMin}
          max={defaultSliderMax}
          value={rangeStartValue}
          step="1"
          className="absolute"
          style={{ background: sliderStyle }}
          onChange={(e) => {
            // Ensure that rangeStartValue does not exceed rangeEndValue
            if (e.target.valueAsNumber > rangeEndValue) {
              setRangeStartValue(rangeEndValue);
            } else {
              setRangeStartValue(e.target.valueAsNumber);
            }
          }}
        />
        <label htmlFor="maxSlider" className="sr-only">
          Max
        </label>
        <input
          type="range"
          id="maxSlider"
          name="maxSlider"
          min={defaultSliderMin}
          max={defaultSliderMax}
          value={rangeEndValue}
          step="1"
          className="absolute"
          style={{ background: sliderStyle }}
          onChange={(e) => {
            // Ensure that rangeEndValue is always greater than rangeStartValue
            if (rangeStartValue <= e.target.valueAsNumber) {
              setRangeEndValue(e.target.valueAsNumber);
            } else {
              setRangeEndValue(rangeStartValue);
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="minInput">Min</label>
          <input
            type="number"
            id="minInput"
            name="minInput"
            className={`border border-gray-300 p-1 text-center w-14 rounded-md focus:border-cyan-600 ml-1 ${
              !isMinValid ? "border-rose-700 text-rose-700" : ""
            }`}
            min={defaultSliderMin}
            max={rangeEndValue}
            value={rangeStartValue}
            disabled={disabled}
            onChange={(e) => {
              // Ensure that rangeStartValue does not exceed rangeEndValue
              if (e.target.valueAsNumber > rangeEndValue) {
                setRangeStartValue(rangeEndValue);
              } else {
                setRangeStartValue(e.target.valueAsNumber);
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="maxInput">Max</label>
          <input
            type="number"
            id="maxInput"
            name="maxInput"
            className={`border border-gray-300 p-1 text-center w-14 rounded-md focus:border-cyan-600 ml-1 ${
              !isMaxValid ? "border-rose-700 text-rose-700" : ""
            }`}
            min={rangeStartValue}
            max={defaultSliderMax}
            value={rangeEndValue}
            disabled={disabled}
            onChange={(e) => {
              // Ensure that rangeEndValue is always greater than rangeStartValue
              if (rangeStartValue <= e.target.valueAsNumber) {
                setRangeEndValue(e.target.valueAsNumber);
              } else {
                setRangeEndValue(rangeStartValue);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
