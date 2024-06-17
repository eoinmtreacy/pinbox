import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Login component', () => {
    beforeEach(() => {
        useNavigate.mockClear();
    });

    test('renders login form', () => {
        render(<Login />);
        
        expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    test('navigates to /map on login button click', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockImplementation(() => mockNavigate);
        render(<Login />);
        
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));
        
        expect(mockNavigate).toHaveBeenCalledWith('/map');
    });
});
