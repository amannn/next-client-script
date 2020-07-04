import Layout from 'components/Layout';
import Text from 'components/Text';
import Counter from '../components/Counter';

export const config = {
  unstable_runtimeJS: false
};

export default function Home() {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Next.js on steroids
      </Text>
      <Text>
        This app uses a minimal runtime for making this counter interactive and
        avoids full-blown hydration.
      </Text>
      <Counter />
    </Layout>
  );
}
