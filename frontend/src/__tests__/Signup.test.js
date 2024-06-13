import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../components/Signup';

test('renders signup form', () => {
    render(<Signup />);
    
    // Assert that the signup form is rendered
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('sign up')).toBeInTheDocument();
});

test('submits form with valid input', () => {
    render(<Signup />);
    
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(screen.getByText('sign up'));
    
    // Assert that the form is submitted successfully
    // Add your assertions here
});

test('displays error messages for invalid input', () => {
    render(<Signup />);
    
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByText('sign up'));
    
    // Assert that error messages are displayed for each field
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    
    // Add more assertions for specific error messages if needed
});
