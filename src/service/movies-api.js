const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '286571d6f6f7efdc7929d8780c16da79';

async function fetchData(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies(page = 1) {
  return fetchData(
    `${BASE_URL}/trending/movie/day?api_key=${KEY}&page=${page}`
  );
}

export function searchMoviesByQuery(query) {
  return fetchData(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${query}&language=en-US&include_adult=false`
  );
}

export function getInfoAboutMovie(movieId) {
  return fetchData(`${BASE_URL}/movie/${movieId}?api_key=${KEY}`);
}

export function getInfoAboutCast(movieId) {
  return fetchData(`${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}`);
}

export function getUsersReviews(movieId) {
  return fetchData(`${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}`);
}
