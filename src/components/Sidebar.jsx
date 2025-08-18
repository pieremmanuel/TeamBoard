import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, X } from 'react-feather';
import { Popover } from 'react-tiny-popover';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard, setActiveBoard } from '../redux/slices/boardSlice';

const Sidebar = () => {
  const blankBoard = {
    name: '',
    bgcolor: '#f60000',
    list: [],
  };

  const [boardData, setBoardData] = useState(blankBoard);
  const [collapsed, setCollapsed] = useState(false);
  const [showpop, setShowpop] = useState(false);

  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.board);
  const user = useSelector((state) => state.user.user);

  const handleSetActiveBoard = (i) => {
    dispatch(setActiveBoard(i));
  };

  const handleAddBoard = () => {
    dispatch(addBoard(boardData));
    setBoardData(blankBoard);
    setShowpop(false);
  };

  return (
    <div className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${collapsed ? 'w-[42px]' : 'w-[280px]'}`}>
      {collapsed ? (
        <div className='p-2'>
          <button onClick={() => setCollapsed(false)} className='hover:bg-slate-600 rounded-sm'>
            <ChevronRight size={18} />
          </button>
        </div>
      ) : (
        <div>
          {/* Workspace Header */}
          <div className="workspace p-3 flex justify-between items-center border-b border-b-[#9fadbc29]">
            <div className="flex items-center space-x-2">
              <img
                src="https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"
                alt="User avatar"
                className="rounded-full w-7 h-7"
              />
              <h4 className="text-white font-medium">
                {user?.username ? `${user.username}'s Workspace` : 'Workspace'}
              </h4>
            </div>
            <button onClick={() => setCollapsed(true)} className='hover:bg-slate-600 rounded-sm p-1'>
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Board List Header */}
          <div className="boardlist">
            <div className='flex justify-between px-3 py-2'>
              <h6 className="text-white text-sm">Your Boards</h6>

              <Popover
                isOpen={showpop}
                align='start'
                positions={['right', 'top', 'bottom', 'left']}
                content={
                  <div className='ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded relative'>
                    <button onClick={() => setShowpop(false)} className='absolute right-2 top-2 hover:bg-gray-500 p-1 rounded'>
                      <X size={16} />
                    </button>
                    <h4 className='py-3'>Create Board</h4>
                    <img src="https://placehold.co/200x120/png" alt="Board preview" />
                    <div className="mt-3 flex flex-col items-start w-full">
                      <label htmlFor="title">Board Title <span>*</span></label>
                      <input
                        value={boardData.name}
                        onChange={(e) => setBoardData({ ...boardData, name: e.target.value })}
                        type="text"
                        className='mb-2 h-8 px-2 w-full bg-gray-700 text-white'
                      />
                      <label htmlFor="Color">Board Color</label>
                      <input
                        value={boardData.bgcolor}
                        onChange={(e) => setBoardData({ ...boardData, bgcolor: e.target.value })}
                        type="color"
                        className='mb-2 h-8 px-2 w-full bg-gray-700'
                      />
                      <button onClick={handleAddBoard} className='w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-500'>
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button onClick={() => setShowpop(true)} className='hover:bg-slate-600 p-1 rounded-sm'>
                  <Plus size={16} />
                </button>
              </Popover>
            </div>
          </div>

          {/* Board List */}
          <ul>
            {boards.map((board, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSetActiveBoard(i)}
                  className='px-3 py-2 w-full text-sm flex justify-start items-center hover:bg-gray-500 text-white'
                >
                  <span className='w-6 h-4 rounded-sm mr-2' style={{ backgroundColor: board.bgcolor }}></span>
                  <span>{board.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;