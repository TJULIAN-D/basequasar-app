## BASE QUASAR  | 1.0.1

## Requirements

  - **Node.js `12.13.0`** (pinned in `.nvmrc`). This project uses Quasar CLI v1 (`@quasar/app` `^1.9.6`) with Webpack 4,
    which is **not compatible with modern Node versions** (Node >= 17 changed the default OpenSSL provider and breaks
    the build with errors like `error:0308010C:digital envelope routines::unsupported`). Use [nvm](https://github.com/nvm-sh/nvm)
    or [fnm](https://github.com/Schniz/fnm) to switch to the right version before installing/running the project:

    ```
    nvm use    # or: fnm use
    ```

  - **npm** (bundled with Node 12.13.0, ~v6.x)
  - No global CLI install is required, `npx quasar ...` uses the local `@quasar/app` dependency

## Installation

  ```
  - git clone https://github.com/imagina/basequasar-app.git
  - nvm use            # (or fnm use) to switch to the Node version in .nvmrc
  - npm i -f
  - cp .env-example .env    # then fill in BASE_URL and any other needed values
  ```

## Running the project

  ```
  npx quasar dev              # starts the dev server (SPA mode) on http://localhost:8080
  npx quasar build            # generates a production build in /dist/spa
  npx quasar build -m pwa     # generates a production build in /dist/pwa
  ```

  - **The `iadmin` workspace must always be built/deployed with `-m pwa`** (not the default SPA mode), since it
    depends on the service worker (push notifications, offline queueing, etc.) that only PWA mode registers.
    Don't confuse this Quasar CLI build **mode** (`spa`/`pwa`/`ssr`/...) with the app's own workspace **mode**
    (`iadmin` vs `ipanel`, configured in `@imagina/qsite/_config/master/application/app.js`) — that one is resolved
    at runtime from the URL path (`/iadmin/...` or `/ipanel/...`), both workspaces are served from the same build.

## Usage

  - You must config in `.env` the values to `BASE_URL` and 
  the pusher data if it's necessary
  
  - In `src/config/app.js` you can configure the next options for you APP:
    
    | Option | Description |
    | ------------- | ------------- |
    | isBackend | Define if your APP is front-end or back-end |
    | modules | Define the modules to use in your APP. this autload `store`, `apiRoutes`, `sidebars` and `pages` |
    | languages.default | Define the default language of your APP |
    | languages.availables | Define the available languages in your APP |
    | saveCache.refresh | Define the keys from storage to save when do refresh APP |
    | saveCache.logout | Define the keys from storage to save when do logout APP |
    | resetStores | Names of actions to reset stores form any module |
  
  - in `src-pwa/custom-service-worker` in the line `12` change baseUrl by backend URL
      
  - If you need change a page template from any packages, you must do it in `src/config/pages/index`  
    just before `export` this way:
    
    ```js
      pages.quser.login.layout = require('route-new-template').default
    ```  
  
## Boot files
  these files are executed before the site is rendered. Has access to `store`, `router`, `Vue`, `app`
  
  | Boot File | Description |
  | ------------- | ------------- |
  | axios | Contructor to `axios` and set `baseURL` based in URL HOST |
  | i18n | Contructor to `i18n`, load internationalisation and load translations from `src/i18n` |
  | middleware | Intercept all routes, validate authentication and permissions of route |
  | helper | Load helpers to project |
  | client-side | Load things only on the client side |
  | server-side | Load things only on the server side. Used to `SSR` |
  | components | Load global components in client and server side |
  | components-client-side | Load global components only in server side. Used to external libraries |
 
## Components  

  To register a global component you must do it in `src/plugins/globalComponents`

  | Name | Location | Global Name |
  | ------------- | ------------- | ------------- |
  | 404 | src/components/master/404 | <not-found> |
  | Not Results | src/components/master/notResults | `<not-result />` |
  | Upload Image | src/components/master/uploadImage | `< upload-image />` |
  | comments Facebook | src/components/master/commentsFB | - |
  | Dynamic Field | src/components/master/dynamicField | `<dynamic-field />` |
  | Imagina Logo SVG | src/components/master/imaginaSVG | - |
  | Inner Loading | src/components/master/innerLoading | `<inner-loading />` |
  | Recursive Item | src/components/master/recursiveItem | - |
  | Recursive List Select | src/components/master/recursiveListSelect | - |
  | Schedules | src/components/master/schedules | - |
  | Vue Tree Select | @riophae/vue-treeselect | `<tree-select />` |
  
## Pages
  to create new pege, add it in `src/config/pages/...` with next format:

  ```
    <page-name> : {
      permission: <permission-name>,              //if exist this field, will be validation to load page
      activated: true,                            //Status of page, only when is `true` will be loaded
      path: '/home',                              //path of page (url) after domain
      name: 'app.home',                           //Name of page, this is used in `Vue-router`
      layout: () => import('<location-layout>'),
      page: () => import('<oaction-page>'),
      title: 'sidebar.pageHome',                  //Title translatable
      icon: 'fas fa-home',                        //Icon name
      authenticated : true,                       //Required authentication to load page
      middleware : [],                            //Middleware route
      props : [],                                 //Props rouet
    }
  ```
  
  ###### Availables pages
  
  | Name | Route Name |
  | ------------- | ------------- |
  | Home | app.home |
 
## Store (VUEX)
   
   | Action | Description |
   | ------------- | ------------- |
   | app/REFRESH_PAGE | Force to re-render all project | 
   | app/RESET_STORE | Reset stores addedd in `src/config/app` - `resetStores` |
   
   | State | Description |
   | ------------- | ------------- |
   | `$store.state.app.baseUrl` | Has Base Url of project |
    
## i18n (internasionalitation)
  
  - To add new keys translatables in your APP, you must do it in 'src/i18n/lang-folder/ui' this way:
      
      > To call key from project, use prefix "ui" `$tr('ui.key-name')` and to call from package, use prefix 
              "module-name" `$tr('quser.key-name')`
              
      ```js
      {newKey : 'New key'} //Singular
      {newKey : 'New key | new keys'} //Plural option
      ```   
   
  - #### Usage
  
    | Sintax | Description | Params |
    | ------------- | ------------- | ------------- |
    | $tr('key', params : {}) | Singular translation | upperCase, capitalize |
    | $trp('key', params : {}) | Plural translation | upperCase, capitalize |
    | $trd('key', params : {}) | Date translation | type : [day, month, year, short, long, time] |
    | $trn('key', params : {}) | Number translation | type : [percent] *optional* |
    | $trc('num') | Currency translation | - |
 
  - To add new format translation, you must do it in `src/i18n/formats/customFormats`
   
## Global Helpers

  | Helper | Sintax | Description |
  | ------------- | ------------- | ------------- |
  | config | `config("key-name")` | You can use globally config keys |
  | env | `env("key-name")` | You can use globally `.env` keys |
  | clone | `$clone(data)` | Clone data |
  | uid | `$uid()` | Generate unic ID |
  | store | `$store` | Use store of VUEX |
  | alert | `$alert.<type>()` | Show a alert, like alert from `qhelper` |
  | array | `$array.<function>()` | Use array functions from `qhelper` |
  | date | `$date.<fucntion>()` | Use date functions from `qhelper` |
  | helper | `$helper.<fucntion>()` | Use helper functions from `qhelper` |
  | cache | `$cache.<fucntion>()` | Use cache functions from `qhelper` |
  | crud | `$crud.<fucntion>()` | Use service functions from `qcrud` |
  | auth.hasAccess | `$auth.hasAccess(<permission>)` | Validate Permissions of user |
  | auth.hasSetting | `$auth.hasSetting(<setting>)` | Validate Setting of project |
