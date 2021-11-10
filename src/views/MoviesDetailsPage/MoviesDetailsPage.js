import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, Link, Switch } from 'react-router-dom';
import { Route, useLocation, useHistory } from 'react-router-dom';
import styles from './MoviesDetailsPage.module.css';
import * as moviesAPI from '../../service/movies-api';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import notFoundImg from '../../images/error.jpg';
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

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    moviesAPI.getInfoAboutMovie(movieId).then(setMovie);
  }, [movieId]);

  const handleGoBackBtn = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <div>
      <GoBackBtn goBack={handleGoBackBtn} />
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : notFoundImg
          }
          alt={movie.title}
        />
        <div className={styles.info}>
          <h2 className={styles.title}>{movie.title}</h2>

          <h3 className={styles.subTitle}>
            User Score: {movie.vote_average * 10}%
          </h3>
          <h3 className={styles.subTitle}>Overview</h3>
          <p>{movie.overview}</p>
          <h3 className={styles.subTitle}>Genres</h3>
          {movie.genres &&
            movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
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
    </div>
  );
}
