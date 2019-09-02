module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
