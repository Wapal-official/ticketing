<template>
  <div class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center">
    <div
      class="tw-w-full tw-py-24 tw-px-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-border-dark-4 tw-border tw-border-solid md:tw-px-32"
    >
      <h2 class="tw-text-base tw-font-semibold tw-text-center">
        {{ message }}
      </h2>
      <button-primary :title="buttonTitle" @click="$emit('click')">
        <template #prepend-icon>
          <i class="bx bx-plus tw-text-white tw-text-xl"></i>
        </template>
      </button-primary>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: { message: { type: String }, buttonTitle: { type: String } },
};
</script>
