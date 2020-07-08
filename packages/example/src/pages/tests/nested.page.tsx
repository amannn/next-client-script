import {PageConfig} from 'next';
import Layout from 'components/Layout';
import Counter from 'components/Counter';
import Text from 'components/Text';

export const config: PageConfig = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Nested page
      </Text>
      <Counter />
    </Layout>
  );
}
