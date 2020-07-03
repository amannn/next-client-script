import Layout from 'components/Layout';
import Image from 'components/Image';

export const config = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <h1>Tests</h1>
      <div>
        <p>Image</p>
        <Image />
      </div>
      <div>
        <p>Nested link</p>
        <a href="/nested/page">Nested link</a>
      </div>
    </Layout>
  );
}
