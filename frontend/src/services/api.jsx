export const fetchPlaces = async () => {
    try {
        const response = await fetch('http://localhost:8000/app/get-places');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return { error: true, message: error.message };
    }
};

export const fetchFilePaths = async () => {
    const response = await fetch('file_paths.json');
    return await response.json();
};
