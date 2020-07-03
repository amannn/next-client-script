import Layout from 'components/Layout';
import Image, {CssImage} from 'components/Image';

export const config = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <h1>Tests</h1>
      <div>
        <Image />
        <CssImage />
      </div>
      <div>
        <p>
          <a href="/tests/nested">Nested link</a>
        </p>
        <p>
          <a href="/tests/data">Data</a>
        </p>
      </div>
    </Layout>
  );
}
