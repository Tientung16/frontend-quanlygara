import { PaginationStateWithQuery } from "../pagination";
import { RootState } from "../rootReducer";
import { useSelector, useDispatch } from 'react-redux';
import { createEntity, deleteEntity, getDataSelectAutomaker, getEntitiesAutomaker, getEntity, getEntityTotal, updateEntity } from "./automaker.reducers";

const AutomakerHooks = () => {
    const AutomakerList = useSelector((state: RootState) => state.automakerReducers.entities);
    const updateSuccess = useSelector((state: RootState) => state.automakerReducers.updateSuccess);
    const totalItems = useSelector((state: RootState) => state.automakerReducers.totalItems);
    const Entity = useSelector((state: RootState) => state.automakerReducers.entity);
    const ListComboboxAutomaker = useSelector((state: RootState) => state.automakerReducers.listComboboxSupplier);


    const dispatch = useDispatch();

    const GetDataSearch = (paginationState: { current: number; pageSize: any; name:any}) => {
        const handlePaginationState = {
            page: paginationState.current - 1,
            size: paginationState.pageSize,
            name: paginationState.name,
        }
        const queryState = PaginationStateWithQuery(handlePaginationState);
        dispatch(getEntitiesAutomaker({
            query: queryState,
        })as any)
    }

    const CreateAutomaker = (entity: any) => {
        dispatch(createEntity(entity) as any)
    }
    const UpdateAutomaker = (id:any) => {
        dispatch(updateEntity(id)as any)
    }
    const GetDataSelectAutomaker = () => { // xác nhận file
        dispatch(getDataSelectAutomaker()as any);
    }
    // const GetCustomer = (id:any) => {
    //     dispatch(getEntity(id)as any)
    // }
    const GetAutomaker = async (id:any) => {
        return await getEntity(id);
    };

    const GetEntityTotal = async () => {
        return await getEntityTotal();
    };

    const DeleteAutomaker = (id:any) => {
        dispatch(deleteEntity(id)as any);
    };
    return{
        CreateAutomaker,
        GetDataSearch,
        UpdateAutomaker,
        GetAutomaker,
        DeleteAutomaker,
        getEntityTotal,
        GetDataSelectAutomaker,
        ListComboboxAutomaker,
        AutomakerList,
        updateSuccess,
        totalItems,
        Entity
    }
}
export default AutomakerHooks;