import {PageConfig} from 'next';
import Layout from 'components/Layout';
import Image, {CssImage} from 'components/Image';
import Text from 'components/Text';

export const config: PageConfig = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Tests
      </Text>
      <div>
        <Image />
        <CssImage />
      </div>
      <div>
        <Text>
          <a href="/tests/nested">Nested link</a>
        </Text>
        <Text>
          <a href="/tests/data">Data</a>
        </Text>
      </div>
    </Layout>
  );
}
