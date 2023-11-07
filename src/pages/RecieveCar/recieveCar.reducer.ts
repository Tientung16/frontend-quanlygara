import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from '../cleanEntity';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '../reducer.until';

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  repairList: [],
  entity: null,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  loadList: true,
  deleteExist: false,
};
const apiUrl = process.env.REACT_APP_API_URL;
const apiGetAllReceiveCar = `${apiUrl}/api/receive-car-getAll`;
const apiGetAllRepairCar = `${apiUrl}/api/receive-car-active-getAll`;
const apiCreateReceiveCar = `${apiUrl}/api/receive-car`;
const apiGetDetail = `${apiUrl}/api/receive-car`;
const apiUpdateReceiveCar = `${apiUrl}/api/receive-car`;
const apiDeleteReceiveCar = `${apiUrl}/api/receive-car`;
const apiActiveReceiveCar = `${apiUrl}/api/receive-car-active`;
const apiActiveReceiveCarTotalPage = `${apiUrl}/api/receive-page-number`;


// Actions

// export const getEntitiesCustomer = createAsyncThunk('Customer/get-all', async ({ query }: any) => {
//     const requestUrl = `${apiGetAllCustomer}?${query}&cacheBuster=${new Date().getTime()}`;
//     return axios.post<any>(requestUrl);
//   });
export const getEntitiesReceiveCar = createAsyncThunk('Customer/fetch_entity_list_search', async ({ query }: any) => {
  const requestUrl = `${apiGetAllReceiveCar}?${query}&cacheBuster=${new Date().getTime()}`;
  return axios.post<any>(requestUrl);
});

export const getEntitiesRepairCar = createAsyncThunk('Customer/fetch_entity_list_search', async ({ query }: any) => {
  const requestUrl = `${apiGetAllRepairCar}?${query}&cacheBuster=${new Date().getTime()}`;
  return axios.post<any>(requestUrl);
});

export const getEntity = 
    async (id: string | number) => {
      const requestUrl = `${apiGetDetail}/${id}`;
      return axios.get<any>(requestUrl);
    };

    export const getEntityTotalPage = 
    async () => {
      const requestUrl = `${apiActiveReceiveCarTotalPage}`;
      return axios.get<any>(requestUrl);
    };
export const createEntity = createAsyncThunk(
  'Customer/create_entity',
  async (entity: any, thunkAPI) => {
      const result = await axios.post<any>(apiCreateReceiveCar, cleanEntity(entity));// cleanEntity(entity)
      // thunkAPI.dispatch(getEntities({}));
      return result;
  },
  { serializeError: serializeAxiosError }
);
export const updateEntity = createAsyncThunk(
  'Customer/update_entity',
  async (entity: any, thunkAPI) => {
    const result = await axios.put<any>(`${apiUpdateReceiveCar}/${entity.id}`, cleanEntity(entity));
    // thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);
export const deleteEntity = createAsyncThunk(
  'Customer/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiDeleteReceiveCar}/${id}`;
    const result = await axios.delete<any>(requestUrl);
    // thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const setActiveToRepair = createAsyncThunk(
  'Customer/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiActiveReceiveCar}/${id}`;
    const result = await axios.put<any>(requestUrl);
    // thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);
// slice

export const ReceiveCarSlice = createEntitySlice({
  name: 'Customer',
  initialState,
//   reducers: {
    
//   },
  extraReducers(builder) {
    builder
      // .addCase(getEntity.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.entity = action.payload.data;
      // })
      .addMatcher(isFulfilled(getEntitiesReceiveCar), (state, action) => {
        const { data, headers } = action.payload;    
        return {  
            ...state,
            loading: false,
            entities: data,
            totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(getEntitiesRepairCar), (state, action) => {
        const { data, headers } = action.payload;    
        return {  
            ...state,
            loading: false,
            repairList: data,
            // totalItems: parseInt(headers['x-total-count'], 10),
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
        if(state.entity.status === 'okSend'){
          // Tạo một element div để chứa thông báo
          var notificationDiv = document.createElement('div');
          notificationDiv.textContent = 'gửi thành công!';

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
      .addMatcher(isPending( getEntitiesReceiveCar), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending( getEntitiesRepairCar), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = ReceiveCarSlice.actions;

// Reducer
export default ReceiveCarSlice.reducer;
