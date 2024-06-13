import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from '../components/Main';

jest.mock('react-router-dom', () => {
  const navigateMock = jest.fn();
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => navigateMock,
    navigateMock, // export this mock to assert in tests
  };
});

test('navigates to /login on Login button click', () => {
  const { navigateMock } = require('react-router-dom');

  render(
    <Router>
      <Main />
    </Router>
  );

  const loginButton = screen.getByText('Login');
  fireEvent.click(loginButton);

  expect(navigateMock).toHaveBeenCalledWith('/login');
});

test('navigates to /signup on Sign Up button click', () => {
    const { navigateMock } = require('react-router-dom');

    render(
      <Router>
        <Main />
      </Router>
    );
  
    const loginButton = screen.getByText('Sign Up');
    fireEvent.click(loginButton);
  
    expect(navigateMock).toHaveBeenCalledWith('/signup');
});