import Layout from 'components/Layout';
import ReactComponent from 'components/ReactComponent';
import Text from 'components/Text';

export default function ReactPage() {
  return (
    <Layout>
      <Text as="h1" variant="title">
        React on the client side
      </Text>
      <ReactComponent />
    </Layout>
  );
}
