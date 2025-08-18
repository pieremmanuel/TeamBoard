import { createSlice } from '@reduxjs/toolkit';


function getInitialBoards() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) return [];
    const stored = JSON.parse(localStorage.getItem(`boards_${user.id}`));
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


function saveBoardsToStorage(boards) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.id) {
    localStorage.setItem(`boards_${user.id}`, JSON.stringify(boards));
  }
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
      saveBoardsToStorage(state.boards);
    },
    setActiveBoard: (state, action) => {
      state.active = action.payload;
    },
    updateBoardList: (state, action) => {
      const { boardIndex, list } = action.payload;
      state.boards[boardIndex].list = list;
      saveBoardsToStorage(state.boards);
    },
    addCardToList: (state, action) => {
      const { boardIndex, listIndex, card } = action.payload;
      state.boards[boardIndex].list[listIndex].items.push(card);
      saveBoardsToStorage(state.boards);
    },
    addListToBoard: (state, action) => {
      const { boardIndex, title } = action.payload;
      const newList = {
        id: state.boards[boardIndex].list.length + 1 + '',
        title,
        items: [],
      };
      state.boards[boardIndex].list.push(newList);
      saveBoardsToStorage(state.boards);
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
      saveBoardsToStorage(state.boards);
    },
    reorderListsInBoard: (state, action) => {
      const { boardIndex, sourceIndex, destinationIndex } = action.payload;
      const lists = state.boards[boardIndex].list;
      const [moved] = lists.splice(sourceIndex, 1);
      lists.splice(destinationIndex, 0, moved);
      saveBoardsToStorage(state.boards);
    },
    reorderBoards: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [moved] = state.boards.splice(sourceIndex, 1);
      state.boards.splice(destinationIndex, 0, moved);
      saveBoardsToStorage(state.boards);
    },

    // Reset boards state for the current user (e.g., after login)
    resetBoards: (state) => {
      state.boards = getInitialBoards();
      state.active = 0;
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
  reorderListsInBoard,
  reorderBoards,
  resetBoards,
} = boardSlice.actions;

export default boardSlice.reducer;
