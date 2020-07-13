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
  let initialCount;
  if (typeof context.params?.initialCount === 'string') {
    initialCount = parseInt(context.params.initialCount);
  }

  if (initialCount == null) {
    throw new Error('Please provide an `initialCount`.');
  }

  return {props: {initialCount}};
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
