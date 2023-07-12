<template>
  <v-stepper
    v-model="internalStepNumber"
    class="!tw-bg-transparent !tw-shadow-none tw-w-full"
  >
    <v-stepper-header class="tw-w-full !tw-shadow-none">
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
      >
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
          v-for="(step, index) in steps"
          :key="index"
        >
          <v-stepper-step
            :complete="internalStepNumber > index + 1"
            :step="index + 1"
            class="tw-cursor-pointer"
            @click="stepClicked(index + 1)"
          >
            {{ step }}
          </v-stepper-step>
          <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-w-[170px]"
            v-if="checkLastItemCondition(index)"
          >
            <div
              class="tw-h-[1px] tw-bg-dark-3 tw-w-[170px]"
              :class="{ '!tw-bg-white': internalStepNumber > index + 1 }"
            ></div>
          </div>
        </div>
      </div>
    </v-stepper-header>

    <v-stepper-items>
      <slot></slot>
    </v-stepper-items>
  </v-stepper>
</template>
<script lang="ts">
export default {
  props: { steps: { type: Array }, stepNumber: { type: Number, default: 0 } },
  data() {
    return {
      e1: 5,
    };
  },
  computed: {
    internalStepNumber: {
      set(newValue: number) {
        this.$emit("stepChanged", newValue);
      },
      get() {
        return this.stepNumber;
      },
    },
  },
  methods: {
    checkLastItemCondition(index: number) {
      return index < this.steps.length - 1;
    },
    stepClicked(step: number) {
      if (step < this.internalStepNumber) {
        this.$emit("stepClicked", step);
      }
    },
  },
};
</script>
<style scoped>
::v-deep .v-stepper__step {
  padding: 0px 0px !important;
}
::v-deep .v-stepper__step__step {
  @apply !tw-w-8 !tw-h-8 !tw-bg-transparent tw-border-solid tw-border-2 tw-border-dark-4 !tw-text-sm !tw-text-dark-3 !tw-font-semibold;
}

::v-deep .v-stepper__label {
  @apply !tw-text-sm !tw-font-normal !tw-text-dark-3;
}

::v-deep .v-stepper__step--active .v-stepper__step__step {
  @apply !tw-border-white !tw-text-white;
}

::v-deep .v-stepper__step--active .v-stepper__label,
::v-deep .v-stepper__step--complete .v-stepper__label {
  @apply !tw-text-white tw-font-medium tw-shadow-none;
  text-shadow: none !important;
}

::v-deep .v-stepper__step--complete .v-stepper__step__step {
  @apply !tw-text-black !tw-bg-white !tw-border-white;
}

::v-deep .v-stepper__step--complete .v-stepper__step__step .v-icon {
  @apply !tw-text-black;
}

::v-deep .v-stepper__content {
  padding: 0px !important;
  box-shadow: none !important;
}
</style>
