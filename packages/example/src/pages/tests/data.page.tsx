import Layout from 'components/Layout';

export const config = {
  unstable_runtimeJS: false
};

export function getServerSideProps() {
  return {
    props: {
      time: Date.now()
    }
  };
}

export default function Home({time}) {
  return (
    <Layout>
      <h1>Dynamic data from server</h1>
      <p>Server time: {new Date(time).toISOString()}</p>
    </Layout>
  );
}
