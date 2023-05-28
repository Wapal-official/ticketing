<template>
  <div class="dashboard-text-field-border tw-w-full">
    <v-autocomplete
      v-model="internalValue"
      :items="items"
      outlined
      color="#fff"
      class="dashboard-input"
      :placeholder="placeholder"
      :item-text="text"
      :item-value="itemValue"
      hide-details
      clearable
      single-line
    >
    </v-autocomplete>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    value: { type: String },
    items: { type: Array },
    text: { type: String },
    placeholder: { type: String },
    itemValue: { type: String },
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
