import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';
export const fetchUserList = createAsyncThunk(
  'userList/fetchUserList',
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await apiClient.get(`user/list/${page}?limit=${limit}`);
      return response.data.rows;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user List'
      );
    }
  }
);

// User list slice
const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    userList: [],
    isLoading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userList = [];
      });
  }
});

export default userListSlice.reducer;
