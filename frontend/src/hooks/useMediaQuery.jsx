import { useState, useEffect } from 'react';

/**
 * Custom hook to check if a media query matches the current screen size.
 * @param {string} query - The media query string.
 * @returns {boolean} - A boolean indicating if the media query matches.
 */
function useMediaQuery(query) {
  // Initialize state to track whether the media query matches or not.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a MediaQueryList object representing the specified media query string.
    const mediaQuery = window.matchMedia(query);

    // Update the state with the current match status of the media query.
    setMatches(mediaQuery.matches);

    // Define a handler function to update the state when the media query status changes.
    const handler = (event) => setMatches(event.matches);

    // Add an event listener to the MediaQueryList object to listen for changes.
    mediaQuery.addEventListener('change', handler);

    // Cleanup function to remove the event listener when the component is unmounted or query changes.
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]); // The effect depends on the 'query' parameter.

  // Return the current match status of the media query.
  return matches;
}

export default useMediaQuery;
