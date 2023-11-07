// import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { loadingBarMiddleware } from 'react-redux-loading-bar';

// import sharedReducers from './rootReducer';

// const store = configureStore({
//   reducer: sharedReducers,
// });

// const getStore = () => store;
// export type IRootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;
// export default getStore;
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;