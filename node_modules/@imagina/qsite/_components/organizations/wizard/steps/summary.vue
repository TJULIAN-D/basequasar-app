<template>
  <div class="step-summary">
    <div class="step-loading" v-if="loading"><div></div><div></div></div>
    <div class="row justify-center align-center" v-else>
      <div class="col-12 col-sm-10 col-md-11">
        <div class="tw-p-4 md:tw-p-4 tw-mx-auto lg:tw-w-3/5">
          <div v-if="stepContent" class="tw-text-xs md:tw-text-base text-center tw-font-bold tw-pb-4" 
              v-html="stepContent.description"> 
          </div> 
          
          <div class="row q-col-gutter-md" v-if="selected">
            <div class="col-12 col-md-7 tw-mt-3">

              <div class="selected-label">{{ $tr('isite.cms.label.user') }} </div>  
              <div class="selected-box ">
                {{selected.user.email}}
              </div> 

              <div class="selected-label">{{ $tr('isite.cms.label.organization') }}</div>  
              <div class="selected-box">
                {{selected.organization}}
              </div> 

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <div class="selected-label">{{ $tr('isite.cms.label.category') }}</div>  
                  <div class="selected-box selected-box-m">
                    {{selected.category.title}}
                  </div> 
                </div>
                <div class="col-12 col-md-6">
                  <div class="selected-label">{{ $tr('isite.cms.label.plan') }}</div>  
                  <div class="selected-box">
                    {{selected.plan.product.name}} {{selected.plan.optionValue}}
                  </div> 
                </div>
              </div>

              <div class="selected-label">{{ $tr('isite.cms.label.template') }}</div>  
              <div class="selected-box">
                <div class="tw-font-medium">{{ selected.layout.name }}</div>
                <div class="select-description" v-html="selected.layout.description"></div>
              </div> 

              <div v-if="selected.form.check">
                <div class="selected-label">Inteligencia Artificial</div>  
                <div class="selected-box">
                  Activado para sugerencias de contenido en mi sitio web.
                </div> 
              </div>

            </div>
            <div class="col-12 col-md-5">
              <q-img class="img-themes tw-h-44" contain
                      :src="selected.layout.mediaFiles.mainimage.extraLargeThumb"
              />
            </div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import storeWizard from './store/index.ts';

export default {
  components: {},
  data() {
    return {
      loading: false,
      selected: '',
      stepContent: ''
    }
  },
  mounted() {
    this.$nextTick(async function () {
      this.getStepInfo();
      this.getDataSelected();
    })
  },
  methods: {
    async getStepInfo() {
      this.stepContent = storeWizard.infoSummary
    },
    async getDataSelected() {
      try {
        this.loading = true;
        this.selected = storeWizard.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
<style scope>
.page-full .q-stepper__content  {
  width: 100% !important;
  min-height: 100vh !important;
  display: contents;
  background: -webkit-linear-gradient(right, #fff, #e4e2f2);
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
}
.page-full .q-stepper__nav  {
  width: 100% !important;
}
.page-full .img-themes {
  object-fit: contain;
  height: 50vh;
}
</style>