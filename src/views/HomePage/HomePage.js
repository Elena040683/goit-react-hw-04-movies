import styles from './HomePage.module.css';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/movies-api';
import MoviesList from '../../components/MoviesList/MoviesList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    moviesAPI.fetchTrendingMovies(page).then(resp => {
      console.log(resp);
      setMovies(resp.results);

      setMovies(movies => [...movies, ...resp.results]);
    });
    if (page !== 1) {
      scrollWindow();
    }
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMoreMovies = movies.length > 0 && movies.length >= 20;

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      <MoviesList movies={movies} />
      {loadMoreMovies && (
        <button className={styles.btn} type="button" onClick={loadMore}>
          Load more
        </button>
      )}
    </>
  );
}
