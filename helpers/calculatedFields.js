import {checkForNumber} from "./checkForNumber";

export function calculateWaybillFields(mileage_start, mileage_end, fuel_consumption, fuel_remaining_start, fuel_fill) {
    function getMileageSum(mileage_start, mileage_end) {
        return parseInt(mileage_end) - parseInt(mileage_start)
    }

    function getFuelConsumptionNorm(fuel_consumption, mileage_sum) {
        return parseFloat(fuel_consumption) / 100 * parseInt(mileage_sum);
    }

    function getFuelRemaingEnd(fuel_remaining_start, fuel_fill, fuel_consumption_norm) {
        return parseFloat(fuel_remaining_start) + parseFloat(fuel_fill) - parseFloat(fuel_consumption_norm);
    }

    const mileage_sum = getMileageSum(mileage_start, mileage_end);
    const fuel_consumption_norm = getFuelConsumptionNorm(fuel_consumption, mileage_sum);
    const fuel_remaining_end = getFuelRemaingEnd(fuel_remaining_start, fuel_fill, fuel_consumption_norm);

    return [checkForNumber(mileage_sum) ? mileage_sum : "", checkForNumber(fuel_consumption_norm) ? fuel_consumption_norm : "", checkForNumber(fuel_remaining_end) ? fuel_remaining_end : ""]
}