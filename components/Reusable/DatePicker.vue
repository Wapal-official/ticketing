<template>
  <div class="dashboard-text-field-border tw-w-full">
    <date-picker
      v-model="internalValue"
      :type="type"
      :placeholder="placeholder"
      :style="`background:${this.background}; border-radius: 7px`"
      class="tw-rounded"
    ></date-picker>
  </div>
</template>
<script lang="ts">
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  props: {
    value: {
      type: [Date, String],
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "datetime",
    },
    background: {
      type: String,
      default: "#0E0D0D",
    },
  },
  components: { DatePicker },
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
};
</script>
<style scoped>
.mx-input {
  background: #0e0d0d;
}
</style>
