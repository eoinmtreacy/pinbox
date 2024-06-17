import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders the Gyuwons PinBox text', () => {
    render(<Header />);
    const textElement = screen.getByText('Gyuwons PinBox');
    expect(textElement).toBeInTheDocument();
});

test('renders the Gyuwon image', () => {
    render(<Header />);
    const imageElement = screen.getByAltText('Gyuwon');
    expect(imageElement).toBeInTheDocument();
});

test('renders the Map image', () => {
    render(<Header />);
    const imageElement = screen.getByAltText('Map');
    expect(imageElement).toBeInTheDocument();
});

test('renders the List image', () => {
    render(<Header />);
    const imageElement = screen.getByAltText('List');
    expect(imageElement).toBeInTheDocument();
});
