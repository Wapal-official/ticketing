<template>
  <label
    class="tw-text-sm tw-font-medium tw-text-white tw-peer tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-select-none tw-relative"
  >
    <input
      v-model="internalValue"
      :value="displayValue"
      type="radio"
      class="tw-hidden tw-peer"
    />
    <span
      class="tw-w-4 tw-h-4 tw-rounded-full tw-bg-dark-6 tw-border tw-border-solid tw-border-dark-4 tw-peer peer-checked:tw-border-primary-1 peer-checked:tw-bg-dark-7 peer-checked:tw-border-4"
    ></span
    >{{ label }}</label
  >
</template>
<script lang="ts">
export default {
  props: {
    label: { type: String },
    value: { type: String },
    displayValue: { type: String },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newValue: string) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
<style scoped></style>
