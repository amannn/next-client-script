import Layout from 'components/Layout';
import Counter from 'components/Counter';

export const config = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <h1>Nested page</h1>
      <Counter />
    </Layout>
  );
}
