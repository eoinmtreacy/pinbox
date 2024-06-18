import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import axios from 'axios';
import UserProfileBox from '../components/UserProfileBox';

jest.mock('axios');

describe('UserProfileBox', () => {
  it('fetches user data on mount', async () => {
    const mockUser = { name: 'John Doe', profile_picture: 'image.jpg' };
    axios.get.mockResolvedValue({ data: mockUser });

    render(<UserProfileBox isClickable={true} />);

    expect(axios.get).toHaveBeenCalledWith('/api/user');
    expect(await screen.findByText("John's Pinbox")).toBeInTheDocument();
    expect(screen.getByAltText('User')).toHaveAttribute('src', 'image.jpg');
  });

  it('navigates to profile page when clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <UserProfileBox isClickable={true} />
      </Router>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(history.location.pathname).toBe('/user/profile');
  });

  it('does not navigate when not clickable', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <UserProfileBox isClickable={false} />
      </Router>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(history.location.pathname).toBe('/');
  });
});