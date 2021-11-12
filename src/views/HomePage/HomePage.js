import styles from './HomePage.module.css';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../../service/movies-api';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from 'react-loader-spinner';
import NotFoundView from '../NotFoundView/NotFoundView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('Status.IDLE');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(Status.PENDING);
    moviesAPI
      .fetchTrendingMovies(page)
      .then(resp => {
        // console.log(resp);
        // setMovies(movies => [...movies, ...resp.results]);
        setMovies(resp.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });

    if (page !== 1) {
      scrollWindow();
    }
  }, [page, error]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMoreMovies = movies.length > 0;

  return (
    <div>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <NotFoundView />}

      {status === Status.RESOLVED && (
        <>
          <h2 className={styles.title}>Trending today</h2>
          <MoviesList movies={movies} />

          {loadMoreMovies && (
            <button className={styles.btn} type="button" onClick={loadMore}>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}
