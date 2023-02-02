<template>
  <div class="tw-w-full md:tw-font-light">
    <button @click="toggleAnswer">
      <h4
        class="tw-text-sm tw-flex tw-flex-row tw-items-center tw-justify-between tw-text-left tw-gap-4 tw-transition-all tw-duration-200 tw-ease-linear tw-rounded tw-px-4 tw-py-2 tw-border tw-border-[#EA59BE] tw-text-white md:tw-text-lg lg:tw-gap-12"
        :class="{ 'tw-text-[#EA59BE] tw-border-none': showAnswer }"
      >
        <slot name="question"></slot>
        <v-icon
          class="!tw-transform"
          :class="{ '!tw-rotate-90 !tw-text-[#EA59BE]': showAnswer }"
          >mdi-chevron-right</v-icon
        >
      </h4>
    </button>
    <div
      class="tw-px-4 tw-overflow-hidden tw-text-justify tw-text-sm md:tw-text-base !tw-my-0 lg:tw-max-w-[70%]"
      :class="{ 'tw-h-full': showAnswer, 'tw-h-0': !showAnswer }"
    >
      <slot name="answer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return { showAnswer: false };
  },
  methods: {
    toggleAnswer() {
      this.showAnswer = !this.showAnswer;
    },
  },
};
</script>
