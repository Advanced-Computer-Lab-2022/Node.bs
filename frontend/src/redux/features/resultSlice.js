import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
  name: "results",
  initialState: {
    results: [],
  },
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload.result;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResult } = searchResultSlice.actions;

export default resultSlice.reducer;
