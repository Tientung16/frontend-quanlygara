import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { PaginationStateWithQuery } from "../pagination";
import { createEntity, deleteEntity, getEntitiesReceiveCar, getEntity, updateEntity,setActiveToRepair, getEntitiesRepairCar, getEntityTotalPage } from "./recieveCar.reducer";

const ReceiveHooks = () => {
    const ReceiveCarList = useSelector((state: RootState) => state.recieveCarReducer.entities);
    const updateSuccess = useSelector((state: RootState) => state.recieveCarReducer.updateSuccess);
    const totalItems = useSelector((state: RootState) => state.recieveCarReducer.totalItems);
    const Entity = useSelector((state: RootState) => state.recieveCarReducer.entity);
    // const ListComboboxSupplier = useSelector((state: RootState) => state.recieveCarReducer.listComboboxSupplier);

    const dispatch = useDispatch();

    const GetDataSearch = (paginationState: { current: number; pageSize: any; name:any}) => {
        const handlePaginationState = {
            page: paginationState.current - 1,
            size: paginationState.pageSize,
            name: paginationState.name,
        }
        const queryState = PaginationStateWithQuery(handlePaginationState);
        dispatch(getEntitiesReceiveCar({
            query: queryState,
        })as any)
    }

    const GetDataRepair = (paginationState: { current: number; pageSize: any; name:any}) => {
        const handlePaginationState = {
            page: paginationState.current - 1,
            size: paginationState.pageSize,
            name: paginationState.name,
        }
        const queryState = PaginationStateWithQuery(handlePaginationState);
        dispatch(getEntitiesRepairCar({
            query: queryState,
        })as any)
    }

    const CreateReceiveCar = (entity: any) => {
        dispatch(createEntity(entity) as any)
    }
    const UpdateReceiveCar = (id:any) => {
        dispatch(updateEntity(id)as any)
    }
    // const GetDataSelectSupplier = () => { // xác nhận file
    //     dispatch(getDataSelectSupplier()as any);
    // }
    // const GetCustomer = (id:any) => {
    //     dispatch(getEntity(id)as any)
    // }
    const GetReceiveCar = async (id:any) => {
        return await getEntity(id);
    };

    const GetEntityTotalPage = async () => {
        return await getEntityTotalPage();
    };

    const DeleteReceiveCar = (id:any) => {
        dispatch(deleteEntity(id)as any);
    };

    const SetActiveToRepair = (id:any) => {
        dispatch(setActiveToRepair(id)as any);
    };

    return{
        CreateReceiveCar,
        GetDataSearch,
        GetReceiveCar,
        UpdateReceiveCar,
        DeleteReceiveCar,
        GetEntityTotalPage,
        ReceiveCarList,
        updateSuccess,
        totalItems,
        Entity,
        SetActiveToRepair,
        GetDataRepair
        // ListComboboxSupplier
    }
}
export default ReceiveHooks;