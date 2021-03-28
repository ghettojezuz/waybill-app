import {gql} from "@apollo/client";

export const GET_DRIVERS = gql`
  query getDrivers {
     allDrivers {
        id
        fio
        is_active
     }
  }
`;

export const GET_FREE_DRIVERS = gql`
  query getFreeDrivers {
     allDrivers(filter: {is_active: false}) {
        id
        fio
     }
  }
`;

export const GET_DRIVER_BY_ID = gql`
  query getDriverById($id: ID!) {
     Driver(id: $id) {
        id
        fio
        is_active
     }
  }
`;

export const GET_CARS = gql`
  query getCars {
     allCars {
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

export const GET_FREE_CARS = gql`
  query getFreeCars {
      allCars(filter: {is_active: false}) {
        id
        brand
        number
        mileage
        fuel
        fuel_remaining
        fuel_consumption
      }
  }
`;

export const GET_CAR_BY_ID = gql`
  query getCarById($id: ID!) {
     Car(id: $id) {
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

export const GET_CLOSED_WAYBILLS = gql`
  query getWaybills {
     allWaybills(filter: {is_active: false}) {
        id
        date_start
        mileage_start
        mileage_end
        
        Driver {
          fio
        }
        
        Car {
          brand
          number
          fuel
        }
     }
  }
`;

export const GET_WAYBILL_BY_ID = gql`
  query getWaybillById($id: ID!) {
     Waybill(id: $id) {
        date_start
        date_end
        mileage_start
        mileage_end
        fuel_fill
        fuel_consumption_fact
        fuel_remaining_start
        is_active
        
        Driver {
          id
          fio
        }
        
        Car {
          id
          brand
          fuel
          fuel_consumption
        }
        
        User {
          id
        }
     }
  }
`;

export const GET_USER_WAYBILLS = gql`
  query getWaybills($user_id: ID!, $is_active: Boolean!) {
     allWaybills(filter: {is_active: $is_active, user_id: $user_id}) {
        id
        date_start
        mileage_start
        mileage_end
        
        Driver {
          fio
        }
        
        Car {
          brand
          number
          fuel
        }
     }
  }
`;

