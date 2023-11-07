import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { PaginationStateWithQuery } from "../pagination";
import { createEntity, deleteEntity, getDataSelectSupplier, getEntitiesSupplier, getEntity, getSupplierTotalItems, updateEntity, } from "./supplier.redicers";

const SupplierHooks = () => {
    const SupplierList = useSelector((state: RootState) => state.supplierRedicers.entities);
    const updateSuccess = useSelector((state: RootState) => state.supplierRedicers.updateSuccess);
    const totalItems = useSelector((state: RootState) => state.supplierRedicers.totalItems);
    const Entity = useSelector((state: RootState) => state.supplierRedicers.entity);
    const ListComboboxSupplier = useSelector((state: RootState) => state.supplierRedicers.listComboboxSupplier);

    const dispatch = useDispatch();

    const GetDataSearch = (paginationState: { current: number; pageSize: any; name:any}) => {
        const handlePaginationState = {
            page: paginationState.current - 1,
            size: paginationState.pageSize,
            name: paginationState.name,
        }
        const queryState = PaginationStateWithQuery(handlePaginationState);
        dispatch(getEntitiesSupplier({
            query: queryState,
        })as any)
    }

    const CreateCustomer = (entity: any) => {
        dispatch(createEntity(entity) as any)
    }
    const UpdateCustomer = (id:any) => {
        dispatch(updateEntity(id)as any)
    }
    const GetDataSelectSupplier = () => { // xác nhận file
        dispatch(getDataSelectSupplier()as any);
    }
    // const GetCustomer = (id:any) => {
    //     dispatch(getEntity(id)as any)
    // }
    const GetCustomer = async (id:any) => {
        return await getEntity(id);
    };

    const GetSupplierTotalItems = async () => {
        return await getSupplierTotalItems();
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
        GetDataSelectSupplier,
        GetSupplierTotalItems,
        SupplierList,
        updateSuccess,
        totalItems,
        Entity,
        ListComboboxSupplier
    }
}
export default SupplierHooks;
