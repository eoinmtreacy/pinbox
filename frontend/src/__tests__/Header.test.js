import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
    });

    it ('renders without crashing', () => {
        expect(screen.getByTestId('header-component')).toBeInTheDocument();
    });

    it('renders the Map image', () => {
        const imageElement = screen.getByAltText('Map');
        expect(imageElement).toBeInTheDocument();
    });

    it('renders the List image', () => {
        const imageElement = screen.getByAltText('List');
        expect(imageElement).toBeInTheDocument();
});
   
});

