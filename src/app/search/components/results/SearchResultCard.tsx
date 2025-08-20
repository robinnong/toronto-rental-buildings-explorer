"use client";

import { ReactElement, ReactNode, useMemo, useState } from "react";
import { FilterIcons, FilterLabels } from "@/app/constants/general";
import { FetchDataResponse } from "@/app/types/global";
import camelCaseToTitleCase from "@/app/lib/camelCaseToTitleCase";
import evaluateStringToBoolean from "@/app/lib/evaluateStringToBoolean";
import torontoPostalCodesByKey from "@/app/constants/torontoPostalCodesByKey";
import ward25NamesNumbers from "@/app/constants/ward25NamesNumbers";

type Props = {
  building: FetchDataResponse;
  onShowMapModal: () => void;
};

/**
 * Card displaying the rental building information for a search result
 *
 * @param {FetchDataResponse} building - The building data to display from search results
 * @param {Function} onShowMapModal - Callback to display building location in the map modal
 */
export default function SearchResultCard({
  building,
  onShowMapModal,
}: Props): ReactElement {
  const {
    AIR_CONDITIONING_TYPE,
    BALCONIES,
    BARRIER_FREE_ACCESSIBILTY_ENTR,
    BIKE_PARKING,
    CONFIRMED_STOREYS,
    CONFIRMED_UNITS,
    DESCRIPTION_OF_INDOOR_EXERCISE_ROOM,
    DESCRIPTION_OF_OUTDOOR_REC_FACILITIES,
    HEATING_TYPE,
    LAUNDRY_ROOM,
    LOCKER_OR_STORAGE_ROOM,
    NO_OF_ELEVATORS,
    NON_SMOKING_BUILDING,
    PARKING_TYPE,
    PCODE,
    PETS_ALLOWED,
    PROP_MANAGEMENT_COMPANY_NAME,
    SITE_ADDRESS,
    YEAR_BUILT,
    VISITOR_PARKING,
    WARD,
  } = building;

  const buildingAge = new Date().getFullYear() - YEAR_BUILT;
  const emptyLabel = <span className="italic text-gray-400">N/A</span>;

  const [isOpen, setIsOpen] = useState(false);

  /**
   * Formats the label as greyed out with a strikethrough if the value is falsey
   */
  const formatLabelStyle = (value: string): string =>
    evaluateStringToBoolean(value) ? "" : "line-through text-gray-400";

  /**
   * Displays 'N/A' if the value is falsey
   */
  const formatStringLabel = (value: string): ReactNode =>
    evaluateStringToBoolean(value) ? value : emptyLabel;

  // Takes the address postal code and returns the corresponding city within the Toronto metropolitan area.
  // Example: north_york => North York
  // Displays 'N/A' if the postal code is missing or not a valid Toronto area code.
  const city = useMemo((): ReactNode => {
    const matchingCode = Object.entries(torontoPostalCodesByKey).find(
      ([_, postalCodes]) => postalCodes.includes(PCODE)
    );
    return matchingCode ? camelCaseToTitleCase(matchingCode[0]) : emptyLabel;
  }, [PCODE]);

  return (
    <li className="p-4 rounded-sm border border-solid border-gray-200 bg-white hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-[16px] mb-1">
            {SITE_ADDRESS.trim()}
          </h3>
          <p className="text-ms font-semibold text-gray-600">{city}</p>
        </div>
        <button
          type="button"
          className="text-cyan-700"
          onClick={onShowMapModal}
        >
          <i className="fas fa-map mr-1" />
          Show on map
        </button>
      </div>

      <p className="py-1">
        Ward:&nbsp;
        {WARD != null && (
          <span className="font-semibold">
            {WARD ?? emptyLabel}&nbsp;-&nbsp;
            {ward25NamesNumbers[WARD]}
          </span>
        )}
      </p>

      <p className="pb-1">
        Property management:&nbsp;
        <span className="font-semibold">
          {PROP_MANAGEMENT_COMPANY_NAME ?? emptyLabel}
        </span>
      </p>

      <div className="flex items-end justify-between gap-2 w-full">
        <div className="flex flex-col gap-1 shrink-1">
          <p className="flex flex-wrap">
            <span className="whitespace-nowrap">No. stories:</span>&nbsp;
            {CONFIRMED_STOREYS ? (
              <span className="font-semibold">{CONFIRMED_STOREYS}</span>
            ) : (
              emptyLabel
            )}
            &nbsp;·&nbsp;<span className="whitespace-nowrap">No. units</span>
            :&nbsp;
            {CONFIRMED_UNITS ? (
              <span className="font-semibold">{CONFIRMED_UNITS}</span>
            ) : (
              emptyLabel
            )}
            &nbsp;·&nbsp;
            <span className="whitespace-nowrap">Year built</span>
            :&nbsp;
            {YEAR_BUILT ? (
              <>
                <span className="font-semibold whitespace-nowrap">
                  {YEAR_BUILT}
                </span>
                &nbsp;(
                <span className="font-semibold whitespace-nowrap">
                  {buildingAge} years old
                </span>
                )
              </>
            ) : (
              emptyLabel
            )}
          </p>
        </div>

        <div className="flex flex-col gap-1 items-start shrink-0">
          <button
            type="button"
            className="text-cyan-700 flex items-center justify-between text-nowrap"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>See more</span>
            <i className={`ml-1 fas fa-chevron-${isOpen ? "up" : "down"}`} />
          </button>
        </div>
      </div>

      {/* Expanded building information */}
      {isOpen && (
        <div className="flex gap-4 sm:gap-10 max-sm:flex-col mt-4 border-t border-gray-200 pt-4">
          <div className="flex flex-col gap-1 w-1/3 max-sm:w-full">
            <h4 className="font-bold mb-1">Building Features</h4>
            <p className={formatLabelStyle(AIR_CONDITIONING_TYPE)}>
              <i className={`fas ${FilterIcons.AIR_CONDITIONING_TYPE} mr-1`} />
              {FilterLabels.AIR_CONDITIONING_TYPE}
            </p>
            <p className={BALCONIES ? "" : "line-through text-gray-400"}>
              <i className={`fas ${FilterIcons.BALCONIES} mr-1`} />
              {FilterLabels.BALCONIES}
            </p>
            <p
              className={
                BARRIER_FREE_ACCESSIBILTY_ENTR
                  ? ""
                  : "line-through text-gray-400"
              }
            >
              <i
                className={`fas ${FilterIcons.BARRIER_FREE_ACCESSIBILTY_ENTR} mr-1`}
              />
              {FilterLabels.BARRIER_FREE_ACCESSIBILTY_ENTR}
            </p>
            <p
              className={
                NO_OF_ELEVATORS > 0 ? "" : "line-through text-gray-400"
              }
            >
              <i className={`fas ${FilterIcons.NO_OF_ELEVATORS} mr-1`} />
              {FilterLabels.NO_OF_ELEVATORS}
            </p>
            <p className={formatLabelStyle(HEATING_TYPE)}>
              <i className="fas fa-temperature-arrow-up mr-1" />
              Heating type:&nbsp;{formatStringLabel(HEATING_TYPE)}
            </p>
            <p
              className={
                NON_SMOKING_BUILDING ? "" : "line-through text-gray-400"
              }
            >
              <i className={`fas ${FilterIcons.NON_SMOKING_BUILDING} mr-1`} />
              {FilterLabels.NON_SMOKING_BUILDING}
            </p>
            <p className={PETS_ALLOWED ? "" : "line-through text-gray-400"}>
              <i className={`fas ${FilterIcons.PETS_ALLOWED} mr-1`} />
              {FilterLabels.PETS_ALLOWED}
            </p>
          </div>
          <div className="flex flex-col gap-1 w-1/3 max-sm:w-full">
            <h4 className="font-bold mb-1">Amenities</h4>
            <p
              className={formatLabelStyle(DESCRIPTION_OF_INDOOR_EXERCISE_ROOM)}
            >
              <i className={`fas ${FilterIcons.PARKING_TYPE} mr-1`} />
              {FilterLabels.DESCRIPTION_OF_INDOOR_EXERCISE_ROOM}
            </p>
            <p className={LAUNDRY_ROOM ? "" : "line-through text-gray-400"}>
              <i className={`fas ${FilterIcons.LAUNDRY_ROOM} mr-1`} />
              {FilterLabels.LAUNDRY_ROOM}
            </p>
            <p
              className={formatLabelStyle(
                DESCRIPTION_OF_OUTDOOR_REC_FACILITIES
              )}
            >
              <i className="fas fa-tree mr-1" />
              Outdoor amenities
            </p>
          </div>
          <div className="flex flex-col gap-1 w-1/3 max-sm:w-full">
            <h4 className="font-bold mb-1">Parking & Storage</h4>
            <p className={BIKE_PARKING ? "" : "line-through text-gray-400"}>
              <i className={`fas ${FilterIcons.BIKE_PARKING} mr-1`} />
              {FilterLabels.BIKE_PARKING}:&nbsp;
              {FilterLabels.BIKE_PARKING}
            </p>
            <p
              className={
                LOCKER_OR_STORAGE_ROOM ? "" : "line-through text-gray-400"
              }
            >
              <i className={`fas ${FilterIcons.LOCKER_OR_STORAGE_ROOM} mr-1`} />
              {FilterLabels.LOCKER_OR_STORAGE_ROOM}
            </p>
            <p
              className={
                PARKING_TYPE?.length > 0 ? "" : "line-through text-gray-400"
              }
            >
              <i className={`fas ${FilterIcons.PARKING_TYPE} mr-1`} />
              {FilterLabels.PARKING_TYPE}
              :&nbsp;
              {PARKING_TYPE?.length > 0 ? PARKING_TYPE.join(", ") : emptyLabel}
            </p>
            <p className={formatLabelStyle(VISITOR_PARKING)}>
              <i className="fas fa-dollar mr-1" />
              Visitor parking:&nbsp;
              {formatStringLabel(VISITOR_PARKING)}
            </p>
          </div>
        </div>
      )}
    </li>
  );
}
