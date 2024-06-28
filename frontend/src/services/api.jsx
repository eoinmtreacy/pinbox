export const fetchPlaces = async () => {
  const response = await fetch('http://localhost:8000/app/get-places');
  return await response.json();
};

export const fetchFilePaths = async () => {
  const response = await fetch('file_paths.json');
  return await response.json();
};
