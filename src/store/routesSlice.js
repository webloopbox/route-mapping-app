import { createSlice } from "@reduxjs/toolkit";

const routesSlice = createSlice({
    name: 'routes',
    initialState: {
        recentRoutes: []
    },
    reducers: {
        setRecentRoutes: (state, { payload }) => {
            let checkRepeat = state.recentRoutes.find((el) => {
                return (el.pointA.id == payload.pointA.id) && (el.pointB.id === payload.pointB.id)
            })
            console.log("Repeat: ", checkRepeat);
            if (!checkRepeat) {
                state.recentRoutes.push(payload)
            }
        }
    }
})

export const { setRecentRoutes } = routesSlice.actions
export default routesSlice.reducer