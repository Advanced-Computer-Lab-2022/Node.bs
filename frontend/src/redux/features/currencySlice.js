import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    selectedCurrencySymbol: "$",
    selectedCurrencyCode: "USD",
    selectedCountry: "USA",
  },
  reducers: {
    setCurrencyAndCountry: (state, action) => {
      state.selectedCurrencySymbol = action.payload.currencySymbol;
      state.selectedCurrencyCode = action.payload.currencyCode;
      state.selectedCountry = action.payload.selectedCountry;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
