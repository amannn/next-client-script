import {PageConfig} from 'next';
import Counter from 'components/Counter';
import Layout from 'components/Layout';
import Text from 'components/Text';

export const config: PageConfig = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Next.js on steroids
      </Text>
      <Text>
        This app uses a minimal runtime to make this counter interactive and
        avoids full-blown hydration.
      </Text>
      <Counter />
    </Layout>
  );
}
