import Head from 'next/head';
import Image from 'components/Image';
import Layout from 'components/Layout';
import Counter from '../components/Counter';
import styles from './index.module.css';

export const config = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <h1 className={styles.title}>
        <span>Next.js on steroids</span>
        <Image />
      </h1>
      <Counter />
    </Layout>
  );
}
