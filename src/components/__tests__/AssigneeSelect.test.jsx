import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssigneeSelect from '../AssigneeSelect'; // adjust path as needed

describe('AssigneeSelect Component', () => {
  const mockUsers = [
    { id: '1', username: 'Alice' },
    { id: '2', username: 'Bob' },
  ];

  it('renders default and user options', () => {
    render(<AssigneeSelect users={mockUsers} value="" onChange={() => {}} />);

    expect(screen.getByText('Assign to...')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls onChange when a user is selected', () => {
    const handleChange = jest.fn();

    render(<AssigneeSelect users={mockUsers} value="" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('sets the correct selected value', () => {
    render(<AssigneeSelect users={mockUsers} value="1" onChange={() => {}} />);

    const select = screen.getByRole('combobox');
    expect(select.value).toBe('1');
  });
});
