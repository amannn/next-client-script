import ClientScript from 'next-client-script/dist/ClientScript';
import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class CustomDocument extends Document {
  public render() {
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
