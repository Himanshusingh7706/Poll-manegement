import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import rolesReducer from '../slices/rolesSlice';
import pollsReducer from '../slices/pollsSlice';
import optionReducer from '../slices/optionSlice';
import userListReducer from '../slices/userListSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    polls: pollsReducer,
    option: optionReducer,
    userList: userListReducer,
  },
});

export default store;
