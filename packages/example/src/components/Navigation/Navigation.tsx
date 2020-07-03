import styles from './Navigation.module.scss';

export default function Navigation() {
  // Since we're expecting full page reloads, we don't
  // need to use the link component from Next.js
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
