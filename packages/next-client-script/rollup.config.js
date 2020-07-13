/* eslint-disable import/no-extraneous-dependencies */
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

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
  external: Object.keys(pkg.dependencies)
    .concat(Object.keys(pkg.peerDependencies))
    .concat('next/dist/next-server/lib/document-context', 'path')
};
