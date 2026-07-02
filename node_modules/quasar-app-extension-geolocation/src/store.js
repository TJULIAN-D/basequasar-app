import Vue from "vue";

export const store = Vue.observable({
    position: null,
    permission: null
});

export const actions = {
    samplePosition (context) {
        return new Promise((resolve, reject) => {
            const geolocation = navigator && navigator.geolocation
            if (!geolocation) {
                console.error('Geolocation object not available')
                reject('Geolocation object not available')
            }
            geolocation.getCurrentPosition(
                position => {
                    const positionObj = cloneAsObject(position)
                    store.position = positionObj
                    resolve()
                },
                error => {
                    console.error(`Failed getting geolocation: ${error.message}`)
                    reject(error)
                })
        })
    },
    queryPermission (context) {
        return new Promise((resolve, reject) => {
            navigator.permissions.query({ name: 'geolocation' })
                .then((result) => {
                    // one of (granted, prompt, denied)
                    store.permission = result.state
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export const getters = {
    isPermissionKnown () {
        return store.permission !== null
    },
    isPermissionGranted () {
        return store.permission === 'granted'
    },
    isPermissionPrompt () {
        return store.permission === 'prompt'
    },
    isPermissionDenied () {
        return store.permission === 'denied'
    },
    hasPosition () {
        return store.position && store.position.timestamp != null
    },
    timestamp () {
        return store.position && store.position.timestamp
    },
    coords () {
        return store.position && store.position.coords
    },
    latitude () {
        return getters.coords && getters.coords().latitude
    },
    longitude () {
        return getters.coords && getters.coords().longitude
    },
    altitude () {
        return getters.coords && getters.coords().altitude
    },
    accuracy () {
        return getters.coords && getters.coords().accuracy
    },
    altitudeAccuracy () {
        return getters.coords && getters.coords().altitudeAccuracy
    },
    heading () {
        return getters.coords && getters.coords().heading
    },
    speed () {
        return getters.coords && getters.coords().speed
    }
}

function cloneAsObject (obj) {
    if (obj === null || !(obj instanceof Object)) {
        return obj
    }
    const temp = {}
    for (var key in obj) {
        temp[key] = cloneAsObject(obj[key])
    }
    return temp
}


// The following functions are copied from Vuex with slight modifications

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
    return Array.isArray(map)
        ? map.map(function (key) { return ({ key: key, val: key }) })
        : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }) })
}


/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {Object|Array} getters
 * @return {Object}
 */
export function mapGeolocationGetters (getterList) {
    return normalizeMap(getterList).reduce(function (acc, ref) {
        return { ...acc, [ref.key]: getters[ref.val] }
    }, {})
}

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export function mapGeolocationActions (actionsList) {
    return normalizeMap(actionsList).reduce(function (acc, ref) {
        return { ...acc, [ref.key]: actions[ref.val] }
    }, {})
}
