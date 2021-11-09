import styles from './HomePage.module.css';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/movies-api';
import MoviesList from '../../components/MoviesList/MoviesList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI.fetchTrendingMovies().then(resp => {
      console.log(resp);
      setMovies(resp.results);
    });
  }, []);

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      <MoviesList movies={movies} />
    </>
  );
}
