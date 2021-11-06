import styles from './App.module.css';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { HomeView } from './views/HomeView/HomeView';
import { MoviesView } from './views/MoviesView/MoviesView';
import NotFoundView from './views/NotFoundView/NotFoundView';

function App() {
  return (
    <div className={styles.App}>
      <Navigation />

      <Switch>
        <Route exact path="/">
          <HomeView />
        </Route>

        <Route path="/movies">
          <MoviesView />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
