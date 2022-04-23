import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
    name: 'route',
    initialState: {
        totalDistance: '',
        rate: null,
        cost: null,
        time: null
    },
    reducers: {
        setTotalDistance: (state, { payload }) => {
            state.totalDistance = payload
        },
        setRate: (state, { payload }) => {
            state.rate = payload
        },
        setCost: (state, { payload }) => {
            state.cost = payload
        },
        setTime: (state, { payload }) => {
            state.time = payload
        }
    }
})

export const { setTotalDistance, setRate, setCost, setTime } = routeSlice.actions
export default routeSlice.reducer