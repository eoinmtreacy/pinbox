import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

describe('BottomNav', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <BottomNav />	
            </MemoryRouter>
        );
    }); 
    
    it('displays the "Home" text', () => {
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('displays the "Browse Place" text', () => {
        expect(screen.getByText('Browse Place')).toBeInTheDocument();
    });

    it('displays the "Friend’s PinBox" text', () => {
        expect(screen.getByText('Friend’s PinBox')).toBeInTheDocument();
    });

    it('displays the "Profile" text', () => {
        expect(screen.getByText('Profile')).toBeInTheDocument()
    });

    it('displays the profile icon', () => {
        expect(screen.getByAltText('Profile Icon')).toBeInTheDocument();
    });
    
});
