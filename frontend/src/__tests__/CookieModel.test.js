import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CookieModal from '../components/CookieModal';

describe('CookieModal', () => {
    test('renders without error', () => {
        render(<CookieModal />);
        expect(screen.getByText(/This site uses cookies/i)).toBeInTheDocument();
    });

    test('does not show modal if cookie consent is present', () => {
        localStorage.setItem('cookieConsent', 'true');
        render(<CookieModal />);
        expect(screen.queryByText(/This site uses cookies/i)).not.toBeInTheDocument();
    });

    test('shows modal if cookie consent is not present', () => {
        localStorage.removeItem('cookieConsent');
        render(<CookieModal />);
        expect(screen.getByText(/This site uses cookies/i)).toBeInTheDocument();
    });

    test('sets cookie consent to true and hides modal when "Agree" button is clicked', () => {
        localStorage.removeItem('cookieConsent');
        render(<CookieModal />);
        fireEvent.click(screen.getByText(/Agree/i));
        expect(localStorage.getItem('cookieConsent')).toBe('true');
        expect(screen.queryByText(/This site uses cookies/i)).not.toBeInTheDocument();
    });
});
