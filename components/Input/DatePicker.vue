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
      <date-picker
        v-model="internalValue"
        type="datetime"
        :placeholder="placeholder"
        :disabled="disabled"
        class="wapal-input"
      ></date-picker>
      <div class="tw-absolute tw-top-[12px] tw-left-[6px]">
        <i class="bx bx-calendar tw-text-xl tw-text-white"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  components: { DatePicker },
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
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newValue: any) {
        this.$emit("input", newValue);
      },
    },
  },
  data() {
    return {
      defaultTheme,
    };
  },
};
</script>
<style scoped>
::v-deep .mx-input {
  @apply !tw-h-[44px] !tw-bg-dark-6;
  padding: 6px 30px !important;
  padding-right: 10px !important;
}

::v-deep .mx-icon-calendar {
  display: none;
}
</style>
