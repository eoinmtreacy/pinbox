import React from 'react';
import { render } from '@testing-library/react';
import BottomNav from '../components/BottomNav';

describe('BottomNav', () => {
    it('renders without crashing', () => {
        render(<BottomNav />);
    });

    it('displays the "Home" text', () => {
        const { getByText } = render(<BottomNav />);
        expect(getByText('Home')).toBeInTheDocument();
    });

    it('displays the "Browse Place" text', () => {
        const { getByText } = render(<BottomNav />);
        expect(getByText('Browse Place')).toBeInTheDocument();
    });

    it('displays the "Friend’s PinBox" text', () => {
        const { getByText } = render(<BottomNav />);
        expect(getByText('Friend’s PinBox')).toBeInTheDocument();
    });

    it('displays the "Profile" text', () => {
        const { getByText } = render(<BottomNav />);
        expect(getByText('Profile')).toBeInTheDocument();
    });

    it('displays the profile icon', () => {
        const { getByAltText } = render(<BottomNav />);
        expect(getByAltText('List')).toBeInTheDocument();
    });
});
