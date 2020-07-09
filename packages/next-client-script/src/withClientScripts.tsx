import path from 'path';
import chalk from 'chalk';
import withTM from 'next-transpile-modules';
import webpack, {Compiler} from 'webpack';
import ClientScriptsByPath from './ClientScriptsByPath';

const NEXT_PATH = '/_next';
const NEXT_BUILD_PATH = './.next/';

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

        // By using this folder, we get immutable caching headers
        const PUBLIC_BASE_PATH = `/static/${buildId}/client/`;

        const clientEntries: {
          [path: string]: string;
        } = {};
        const clientScriptsByPath: ClientScriptsByPath = {};
        Object.entries(scriptsByPath).forEach(([pagePath, scriptPath]) => {
          let publicPath = PUBLIC_BASE_PATH + encodePath(scriptPath);
          if (dev) publicPath += '.js';

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
          // In development, we can handle the script simply as another entry point
          const originalEntry = config.entry as any;
          config.entry = () =>
            originalEntry().then((entry: any) => ({
              ...entry,
              ...clientEntries
            }));
        } else {
          // For the production build, we have to trigger a separate build where
          // only the client entries are compiled. A child compiler didn't work
          // during initial tests, as nothing was written to the file system.

          const clientConfig = {
            ...config,
            entry: clientEntries,
            output: {
              path: path.resolve(process.cwd(), NEXT_BUILD_PATH)
            },
            optimization: {
              ...config.optimization,
              // Output only a single JavaScript asset that
              // contains all necessary client code.
              runtimeChunk: undefined as undefined
            },
            plugins: (config.plugins || []).filter(
              (plugin: any) =>
                ![
                  // The manifest from the regular build should be used
                  'ReactLoadablePlugin',
                  'BuildManifestPlugin'
                ].includes(plugin.constructor.name)
            )
          };

          const compiler: Compiler = nextWebpack(clientConfig);
          compiler.run((compilerError, stats) => {
            let errorMessage;
            if (compilerError) {
              errorMessage = compilerError.message;
            }
            if (stats.compilation.errors.length > 0) {
              errorMessage = stats.compilation.errors
                .map((compilationError) => {
                  let message;
                  if (compilationError.message) {
                    message = compilationError.message;
                    if (compilationError.stack) {
                      message += '\n' + compilationError.stack;
                    }
                  } else {
                    try {
                      message = JSON.stringify(compilationError);
                    } catch (error) {
                      message = 'An unknown error happened.';
                    }
                  }
                  return message;
                })
                .join('\n\n');
            }
            if (errorMessage) {
              console.error(errorMessage);
              process.exit(1);
            }

            /* eslint-disable no-console */
            console.log(chalk.green('\nCreated client scripts'));
            Object.entries(scriptsByPath).forEach(([scriptPath, script]) => {
              console.log(`${scriptPath}: ${script}`);
            });
            console.log('\n');
            /* eslint-enable no-console */
          });
        }

        // Overload the Webpack config if it was already overloaded
        if (typeof (receivedConfig as any).webpack === 'function') {
          return (receivedConfig as any).webpack(config, options);
        }

        return config;
      }
    });
  };
};
