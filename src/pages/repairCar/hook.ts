import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { PaginationStateWithQuery } from "../pagination";
import { createEntity, deleteEntity, getEntitiesRepairCarDetail, getEntity, updateEntity,setActiveToBuild, getEntityTotal, getAllDetailRepairCar, getAllRepairCar, checkLogin } from "./repairCar.reducers";
const RepairHooks = () => {
    const RepairCarList = useSelector((state: RootState) => state.repairCarReducers.entities);
    const updateSuccess = useSelector((state: RootState) => state.repairCarReducers.updateSuccess);
    const totalItems = useSelector((state: RootState) => state.repairCarReducers.totalItems);
    const Entity = useSelector((state: RootState) => state.repairCarReducers.entity);

    const dispatch = useDispatch();

    // const GetDataSearch = (paginationState: { current: number; pageSize: any; name:any}) => {
    //     const handlePaginationState = {
    //         page: paginationState.current - 1,
    //         size: paginationState.pageSize,
    //         name: paginationState.name,
    //     }
    //     const queryState = PaginationStateWithQuery(handlePaginationState);
    //     dispatch(getEntitiesRepairCar({
    //         query: queryState,
    //     })as any)
    // }
    const data = async (id:any) => {
        return await getEntitiesRepairCarDetail(id);
      }

    const CreateRepairCar = (entity: any) => {
        dispatch(createEntity(entity) as any)
    }
    const UpdateRepairCar = (id:any) => {
        dispatch(updateEntity(id)as any)
    }
    // const GetDataSelectSupplier = () => { // xác nhận file
    //     dispatch(getDataSelectSupplier()as any);
    // }
    // const GetCustomer = (id:any) => {
    //     dispatch(getEntity(id)as any)
    // }
    const GetRepairCar = async (id:any) => {
        return await getEntity(id);
    };
    
    const GetEntityTotal = async () => {
        return await getEntityTotal();
    };

    const GetAllDetailRepairCar = async () => {
        return await getAllDetailRepairCar();
    };

    const GetAllRepairCar = async () => {
        return await getAllRepairCar();
    };
    const CheckLogin = async (entity: any) => {
        return await checkLogin(entity);
    };
    

    const DeleteRepairCar = (id:any) => {
        dispatch(deleteEntity(id)as any);
    };
    const SetActiveToBuild = (id:any) => {
        dispatch(setActiveToBuild(id)as any);
    };

    return{
        CreateRepairCar,
        data,
        GetRepairCar,
        UpdateRepairCar,
        DeleteRepairCar,
        GetEntityTotal,
        GetAllDetailRepairCar,
        GetAllRepairCar,
        CheckLogin,
        RepairCarList,
        updateSuccess,
        totalItems,
        Entity,
        SetActiveToBuild,
        // ListComboboxSupplier
    }
}
export default RepairHooks;