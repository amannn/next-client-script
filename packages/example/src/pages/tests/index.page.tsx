import {PageConfig} from 'next';
import Image, {CssImage} from 'components/Image';
import Layout from 'components/Layout';
import Text from 'components/Text';
import Toggler from 'components/Toggler';

export const config: PageConfig = {
  unstable_runtimeJS: false
};

export default function Tests() {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Tests
      </Text>
      <div>
        <Image />
        <CssImage />
      </div>
      <div style={{marginTop: 10}}>
        <Toggler />
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
