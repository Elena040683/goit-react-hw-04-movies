import styles from './App.module.css';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
// import { HomePage } from './views/HomePage/HomePage';
// import { MoviesPage } from './views/MoviesPage/MoviesPage';
// import { MoviesDetailsPage } from './views/MoviesDetailsPage/MoviesDetailsPage';
import NotFoundView from './views/NotFoundView/NotFoundView';
import Loader from 'react-loader-spinner';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-page" */)
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */)
);

const MoviesDetailsPage = lazy(() =>
  import(
    './views/MoviesDetailsPage/MoviesDetailsPage' /* webpackChunkName: "movie-details-page" */
  )
);

function App() {
  return (
    <div className={styles.App}>
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MoviesDetailsPage />
          </Route>

          {/* <Route path="/notFoundView">
            <NotFoundView />
          </Route> */}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
