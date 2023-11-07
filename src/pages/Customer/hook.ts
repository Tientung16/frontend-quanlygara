import { PaginationStateWithQuery } from "../pagination";
import { RootState } from "../rootReducer";
import {createEntity, deleteEntity, getCustomerHistory, getCustomerTotalItems, getEntitiesCustomer, getEntity, getEntityByPhone, updateEntity} from "./customer.reducer";
import { useSelector, useDispatch } from 'react-redux';
const CustomerHooks = () => {
    const CustomerList = useSelector((state: RootState) => state.customerReducer.entities);
    const updateSuccess = useSelector((state: RootState) => state.customerReducer.updateSuccess);
    const totalItems = useSelector((state: RootState) => state.customerReducer.totalItems);
    const Entity = useSelector((state: RootState) => state.customerReducer.entity);

    const dispatch = useDispatch();

    const GetDataSearch = (paginationState: { current: number; pageSize: any; name:any}) => {
        const handlePaginationState = {
            page: paginationState.current - 1,
            size: paginationState.pageSize,
            name: paginationState.name,
        }
        const queryState = PaginationStateWithQuery(handlePaginationState);
        dispatch(getEntitiesCustomer({
            query: queryState,
        })as any)
    }

    const CreateCustomer = (entity: any) => {
        dispatch(createEntity(entity) as any)
    }
    const UpdateCustomer = (id:any) => {
        dispatch(updateEntity(id)as any)
    }
    // const GetCustomer = (id:any) => {
    //     dispatch(getEntity(id)as any)
    // }
    const GetCustomer = async (id:any) => {
        return await getEntity(id);
    };

    const GetEntityByPhone = async (phone:any) => {
        return await getEntityByPhone(phone);
    };

    const GetCustomerHistory = async (id:any) => {
        return await getCustomerHistory(id);
    };

    const GetCustomerTotalItems = async () => {
        return await getCustomerTotalItems();
    };

    const DeleteCustomer = (id:any) => {
        dispatch(deleteEntity(id)as any);
    };
    return{
        CreateCustomer,
        GetDataSearch,
        GetCustomer,
        UpdateCustomer,
        DeleteCustomer,
        GetEntityByPhone,
        GetCustomerHistory,
        GetCustomerTotalItems,
        CustomerList,
        updateSuccess,
        totalItems,
        Entity
    }
}
export default CustomerHooks;