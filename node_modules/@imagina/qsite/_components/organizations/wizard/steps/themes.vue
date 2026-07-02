<template>
  <div class="step-themes" >
    <h2 v-if="stepContent" class="step-title">{{stepContent.title}}</h2>

    <div class="step-loading" v-if="loading"><div></div><div></div></div>
    <div class="row tw-justify-center tw-px-2" v-else>
      <div class="col-12 tw-text-xs tw-mt-2 tw-px-3" v-if="selected">
        {{ $tr('isite.cms.message.selectedTemplate') }} : <span class="tw-font-bold"> {{selected.name}}</span>
      </div>
      <div class="col-12" v-if="themes.length>0">
        <div class="row">
          <div class="col-6 col-sm-3  tw-mb-2 tw-p-3 tw-cursor-pointer"
              v-for="(item, index) in themes">
            <div class="item-theme"
                :class="item.id === selected.id ? 'selectable--selected' : 'selectable'"
                @click="selectData(item)">
              <q-img contain
                    :src="item.mediaFiles.mainimage.smallThumb"
                    :ratio="1/1"
                    class="tw-border tw-w-full tw-bg-white"/>
              <div class="item-theme-name tw-text-xs text-center text-weight-bold">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 tw-text-base" v-else>
        {{ $tr('isite.cms.message.noTemplates') }}
      </div>
    </div>

    <div v-if="stepContent" class="step-sidebar">
      <div class="select-card tw-max-w-md tw-w-full text-center" v-if="selected">
        <q-img class="img-themes" contain
                :src="selected.mediaFiles.mainimage.extraLargeThumb"
        />
        <div class="select-name text-center text-weight-bold tw-mt-2 text-primary text-h6">
          {{ selected.name }}
        </div>
        <div class="select-description text-caption text-center tw-mb-3" v-html="selected.description"></div>
        <q-btn outline :label="$tr('isite.cms.message.showDemo')" color="primary" rounded
               :href="selected.url" target="_blank"  />
      </div>
      <div class="select-card tw-max-w-md tw-w-full" v-else>
        <div class="tw-text-base tw-mb-8 text-center" v-html="stepContent.description"></div>
        <q-img v-if="stepContent.mediaFiles" contain
                :src="stepContent.mediaFiles.mainimage.extraLargeThumb"
          />
      </div>
    </div>
  </div>
</template>
<script>
import storeWizard from './store/index.ts';

export default {
  data() {
    return {
      loading: false,
      stepContent: '',
      selected: '',
      themes: [],
    }
  },
  mounted() {
    this.$nextTick(async function () {      
      storeWizard.nextStepButton = false;
      this.getThemeSelected();
      this.getThemes();
      this.getStepInfo();
      this.forceScroll()
    })
  },
  methods: {
    selectData(item) {
      this.selected= item;
      storeWizard.data.layout = item
      storeWizard.nextStepButton = true;
      this.$emit('updateData', item)
    },
    async getThemeSelected() {
      try {        
        if(storeWizard.data.layout) {
          if(storeWizard.data.layout.planId == storeWizard.data.plan.planId) {
            this.selected=storeWizard.data.layout;
            storeWizard.nextStepButton = true;
          }
        }          
        this.loading = false;
        
      } catch (error) {
        console.log(error);
      }
    },
    async getThemes() {
      try {
        const plan = storeWizard.data.plan
        if(plan) {
          let themes = plan.planRelatedProducts;
          this.themes = themes.map((item) => ({
            ...item,
            planId: plan.planId
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    getStepInfo() {
      this.stepContent = storeWizard.infoThemes
    },
    forceScroll(){
      const scroll = document.getElementsByClassName('scroll')
      if(scroll){
        scroll[0].style.overflowY = 'scroll';
      }
    }
  }
}
</script>
<style>
.step-themes .select-card {
  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
.step-themes .item-theme  {
  @apply tw-relative;
  transition: all .1s;
}
.step-themes .item-theme-name {
  @apply tw-p-1 tw-mt-1;
}

.step-themes .step-sidebar-stretch {
  @apply tw-items-stretch !important;
}
.step-themes .img-themes {
  object-fit: contain;
  height: 60vh;
}
.step-themes .select-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
