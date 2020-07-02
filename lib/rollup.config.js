/* eslint-disable import/no-extraneous-dependencies */
import typescript from '@rollup/plugin-typescript';

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
  plugins: [typescript()],
  external: [
    'fs',
    'path',
    'mini-css-extract-plugin',
    'react',
    'next/dist/next-server/lib/document-context'
  ]
};
