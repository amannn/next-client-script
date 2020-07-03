import Head from 'next/head';
import Layout from 'components/Layout';
import ReactComponent from 'components/ReactComponent';

export default function Home() {
  return (
    <Layout>
      <h1>React on the client side</h1>
      <ReactComponent />
    </Layout>
  );
}
