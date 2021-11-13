import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, Link, Switch } from 'react-router-dom';
import { Route, useLocation, useHistory } from 'react-router-dom';
import styles from './MoviesDetailsPage.module.css';
import * as moviesAPI from '../../service/movies-api';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

// import Cast from '../Cast/Cast';
// import Reviews from '../Reviews/Reviews';

const Cast = lazy(
  () => import('../Cast/Cast') /* webpackChunkName: "cast-page" */
);
const Reviews = lazy(
  () => import('../Reviews/Reviews') /* webpackChunkName: "reviews-page" */
);
export default function MoviesDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    moviesAPI.getInfoAboutMovie(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBackBtn = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <div>
      <GoBackBtn goBack={handleGoBackBtn} />
      {movies && (
        <>
          <div className={styles.wrapper}>
            <div>
              {movies.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                  alt={movies.title}
                  className={styles.image}
                />
              )}
            </div>

            <div className={styles.info}>
              <h2 className={styles.title}>{movies.title}</h2>

              <h3 className={styles.subTitle}>
                User Score: {movies.vote_average * 10}%
              </h3>
              <h3 className={styles.subTitle}>Overview</h3>
              <p>{movies.overview}</p>
              <h3 className={styles.subTitle}>Genres</h3>
              {movies.genres &&
                movies.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
            </div>
          </div>
          <hr />

          <ul className={styles.additional}>
            <li>
              <Link
                className={styles.link}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state },
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state },
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>

          <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
              <Route path="/movies/:movieId/cast">
                <Cast />
              </Route>

              <Route path="/movies/:movieId/reviews">
                <Reviews />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </div>
  );
}
