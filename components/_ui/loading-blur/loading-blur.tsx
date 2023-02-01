import styles from './loading-blur.module.css';

export const LoadingBlur = ({ loading, children }) => (
  <div className={styles.container} data-loading={loading}>
    {children}
  </div>
)
