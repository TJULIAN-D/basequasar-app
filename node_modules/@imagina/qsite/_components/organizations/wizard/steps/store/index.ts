import Vue, {reactive, computed} from 'vue';

import {  
  STEP_NAME_TERMS,
  STEP_NAME_COMPANY,
  STEP_NAME_CATEGORIES,
  STEP_NAME_THEMES,
  STEP_NAME_PLANS,
  STEP_NAME_WELCOME,
  STEP_NAME_SUMMARY,
  STEP_NAME_AI,
} from '@imagina/qsite/_components/organizations/wizard/steps/model/constant';

function findInfoWizard(key){
  return state.infoWizard.find((item) => item?.systemName === key);
}

//stores forms data, selections etc...
const data = {
  user: false,
  terms: {check: false, email: false },
  category: false,
  layout: false,
  plan: false,
  organization: '',
  form: {check: false, data: {}},
};

const state = reactive({
  infoWizard: [{systemName:''}],
  categories: false,
  step: 0,
  previousStepButton: true, 
  nextStepButton: true,
  data
})

const store = computed(() => ({
  get infoWizard(){
    return state.infoWizard;
  },
  set infoWizard(value){
    state.infoWizard = value
  },
  get categories(){
    return state.categories;
  },
  set categories(value){
    state.categories = value
  },
  
  get step(){
    return state.step;
  },
  set step(value){
    state.step = value
  },
  get previousStepButton(){
    return state.previousStepButton;
  },
  set previousStepButton(value){
    state.previousStepButton = value
  },
  get nextStepButton(){
    return state.nextStepButton;
  },
  set nextStepButton(value){
    state.nextStepButton = value
  },
  // data
  get data(){
    return state.data
  },
  set data(value){
    state.data = value
  },
 // data atributes  
  
  // getters //
  get infoWelcome(){
    return findInfoWizard(STEP_NAME_WELCOME);
  },
  get infoTerms(){
    return findInfoWizard(STEP_NAME_TERMS);
  },
  get infoCompany(){
    return findInfoWizard(STEP_NAME_COMPANY);
  },
  get infoCategories(){
    return findInfoWizard(STEP_NAME_CATEGORIES);
  },
  get infoPlans(){
    return findInfoWizard(STEP_NAME_PLANS);
  },
  get infoThemes(){
    return findInfoWizard(STEP_NAME_THEMES);
  },
  get infoAi(){
    return findInfoWizard(STEP_NAME_AI);
  },
  get infoSummary(){
    return findInfoWizard(STEP_NAME_SUMMARY);
  }

})).value;

export default store
