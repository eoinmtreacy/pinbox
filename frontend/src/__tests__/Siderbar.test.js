import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

describe('Sidebar', () => {
    test('renders all images', () => {
        render(<Sidebar />);
        
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(5);
    });

    test('renders correct alt text for each image', () => {
        render(<Sidebar />);
        
        const altTexts = ['mall', 'cafe', 'park', 'Pub', 'restaurant'];
        const images = screen.getAllByRole('img');
        
        images.forEach((image, index) => {
            expect(image).toHaveAttribute('alt', altTexts[index]);
        });
    });

    test('renders each image with correct styles', () => {
        render(<Sidebar />);
        
        const images = screen.getAllByRole('img');
        
        images.forEach((image) => {
            expect(image).toHaveClass('!absolute !w-[25px] !h-[26px] !top-[5px] !left-[5px]');
        });
    });
});
