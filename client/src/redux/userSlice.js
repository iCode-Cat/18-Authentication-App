import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: null,
};

export const fetchUser = createAsyncThunk('api/user/profile', async () => {
  try {
    const get = await axios(
      'https://authentication-appp.herokuapp.com/api/user/profile',
      {
        withCredentials: true,
      }
    );
    return get.data;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload === undefined) {
        state.isAuthenticated = false;
        return;
      }
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;
