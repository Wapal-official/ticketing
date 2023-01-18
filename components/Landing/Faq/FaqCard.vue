<template>
  <button @click="toggleAnswer">
    <div
      class="flex flex-col items-start justify-start rounded px-4 py-4 border border-[#EA59BE] text-white transition-all duration-200 ease-linear"
      :class="{ 'gap-2 border-none': showAnswer }"
    >
      <h4
        class="text-sm md:text-lg flex flex-row items-center justify-between w-full text-left gap-4 transition-all duration-200 ease-linear"
        :class="{ 'text-[#EA59BE]': showAnswer }"
      >
        <slot name="question"></slot>
        <v-icon
          class="!transform"
          :class="{ '!rotate-90 !text-[#EA59BE]': showAnswer }"
          >mdi-chevron-right</v-icon
        >
      </h4>
      <p
        class="overflow-hidden text-left text-sm md:text-base !my-0"
        :class="{ 'h-full': showAnswer, 'h-0': !showAnswer }"
      >
        <slot name="answer"></slot>
      </p>
    </div>
  </button>
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
