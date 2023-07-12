<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
  >
    <label
      v-if="label"
      class="tw-text-white tw-text-sm tw-font-medium"
      :class="
        required
          ? `after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2`
          : ''
      "
      >{{ label }}</label
    >

    <div class="tw-relative tw-w-full">
      <v-text-field
        v-model="internalValue"
        :readonly="readOnly"
        outlined
        single-line
        color="#fff"
        hide-details
        :clearable="!showAptIcon"
        :placeholder="placeholder"
        :counter="counter"
        :type="type"
        :disabled="disabled"
        class="wapal-input tw-w-full"
        :class="{ 'tw-cursor-disabled': disabled }"
      >
      </v-text-field>
      <div class="tw-absolute tw-top-[16px] tw-right-[9px]" v-if="showAptIcon">
        <img :src="aptIcon" />
      </div>
    </div>
  </div>
</template>

<script>
import { defaultTheme } from "@/theme/wapaltheme.ts";
import aptIcon from "@/assets/img/aptBlack.svg";
export default {
  props: {
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      default: null,
    },
    counter: {
      type: Number,
      default: null,
    },
    error_messages: {
      type: String,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: defaultTheme.dark6,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    showAptIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  data() {
    return {
      defaultTheme,
      aptIcon,
    };
  },
};
</script>
<style scoped></style>
