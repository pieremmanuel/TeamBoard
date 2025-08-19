import React from 'react';
import { TextEncoder, TextDecoder } from 'util';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from '../Header';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Header Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: {
          username: 'Peter',
        },
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders the header title and navigation links', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('TeamBoard')).toBeInTheDocument();
    expect(screen.getByText('Board')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('displays user info when user is logged in', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Peter')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('dispatches logout and navigates on logout click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'user/logoutUser' });
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('does not render user info if user is null', () => {
    store = mockStore({
      user: {
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
