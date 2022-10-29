import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currencySlice";
import userReducer from "../features/userSlice";
import searchResultReducer from "../features/searchResultSlice";

export default configureStore({
  reducer: {
    currency: currencyReducer,
    user: userReducer,
    result: searchResultReducer,
  },
});
