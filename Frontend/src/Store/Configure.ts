import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "../reducers/Slice/authSlice"
import airlineReducer from "../reducers/Slice/airlineSlice"
import adminReducer from "../reducers/Slice/adminSlice"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig={
  key:"root",
  storage,

}
const rootReducer=combineReducers({
  user:useReducer,
  airline:airlineReducer,
  admin:adminReducer
})
console.log(rootReducer)
const persistState=persistReducer(persistConfig,rootReducer)

export  const store=configureStore({
    reducer:persistState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
    
})
console.log("initalstate",store.getState())
export default store;
export const persistor=persistStore(store)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
export const useAppDispatch: () => AppDispatch = useDispatch;
  export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
  > = useSelector;
