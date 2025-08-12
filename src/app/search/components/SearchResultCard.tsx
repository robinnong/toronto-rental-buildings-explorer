"use client";

import { ReactElement, ReactNode, useMemo } from "react";
import Accordion from "@/app/components/utils/Accordion";
import { torontoPostalCodesByKey } from "@/app/constants/general";
import { evaluateStringToBoolean } from "@/app/lib/evaluateStringToBoolean";
import { FetchDataResponse } from "@/app/types/global";

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
  } = building;

  const buildingAge = new Date().getFullYear() - parseInt(YEAR_BUILT, 10);
  const emptyLabel = <span className="italic text-gray-400">N/A</span>;

  /**
   * Formats the label as greyed out with a strikethrough if the value is falsey
   */
  const formatLabelStyle = (value: string): string =>
    evaluateStringToBoolean(value) ? "" : "line-through text-gray-500";

  /**
   * Displays 'N/A' if the value is falsey
   */
  const formatStringLabel = (value: string): ReactNode =>
    evaluateStringToBoolean(value) ? value : emptyLabel;

  // Takes the address postal code and returns the corresponding city within the Toronto metropolitan area.
  // Example: north_york => North York
  // Displays 'Unknown area code' if the postal code is not a valid Toronto area code.
  const city = useMemo((): ReactNode => {
    const matchingCode = Object.entries(torontoPostalCodesByKey).find(
      ([_, postalCodes]) => postalCodes.includes(PCODE)
    );

    return matchingCode ? (
      matchingCode[0]
        .replace("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    ) : (
      <span className="italic text-gray-400">Unknown area code</span>
    );
  }, [PCODE]);

  return (
    <li className="p-4 rounded-sm border border-solid border-gray-200 bg-white">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold">{SITE_ADDRESS.trim()}</h3>
          <p className="text-ms font-semibold text-gray-600">{city}</p>
        </div>
        <button
          type="button"
          className="text-cyan-700"
          onClick={() => onShowMapModal()}
        >
          <i className="fa-solid fa-map mr-1" />
          View in map
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 mb-1">
          <p>
            Property management:&nbsp;
            <span className="font-semibold">
              {PROP_MANAGEMENT_COMPANY_NAME ?? emptyLabel}
            </span>
          </p>
          <p>
            No. stories:&nbsp;
            {CONFIRMED_STOREYS ? (
              <span className="font-semibold">{CONFIRMED_STOREYS}</span>
            ) : (
              emptyLabel
            )}
            · No. units:&nbsp;
            {CONFIRMED_UNITS ? (
              <span className="font-semibold">{CONFIRMED_UNITS}</span>
            ) : (
              emptyLabel
            )}
            · Year built:&nbsp;
            {YEAR_BUILT ? (
              <>
                <span className="font-semibold">{YEAR_BUILT}</span>&nbsp;(
                <span className="font-semibold">{buildingAge} years old</span>)
              </>
            ) : (
              emptyLabel
            )}
          </p>
        </div>

        <Accordion header="See more">
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 w-1/3">
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
              <p className={formatLabelStyle(NO_OF_ELEVATORS)}>
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
            <div className="flex flex-col gap-1 w-1/3">
              <h4 className="font-bold mb-1">Amenities</h4>
              <p
                className={formatLabelStyle(
                  DESCRIPTION_OF_INDOOR_EXERCISE_ROOM
                )}
              >
                <i className="fa-solid fa-dumbbell mr-1" />
                Gym
              </p>
              <p>
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
            <div className="flex flex-col gap-1 w-1/3">
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
              <p className={formatLabelStyle(PARKING_TYPE)}>
                <i className="fa-solid fa-parking mr-1" />
                Parking type:&nbsp;
                {formatStringLabel(PARKING_TYPE)}
              </p>
              <p className={formatLabelStyle(VISITOR_PARKING)}>
                <i className="fa-solid fa-dollar" />
                Visitor parking:&nbsp;
                {formatStringLabel(VISITOR_PARKING)}
              </p>
            </div>
          </div>
        </Accordion>
      </div>
    </li>
  );
}
