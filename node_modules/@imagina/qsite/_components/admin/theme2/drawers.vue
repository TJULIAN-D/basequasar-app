<template>
  <div id="masterDrawers2">
    <!-- MENU -->
    <q-drawer id="menuMaster2" class="no-shadow" v-model="drawer.menu" ref="menuMaster"
              :mini="miniState" @click.capture="miniState ? $eventBus.$emit('toggleMasterDrawer','menu') : null">
      <!--Logo-->
      <div v-show="!miniState" id="logoSite2" class="relative-position">
        <q-img contain :src="logo" style="height: 80px; min-height: 80px"/>
      </div>
      <div v-if="miniState" id="miniLogoSite">
        <q-img contain :src="minilogo"/>
      </div>
      <!--List iadmin-->
      <q-scroll-area id="adminMenu" class="bg-primary" :style="`height: calc(100vh - 146px`">
        <!--Menu-->
        <menu-list ref="menuList" group :translatable="menuTranslatable" :menu="menuSelect"
                   :with-tooltip="miniState" :tooltip-props="{anchor:'center right'}"/>
      </q-scroll-area>
    </q-drawer>

    <!-- Config -->
    <q-drawer bordered id="configMaster" overlay v-model="drawer.config" side="right">
      <config-list/>
    </q-drawer>

    <!-- Chat -->
    <q-drawer bordered id="chatMaster" overlay v-model="drawer.chat" side="right"
              v-if="$auth.hasAccess('ichat.conversations.index')">
      <chat-list/>
    </q-drawer>

    <!--Recommendation-->
    <q-drawer id="drawerRecommendationMaster" v-model="drawer.recommendation" side="right" :overlay="false"
              v-if="routeSubHeader.recommendations ? true : false">
      <master-recommendation/>
    </q-drawer>

    <!--Notification-->
    <master-notifications :is-open="drawer.notification" :isMobile="this.windowSize == 'mobile' ? true : false"/>
  </div>
</template>
<script>
//mixins
import sidebarMixins from '@imagina/qsite/_mixins/sidebarMixins'
//Components
import configList from '@imagina/qsite/_components/master/configList'
import chatList from '@imagina/qchat/_components/drawerChatList'
import menuList from '@imagina/qsite/_components/master/recursiveItem'
import checkin from '@imagina/qcheckin/_components/checkin'
import masterRecommendation from '@imagina/qsite/_components/master/masterRecommendations'
import masterNotifications from '@imagina/qnotification/_components/drawerNotifications'

