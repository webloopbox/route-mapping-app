import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './searchSlice'
import routesReducer from './routesSlice'

const store = configureStore({
    reducer: {
        search: searchReducer,
        routes: routesReducer,
    }
})

export default store