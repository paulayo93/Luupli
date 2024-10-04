module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-private-methods', {
      'loose': true,
    }],
    [

      'module-resolver',

      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {

          '@images': './assets/images',
          '@icons': './assets/icons/*',
          '@components': './src/components',
          '@store': './src/store',
          '@utils': './src/utils',
          '@screens/*': './src/screens/*',
          '@types': './src/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
