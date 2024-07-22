import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import conferenceReducer from './conferenceSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    conferences: conferenceReducer,
  },
});
