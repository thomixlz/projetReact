import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const conferenceSlice = createSlice({
  name: 'conferences',
  initialState: {
    list: [],
    conferenceDetail: {},
  },
  reducers: {
    setConferences(state, action) {
      state.list = action.payload;
    },
    setConferenceDetail(state, action) {
      state.conferenceDetail = action.payload;
    },
  },
});

export const { setConferences, setConferenceDetail } = conferenceSlice.actions;

export const fetchConferences = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4555/conferences');
    dispatch(setConferences(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchConferenceDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4555/conference/${id}`);
    dispatch(setConferenceDetail(response.data));
  } catch (error) {
    console.error(error);
  }
};

export default conferenceSlice.reducer;
