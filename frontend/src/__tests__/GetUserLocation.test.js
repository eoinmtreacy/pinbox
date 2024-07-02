import React from 'react';
import { render } from '@testing-library/react';
import GetUserLocation from '../components/GetUserLocation';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

jest.mock('react-leaflet', () => ({
  useMap: jest.fn(),
}));

jest.mock('leaflet', () => ({
  latLng: jest.fn(),
  circle: jest.fn().mockReturnThis(),
  map: jest.fn().mockReturnThis(),
  flyTo: jest.fn().mockReturnThis(),
  fitBounds: jest.fn().mockReturnThis(),
  getBounds: jest.fn().mockReturnThis(),
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
  zoomControl: { remove: jest.fn() },
}));

describe('GetUserLocation', () => {
  it('flies to Manhattan coordinates, adds a circle, fits bounds, and removes zoom control', () => {
    const mockMap = {
      flyTo: jest.fn(),
      fitBounds: jest.fn(),
      zoomControl: { remove: jest.fn() },
    };
    useMap.mockReturnValue(mockMap);
    L.latLng.mockReturnValue('manhattanCoordinates');
    L.circle.mockReturnValue({
      addTo: jest.fn().mockReturnThis(),
      getBounds: jest.fn().mockReturnValue('circleBounds'),
    });

    render(<GetUserLocation />);

    expect(L.latLng).toHaveBeenCalledWith(40.7831, -73.9712);
    expect(mockMap.flyTo).toHaveBeenCalledWith('manhattanCoordinates', 13);
    expect(L.circle).toHaveBeenCalledWith('manhattanCoordinates', { radius: 200 });
    expect(mockMap.fitBounds).toHaveBeenCalledWith('circleBounds');
    expect(mockMap.zoomControl.remove).toHaveBeenCalled();
  });
});