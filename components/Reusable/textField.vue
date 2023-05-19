<template>
  <div class="dashboard-text-field-border tw-w-full">
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
      class="dashboard-input"
      :style="`background:${background}`"
      :disabled="disabled"
    >
    </v-text-field>
  </div>
</template>

<script>
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
      default: "#0E0D0D",
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
};
</script>
