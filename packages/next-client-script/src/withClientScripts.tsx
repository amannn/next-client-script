/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import webpack, {Compiler} from 'webpack';
// Make sure we use the transitive dependency from
// Next.js, otherwise there can be build errors.
// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import withTM from 'next-transpile-modules';
import ClientScriptsByPath from './ClientScriptsByPath';

const NEXT_PATH = '/_next';
const PUBLIC_BASE_PATH = '/static/client/';

function encodePath(scriptPath: string) {
  return scriptPath.replace(/\W/g, '-').replace(/-(js|jsx|ts|tsx)$/, '');
}

module.exports = function withHydrationInitializer(scriptsByPath: {
  [path: string]: string;
}) {
  return function withHydration(receivedConfig: webpack.Configuration = {}) {
    // Since we use the `DefinePlugin` to inject the config into `ClientScript`,
    // we need to make sure that this package gets transpiled. Probably it would
    // also be possible to configure the loaders/plugin directly here without
    // using this dependency.
    return withTM(['next-client-script'])({
      ...receivedConfig,
      webpack(
        config: webpack.Configuration,
        options: {
          buildId: string;
          dev: boolean;
          isServer: boolean;
          webpack: any;
        }
      ) {
        const {buildId, dev, isServer, webpack: nextWebpack} = options;

        const clientEntries: {
          [path: string]: string;
        } = {};
        const clientScriptsByPath: ClientScriptsByPath = {};
        Object.entries(scriptsByPath).forEach(([pagePath, scriptPath]) => {
          let publicPath = PUBLIC_BASE_PATH + encodePath(scriptPath);
          if (!dev) publicPath += `-${buildId}`;
          else publicPath += '.js';

          clientScriptsByPath[pagePath] = NEXT_PATH + publicPath;
          if (!dev) clientScriptsByPath[pagePath] += '.js';

          const entryPointName = publicPath.substring(1);
          clientEntries[entryPointName] = scriptPath;
        });

        config = {
          ...config,
          plugins: config.plugins?.concat(
            new nextWebpack.DefinePlugin({
              CLIENT_SCRIPTS_BY_PATH: JSON.stringify(clientScriptsByPath)
            })
          )
        };

        if (isServer) {
          return config;
        }

        if (dev) {
          const originalEntry = config.entry as Function;
          config.entry = () =>
            originalEntry().then((entry: any) => ({
              ...entry,
              ...clientEntries
            }));

          // Overload the Webpack config if it was already overloaded
          if (typeof (receivedConfig as any).webpack === 'function') {
            return (receivedConfig as any).webpack(config, options);
          }

          return config;
        } else {
          const buildIdPath = path.resolve(process.cwd(), './.next/BUILD_ID');
          // TODO: create folder if it doesn't exist.
          // TODO: check what happens when the file already exists
          fs.writeFileSync(buildIdPath, buildId);

          const clientConfig = {
            ...config,
            entry: clientEntries,
            output: {
              path: path.resolve(process.cwd(), './.next/')
            },
            optimization: {
              ...config.optimization,
              // Output only a single JavaScript asset that
              // contains all necessary client code.
              runtimeChunk: undefined
            },
            plugins: (config.plugins || [])
              .filter(
                (plugin: any) =>
                  ![
                    // The manifest from the regular build should be used
                    'ReactLoadablePlugin',
                    'BuildManifestPlugin',

                    // Creates unnecessary sub folders
                    'NextMiniCssExtractPlugin'
                  ].includes(plugin.constructor.name)
              )
              .concat(
                // Ideally we'd ignore the CSS assets, but if we don't use
                // this plugin, the JS assets won't get emitted as well.
                new MiniCssExtractPlugin()
              )
          };

          const compiler: Compiler = nextWebpack(clientConfig);
          compiler.run((error, stats) => {
            let errorMessage;
            if (error) {
              errorMessage = error.message;
            }
            if (stats.compilation.errors.length > 0) {
              errorMessage = stats.compilation.errors
                .map((error) => {
                  let message;
                  if (error.message) {
                    message = error.message;
                    if (error.stack) {
                      message += '\n' + error.stack;
                    }
                  } else {
                    try {
                      message = JSON.stringify(error);
                    } catch (error) {
                      // Nothing to do.
                    }
                  }
                  if (!message) message = 'Unknown error happened';
                  return message;
                })
                .join('\n\n');
            }
            if (errorMessage) {
              console.error(errorMessage);
              process.exit(1);
            }

            console.log(chalk.green('\nCreated client scripts'));
            Object.entries(scriptsByPath).forEach(([path, script]) => {
              console.log(`${path}: ${script}`);
            });
            console.log('\n');
          });

          return config;
        }
      }
    });
  };
};
