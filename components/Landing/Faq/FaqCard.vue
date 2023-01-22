<template>
  <div class="w-full md:font-light">
    <button @click="toggleAnswer">
      <h4
        class="text-sm flex flex-row items-center justify-between text-left gap-4 transition-all duration-200 ease-linear rounded px-4 py-2 border border-[#EA59BE] text-white md:text-lg lg:gap-12"
        :class="{ 'text-[#EA59BE] border-none': showAnswer }"
      >
        <slot name="question"></slot>
        <v-icon
          class="!transform"
          :class="{ '!rotate-90 !text-[#EA59BE]': showAnswer }"
          >mdi-chevron-right</v-icon
        >
      </h4>
    </button>
    <div
      class="px-4 overflow-hidden text-justify text-sm md:text-base !my-0 lg:max-w-[70%]"
      :class="{ 'h-full': showAnswer, 'h-0': !showAnswer }"
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
