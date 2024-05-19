import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./Slice";
const store = configureStore({
     reducer:
     {
          books: bookSlice.reducer
     }
})

export default store