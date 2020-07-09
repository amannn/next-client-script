import {DocumentContext} from 'next/dist/next-server/lib/document-context';
import React, {useContext, ScriptHTMLAttributes} from 'react';
import ClientScriptsByPath from './ClientScriptsByPath';

declare const CLIENT_SCRIPTS_BY_PATH: ClientScriptsByPath;

export default function ClientScript({
  async = true,
  type = 'text/javascript'
}: ScriptHTMLAttributes<HTMLScriptElement>) {
  const context = useContext(DocumentContext);
  const clientScriptsByPath = CLIENT_SCRIPTS_BY_PATH;

  // Query params and hashes are already removed from this path.
  const pagePath = context._documentProps.__NEXT_DATA__.page;
  const script = clientScriptsByPath[pagePath];

  if (!script) {
    return null;
  }

  return <script async={async} src={script} type={type} />;
}
