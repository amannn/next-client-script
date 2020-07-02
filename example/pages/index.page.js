import Head from 'next/head';
import Image from 'components/Image';
import Counter from '../components/Counter';
import styles from './index.module.css';

export const config = {
  unstable_runtimeJS: false,
};

export default function Home() {
  return (
    <div className={styles.root}>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <h1 className={styles.title}>
          <span>Next.js on steroids</span>
          <Image />
        </h1>
        <Counter />
      </main>
    </div>
  );
}
