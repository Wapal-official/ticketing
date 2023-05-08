<template>
  <div class="dashboard-text-field-border tw-w-full">
    <v-textarea
      @input="handleInput"
      rows="3"
      auto-grow
      outlined
      color="#fff"
      hide-details
      clearable
      single-line
      dense
      :placeholder="placeholder"
      :counter="counter"
      :type="type"
      :error-messages="error_messages"
      class="dashboard-input"
      :style="`background:${this.background}`"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
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
    background: {
      type: String,
      default: "#0E0D0D",
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
    },
  },
};
</script>
<!--     
    <style>
    .v-input__slot {
        border: 1px solid;
        border-image: linear-gradient(264.44deg, #FE87FF 2.87%, #C202D3 34.05%, #5E0FFF 67.82%, #1905DA 99.15%);
        border-image-slice: 1;
        border-radius:0px !important;
    }
    </style> -->
