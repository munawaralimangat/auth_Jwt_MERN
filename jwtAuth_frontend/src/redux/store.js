import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import kanbanReducer from "./kanbanSlice";

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,kanbanReducer)

const store = configureStore({
    reducer:{
        kanban:persistedReducer
    }
})
const persistor = persistStore(store);

export {store,persistor};