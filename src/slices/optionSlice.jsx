import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../utils/apiClient"; 

// Async thunk to add an option to a poll
export const addOption = createAsyncThunk(
  "option/addOption",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post(`/poll/addPollOption/${data.id}`, {
        optionTitle: data.optionTitle,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed to add option"
      );
    }
  }
);

// Async thunk to delete an option
export const deleteOption = createAsyncThunk(
  "option/deleteOption",
  async (id, thunkAPI) => {
    try {
      await apiClient.delete(`/option/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed to delete option"
      );
    }
  }
);

// Async thunk to update an option
export const updateOption = createAsyncThunk(
  "option/updateOption",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.put(`/option/edit/${data.id}`, {
        optionTitle: data.editedOption,
      });
      return { id: data.id, optionTitle: data.editedOption }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed to update option"
      );
    }
  }
);

const optionSlice = createSlice({
  name: "option",
  initialState: {
    options: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Option
      .addCase(addOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOption.fulfilled, (state, action) => {
        state.loading = false;
        state.options.push(action.payload);
      })
      .addCase(addOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Option
      .addCase(deleteOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOption.fulfilled, (state, action) => {
        state.loading = false;
        state.options = state.options.filter(
          (option) => option.id !== action.payload
        );
      })
      .addCase(deleteOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Option
      .addCase(updateOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOption.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.options.findIndex(
          (option) => option.id === action.payload.id
        );
        if (index !== -1) {
          state.options[index].optionTitle = action.payload.optionTitle;
        }
      })
      .addCase(updateOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default optionSlice.reducer;




