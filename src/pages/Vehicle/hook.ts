import { PaginationStateWithQuery } from "../pagination";
import { RootState } from "../rootReducer";
import { useSelector, useDispatch } from 'react-redux';
import { createEntity, deleteEntity, getEntitiesVehicle, getEntity, updateEntity } from "./Vehicle.reducers";

const VehicleHooks = () => {
    const vehicleList = useSelector((state: RootState) => state.vehicleReducers.entities);
    const updateSuccess = useSelector((state: RootState) => state.vehicleReducers.updateSuccess);
    const totalItems = useSelector((state: RootState) => state.vehicleReducers.totalItems);
    const Entity = useSelector((state: RootState) => state.vehicleReducers.entity);

    const dispatch = useDispatch();

    const GetDataSearch = (paginationState: { current: number; pageSize: any; licensePlates:any}) => {
        const handlePaginationState = {
            page: paginationState.current - 1,
            size: paginationState.pageSize,
            licensePlates: paginationState.licensePlates,
        }
        const queryState = PaginationStateWithQuery(handlePaginationState);
        dispatch(getEntitiesVehicle({
            query: queryState,
        })as any)
    }

    const CreateVehicle = (entity: any) => {
        dispatch(createEntity(entity) as any)
    }
    const UpdateVehicle = (id:any) => {
        dispatch(updateEntity(id)as any)
    }
    // const GetCustomer = (id:any) => {
    //     dispatch(getEntity(id)as any)
    // }
    const GetVehicle = async (id:any) => {
        return await getEntity(id);
    };

    const DeleteVehicle = (id:any) => {
        dispatch(deleteEntity(id)as any);
    };
    return{
        CreateVehicle,
        GetDataSearch,
        GetVehicle,
        UpdateVehicle,
        DeleteVehicle,
        vehicleList,
        updateSuccess,
        totalItems,
        Entity
    }
}
export default VehicleHooks;