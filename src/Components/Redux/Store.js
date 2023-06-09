import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer";

const Store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export default Store;