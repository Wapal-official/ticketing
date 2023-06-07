<template>
  <v-dialog
    content-class="!tw-shadow-none !tw-w-full md:!tw-w-1/2 lg:!tw-w-1/3 3xl:!tw-w-1/4"
    v-model="showProgressModal"
    persistent
  >
    <div
      class="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-bg-[#141414] tw-rounded tw-px-8 tw-pt-4 tw-pb-8"
    >
      <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end">
        <button @click="$emit('closeProgressModal')" v-if="showClose">
          <v-icon class="!tw-text-white">mdi-close</v-icon>
        </button>
      </div>
      <h3 class="tw-text-2xl tw-font-semibold">Wallet Approval</h3>
      <div class="tw-h-[1px] tw-bg-[#ffffff4d] tw-w-full"></div>
      <h4 class="tw-text-lg tw-font-semibold">{{ name }}</h4>
      <p>
        {{ description }}
      </p>
      <div
        class="tw-rounded tw-bg-[#262525] tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-py-4 tw-px-4"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
          v-for="step in steps"
          :key="step.step"
        >
          <span>{{ step.step }}. {{ step.name }}</span>
          <div v-if="progress < step.step">
            <v-icon class="!tw-font-light !tw-text-[#ffffff4d]"
              >mdi-check-circle-outline</v-icon
            >
          </div>
          <div v-else>
            <div v-if="progress === step.step && !error">
              <v-progress-circular
                width="4"
                size="24"
                :color="defaultTheme.wapalPink"
                indeterminate
              ></v-progress-circular>
            </div>
            <div v-else>
              <v-icon
                class="!tw-font-light !tw-text-wapal-pink"
                v-if="progress > step.step"
                >mdi-check-circle-outline</v-icon
              >
              <v-icon class="!tw-font-light !tw-text-red-600" v-else
                >mdi-close-circle-outline</v-icon
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script lang="ts">
import Step from "@/interfaces/step";
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  props: {
    showProgressModal: { type: Boolean },
    showClose: { type: Boolean },
    name: { type: String },
    steps: { type: Array as () => Step[], default: () => [] },
    progress: { type: Number, default: 0 },
    error: { type: Boolean },
    description: { type: String },
  },
  data() {
    return {
      defaultTheme,
    };
  },
};
</script>
