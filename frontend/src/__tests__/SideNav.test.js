// Import necessary testing utilities and the component to test
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SideNav } from '../components/SideNav';
import { BrowserRouter, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: jest.fn(), 
}));

describe('SideNav Component', () => {
  const mockNavigate = jest.fn();
  const mockOnPreferenceToggle = jest.fn();
  const mockOnFriendsToggle = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => mockNavigate); 
    mockNavigate.mockReset();
    mockOnPreferenceToggle.mockReset();
    mockOnFriendsToggle.mockReset();
    render(
      <BrowserRouter>
        <SideNav 
          onPreferenceToggle={mockOnPreferenceToggle} 
          onFriendsToggle={mockOnFriendsToggle} 
        />
      </BrowserRouter>
    );
  });

  it('renders correctly', () => {
    expect(screen.getAllByRole('button')).toHaveLength(4);  // Adjusted the expected length to 4
    expect(screen.getByAltText('Home Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Like Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Friends Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Settings Icon')).toBeInTheDocument();  // Added 'Settings Icon' check
  });

  it('navigates to /map when home button is clicked', () => {
    fireEvent.click(screen.getByAltText('Home Icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/map');
  });

  it('calls onPreferenceToggle when preference button is clicked', () => {
    fireEvent.click(screen.getByAltText('Like Icon'));
    expect(mockOnPreferenceToggle).toHaveBeenCalled();
  });

  it('calls onFriendsToggle when friends button is clicked', () => {
    fireEvent.click(screen.getByAltText('Friends Icon'));
    expect(mockOnFriendsToggle).toHaveBeenCalled();
  });
});
