import React, { useState } from 'react';
import { X, Plus } from 'react-feather';

const AddList = (props) => {
  const [list, setList] = useState('');
  const [show, setShow] = useState(false);

  const handleSave = () => {
    if (!list.trim()) return;
    if (props.getlist) {
      props.getlist(list.trim());
    }
    setList('');
    setShow(false);
  };

  const handleClose = () => {
    setList('');
    setShow(false);
  };

  return (
    <div className="flex flex-col h-fit flex-shrink-0 mr-3 w-60 rounded-md p-2 bg-black">
      {show ? (
        <>
          <textarea
            value={list}
            onChange={(e) => setList(e.target.value)}
            className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
            rows="2"
            placeholder="Enter list title..."
          />
          <div className="flex p-1 mt-2">
            <button onClick={handleSave} className="p-1 rounded bg-sky-600 text-white mr-2">
              Add list
            </button>
            <button onClick={handleClose} className="p-1 rounded hover:bg-gray-600">
              <X size={16} />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="flex p-1 w-full justify-center rounded items-center mt-1 hover:bg-gray-500 h-8"
        >
          <Plus size={16} /> Add a list
        </button>
      )}
    </div>
  );
};

export default AddList;