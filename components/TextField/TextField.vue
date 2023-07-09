<template>
  <v-text-field
    v-model="internalValue"
    :readonly="readOnly"
    outlined
    single-line
    color="#fff"
    hide-details
    clearable
    :placeholder="placeholder"
    :counter="counter"
    :type="type"
    :disabled="disabled"
    class="wapal-input"
  >
  </v-text-field>
</template>

<script>
import { defaultTheme } from "@/theme/wapaltheme.ts";
export default {
  props: {
    value: {
      type: [String, Number],
      required: true,
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
};
</script>
<style scoped></style>
