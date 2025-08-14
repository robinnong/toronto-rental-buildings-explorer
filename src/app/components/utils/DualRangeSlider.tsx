"use client";

import { ReactElement, useEffect, useMemo, useState } from "react";

type Props = {
  title: string;
  sliderMin: number;
  sliderMax: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  disabled?: boolean;
};

/**
 * A reusable dual range slider that allows users to select a range
 * between defined minimum and maximum values.
 *
 * Props for DualRangeSlider
 * @param {string} title - The title of the slider
 * @param {number} sliderMin - The minimum value of the slider and inputs
 * @param {number} sliderMax - The maximum value of the slider and inputs
 * @param {function} setMinValue - Function to set the minimum value outside of the component context
 * @param {function} setMaxValue - Function to set the maximum value outside of the component context
 * @param {boolean} disabled - Disabled state
 * @returns The dual range slider component
 */
export default function DualRangeSlider({
  title,
  sliderMin = 0,
  sliderMax = 100,
  setMinValue,
  setMaxValue,
  disabled,
}: Props): ReactElement {
  const [rangeStartValue, setRangeStartValue] = useState<number>(sliderMin);
  const [rangeEndValue, setRangeEndValue] = useState<number>(sliderMax);

  const sliderBaseColour = "#d1d1d1";
  const sliderFillColour = "#0092b8";

  useEffect(() => {
    setMinValue(rangeStartValue);
  }, [rangeStartValue]);

  useEffect(() => {
    setMaxValue(rangeEndValue);
  }, [rangeEndValue]);

  // Dynamically calculate the slider background fill between the two handles
  // as the user drags the handles
  const sliderStyle = useMemo(() => {
    const rangeDistance = sliderMax - sliderMin;
    const fromPosition = rangeStartValue - sliderMin;
    const toPosition = rangeEndValue - sliderMin;

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
          min={sliderMin}
          max={sliderMax}
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
          min={sliderMin}
          max={sliderMax}
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
            className="border border-gray-300 p-1 text-center w-14 rounded-md focus:border-cyan-600 ml-1"
            min={sliderMin}
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
            className="border border-gray-300 p-1 text-center w-14 rounded-md focus:border-cyan-600 ml-1"
            min={rangeStartValue}
            max={sliderMax}
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
