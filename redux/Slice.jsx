import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onSearch: false,
    query: {},
    hasToggled: false,
    data: [] // Assuming data is an array, initialize it accordingly.
};

export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        toggleOnSearch: (state) => { // No need for action if not used
            state.onSearch = true;
        },
        setHasToggled: (state, action) => {
            state.hasToggled = action.payload;
        },
        handleQuery: (state, action) => {
            state.query = { ...state.query, ...action.payload };
        },
        addData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { toggleOnSearch, setHasToggled, handleQuery, addData } = bookSlice.actions;
export default bookSlice.reducer;
