import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../utils/apiClient";

// Fetch poll list
export const getPollList = createAsyncThunk(
  "pollList/getPollList",
  async (pageNumber, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`poll/list/${pageNumber}?limit=10`);
      return response.data.rows;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Add new poll
export const addPoll = createAsyncThunk(
  "pollList/addPoll",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("poll/add", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Update poll title
export const updatePollTitle = createAsyncThunk(
  "pollList/updatePoll",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`poll/${data.id}`, data.newPoll);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Vote on poll option
export const votedPollOption = createAsyncThunk(
  "pollList/votedPollOption",
  async (optionId, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("vote/count", { optionId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Fetch single poll by ID
export const getSinglePoll = createAsyncThunk(
  "pollList/singlePoll",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`poll/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Delete poll by ID
export const deleteSinglePoll = createAsyncThunk(
  "pollList/deletePoll",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`poll/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const pollSlice = createSlice({
  name: "pollList",
  initialState: {
    pollList: [],
    loading: false,
    pollListLength: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get Poll List
    builder.addCase(getPollList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPollList.fulfilled, (state, action) => {
      state.loading = false;
      state.pollList = action.payload;
      state.pollListLength = action.payload?.length;
    });
    builder.addCase(getPollList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add Poll
    builder.addCase(addPoll.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addPoll.fulfilled, (state, action) => {
      state.loading = false;
      state.pollList.push(action.payload);
    });
    builder.addCase(addPoll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Poll Title
    builder.addCase(updatePollTitle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePollTitle.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.pollList.findIndex(
        (poll) => poll.id === action.meta.arg.id
      );
      if (index !== -1) {
        state.pollList[index] = { ...state.pollList[index], ...action.payload };
      }
    });
    builder.addCase(updatePollTitle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Vote on Poll Option
    builder.addCase(votedPollOption.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(votedPollOption.fulfilled, (state, action) => {
      state.loading = false;
      // Optionally handle state update for voted option if needed
    });
    builder.addCase(votedPollOption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Single Poll
    builder.addCase(getSinglePoll.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSinglePoll.fulfilled, (state, action) => {
      state.loading = false;
      // Optionally add to state or handle retrieved poll data if needed
    });
    builder.addCase(getSinglePoll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete Single Poll
    builder.addCase(deleteSinglePoll.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteSinglePoll.fulfilled, (state, action) => {
      state.loading = false;
      state.pollList = state.pollList.filter(
        (poll) => poll.id !== action.meta.arg
      );
    });
    builder.addCase(deleteSinglePoll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default pollSlice.reducer;
