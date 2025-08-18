import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import boardReducer from './slices/boardSlice';
import sessionReducer from './slices/sessionSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    session: sessionReducer
  },
});

export default store;