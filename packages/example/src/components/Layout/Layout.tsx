import Link from 'next/link';
import {ReactNode} from 'react';
import styles from './Layout.module.css';

type Props = {
  children: ReactNode;
};

export default function Layout({children}: Props) {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.link}>Home</a>
        </Link>
        <Link href="/test">
          <a className={styles.link}>Test</a>
        </Link>
      </nav>
      <main className={styles.children}>{children}</main>
    </div>
  );
}
