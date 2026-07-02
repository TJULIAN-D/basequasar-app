<template>
  <div class="step-plan">
    <h2 v-if="stepContent" class="step-title">{{ stepContent.title }}</h2>
    <div class="step-loading" v-if="loading">
      <div></div>
      <div></div>
    </div>
    
    <div v-else>
      <div v-if="tab.length>0">
        <q-tabs
          v-model="tabActive"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
          class="tw-mb-4"
        >
          <q-tab :name="item.optionValue" :label="item.optionValue" v-for="(item, index) in tab" :key="index"/>
        </q-tabs>
        <q-tab-panels v-model="tabActive" animated>
          <q-tab-panel :name="element.optionValue" v-for="(element, i) in tab" :key="i">
            <q-list
                bordered
                separator
                class="tw-mb-4 cursor-pointer tw-rounded-md item-plan tw-mx-2 md:tw-mx-6"
                v-for="(item, index) in plans" :key="index"
                v-if="item.optionValue == element.optionValue"
                :class="{ activePlan : item.id === selected.id &&  item.planId === selected.planId}"
                @click="selectPlan(item)">

              <q-expansion-item
                expand-icon-toggle
                group="plans"
                v-model="item.active"
              >
                <template v-slot:header>
                  <q-item-section>
                    <div class="tw-text-lg tw-font-semibold"> {{ item.planName }}</div>
                    <div class="tw-text-xs">{{ item.planName }}</div>
                  </q-item-section>

                  <q-item-section side>
                    <div class="row items-center ">
                      <span class="tw-font-bold">{{ item.price }}</span> / {{ item.optionValue }}
                    </div>
                  </q-item-section>
                </template>
                <q-card>
                  <q-separator/>
                  <q-card-section v-html="item.planDescription"></q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>

          </q-tab-panel>
        </q-tab-panels>
      </div>
      <div class="text-center tw-mt-6" v-else>No hay planes disponibles</div>
    </div>

    <div class="step-sidebar">

      <q-card class="select-card tw-border-t-8 tw-max-w-lg" flat bordered v-if="selected">
        <q-card-section>
          <div class="text-h5 q-mb-xs">{{ selected.planName }}</div>
          <div class="text-caption text-grey overflow-ellipsis overflow-hidden"
               v-html="selected.planSummary"/>
          <div class="text-right">
            <span class="text-h6 tw-font-bold text-primary ">{{ selected.price }}</span> / {{ selected.optionValue }}
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="tw-text-xs" v-html="selected.planDescription"></q-card-section>
      </q-card>

      <div v-else-if="stepContent" class="select-card tw-max-w-md  tw-w-full">
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
import {
  PLAN_BASE_ID,
  STEP_NAME_PLANS
} from './model/constant.js';

export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      stepContent: '',
      tabActive: "",
      tab: [],
      selected: "",
      plans: [],
    }
  },
  inject: {
    infoBase: {
      type: Object,
      default: () => {
      },
    },
  },
  mounted() {
    this.$nextTick(async function () {
      storeWizard.nextStepButton = false;
      this.getData();
      this.getPlanSelected();
      this.getStepInfo();
    })
  },
  methods: {
    selectPlan(plan) {
      plan.active = !plan.active;
      this.selected = plan;
      storeWizard.data.plan = this.selected;
      storeWizard.nextStepButton = true;
      this.$emit('updateData', plan)

    },    
    async getPlanSelected() {
      try {
        if (storeWizard.data.plan) {
          this.selected = storeWizard.data.plan;
          this.tabActive = this.selected.optionValue;
          storeWizard.nextStepButton = true;
        }
        this.loading = false;

      } catch (error) {
        console.log(error);
      }
    },
    mapInfoPlan(plans) {
      if(plans.length>0) {
        this.tab = plans[0].optionValues.slice(0, 2).sort((a, b) => a.optionValue.localeCompare(b.optionValue));
        if (!this.tabActive) {
          this.tabActive = this.tab[0].optionValue;
        }
        let plan = [], planFilter = [];

        plans.map(function callback(currentValue, index) {
          const p = currentValue.optionValues.filter((item, index) => index < 2);
          planFilter = p.map((item) => ({
            ...item,
            product: currentValue,
            planId: currentValue.id,
            planName: currentValue.name,
            planSummary: currentValue.summary,
            planDescription: currentValue.description,
            planRelatedProducts: currentValue.relatedProducts,
            planUrl: currentValue.url,
            active: false,
          }));

          plan.unshift(planFilter);
        })

        return plan.flatMap(item => item);
      } else {
        return []
      }  
    },
    async getData() {      
      this.plans = this.mapInfoPlan(storeWizard.plans);
    },
    async getStepInfo() {
      this.stepContent = storeWizard.infoPlans
    },
  }
}
</script>
<style>
.step-plan .select-card {
  border-color: var(--q-color-primary);
  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.step-plan .item-plan {
  @apply tw-p-0 tw-relative;
  transition: background-color .1s, color .1s;
}

.step-plan .activePlan .q-item {
  @apply tw-text-white tw-rounded;
  background-color: var(--q-color-primary);
}

.step-plan .activePlan .q-expansion-item--collapsed {
  @apply tw-text-white tw-rounded-md;
}

.step-plan .activePlan .q-expansion-item--expanded {
  @apply tw-rounded-t-md tw-rounded-b-none;
  background-color: var(--q-color-primary);
}

.step-plan .activePlan .q-expansion-item__content {
  @apply tw-border;
  border-color: var(--q-color-primary);
}

.step-plan .activePlan .q-item__section--side {
  @apply tw-text-white tw-z-10;
  transition: color .1s;
}

.step-plan .item-plan .q-expansion-item:after {
  @apply tw-rounded-md tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-border;
  transition: border-color .2s, top .2s, right .2s, bottom .2s, left .2s;
  content: "";
  border-color: var(--q-color-primary);
}

.step-plan .activePlan .q-expansion-item:after, .step-plan .item-plan:hover .q-expansion-item:after {
  @apply tw--top-1.5 tw--right-1.5 tw--bottom-1.5 tw--left-1.5;
  border-color: var(--q-color-primary);
}

.step-plan .item-plan:hover  {
  background-color: var(--q-color-primary);
}
.step-plan .item-plan:hover .q-item__section--main,
.step-plan .item-plan:hover .q-item__section--side > .q-icon,
.step-plan .item-plan:hover .q-item__section--side .row.items-center {
  @apply tw-text-white;
}

</style>

