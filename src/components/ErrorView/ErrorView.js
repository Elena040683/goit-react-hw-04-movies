import errorImg from '../../images/error.jpg';

import PropTypes from 'prop-types';

import styles from './ErrorView.module.css';

export default function ErrorView({ message }) {
  return (
    <div role="alert" className={styles.wrapper}>
      <img src={errorImg} width="500" alt="Error" className={styles.errorImg} />
      <p className={styles.text}>{message}</p>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
