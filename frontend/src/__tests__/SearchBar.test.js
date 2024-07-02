import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders search bar component', () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByPlaceholderText('Search');
    expect(searchBarElement).toBeInTheDocument();
});

test('updates input value on change', () => {
    render(<SearchBar />);
    const searchBarElement = screen.getByPlaceholderText('Search');
    fireEvent.change(searchBarElement, { target: { value: 'New York' } });
    expect(searchBarElement.value).toBe('New York');
});
