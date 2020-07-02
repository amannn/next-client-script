import Document, {Html, Head, Main, NextScript} from 'next/document';
import ClientScript from 'framework/ClientScript';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <ClientScript />
        </body>
      </Html>
    );
  }
}
