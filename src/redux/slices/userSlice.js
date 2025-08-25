import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, //Ternary ops
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      state.loading = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { loginUser, logoutUser, finishLoading } = userSlice.actions;
export default userSlice.reducer;