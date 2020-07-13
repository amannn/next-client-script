import {DocumentContext} from 'next/dist/next-server/lib/document-context';
import {pathToRegexp} from 'path-to-regexp';
import React, {useContext, ScriptHTMLAttributes} from 'react';
import ClientScriptsByPath from './ClientScriptsByPath';

declare const CLIENT_SCRIPTS_BY_PATH: ClientScriptsByPath;

const clientScriptsByPathRegex = Object.entries(CLIENT_SCRIPTS_BY_PATH).map(
  ([path, clientScript]) => ({
    pathRegex: pathToRegexp(path),
    clientScript
  })
);

export default function ClientScript({
  async = true,
  type = 'text/javascript',
  ...rest
}: ScriptHTMLAttributes<HTMLScriptElement>) {
  const context = useContext(DocumentContext);

  // Query params and hashes are already removed from this path.
  const pagePath = context._documentProps.__NEXT_DATA__.page;

  const match = clientScriptsByPathRegex.find((cur) =>
    cur.pathRegex.test(pagePath)
  );

  if (!match) {
    return null;
  }

  return (
    <script async={async} src={match.clientScript} type={type} {...rest} />
  );
}
