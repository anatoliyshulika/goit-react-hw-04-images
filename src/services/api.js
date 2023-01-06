import axios from 'axios';

const PER_PAGE = 12;
const API_KEY = '31319107-722dadb9eaa121b95e9a372a6';
// const API_KEY = '';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

async function fetchData(searchValue, page) {
  const response = await axios.get(
    `&q=${searchValue}&per_page=${PER_PAGE}&page=${page}`
  );
  if (response.status === 200) {
    const totalPage = Math.ceil(response.data.totalHits / PER_PAGE);
    const imgList = response.data.hits.map(
      ({ webformatURL, largeImageURL, tags, id }) => ({
        webformatURL,
        largeImageURL,
        tags,
        id,
      })
    );
    return { totalPage, imgList };
  } else {
    return Promise.reject();
  }
}

export default fetchData;
