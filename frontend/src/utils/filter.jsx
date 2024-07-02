import { fetchFilePaths } from '../services/api';

export const filterForPhotos = async (data) => {
    const filePaths = await fetchFilePaths();
    return data.filter(place => filePaths.includes(place.photo_0 + ".png"));
};
