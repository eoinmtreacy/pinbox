import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '../components/Sidebar';

describe('SearchBar', () => {
    test('renders all images', () => {
        render(<SearchBar />);
        
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(5);
    });

    test('renders correct alt text for each image', () => {
        render(<SearchBar />);
        
        const altTexts = ['restaurant', 'cafe', 'Pub', 'park', 'mall'];
        const images = screen.getAllByRole('img');
        
        images.forEach((image, index) => {
            expect(image).toHaveAttribute('alt', altTexts[index]);
        });
    });

    test('renders each image with correct styles', () => {
        render(<SearchBar />);
        
        const images = screen.getAllByRole('img');
        
        images.forEach((image) => {
            expect(image).toHaveClass('w-[25px] h-[26px]');
        });
    });
});
