import { combineReducers } from '@reduxjs/toolkit';
import customerReducer from './Customer/customer.reducer';
import supplierRedicers from './Supplier/supplier.redicers';
import automakerReducers from './Automaker/automaker.reducers';
import vehicleReducers from './Vehicle/Vehicle.reducers';
import accessoryReducer from './Accessory/accessory.reducer';
import recieveCarReducer from './RecieveCar/recieveCar.reducer';
import repairCarReducers from './repairCar/repairCar.reducers';
const rootReducer = combineReducers({
  customerReducer,
  supplierRedicers,
  automakerReducers,
  vehicleReducers,
  accessoryReducer,
  recieveCarReducer,
  repairCarReducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;