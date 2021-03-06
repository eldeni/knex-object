const babelRc = {
  plugins: [
    [
      'module-resolver', {
        alias: {
          '@@src': './src/',
        },
      },
    ],
    // Stage 2
    ['@babel/plugin-proposal-decorators', {
      decoratorsBeforeExport: true,
      legacy: false,
      // legacy: true,
    }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    // "@babel/plugin-proposal-function-sent",
    // "@babel/plugin-proposal-export-namespace-from",
    // "@babel/plugin-proposal-numeric-separator",
    // "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    // "@babel/plugin-syntax-dynamic-import",
    // "@babel/plugin-syntax-import-meta",
    // "@babel/plugin-proposal-json-strings",
    'dynamic-import-node',
  ],
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: '8.11',
      },
    }],
    '@babel/preset-typescript',
  ],
};

module.exports = babelRc;
