import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Main from '../Main';

const mockStore = configureStore([]);

describe('Main component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      board: {
        boards: [
          {
            name: 'Test Board',
            bgcolor: '#123456',
            list: [
              { id: '1', title: 'To do', items: [] },
              { id: '2', title: 'In Progress', items: [] },
            ],
          },
        ],
        active: 0,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders board name', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText('Test Board')).toBeInTheDocument();
  });

  it('renders all lists', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText('To do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('shows error if no board data', () => {
    store = mockStore({ board: { boards: [], active: 0 } });
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText(/No board data available/i)).toBeInTheDocument();
  });
});
