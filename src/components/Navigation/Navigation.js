import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li>
          <NavLink
            exact
            to="/"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
