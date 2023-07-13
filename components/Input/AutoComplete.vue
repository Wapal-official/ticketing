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
    <v-autocomplete
      v-model="internalValue"
      :items="items"
      outlined
      class="wapal-input tw-w-full"
      :placeholder="placeholder"
      :item-text="text"
      @change="change"
      hide-details
      clearable
    >
    </v-autocomplete>
  </div>
</template>

<script>
import { defaultTheme } from "@/theme/wapaltheme.ts";
export default {
  props: {
    items: { type: Array },
    text: { type: String },
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
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  data() {
    return {
      defaultTheme,
    };
  },
  methods: {
    change() {
      this.$emit("change");
    },
  },
};
</script>
<style scoped></style>
