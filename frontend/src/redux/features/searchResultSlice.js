import { createSlice } from "@reduxjs/toolkit";

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    result: [],
  },
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload.result;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResult } = searchResultSlice.actions;

export default searchResultSlice.reducer;
