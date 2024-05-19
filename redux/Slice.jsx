import { createSlice } from "@reduxjs/toolkit";


const initialState = {
     onSearch: false,
     query: "",
     data: []
};

export const bookSlice = createSlice({
     name: "books",
     initialState,
     reducers: {
          toggleOnSearch: (state, action) => {
               state.onSearch = true;
          },
          addData: (state, action) => {
               state.data = action.payload
          }
     }
})

export const { toggleOnSearch, addData } = bookSlice.actions
export default bookSlice.reducer