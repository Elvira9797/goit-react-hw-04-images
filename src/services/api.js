import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?per_page=12&key=36397020-7287beafc150076ae86c61e54&image_type=photo&orientation=horizontal';

export const getImages = async (searchValue, page) => {
  const response = await axios.get(`&q=${searchValue}&page=${page}`);
  return response.data;
};
