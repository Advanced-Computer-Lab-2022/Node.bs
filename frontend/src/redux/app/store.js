import { configureStore } from '@reduxjs/toolkit';
import regionReducer from '../features/regionSlice';
import userReducer from '../features/userSlice';
import resultReducer from '../features/resultSlice';

export default configureStore({
  reducer: {
    region: regionReducer,
    user: userReducer,
    result: resultReducer,
  },
});
