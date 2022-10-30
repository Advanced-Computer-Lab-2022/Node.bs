import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as CourseService from "./../../services/CourseService";

export const getAllCourses = createAsyncThunk("courses/getall", async () => {
  const res = await CourseService.getAll();
  return res.data;
});

export const filterCourses = createAsyncThunk(
  "courses/filter",
  async (query) => {
    const res = await CourseService.filter(query);
    return res.data;
  }
);

export const searchCourses = createAsyncThunk(
  "courses/search",
  async (query) => {
    const res = await CourseService.search(query);
    return res.data;
  }
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (course) => {
    const res = await CourseService.create(course);
    return res.data;
  }
);

export const resultSlice = createSlice({
  name: "results",
  initialState: {
    results: [],
    all: [],
  },
  reducers: {},
  extraReducers: {
    [getAllCourses.fulfilled]: (state, action) => {
      state.all = [...action.payload];
    },
    [filterCourses.fulfilled]: (state, action) => {
      state.results = [...action.payload];
    },
    [searchCourses.fulfilled]: (state, action) => {
      state.results = [...action.payload];
    },
    [createCourse.fulfilled]: (state, action) => {
      state.all.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
// export const {} = searchResultSlice.actions;

export default resultSlice.reducer;
