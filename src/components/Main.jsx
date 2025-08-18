import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { MoreHorizontal, UserPlus } from 'react-feather';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AddList from './AddList';
import TaskList from './TaskList';
import {
  updateBoardList,
  addListToBoard,
  reorderListsInBoard
} from '../redux/slices/boardSlice';

const Main = () => {
  const dispatch = useDispatch();
  const { boards, active } = useSelector((state) => state.board);
  const bdata = boards[active];

  // Filter state
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Get all users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Status options from list titles
  const statusOptions = bdata && Array.isArray(bdata.list)
    ? bdata.list.map(list => list.title)
    : [];

  if (!bdata || !Array.isArray(bdata.list)) {
    return <div className="p-4 text-red-500">No board data available.</div>;
  }

  const onDragEnd = ({ source, destination, type }) => {
    if (!destination) return;

    if (type === 'LIST') {
      dispatch(reorderListsInBoard({
        boardIndex: active,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }));
      return;
    }

    if (type === 'CARD') {
      const sourceListId = source.droppableId;
      const destListId = destination.droppableId;

      const sourceIndex = bdata.list.findIndex(list => String(list.id) === sourceListId);
      const destIndex = bdata.list.findIndex(list => String(list.id) === destListId);

      if (sourceIndex === -1 || destIndex === -1) return;

      const updatedLists = [...bdata.list];

      if (sourceListId === destListId) {
        const items = Array.from(updatedLists[sourceIndex].items);
        const [movedCard] = items.splice(source.index, 1);
        items.splice(destination.index, 0, movedCard);

        updatedLists[sourceIndex] = {
          ...updatedLists[sourceIndex],
          items,
        };
      } else {
        const sourceItems = Array.from(updatedLists[sourceIndex].items);
        const destItems = Array.from(updatedLists[destIndex].items);

        const [movedCard] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, movedCard);

        updatedLists[sourceIndex] = {
          ...updatedLists[sourceIndex],
          items: sourceItems,
        };
        updatedLists[destIndex] = {
          ...updatedLists[destIndex],
          items: destItems,
        };
      }

      dispatch(updateBoardList({ boardIndex: active, list: updatedLists }));
    }
  };

  const listData = (title) => {
    dispatch(addListToBoard({ boardIndex: active, title }));
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: bdata.bgcolor }}>
      <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
        <h2 className="text-lg">{bdata.name}</h2>
        <div className="flex items-center justify-center">
          <button className="bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center">
            <UserPlus size={16} className="mr-2" />
            Share
          </button>
          <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Filter UI */}
      <div className="flex flex-row items-center gap-4 px-4 py-2 bg-black bg-opacity-30">
        <div>
          <label className="text-white mr-2">Filter by User:</label>
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            className="rounded p-1 bg-zinc-700 text-white"
          >
            <option value="">All</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white mr-2">Filter by Status:</label>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="rounded p-1 bg-zinc-700 text-white"
          >
            <option value="">All</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-grow overflow-x-auto p-3 space-x-3">
          <Droppable droppableId={`board-${active}`} direction="horizontal" type="LIST">
            {(provided) => (
              <div className="flex" ref={provided.innerRef} {...provided.droppableProps}>
                {bdata.list.map((list, ind) => (
                  <TaskList
                    key={String(list.id)}
                    list={list}
                    listIndex={ind}
                    boardIndex={active}
                    dispatch={dispatch}
                    filterUser={selectedUser}
                    filterStatus={selectedStatus}
                  />
                ))}
                {provided.placeholder}
                <AddList getlist={listData} />
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Main;
