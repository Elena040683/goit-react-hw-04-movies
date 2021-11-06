import styles from './HomeView.module.css';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/movies-api';

export function HomeView() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI.fetchTrendingMovies().then(setMovies);
  }, []);

  // const moviesListNotEmpty = movies.length !== 0;

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      {movies && movies.map(movie => <li key={movie.id}>{movie.title}</li>)}
    </>
  );
}
