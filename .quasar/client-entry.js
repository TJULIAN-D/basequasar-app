/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

import '@quasar/extras/material-icons/material-icons.css'




// We load Quasar stylesheet file
import 'quasar/dist/quasar.styl'




import 'src/css/app.styl'

import '@quasar/quasar-ui-qcalendar/src/index.sass'


import Vue from 'vue'
import createApp from './app.js'


import 'app/src-pwa/register-service-worker.js'




import qboot_Imaginaqsite_bootcoreaxios from '@imagina/qsite/_boot/core-axios'

import qboot_Imaginaqsite_bootcoreserverside from '@imagina/qsite/_boot/core-server-side'

import qboot_Imaginaqsite_bootcoremiddleware from '@imagina/qsite/_boot/core-middleware'

import qboot_Imaginaqsite_bootcorehelper from '@imagina/qsite/_boot/core-helper'

import qboot_Imaginaqsite_bootcorei18n from '@imagina/qsite/_boot/core-i18n'

import qboot_Imaginaqsite_bootcoreclientside from '@imagina/qsite/_boot/core-client-side'

import qboot_Imaginaqsite_bootcorecomponentsclientside from '@imagina/qsite/_boot/core-components-client-side'

import qboot_Imaginaqsite_bootcorecomponents from '@imagina/qsite/_boot/core-components'

import qboot_Bootserverside from 'boot/server-side'

import qboot_Bootclientside from 'boot/client-side'

import qboot_Quasarquasarappextensionqcalendarsrcbootregisterjs from '@quasar/quasar-app-extension-qcalendar/src/boot/register.js'



import { addPreFetchHooks } from './client-prefetch.js'









// Needed only for iOS PWAs
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {
  import(/* webpackChunkName: "fastclick"  */ '@quasar/fastclick')
}


async function start () {
  const { app, store, router } = await createApp()

  

  
  let routeUnchanged = true
  const redirect = url => {
    routeUnchanged = false
    window.location.href = url
  }

  const urlPath = window.location.href.replace(window.location.origin, '')
  const bootFiles = [qboot_Imaginaqsite_bootcoreaxios,qboot_Imaginaqsite_bootcoreserverside,qboot_Imaginaqsite_bootcoremiddleware,qboot_Imaginaqsite_bootcorehelper,qboot_Imaginaqsite_bootcorei18n,qboot_Imaginaqsite_bootcoreclientside,qboot_Imaginaqsite_bootcorecomponentsclientside,qboot_Imaginaqsite_bootcorecomponents,qboot_Bootserverside,qboot_Bootclientside,qboot_Quasarquasarappextensionqcalendarsrcbootregisterjs]

  for (let i = 0; routeUnchanged === true && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue,
        ssrContext: null,
        redirect,
        urlPath
      })
    }
    catch (err) {
      if (err && err.url) {
        window.location.href = err.url
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (routeUnchanged === false) {
    return
  }
  

  

    
    addPreFetchHooks(router, store)
    

    

    
      new Vue(app)
    

    

    

  

}

start()
