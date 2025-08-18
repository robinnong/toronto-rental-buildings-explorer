"use client";

import { ReactElement, ReactNode, useMemo, useState } from "react";
import { torontoPostalCodesByKey } from "@/app/constants/general";
import { evaluateStringToBoolean } from "@/app/lib/evaluateStringToBoolean";
import { FetchDataResponse } from "@/app/types/global";
import { ward25NamesNumbers } from "@/app/constants/ward_25_names_numbers";
import { camelCaseToTitleCase } from "@/app/lib/camelCaseToTitleCase";

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
    <li className="p-4 rounded-sm border border-solid border-gray-200 bg-white">
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
          <i className="fa-solid fa-map mr-1" />
          Show on map
        </button>
      </div>

      <p className="py-1">
        Ward:&nbsp;
        {WARD != null && (
          <span className="font-semibold">
            {WARD ?? emptyLabel}&nbsp;-&nbsp;
            {camelCaseToTitleCase(ward25NamesNumbers[WARD])}
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
            &nbsp;·&nbsp;<span className="whitespace-nowrap">Year built</span>
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
            <i
              className={`ml-1 fa-solid fa-chevron-${isOpen ? "up" : "down"}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded building information */}
      {isOpen && (
        <div className="flex gap-4 sm:gap-10 max-sm:flex-col mt-4 border-t border-gray-200 pt-4">
          <div className="flex flex-col gap-1 w-1/3 max-sm:w-full">
            <h4 className="font-bold mb-1">Building Features</h4>
            <p className={formatLabelStyle(AIR_CONDITIONING_TYPE)}>
              <i className="fa-solid fa-snowflake mr-1" />
              A/C
            </p>
            <p className={formatLabelStyle(BALCONIES)}>
              <i className="fa-solid fa-door-open mr-1" />
              Balconies
            </p>
            <p className={formatLabelStyle(BARRIER_FREE_ACCESSIBILTY_ENTR)}>
              <i className="fa-solid fa-wheelchair mr-1" />
              Barrier-free accessible entrance
            </p>
            <p
              className={
                NO_OF_ELEVATORS > 0 ? "" : "line-through text-gray-400"
              }
            >
              <i className="fa-solid fa-elevator mr-1" />
              Elevators
            </p>
            <p className={formatLabelStyle(HEATING_TYPE)}>
              <i className="fa-solid fa-temperature-arrow-up mr-1" />
              Heating type:&nbsp;{formatStringLabel(HEATING_TYPE)}
            </p>
            <p className={formatLabelStyle(NON_SMOKING_BUILDING)}>
              <i className="fa-solid fa-smoking-ban mr-1" />
              Non-smoking building
            </p>
            <p className={formatLabelStyle(PETS_ALLOWED)}>
              <i className="fa-solid fa-paw mr-1" />
              Pets allowed
            </p>
          </div>
          <div className="flex flex-col gap-1 w-1/3 max-sm:w-full">
            <h4 className="font-bold mb-1">Amenities</h4>
            <p
              className={formatLabelStyle(DESCRIPTION_OF_INDOOR_EXERCISE_ROOM)}
            >
              <i className="fa-solid fa-dumbbell mr-1" />
              Gym
            </p>
            <p className={formatLabelStyle(LAUNDRY_ROOM)}>
              <i className="fa-solid fa-shirt mr-1" />
              Laundry room
            </p>
            <p
              className={formatLabelStyle(
                DESCRIPTION_OF_OUTDOOR_REC_FACILITIES
              )}
            >
              <i className="fa-solid fa-tree mr-1" />
              Outdoor amenities
            </p>
          </div>
          <div className="flex flex-col gap-1 w-1/3 max-sm:w-full">
            <h4 className="font-bold mb-1">Parking & Storage</h4>
            <p className={formatLabelStyle(BIKE_PARKING)}>
              <i className="fa-solid fa-bicycle mr-1" />
              Bike parking:&nbsp;
              {formatStringLabel(BIKE_PARKING)}
            </p>
            <p className={formatLabelStyle(LOCKER_OR_STORAGE_ROOM)}>
              <i className="fa-solid fa-key mr-1" />
              Locker/Storage
            </p>
            <p
              className={
                PARKING_TYPE?.length > 0 ? "" : "line-through text-gray-400"
              }
            >
              <i className="fa-solid fa-parking mr-1" />
              Parking type:&nbsp;
              {PARKING_TYPE?.length > 0 ? PARKING_TYPE.join(", ") : emptyLabel}
            </p>
            <p className={formatLabelStyle(VISITOR_PARKING)}>
              <i className="fa-solid fa-dollar" />
              Visitor parking:&nbsp;
              {formatStringLabel(VISITOR_PARKING)}
            </p>
          </div>
        </div>
      )}
    </li>
  );
}