export default {
  beforeDestroy() {
    this.$eventBus.$off('toggleMasterDrawer')
    this.$eventBus.$off('openMasterDrawer')
  },
  mixins: [sidebarMixins],
  props: {},
  components: {menuList, configList, chatList, checkin, masterRecommendation, masterNotifications},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      windowHeight: window.innerHeight,
      windowWith: window.innerWidth,
      projectName: this.$store.getters['qsiteApp/getSettingValueByName']('core::site-name'),
      logo: this.$store.state.qsiteApp.logo,
      miniState: this.windowSize == 'mobile' ? false : true,
      drawer: {
        menu: false,
        config: false,
        chat: false,
        checkin: false,
        recommendation: false,
        notification: false
      },
      appConfig: config('app')
    }
  },
  computed: {
    windowSize() {
      return this.windowWith >= '992' ? 'desktop' : 'mobile'
    },
    primaryContrast() {
      return this.$store.getters['qsiteApp/getSettingValueByName']('isite::primaryContrast')
    },
    secondaryContrast() {
      return this.$store.getters['qsiteApp/getSettingValueByName']('isite::secondaryContrast')
    },
    minilogo() {
      return this.$store.getters['qsiteApp/getSettingMediaByName']('isite::logoIadminSM')['path']
    },
    routeSubHeader() {
      this.drawer.recommendation = false
      return this.$route.meta.subHeader || {}
    },
    //Version app text
    versionText() {
      return 'v' + config('app.version')
    },
    openMenu: {
      get() {
        return this.drawer.menu
      },
      set(value) {
        this.drawer.menu = value;
      }
    },
  },
  methods: {
    //init
    init() {
      this.handlerEvent()
      this.contrast()
      //Watch window size
      window.addEventListener('resize', () => {
        this.windowHeight = window.innerHeight
        this.windowWith = window.innerWidth
      })
      this.openMenu = this.windowSize == 'mobile' ? false : true;
    },
    //contrast color alter
    contrast() {
      const master = document.querySelector('#masterDrawers2')
      if (!master) return '#000000';
      const bgColor = getComputedStyle(master).getPropertyValue('--q-color-primary')
      const contrast = this.$helper.pickTextColor(bgColor)
      const bgColor2 = getComputedStyle(master).getPropertyValue('--q-color-secondary')
      const contrast2 = this.$helper.pickTextColor(bgColor2)
      this.primaryContrast ? master.style.setProperty('--q-color-contrast', this.primaryContrast) : master.style.setProperty('--q-color-contrast', contrast)
      this.secondaryContrast ? master.style.setProperty('--q-color-contrast-two', this.secondaryContrast) : master.style.setProperty('--q-color-contrast-two', contrast2)
      return this.primaryContrast ? this.primaryContrast : contrast
    },
    handlerEvent() {
      //handler toggleMasterDrawer
      this.$eventBus.$on('toggleMasterDrawer', (drawerName) => this.toggleDrawer(drawerName))
      //handler openMasterDrawer
      this.$eventBus.$on('openMasterDrawer', (drawerName) => this.drawer[drawerName] = true)
    },
    //Show drawer specific
    toggleDrawer(drawerName) {
      //Hidden all drawers
      for (var drawer in this.drawer) {
        if (drawer != drawerName) {
          if ((drawer == 'menu') && (this.windowSize != 'mobile')) {
            this.miniState = true
          } else {
            this.drawer[drawer] = false
          }
        }
      }
      //Toogle drawer
      if (drawerName == 'menu') {
        if (this.windowSize == 'mobile') {
          this.miniState = false
          this.drawer.menu = !this.drawer.menu
        } else {
          this.drawer.menu = true
          this.miniState = !this.miniState
        }
      } else {
        this.drawer[drawerName] = !this.drawer[drawerName]
      }
    }
  }
}
</script>
<style lang="stylus">
#masterDrawers2
  background-color $primary

  #menuMaster2
    aside
      background $primary
      z-index 3000

    #logoSite2
      padding 20px 25px 26px 25px
      height 120px
      background-color #FFFFFF

    #miniLogoSite
      padding 30px 7px
      height 120px
      background-color #FFFFFF

    #versionContent
      padding 3px 15px
      font-size 13px

    .q-item
      padding-left 0
      background-color $primary
      min-height 50px
      color var(--q-color-contrast)

      .q-focus-helper
        opacity 0

      .q-item__section--avatar
        padding 0 18px !important

      .q-item__section
        font-weight 600

      .q-item__section, .q-icon
        color var(--q-color-contrast)

    .content-item
      > .q-item
        .q-item__section--main
          font-size 16px

        .q-icon
          font-size: 20px

        &:hover, &.item-is-active
          background-color $secondary
          border-radius: 0 15px 15px 0
          font-weight 900

      > .q-expansion-item
        background-color $primary

        .q-expansion-item__container > .q-item
          .q-item__label
            font-size 15px

          .q-icon
            font-size: 20px

          &:hover, &.item-is-active
            border-radius: 0 15px 15px 0
            background-color $secondary
            font-weight 900

        .q-expansion-item__container > .q-expansion-item__content
          padding 0 0 0 3px
          border-left 18px solid $primary

          #listMenu
            .content-item
              border-left 3px solid $secondary

          .q-item
            min-height 40px
            margin-left -1px

            .q-item__section, .q-icon
              color var(--q-color-contrast)
              font-size 14px
              font-weight 600

            .q-icon
              display none

            &:hover, &.item-is-active
              background-color $secondary

              .q-item__section, .q-icon
                color var(--q-color-contrast)

    .expansion-selected
      background-color $primary

    .q-drawer--mini .q-item
      border-radius 0 !important

</style>
