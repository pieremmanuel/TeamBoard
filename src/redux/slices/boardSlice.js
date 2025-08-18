import { createSlice } from '@reduxjs/toolkit';

function getInitialBoards() {
  try {
    const stored = JSON.parse(localStorage.getItem('boards'));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {}
  return [
    {
      name: 'My Board',
      bgcolor: '#069',
      list: [
        { id: '1', title: 'To do', items: [{ id: 'cdrFt', title: 'Project Description 1' }] },
        { id: '2', title: 'In Progress', items: [{ id: 'cdrFv', title: 'Project Description 2' }] },
        { id: '3', title: 'Done', items: [{ id: 'cdrFb', title: 'Project Description 3' }] },
      ],
    },
  ];
}

const initialState = {
  boards: getInitialBoards(),
  active: 0,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
      localStorage.setItem('boards', JSON.stringify(state.boards));
    },
    setActiveBoard: (state, action) => {
      state.active = action.payload;
    },
    updateBoardList: (state, action) => {
      const { boardIndex, list } = action.payload;
      state.boards[boardIndex].list = list;
      localStorage.setItem('boards', JSON.stringify(state.boards));
    },
    addCardToList: (state, action) => {
      const { boardIndex, listIndex, card } = action.payload;
      state.boards[boardIndex].list[listIndex].items.push(card);
      localStorage.setItem('boards', JSON.stringify(state.boards));
    },
    addListToBoard: (state, action) => {
      const { boardIndex, title } = action.payload;
      const newList = {
        id: state.boards[boardIndex].list.length + 1 + '',
        title,
        items: [],
      };
      state.boards[boardIndex].list.push(newList);
      localStorage.setItem('boards', JSON.stringify(state.boards));
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
      localStorage.setItem('boards', JSON.stringify(state.boards));
    },
  },
});

export const {
  setBoards,
  setActiveBoard,
  updateBoardList,
  addCardToList,
  addListToBoard,
  addBoard,
} = boardSlice.actions;

export default boardSlice.reducer;