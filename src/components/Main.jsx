import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoreHorizontal, UserPlus, Edit2 } from 'react-feather';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CardAdd from './CardAdd';
import AddList from './AddList';
import Utils from '../utils/Utils';
import {
  updateBoardList,
  addCardToList,
  addListToBoard,
  reorderListsInBoard
} from '../redux/slices/boardSlice';

const Main = () => {
  const dispatch = useDispatch();
  const { boards, active } = useSelector((state) => state.board);
  const bdata = boards[active];

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

  const sourceIndex = bdata.list.findIndex(list => list.id === sourceListId);
  const destIndex = bdata.list.findIndex(list => list.id === destListId);

  if (sourceIndex === -1 || destIndex === -1) return;

  const updatedLists = [...bdata.list];

  if (sourceListId === destListId) {
    // Reordering within the same list
    const items = Array.from(updatedLists[sourceIndex].items);
    const [movedCard] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedCard);

    updatedLists[sourceIndex] = {
      ...updatedLists[sourceIndex],
      items,
    };
  } else {
    // Moving between different lists
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

  const cardData = (title, listIndex) => {
    const newCard = { id: Utils.makeid(5), title };
    dispatch(addCardToList({ boardIndex: active, listIndex, card: newCard }));
  };

  const listData = (title) => {
    dispatch(addListToBoard({ boardIndex: active, title }));
  };

  return (
    <div className='flex flex-col w-full' style={{ backgroundColor: bdata.bgcolor }}>
      <div className='p-3 bg-black flex justify-between w-full bg-opacity-50'>
        <h2 className='text-lg'>{bdata.name}</h2>
        <div className='flex items-center justify-center'>
          <button className='bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center'>
            <UserPlus size={16} className='mr-2' />
            Share
          </button>
          <button className='hover:bg-gray-500 px-2 py-1 h-8 rounded'>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className='flex flex-col w-full flex-grow relative'>
        <div className='absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board-droppable" direction="horizontal" type="LIST">
              {(provided) => (
                <div className="flex" ref={provided.innerRef} {...provided.droppableProps}>
                  {bdata.list.map((list, ind) => (
                    <Draggable draggableId={list.id} index={ind} key={list.id}>
                      {(provided) => (
                        <div
                          className='mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className="list-body">
                            <div className='flex justify-between p-1' {...provided.dragHandleProps}>
                              <span>{list.title}</span>
                              <button className='hover:bg-gray-500 p-1 rounded-sm'>
                                <MoreHorizontal size={16} />
                              </button>
                            </div>

                            <Droppable droppableId={list.id} type="CARD">
                              {(provided, snapshot) => (
                                <div
                                  className='py-1'
                                  ref={provided.innerRef}
                                  style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                                  {...provided.droppableProps}
                                >
                                  {list.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <div className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500">
                                            <span>{item.title}</span>
                                            <span className='flex justify-start items-start'>
                                              <button className='hover:bg-gray-600 p-1 rounded-sm'>
                                                <Edit2 size={16} />
                                              </button>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>

                            <CardAdd getcard={(e) => cardData(e, ind)} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <AddList getlist={listData} />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Main;
