const path = require('path')
const rewireAliases = require('react-app-rewire-aliases')
const {paths} = require('react-app-rewired')

module.exports = {
  webpackFinal: rewireAliases.aliasesOptions({
    '@krkls': path.resolve(__dirname, '..', `${paths.appSrc}/`),
  }),
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
}
