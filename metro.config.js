// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Do stuff, eg:
// defaultConfig.resolver.assetExts.push('db');

module.exports = defaultConfig;
