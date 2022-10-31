import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    type: "admin",
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.type = action.payload.type;
      state.user = action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
