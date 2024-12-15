import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/user/login', {
        email: credentials.email,
        password: credentials.password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Login failed'
      );
    }
  }
);
// Async thunk for getting user data
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/user/profile'); 
      return response.data.user; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed to fetch user data'
      );
    }
  }
);
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData , thunkAPI) =>{
    console.log(userData);
    try{
      const response = await apiClient.post("user/create");
      return response.data.userData;
    }
    catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Faild to featch user data"
      );
    }
  }

)

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userDetails, thunkAPI) => {
    try {
      const response = await apiClient.post('/user/register', userDetails);
      return response.data.user; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Signup failed'
      );
    }
  }
);

// Thunk for logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Handle signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false; 
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })
      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(createUser.pending , (state) =>{
       state.isLoading = true;
       state.error = null;
      })
      .addCase(createUser.fulfilled, (state , action)=>{
        state.isLoading = false;
        state.createUser = action.payload;
      })
      .addCase(createUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action.payload;
      })

  },
});

export default authSlice.reducer;

