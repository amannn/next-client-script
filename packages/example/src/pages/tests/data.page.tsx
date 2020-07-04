import Layout from 'components/Layout';
import Text from 'components/Text';

export const config = {
  unstable_runtimeJS: false
};

export function getServerSideProps() {
  return {
    props: {
      time: Date.now()
    }
  };
}

export default function Home({time}) {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Dynamic data from server
      </Text>
      <Text>Server time: {new Date(time).toISOString()}</Text>
    </Layout>
  );
}
