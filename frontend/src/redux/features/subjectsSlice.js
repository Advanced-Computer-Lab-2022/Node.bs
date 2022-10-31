import { createSlice } from "@reduxjs/toolkit";

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    all: [
      "Computer Science",
      "Language",
      "Economics",
      "Accounting",
      "Mathematics",
      "Programming",
    ],
  },
  reducers: {
    addSubject: (state, action) => {
      state.all.push(action.payload.subject);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;
