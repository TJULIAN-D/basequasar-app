Quasar App Extension Geolocation
===

This extension adds basic geolocation support (using navigator.geolocation).
The geolocation data is available in in a Vuex like structure.

## Demo project
https://github.com/tomers/quasar-geolocation-example

## Relevant documentation
- [Navigator.geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)

# Install
```bash
quasar ext add geolocation
```
Quasar CLI will retrieve it from NPM and install the extension.

## Prompts

> Install optional vue2-google-maps package

Allow automatic installation of [vue2-google-maps package](https://www.npmjs.com/package/vue2-google-maps),
pre-configured with a boot file, so that its components (e.g. GmapMap) are
ready to be used.

# Uninstall
```bash
quasar ext remove geolocation
```

# Info
Detail of Vuex-like actions and getters

## Usage Example
```vue
<template>
  <div v-if="hasPosition">
    Speed is {{ speed }}
  </div>
</template>
<script>
import { mapGeolocationActions, mapGeolocationGetters } from 'quasar-app-extension-geolocation/src/store'

export default {
  computed: {
    ...mapGeolocationGetters([
      'hasPosition',
      'speed'
    ])
  },
  created () {
    this.samplePosition()
  },
  methods: {
    ...mapGeolocationActions([
      'samplePosition',
    ])
  }
}
</script>

```

## Store actions
- `queryPermission`: query for geolocation permission
- `samplePosition`: query for current geolocation



## Store getters
### Permission status
- `isPermissionKnown`: whether permission has been acquired (by action `queryPermission`)
- `isPermissionGranted`
- `isPermissionPrompt`
- `isPermissionDenied`

### Position fields
The geolocation is given in an [GeolocationPosition](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition) struct that is converted to an object.
Getters are provided for each of its fields.

- `hasPosition`: whether a position has been acquired (by action `samplePosition`)
- `timestamp`: [GeolocationPosition.timestamp](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition/timestamp) of the sample
- `coords`: [GeolocationCoordinates](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates) (converted to object).
Alternatively, there is a getter for each of the coord fields:
    - `latitude`
    - `longitude`
    - `altitude`
    - `accuracy`
    - `altitudeAccuracy`
    - `heading`
    - `speed`

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
