import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currencySlice";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: { currency: currencyReducer,
              user: userReducer },
});
