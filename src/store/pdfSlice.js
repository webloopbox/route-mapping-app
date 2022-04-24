import { createSlice } from "@reduxjs/toolkit";

const pdfSlice = createSlice({
    name: 'pdf',
    initialState: {
        pdf: null,
        pdfEnable: false
    },
    reducers: {
        setPDF: (state, { payload }) => {
            state.pdf = payload
        },
        setEnablePDF: (state, { payload }) => {
            state.pdfEnable = payload
        }
    }
})

export const { setPDF, setEnablePDF } = pdfSlice.actions
export default pdfSlice.reducer