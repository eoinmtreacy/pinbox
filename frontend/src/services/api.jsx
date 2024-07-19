export const fetchFilePaths = async () => {
  const response = await fetch('/file_paths.json');
  return await response.json();
};
