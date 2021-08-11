import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const fetchUser = createAsyncThunk('api/user/profile', async () => {
  const fetch = await axios.get('http://localhost:3001/api/user/profile', {
    withCredentials: true,
  });
  return fetch.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;
