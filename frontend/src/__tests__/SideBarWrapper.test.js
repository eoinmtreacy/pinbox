import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideBarWrapper from '../components/SideBarWrapper';

describe('SideBarWrapper', () => {
  it('renders SideBar for non-excluded paths', () => {
    render(
      <MemoryRouter initialEntries={['/somepath']}>
        <SideBarWrapper />
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('does not render SideBar for excluded paths', () => {
    const excludedPaths = ['./Login', './Signup', './PasswordFind', './Map'];

    excludedPaths.forEach(path => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <SideBarWrapper />
        </MemoryRouter>
      );

      expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
    });
  });
});