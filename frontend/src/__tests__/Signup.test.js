import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../components/Signup';
import { MemoryRouter } from 'react-router-dom';

test('renders signup form', () => {
        render(
        <MemoryRouter>
            <Signup />
        </MemoryRouter>
    );
    
    // Assert that the signup form is rendered
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('sign up')).toBeInTheDocument();
});

test('submits form with valid input', () => {
        render(
        <MemoryRouter>
            <Signup />
        </MemoryRouter>
    );;
    
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(screen.getByText('sign up'));
    
    // Assert that the form is submitted successfully
    // Add your assertions here
});