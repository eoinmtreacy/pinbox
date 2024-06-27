// Import necessary testing utilities and the component to test
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SideNav } from '../components/SideNav';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Browser } from 'leaflet';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: jest.fn(), 
}));

describe('SideNav Component', () => {
  const mockNavigate = jest.fn();
  const mockOnPreferenceToggle = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => mockNavigate); 
    mockNavigate.mockReset();
    mockOnPreferenceToggle.mockReset();
    render(
      <BrowserRouter>
        <SideNav onPreferenceToggle={mockOnPreferenceToggle} />
      </BrowserRouter>
    )
  });

  it('renders correctly', () => {
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getByAltText('Home Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Search Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Like Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Friends Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Profile Icon')).toBeInTheDocument();
  });

  it('navigates to /home when home button is clicked', () => {
    fireEvent.click(screen.getByAltText('Home Icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/map');
  });

  it('navigates to /search when search button is clicked', () => {
    fireEvent.click(screen.getByAltText('Search Icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });

  it('calls onPreferenceToggle when preference button is clicked', () => {
    fireEvent.click(screen.getByAltText('Like Icon'));
    expect(mockOnPreferenceToggle).toHaveBeenCalled();
  });
});