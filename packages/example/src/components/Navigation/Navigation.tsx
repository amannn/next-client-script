import styles from './Navigation.module.scss';

export default function Navigation() {
  // Since we're expecting full page reloads, we don't
  // need to use the link component from Next.js
  return (
    <nav className={styles.root}>
      <div className={styles.internal}>
        <a className={styles.link} href="/">
          Home
        </a>
        <a className={styles.link} href="/tests">
          Tests
        </a>
      </div>
      <a
        className={styles.link}
        href="https://github.com/amannn/next-client-script"
      >
        Github
      </a>
    </nav>
  );
}
