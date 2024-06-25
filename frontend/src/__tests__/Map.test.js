import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomMap from '../components/Map';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe('CustomMap', () => {
  it('renders without crashing', () => {
    render(<CustomMap />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('fetches GeoJSON data successfully and renders GeoJSON component', async () => {
    const mockGeoJsonData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Test Nightclub',
            amenity: 'Nightclub'
          },
          geometry: {
            type: 'Point',
            coordinates: [-73.9914126, 40.7478017]
          }
        }
      ]
    };

    fetch.mockResponseOnce(JSON.stringify(mockGeoJsonData));

    render(<CustomMap />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('nightclub_amenities.geojson');
      expect(screen.getByText(/Test Nightclub/i)).toBeInTheDocument();
    });
  });

  it('handles preference toggle correctly', () => {
    render(<CustomMap />);
    const preferenceButton = screen.getByTestId('preference-toggle');
    expect(screen.queryByText(/Preference/i)).not.toBeInTheDocument();
    preferenceButton.click();
    expect(screen.getByText(/Preference/i)).toBeInTheDocument();
  });

  it('displays error message on GeoJSON data fetch failure', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    render(<CustomMap />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching GeoJSON data/i)).toBeInTheDocument();
    });
  });
});