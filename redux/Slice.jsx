import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onSearch: false,
    query: {},
    hasToggled: false,
    selectedData: null,
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
            state.selectedData = action.payload;
        }
    }
});

export const { toggleOnSearch, setHasToggled, handleQuery, addData } = bookSlice.actions;
export default bookSlice.reducer;
