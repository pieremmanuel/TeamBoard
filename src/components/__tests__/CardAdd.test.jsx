import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardAdd from '../CardAdd'  // adjust path as needed

jest.mock('../../utils/Utils', () => ({
  makeid: jest.fn(() => 'abcde'),
}));

describe('CardAdd Component', () => {
  const mockGetCard = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Add a card" button initially', () => {
    render(<CardAdd getcard={mockGetCard} />);
    expect(screen.getByText('Add a card')).toBeInTheDocument();
  });

  it('shows textarea and buttons when "Add a card" is clicked', () => {
    render(<CardAdd getcard={mockGetCard} />);
    fireEvent.click(screen.getByText('Add a card'));

    expect(screen.getByPlaceholderText('Enter Card Title...')).toBeInTheDocument();
    expect(screen.getByText('Add Card')).toBeInTheDocument();
  });

  it('calls getcard with correct data when valid card is added', () => {
    render(<CardAdd getcard={mockGetCard} />);
    fireEvent.click(screen.getByText('Add a card'));

    const textarea = screen.getByPlaceholderText('Enter Card Title...');
    fireEvent.change(textarea, { target: { value: 'New Task' } });

    fireEvent.click(screen.getByText('Add Card'));

    expect(mockGetCard).toHaveBeenCalledWith({
      id: 'abcde',
      title: 'New Task',
      assignee: '',
      completed: false,
    });
  });

  it('does not call getcard when input is empty or whitespace', () => {
    render(<CardAdd getcard={mockGetCard} />);
    fireEvent.click(screen.getByText('Add a card'));

    const textarea = screen.getByPlaceholderText('Enter Card Title...');
    fireEvent.change(textarea, { target: { value: '   ' } });

    fireEvent.click(screen.getByText('Add Card'));

    expect(mockGetCard).not.toHaveBeenCalled();
  });

  it('closes the form when close button is clicked', () => {
    render(<CardAdd getcard={mockGetCard} />);
    fireEvent.click(screen.getByText('Add a card'));

    fireEvent.click(screen.getByRole('button', { name: '' })); // X icon button

    expect(screen.queryByPlaceholderText('Enter Card Title...')).not.toBeInTheDocument();
  });
});
