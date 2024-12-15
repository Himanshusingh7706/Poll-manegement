import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, thunkAPI) => {
  try {
    const response = await apiClient.get('/role/list');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch roles');
  }
});
const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.roles = [];
      });
  },
});

export default rolesSlice.reducer;
