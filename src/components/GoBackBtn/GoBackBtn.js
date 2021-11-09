import styles from './GoBackBtn.module.css';

const GoBackButton = ({ goBack }) => {
  return (
    <>
      <button className={styles.button} type="button" onClick={goBack}>
        GO BACK
      </button>
    </>
  );
};

export default GoBackButton;
