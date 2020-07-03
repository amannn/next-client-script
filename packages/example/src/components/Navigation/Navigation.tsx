import styles from './Navigation.module.scss';

export default function Menu() {
  return (
    <nav className={styles.root}>
      <a className={styles.link} href="/">
        Home
      </a>
      <a className={styles.link} href="/tests">
        Tests
      </a>
      <a className={styles.link} href="/react">
        React
      </a>
    </nav>
  );
}
