module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // assets: ['./src/assets/fonts'],
    plugins: [
      'react-native-reanimated/plugin', // Reanimated plugin has to be listed last.
    ],
  };
};
