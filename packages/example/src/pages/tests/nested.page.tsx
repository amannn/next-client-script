import {PageConfig} from 'next';
import Counter from 'components/Counter';
import Layout from 'components/Layout';
import Text from 'components/Text';

export const config: PageConfig = {
  unstable_runtimeJS: false
};

export default function Nested() {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Nested page
      </Text>
      <Counter />
    </Layout>
  );
}
