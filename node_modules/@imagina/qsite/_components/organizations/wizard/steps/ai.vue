<template>
  <div class="step-ai tw-overflow-y-hidden" >
    <div v-if="stepContent" class="tw-max-w-xl tw-mx-auto" :class="{'form-inactive' : !activeForm }">

      <h2 class="step-title">{{ stepContent.title  }}</h2>

      <div class="tw-flex tw-items-center tw-justify-center tw-mb-3">
        <q-toggle v-model="activeForm" color="primary"/>
        <div class="tw-pl-2 tw-text-xs md:tw-text-base text-justify">
          Usar Inteligencia Artificial para sugerencias de contenido en mi sitio web.
        </div>
      </div>
      <div class="tw-mt-6" v-if="activeForm">
        <div class="tw-pl-4 tw-text-xs">Completa el siguiente formulario </div>
          <div style="min-height: 100px">
            <dynamic-form
              v-model="form"
              :form-id="formId"
              formType="grid"
              no-actions
              ref="ai-form"
              default-col-class="col-6"
            />
          </div>
      </div>
    </div>

    <div v-if="stepContent" class="step-sidebar">
      <div class="select-ai tw-max-w-md tw-w-full">
        <div class="tw-text-base  tw-text-center tw-mb-10" v-html="stepContent.description"></div>
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
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeForm: false,
      stepContent: '',
      form: {},
      formId: '',
    }
  },
  mounted() {
    this.$nextTick(async function () {
      this.getData();
      this.getStepInfo();
    })
  },
  watch: {
    activeForm(newValue, oldValue) {
      storeWizard.data.form.check = newValue
      if(newValue){        
      } else  {
        storeWizard.data.form.data = false
      }
      this.$emit('updateData', newValue)
    }, 
    form(newValue, oldValue){
      storeWizard.data.form.data = newValue
    }
  },
  methods: {
    async getData() {
      if (storeWizard.data.form?.check) {        
        this.activeForm = storeWizard.data.form.check;
        this.form = storeWizard.data.form.data;
      }
    },
    async verifyForm(){
      try {
        let resp = false;
        if(this.$refs['ai-form']){
          let validate = await this.$refs['ai-form'].validateCompleteForm();
          if(validate){
            resp = true;
          }
        } else {
          console.log('no form')
        }
        return resp
      } catch (error) {
        console.log(error);
      }
    },
    async getStepInfo() {
      this.stepContent = storeWizard.infoAi
      this.formId = this.stepContent.formId;
    }
  }
}
</script>
<style>
.select-ai {
  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
.step-ai > .form-inactive {
  @apply tw-flex tw-flex-col tw-justify-center;
  height: calc(100vh - 320px);
}
.step-ai #dynamicFormComponent .box {
  @apply tw-shadow-none !important;
}
</style>
