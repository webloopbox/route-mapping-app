import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './searchSlice'
import routesReducer from './routesSlice'
import pdfReducer from './pdfSlice'

const store = configureStore({
    reducer: {
        search: searchReducer,
        routes: routesReducer,
        pdf: pdfReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

export default store