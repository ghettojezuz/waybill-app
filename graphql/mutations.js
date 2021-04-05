import {gql} from "@apollo/client";

export const CREATE_DRIVER = gql`
  mutation createDriver($id: ID!, $fio: String!, $is_active: Boolean!) {
     createDriver(id: $id, fio: $fio, is_active: $is_active) {
        id
        fio
        is_active
     }
  }
`;

export const UPDATE_DRIVER = gql`
  mutation updateDriver($id: ID!, $fio: String!, $is_active: Boolean!) {
     updateDriver(id: $id, fio: $fio, is_active: $is_active) {
        id
        fio
        is_active
     }
  }
`;

export const CREATE_CAR = gql`
  mutation createCar($id: ID!, $brand: String!, $number: String!, $mileage: Int!, $fuel: String!, $fuel_remaining: Float!, $fuel_consumption: Float!, $is_active: Boolean!) {
     createCar(id: $id, brand: $brand, number: $number, mileage: $mileage, fuel: $fuel, fuel_remaining: $fuel_remaining, fuel_consumption: $fuel_consumption, is_active: $is_active) {
        id
        brand
        number
        mileage
        fuel
        fuel_remaining
        fuel_consumption
        is_active
     }
  }
`;

export const UPDATE_CAR = gql`
  mutation updateCar($id: ID!, $brand: String!, $number: String!, $mileage: Int!, $fuel: String!, $fuel_remaining: Float!, $fuel_consumption: Float!, $is_active: Boolean!) {
     updateCar(id: $id, brand: $brand, number: $number, mileage: $mileage, fuel: $fuel, fuel_remaining: $fuel_remaining, fuel_consumption: $fuel_consumption, is_active: $is_active) {
        id
        brand
        number
        mileage
        fuel
        fuel_remaining
        fuel_consumption
        is_active
     }
  }
`;

export const OPEN_WAYBILL = gql`
  mutation OpenWaybill($id: ID!, $user_id: ID!, $driver_id: ID!, $car_id: ID!, $date_start: String!, $date_end: String!, $mileage_start: Int!, $mileage_end: Int!, $fuel_fill: Float!, $fuel_consumption_fact: Float!, $fuel_remaining_start: Float!, $is_active: Boolean!) {
     createWaybill(id: $id, user_id: $user_id, driver_id: $driver_id, car_id: $car_id, date_start: $date_start, date_end: $date_end, mileage_start: $mileage_start, mileage_end: $mileage_end, fuel_fill: $fuel_fill, fuel_consumption_fact: $fuel_consumption_fact, fuel_remaining_start: $fuel_remaining_start, is_active: $is_active) {
        id
        user_id
        driver_id
        car_id
        date_start
        date_end
        mileage_start
        mileage_end
        fuel_fill
        fuel_consumption_fact
        fuel_remaining_start
        is_active
     }
  }
`;

export const UPDATE_FULL_WAYBILL = gql`
  mutation updateFullWaybill($id: ID!, $user_id: ID!, $driver_id: ID!, $car_id: ID!, $date_start: String!, $date_end: String!, $mileage_start: Int!, $mileage_end: Int!, $fuel_fill: Float!, $fuel_consumption_fact: Float!, $fuel_remaining_start: Float!, $is_active: Boolean!) {
     updateWaybill(id: $id, user_id: $user_id, driver_id: $driver_id, car_id: $car_id, date_start: $date_start, date_end: $date_end, mileage_start: $mileage_start, mileage_end: $mileage_end, fuel_fill: $fuel_fill, fuel_consumption_fact: $fuel_consumption_fact, fuel_remaining_start: $fuel_remaining_start, is_active: $is_active) {
        id
        user_id
        driver_id
        car_id
        date_start
        date_end
        mileage_start
        mileage_end
        fuel_fill
        fuel_consumption_fact
        fuel_remaining_start
        is_active
     }
  }
`;