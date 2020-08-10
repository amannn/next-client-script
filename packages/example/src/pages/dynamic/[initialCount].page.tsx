import {
  PageConfig,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import Counter from 'components/Counter';
import Layout from 'components/Layout';
import Text from 'components/Text';

export const config: PageConfig = {
  unstable_runtimeJS: false
};

type Props = {
  initialCount: number;
};

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<Props> {
  if (typeof context.params?.initialCount !== 'string') {
    throw new Error(`Invalid initialCount: ${context.params?.initialCount}`);
  }

  return {props: {initialCount: parseInt(context.params.initialCount)}};
}

export default function Dynamic({initialCount}: Props) {
  return (
    <Layout>
      <Text as="h1" variant="title">
        Dynamic matching with path-to-regexp
      </Text>
      <Counter initialCount={initialCount} />
    </Layout>
  );
}
