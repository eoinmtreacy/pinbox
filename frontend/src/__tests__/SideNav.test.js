import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideNav from '../components/SideNav';

const mockNavigate = jest.fn();
const mockOnPreferenceToggle = jest.fn();
const mockOnFriendsToggle = jest.fn();


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SideNav Component', () => {

  beforeEach(() => {
    render(
      <MemoryRouter>
        <SideNav onPreferenceToggle={mockOnPreferenceToggle} onFriendsToggle={mockOnFriendsToggle} />
      </MemoryRouter>

    );
  });

  it('renders correctly', () => {

    expect(screen.getByAltText('Home Icon')).toBeInTheDocument();

  });

  it('navigates to /mainpage when home button is clicked', () => {
    fireEvent.click(screen.getByAltText('Home Icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/mainpage');
  });

  it('calls onPreferenceToggle when preference button is clicked', () => {
    fireEvent.click(screen.getByAltText('Like Icon'));
    expect(mockOnPreferenceToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onFriendsToggle when friends button is clicked', () => {
    fireEvent.click(screen.getByAltText('Friends Icon'));
    expect(mockOnFriendsToggle).toHaveBeenCalledTimes(1);
  });


});
