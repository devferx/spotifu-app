import styles from "./LoadingView.module.css";

export const LoadingView = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};
