import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
  name: 'list',
  initialState: {
    lists: []
  },
  reducers: {
    addList: (state, action) => {
      state.lists.push({
        title: action.payload,
        items: []
      });
    }
  }
});

export const { addList } = listSlice.actions;
export default listSlice.reducer;