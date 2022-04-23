import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPositions = createAsyncThunk('search/position', async (payload, { rejectWithValue }) => {

    try {
        const [resA, resB] = await Promise.all([
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${payload.pointA}&apiKey=${process.env.REACT_APP_LEAFLET_API_KEY}`),
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${payload.pointB}&apiKey=${process.env.REACT_APP_LEAFLET_API_KEY}`),
        ])
        if (resA.ok && resB.ok) {
            const [pointA, pointB] = await Promise.all([
                resA.json(),
                resB.json(),
            ])

            if (pointA.items.length == 0 || pointA.items.length == 0) {
                throw 'Podano nieistniejącą lokalizację!'
            } else {
                return { pointA, pointB } // return A, B points
            }
        }
    } catch (error) {
        return rejectWithValue(error)
    }
})

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        pointA: {},
        pointB: {},
        loading: 'false',
        locationError: ''
    },
    reducers: {
        setLocationError: (state, { payload }) => {
            state.error = payload
        }
    },
    extraReducers: {
        [fetchPositions.pending]: (state) => {
            state.loading = true
        },
        [fetchPositions.fulfilled]: (state, { payload }) => {
            console.log(payload.pointA.items[0])
            state.pointA = payload.pointA.items[0]
            state.pointB = payload.pointB.items[0]
            state.loading = false
            state.locationError = ''
        },
        [fetchPositions.rejected]: (state, { payload }) => {
            state.locationError = payload
            state.loading = false
        },
    }
})

export const { setLocationError } = searchSlice.actions
export default searchSlice.reducer