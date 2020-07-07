import {GetServerSidePropsResult, PageConfig} from 'next';
import Layout from 'components/Layout';
import Text from 'components/Text';

export const config: PageConfig = {
  unstable_runtimeJS: false
};

type Props = {
  time: number;
};

export function getServerSideProps(): GetServerSidePropsResult<Props> {
  return {
    props: {
      time: Date.now()
    }
  };
}

export default function Data({time}: Props) {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Dynamic data from server
      </Text>
      <Text>Server time: {new Date(time).toISOString()}</Text>
    </Layout>
  );
}
