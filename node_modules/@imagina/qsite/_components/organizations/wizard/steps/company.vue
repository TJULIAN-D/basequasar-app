<template>
  <div class="step-company">
    <div v-if="stepContent" class="tw-pt-10">
      <h2 class="step-title">{{ stepContent.title }}</h2>
      <div class="tw-text-base tw-px-2 md:tw-px-14 tw-text-center tw-mb-10" v-html="stepContent.description"></div>
    </div>

    <div class="tw-px-2 md:tw-px-10 tw-mb-8">
      <dynamic-field v-model="name" :field="formFields.nameOrganizations"/>
    </div>

    <div v-if="stepContent" class="step-sidebar">
      <div class="select-company tw-max-w-md tw-w-full">
        <q-img v-if="stepContent.mediaFiles" contain
               :src="stepContent.mediaFiles.mainimage.extraLargeThumb"
               :ratio="1/1"
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
      name: '',
      stepContent: '',
    }
  },  
  mounted() {
    this.$nextTick(async function () {
      this.getData();
      this.getStepInfo();
    })
  },
  watch: {
    name(newName, oldName) {
      if(newName){
        this.checkName();  
      }      
    }
  },
  computed: {
    formFields() {
      return {
        nameOrganizations: {
          type: "input",
          props: {
            icon: "corporate_fare",
            label: this.$tr('isite.cms.form.name'),
            color: "primary",
            rounded: true,
            dense: false
          },
        }
      };
    },
  },
  methods: {
    async getData() {      
      if (storeWizard.data.organization !== '') {
        this.name = storeWizard.data.organization;
      }
    },
    checkName() {
      if (this.name.length > 5) {
        storeWizard.nextStepButton = true;
        storeWizard.data.organization = this.name;
      } else {
        storeWizard.nextStepButton = false
      }
    },
    getStepInfo() {
      this.stepContent = storeWizard.infoCompany
    },
    async checkOrganizationName(name){
      return new Promise((resolve, reject) => {
        //Requets params
        let requestParams = {
          refresh: true,
          params: {
            filter: {field: 'title'}
          }
        }
        //Request        
        this.$crud.show('apiRoutes.qsite.organizations', name, requestParams).then(response => {        
          resolve(response.data)
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {        
            reject(error)
          })
        })
      })    
    }
  }
}
</script>
<style>
.select-company {
  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.step-company {
  @apply tw-flex tw-flex-col tw-justify-center;
  height: calc(100vh - 320px)
}
</style>
