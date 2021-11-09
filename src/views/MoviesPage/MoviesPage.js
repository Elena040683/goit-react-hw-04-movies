import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Searchbar from '../../components/SearchBar/SearchBar';
import * as moviesAPI from '../../service/movies-api';
import Loader from '../../components/Loader/Loader';
import ErrorView from '../../components/ErrorView/ErrorView';
import MoviesList from '../../components/MoviesList/MoviesList';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      moviesAPI
        .searchMoviesByQuery(query)
        .then(({ results }) => {
          if (results.length === 0) {
            setError(`No results were found for ${query}!`);
            setStatus(Status.REJECTED);
            return;
          }
          setSearchQuery(query);
          setMovies(results);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  }, [location.search]);

  const onChangeQuery = newQuery => {
    if (searchQuery === newQuery) {
      return;
    }

    if (!searchQuery) return;

    setStatus(Status.PENDING);

    moviesAPI
      .searchMoviesByQuery(searchQuery)
      .then(({ results }) => {
        if (results.length === 0) {
          setError(`No results were found for ${searchQuery}!`);
          setStatus(Status.REJECTED);
          return;
        }
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
    setSearchQuery(newQuery);
    setError(null);
    setStatus(Status.IDLE);
  };

  const moviesListNotEmpty = movies.length !== 0;

  return (
    <>
      <Searchbar
        onSubmit={onChangeQuery}
        query={searchQuery}
        changeQuery={setSearchQuery}
      />
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorView message={error} />}
      {status === Status.RESOLVED && moviesListNotEmpty && (
        <MoviesList movies={movies} />
      )}
    </>
  );
}
