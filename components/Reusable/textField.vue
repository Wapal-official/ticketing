<template>
  <div>
    <v-text-field
      v-model="internalValue"
      :readonly="readOnly"
      outlined
      dense
      :rules="rules"
      :placeholder="placeholder"
      :counter="counter"
      :type="type"
      :error-messages="error_messages"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      default: [],
    },
    placeholder: {
      type: String,
      required: true,
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
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    }
  },
};
</script>

<style>
.v-input__slot {
  border: 1px solid;
  border-image: linear-gradient(
    264.44deg,
    #fe87ff 2.87%,
    #c202d3 34.05%,
    #5e0fff 67.82%,
    #1905da 99.15%
  );
  border-image-slice: 1;
  border-radius: 0px !important;
}
</style>
