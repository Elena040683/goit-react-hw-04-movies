import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultImg from '../../images/defaultImg.jpg';
import * as moviesAPI from '../../service/movies-api';
import styles from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.getInfoAboutCast(movieId).then(resp => {
      // console.log(resp);
      setCast(resp.cast);
    });
  }, [movieId]);

  return (
    <div>
      {cast && (
        <ul className={styles.cast}>
          {cast.map(cast => (
            <li key={cast.id} className={styles.item}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                    : defaultImg
                }
                alt={cast.name}
                className={styles.photo}
              />
              <h2 className={styles.name}>{cast.name}</h2>
              <p className={styles.character}>{cast.character}</p>
            </li>
          ))}
        </ul>
      )}

      {cast.length === 0 && <p>There is no information about the cast.</p>}
    </div>
  );
}
