import { createSlice } from '@reduxjs/toolkit';

let storedUser = null;
let parseError = null;


//Added ternary operator to handle null case, and error handling for JSON parsing.
try {
  const userData = localStorage.getItem('user');
  storedUser = userData ? JSON.parse(userData) : null; 
} catch (error) {
  console.error('Error parsing user data from localStorage:', error);
  parseError = 'Failed to load user data';
}

const initialState = {
  user: storedUser,
  loading: false,
  error: parseError,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.loading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      state.loading = false;
      state.error = null;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, finishLoading, setError } = userSlice.actions;
export default userSlice.reducer;
