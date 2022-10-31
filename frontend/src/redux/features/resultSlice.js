import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as CourseService from './../../services/CourseService';

export const getAllCourses = createAsyncThunk('courses/getall', async () => {
  const res = await CourseService.getAll();
  return res.data;
});

export const filterCoursesAsync = createAsyncThunk(
  'courses/filter',
  async (query) => {
    const res = await CourseService.filter(query);
    return res.data;
  }
);

export const searchCourses = createAsyncThunk(
  'courses/search',
  async (body) => {
    console.log(body);
    const res = await CourseService.search(body);
    return res.data;
  }
);

export const createCourse = createAsyncThunk(
  'courses/create',
  async (course) => {
    const res = await CourseService.create(course);
    return res.data;
  }
);

export const resultSlice = createSlice({
  name: 'courses',
  initialState: {
    results: [],
    all: [],
    lastActionDone: 'getAll',
  },
  reducers: {
    setAction: (state, action) => {
      state.lastActionDone = action.payload;
    },
    setFilteredCourses: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers: {
    [getAllCourses.fulfilled]: (state, action) => {
      state.all = [...action.payload];
    },
    [filterCoursesAsync.fulfilled]: (state, action) => {
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
export const { setAction, setFilteredCourses } = resultSlice.actions;

export default resultSlice.reducer;
