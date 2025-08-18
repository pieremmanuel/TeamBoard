import { useState } from 'react';
import { Edit2 } from 'react-feather';
import AssigneeSelect from './AssigneeSelect';

const TaskCard = ({ item, boardIndex, listIndex, dispatch }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title || '');
  const [assignee, setAssignee] = useState(item.assignee || '');
  const [editingAssignee, setEditingAssignee] = useState(false);

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const assigneeUser = users.find(u => u.id === assignee);
  const assigneeName = assigneeUser ? assigneeUser.username : '';

  const handleEdit = () => setEditing(true);

  const handleDelete = () => {
    dispatch({
      type: 'board/deleteCardFromList',
      payload: { boardIndex, listIndex, cardId: item.id },
    });
  };

    const handleSave = () => {
  const safeTitle = typeof title === 'string' ? title.trim() : '';
  const updates = {};

  // Only include title if it's changed and valid
  if (safeTitle && safeTitle !== item.title) {
    updates.newTitle = safeTitle;
  }

  // Only include assignee if it's changed
  if (assignee !== item.assignee) {
    updates.newAssignee = assignee;
  }

  // Dispatch only if there's something to update
  if (Object.keys(updates).length > 0) {
    dispatch({
      type: 'board/editCardInList',
      payload: {
        boardIndex,
        listIndex,
        cardId: item.id,
        ...updates,
      },
    });
  }

  setEditing(false);
  setEditingAssignee(false);
};



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setTitle(item.title || '');
      setAssignee(item.assignee || '');
      setEditing(false);
      setEditingAssignee(false);
    }
  };

  return (
    <div className="item flex flex-col bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500">
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            className="bg-zinc-800 text-white rounded px-1 py-0.5 w-full mr-2"
            value={title}
            autoFocus
            onChange={e => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span onDoubleClick={handleEdit} title="Double click to edit">
            {item.title}
          </span>
        )}
        <span className="flex justify-start items-start">
          <button
            type="button"
            className="hover:bg-gray-600 p-1 rounded-sm mr-1"
            onClick={handleEdit}
            title="Edit card"
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            className="hover:bg-red-600 p-1 rounded-sm"
            onClick={handleDelete}
            title="Delete card"
          >
            &#10005;
          </button>
        </span>
      </div>
      <div className="flex items-center mt-1">
        {editingAssignee ? (
          <AssigneeSelect
            users={users}
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span
            className="text-xs text-gray-300 cursor-pointer"
            onClick={() => setEditingAssignee(true)}
          >
            {assigneeName ? `Assigned to: ${assigneeName}` : 'Unassigned (click to assign)'}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
