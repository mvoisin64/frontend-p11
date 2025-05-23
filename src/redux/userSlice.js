import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  firstName: '',
  lastName: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
    setUserInfo: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    }
  },
});

export const { setToken, logout, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
