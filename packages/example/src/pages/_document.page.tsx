import Document, {Html, Head, Main, NextScript} from 'next/document';
import ClientScript from 'next-client-script/dist/ClientScript';

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
