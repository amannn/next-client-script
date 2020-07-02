import Head from 'next/head';
import Layout from 'components/Layout';
import Counter from '../components/Counter';
import styles from './test.module.css';

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

      <main>
        <h1>Test page</h1>
        <Counter />
      </main>
    </Layout>
  );
}
