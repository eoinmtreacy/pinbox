import { render, screen, fireEvent } from '@testing-library/react';
import PasswordFind from '../components/PasswordFind';

// test('renders the component without errors', () => {
//     render(<PasswordFind />);
//     const component = screen.getByRole('password-find');
//     expect(component).toBeInTheDocument();
// });

test('displays the "Verify" text', () => {
    render(<PasswordFind />);
    const verifyText = screen.getByText('Verify');
    expect(verifyText).toBeInTheDocument();
});

test('displays the password image', () => {
    render(<PasswordFind />);
    const passwordImg = screen.getByAltText('passwordImg');
    expect(passwordImg).toBeInTheDocument();
});

test('renders two input fields for name and email', () => {
    render(<PasswordFind />);
    const textBoxes = screen.getAllByRole('textbox');
    textBoxes.forEach(textBox => {
        expect(textBox).toBeInTheDocument();
    });
});
test('submits the form when the submit button is clicked', () => {
    render(<PasswordFind />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    // Add your assertions for form submission here
});
