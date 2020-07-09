import Head from 'next/head';
import {ReactNode} from 'react';
import Navigation from 'components/Navigation';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode;
};

export default function Layout({children}: Props) {
  return (
    <>
      <Head>
        <title>Next.js on steroids</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className={styles.root}>
        <Navigation />
        <main className={styles.children}>{children}</main>
      </div>
    </>
  );
}
