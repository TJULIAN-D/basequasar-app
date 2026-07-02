/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */
module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0')

  if (api.prompts.installVueGoogleMaps) {
    // extend quasar.conf
    api.extendQuasarConf((conf, api) => {
      // make sure google-maps boot file is registered
      conf.boot.push('~quasar-app-extension-geolocation/src/boot/google-maps.js')
      console.log(` App Extension (qwindow) Info: 'Adding google-maps boot reference to your quasar.conf.js'`)

      // make sure boot & component files transpile
      conf.build.transpileDependencies.push(/quasar-app-extension-geolocation[\\/]src/)
    })
  }
}
