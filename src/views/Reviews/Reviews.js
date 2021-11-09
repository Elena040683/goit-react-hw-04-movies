import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as moviesAPI from '../../service/movies-api';
import styles from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI.getUsersReviews(movieId).then(resp => {
      console.log(resp);
      setReviews(resp.results);
    });
  }, [movieId]);
  console.log(reviews);

  return (
    <>
      {reviews && (
        <ul className={styles.list}>
          {reviews.map(review => (
            <li key={review.id} className={styles.item}>
              <p className={styles.author}>{review.author}</p>
              <p className={styles.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && (
        <p className={styles.noText}>There are no reviews yet!</p>
      )}
    </>
  );
}
