/* eslint-disable import/no-extraneous-dependencies */
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: [
    'src/withClientScripts.tsx',
    'src/ClientScript.tsx',
    'src/ClientWidget.tsx',
    'src/initWidgets.tsx'
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [typescript(), commonjs()],
  external: [
    'path',
    'chalk',
    'mini-css-extract-plugin',
    'react',
    'next/dist/next-server/lib/document-context',
    'next-transpile-modules'
  ]
};
