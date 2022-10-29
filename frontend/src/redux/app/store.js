import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currencySlice";
import userReducer from "../features/userSlice";
import resultReducer from "../features/resultSlice";

export default configureStore({
  reducer: {
    currency: currencyReducer,
    user: userReducer,
    result: resultReducer,
  },
});
