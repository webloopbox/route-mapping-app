import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './searchSlice'
import routeSlice from './routeSlice'

const store = configureStore({
    reducer: {
        search: searchReducer,
        route: routeSlice,
    }
})

export default store