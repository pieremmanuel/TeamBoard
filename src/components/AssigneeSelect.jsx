import React from 'react';

const AssigneeSelect = ({ users = [], value, onChange, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    className="mb-2 p-2 w-full border rounded bg-zinc-700 text-white"
    {...props}
  >
    <option value="">Assign to...</option>
    {users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    ))}
  </select>
);

export default AssigneeSelect;
