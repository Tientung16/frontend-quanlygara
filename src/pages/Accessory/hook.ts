import { PaginationStateWithQuery } from "../pagination";
import { RootState } from "../rootReducer";
import { useSelector, useDispatch } from 'react-redux';
import { createEntity, deleteEntity, getDataSelectAccessory, getEntitiesAccessory, getEntity, getEntityTotalPage, updateEntity } from "./accessory.reducer";
const AccessoryHooks = () => {
    const accessoryList = useSelector((state: RootState) => state.accessoryReducer.entities);
    const updateSuccess = useSelector((state: RootState) => state.accessoryReducer.updateSuccess);
    const totalItems = useSelector((state: RootState) => state.accessoryReducer.totalItems);
    const Entity = useSelector((state: RootState) => state.accessoryReducer.entity);
    const listComboboxAccessory = useSelector((state: RootState) => state.accessoryReducer.listComboboxAccessory);


    const dispatch = useDispatch();

    const GetDataSearch = (paginationState: { current: number; pageSize: any; name:any}) => {
        const handlePaginationState = {
            page: paginationState.current - 1,
            size: paginationState.pageSize,
            name: paginationState.name,
        }
        const queryState = PaginationStateWithQuery(handlePaginationState);
        dispatch(getEntitiesAccessory({
            query: queryState,
        })as any)
    }

    const CreateAccessory = (entity: any) => {
        dispatch(createEntity(entity) as any)
    }
    const UpdateAccessory = (id:any) => {
        dispatch(updateEntity(id)as any)
    }
    // const GetCustomer = (id:any) => {
    //     dispatch(getEntity(id)as any)
    // }
    const GetAccessory = async (id:any) => {
        return await getEntity(id);
    };

    const GetEntityTotalPage = async () => {
        return await getEntityTotalPage();
    };

    const DeleteAccessory = (id:any) => {
        dispatch(deleteEntity(id)as any);
    };

    const GetDataSelectAccessory = () => { // xác nhận file
        dispatch(getDataSelectAccessory()as any);
    }
    return{
        CreateAccessory,
        GetDataSearch,
        UpdateAccessory,
        GetAccessory,
        DeleteAccessory,
        GetDataSelectAccessory,
        GetEntityTotalPage,
        accessoryList,
        updateSuccess,
        totalItems,
        Entity,
        listComboboxAccessory
    }
}
export default AccessoryHooks;