import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddList from './AddList';

describe('AddList Component', () => {
  test('renders "Add a list" button initially', () => {
    render(<AddList />);
    expect(screen.getByText(/Add a list/i)).toBeInTheDocument();
  });

  test('shows textarea and buttons when "Add a list" is clicked', () => {
    render(<AddList />);
    fireEvent.click(screen.getByText(/Add a list/i));
    expect(screen.getByPlaceholderText(/Enter list title/i)).toBeInTheDocument();
    expect(screen.getByText(/Add list/i)).toBeInTheDocument();
  });

  test('updates textarea value on input', () => {
    render(<AddList />);
    fireEvent.click(screen.getByText(/Add a list/i));
    const textarea = screen.getByPlaceholderText(/Enter list title/i);
    fireEvent.change(textarea, { target: { value: 'New List' } });
    expect(textarea.value).toBe('New List');
  });

  test('calls getlist prop with trimmed input on save', () => {
    const mockGetList = jest.fn();
    render(<AddList getlist={mockGetList} />);
    fireEvent.click(screen.getByText(/Add a list/i));
    const textarea = screen.getByPlaceholderText(/Enter list title/i);
    fireEvent.change(textarea, { target: { value: '  My List  ' } });
    fireEvent.click(screen.getByText(/Add list/i));
    expect(mockGetList).toHaveBeenCalledWith('My List');
  });

  test('does not call getlist if input is empty or whitespace', () => {
    const mockGetList = jest.fn();
    render(<AddList getlist={mockGetList} />);
    fireEvent.click(screen.getByText(/Add a list/i));
    fireEvent.change(screen.getByPlaceholderText(/Enter list title/i), { target: { value: '   ' } });
    fireEvent.click(screen.getByText(/Add list/i));
    expect(mockGetList).not.toHaveBeenCalled();
  });

  test('closes form and clears input when close button is clicked', () => {
    render(<AddList />);
    fireEvent.click(screen.getByText(/Add a list/i));
    const textarea = screen.getByPlaceholderText(/Enter list title/i);
    fireEvent.change(textarea, { target: { value: 'Temporary' } });
    fireEvent.click(screen.getByRole('button', { name: '' })); // X button
    expect(screen.queryByPlaceholderText(/Enter list title/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Add a list/i)).toBeInTheDocument();
  });
});
