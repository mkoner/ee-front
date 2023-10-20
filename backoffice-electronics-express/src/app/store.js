import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import {combineReducers} from "redux"; 
import storage from 'redux-persist/lib/storage'
import adminReducer from "../features/admin/adminSlice";
import categoryReducer from "../features/category/categorySlice";
import customerReducer from "../features/customer/customerSlice";
import fileReducer from "../features/file/fileSlice";
import lineItemReducer from "../features/lineItem/lineItemSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  admins: adminReducer,
  categories: categoryReducer,
  customers: customerReducer,
  files: fileReducer,
  lineItems: lineItemReducer,
  orders: orderReducer,
  products: productReducer,
 });

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)