import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from '../cleanEntity';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '../reducer.until';
import { MappingDTO } from '../Mapping';

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: null,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  loadList: true,
  deleteExist: false,
  listComboboxSupplier: [],

};
const apiUrl = process.env.REACT_APP_API_URL;
const apiGetAll = `${apiUrl}/api/supplier-getAll`;
const apiCreate = `${apiUrl}/api/supplier`;
const apiGetDetail = `${apiUrl}/api/supplier`;
const apiUpdate = `${apiUrl}/api/supplier`;
const apiDelete = `${apiUrl}/api/supplier`;
const apiCombobox = `${apiUrl}/api/List-supplier`;
const apiSupplierTotalPage = `${apiUrl}/api/supplier-page-number`;


// Actions

// export const getEntitiesCustomer = createAsyncThunk('Customer/get-all', async ({ query }: any) => {
//     const requestUrl = `${apiGetAllCustomer}?${query}&cacheBuster=${new Date().getTime()}`;
//     return axios.post<any>(requestUrl);
//   });
export const getEntitiesSupplier = createAsyncThunk('Supplier/fetch_entity_list_search', async ({ query }: any) => {
  const requestUrl = `${apiGetAll}?${query}&cacheBuster=${new Date().getTime()}`;
  return axios.post<any>(requestUrl);
});

export const getDataSelectSupplier = createAsyncThunk(
  'CommonSlice/fetch_categoryType_ConfigGuide',
  async () => {
    const requestUrl = `${apiCombobox}`;
    return axios.post<any>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getEntity = 
    async (id: string | number) => {
      const requestUrl = `${apiGetDetail}/${id}`;
      return axios.get<any>(requestUrl);
    };

export const getSupplierTotalItems = 
async () => {
  const requestUrl = `${apiSupplierTotalPage}`;
  return axios.get<any>(requestUrl);
};
export const createEntity = createAsyncThunk(
  'Supplier/create_entity',
  async (entity: any, thunkAPI) => {
      const result = await axios.post<any>(apiCreate, cleanEntity(entity));// cleanEntity(entity)
      // thunkAPI.dispatch(getEntities({}));
      return result;
  },
  { serializeError: serializeAxiosError }
);
export const updateEntity = createAsyncThunk(
  'Supplier/update_entity',
  async (entity: any, thunkAPI) => {
    const result = await axios.put<any>(`${apiUpdate}/${entity.id}`, cleanEntity(entity));
    // thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);
export const deleteEntity = createAsyncThunk(
  'Supplier/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiDelete}/${id}`;
    const result = await axios.delete<any>(requestUrl);
    // thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);
// slice

export const SupplierSlice = createEntitySlice({
    name: 'Supplier',
    initialState,
  //   reducers: {
      
  //   },
    extraReducers(builder) {
      builder
        // .addCase(getEntity.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.entity = action.payload.data;
        // })
        .addCase(getDataSelectSupplier.fulfilled, (state, action) => {
          const { data } = action.payload;
          state.loading = false;
          const dataMapping = MappingDTO(data, 'id', 'name');
          state.listComboboxSupplier = dataMapping;
        })
        .addMatcher(isFulfilled(getEntitiesSupplier), (state, action) => {
          const { data, headers } = action.payload;    
          return {  
              ...state,
              loading: false,
              entities: data,
              totalItems: parseInt(headers['x-total-count'], 10),
          };
        })
        .addMatcher(isFulfilled(createEntity,updateEntity,deleteEntity), (state, action) => {
          state.updating = false;
          state.loading = false;
          state.updateSuccess = true;
          state.entity = action.payload.data;
          console.log('state.entity.status',state.entity.status
          );
          if(state.entity.status === 'okCreate'){
            // Tạo một element div để chứa thông báo
            var notificationDiv = document.createElement('div');
            notificationDiv.textContent = 'Thêm mới thành công!';
  
            // Tạo một style cho element div thông báo
            notificationDiv.style.position = 'fixed';
            notificationDiv.style.top = '20px';
            notificationDiv.style.right = '20px';
            notificationDiv.style.background = 'white';
            notificationDiv.style.color = 'green';
            notificationDiv.style.padding = '10px';
            notificationDiv.style.borderRadius = '5px';
            notificationDiv.style.zIndex = '9999';
            notificationDiv.style.border = '1px solid green';
            notificationDiv.style.width = '200px';
            notificationDiv.style.maxWidth = '300px';
  
            // Thêm element div thông báo vào body
            document.body.appendChild(notificationDiv);
  
            // Đóng thông báo sau 2 giây
            setTimeout(function() {
                notificationDiv.style.display = 'none';
            }, 2000);
          }
          if(state.entity.status === 'okUpdate'){
            // Tạo một element div để chứa thông báo
            var notificationDiv = document.createElement('div');
            notificationDiv.textContent = 'Sửa thành công!';
  
            // Tạo một style cho element div thông báo
            notificationDiv.style.position = 'fixed';
            notificationDiv.style.top = '20px';
            notificationDiv.style.right = '20px';
            notificationDiv.style.background = 'white';
            notificationDiv.style.color = 'green';
            notificationDiv.style.padding = '10px';
            notificationDiv.style.borderRadius = '5px';
            notificationDiv.style.zIndex = '9999';
            notificationDiv.style.border = '1px solid green';
            notificationDiv.style.width = '200px';
            notificationDiv.style.maxWidth = '300px';
  
            // Thêm element div thông báo vào body
            document.body.appendChild(notificationDiv);
  
            // Đóng thông báo sau 2 giây
            setTimeout(function() {
                notificationDiv.style.display = 'none';
            }, 2000);
          }
          if(state.entity.status === 'okDelete'){
            // Tạo một element div để chứa thông báo
            var notificationDiv = document.createElement('div');
            notificationDiv.textContent = 'Xóa thành công!';
  
            // Tạo một style cho element div thông báo
            notificationDiv.style.position = 'fixed';
            notificationDiv.style.top = '20px';
            notificationDiv.style.right = '20px';
            notificationDiv.style.background = 'white';
            notificationDiv.style.color = 'green';
            notificationDiv.style.padding = '10px';
            notificationDiv.style.borderRadius = '5px';
            notificationDiv.style.zIndex = '9999';
            notificationDiv.style.border = '1px solid green';
            notificationDiv.style.width = '200px';
            notificationDiv.style.maxWidth = '300px';
  
            // Thêm element div thông báo vào body
            document.body.appendChild(notificationDiv);
  
            // Đóng thông báo sau 2 giây
            setTimeout(function() {
                notificationDiv.style.display = 'none';
            }, 2000);
          }
          
        })
        .addMatcher(isPending(createEntity,updateEntity,deleteEntity), state => {
            state.errorMessage = null;
            state.updateSuccess = false;
            state.updating = true;
        })
        .addMatcher(isPending( getEntitiesSupplier), state => {
          state.errorMessage = null;
          state.updateSuccess = false;
          state.loading = true;
        });
    },
  });
  
  export const { reset } = SupplierSlice.actions;
  
  // Reducer
  export default SupplierSlice.reducer;