import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../components/Signup';

test('renders signup form', () => {
    render(<Signup />);
    
    // Retrieve all elements with the text 'Sign up'
    const signUpElements = screen.getAllByText('Sign up');
    
    // Assert that the signup form heading is present
    expect(signUpElements[0]).toBeInTheDocument();
    // Assert that the signup button is present
    expect(signUpElements[1]).toBeInTheDocument();

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
});


test('submits form with valid input', () => {
    render(<Signup />);
    
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // Assert that the form is submitted successfully
    // Add your assertions here
});


    // Will be uncommented in future when we are error handling 
    
// test('displays error messages for invalid input', () => {
//     render(<Signup />);
    
//     // Submit the form without filling in any fields
//     fireEvent.click(screen.getByText('sign up'));
    
//     // Assert that error messages are displayed for each field
//     expect(screen.getByText('Name is required')).toBeInTheDocument();
//     expect(screen.getByText('Email is required')).toBeInTheDocument();
//     expect(screen.getByText('Password is required')).toBeInTheDocument();
    
//     // Add more assertions for specific error messages if needed
// });
