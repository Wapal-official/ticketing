<template>
  <div class="d-flex tw-justify-end" style="width: 100%">
    <p
      @click="openLink(itemLink)"
      class="tw-mr-3 tw-text-primary-2 guide-hover"
      style="margin-bottom: 0 !important"
    >
      {{ title }}
    </p>
    <img
      class="guide-hover"
      @click="openLink(itemLink)"
      :src="receipt"
      alt="receipt"
      width="20px"
      height="20px"
    />
  </div>
</template>

<script lang="ts">
import receipt from "@/assets/img/receipt.svg";

export default {
  props: {
    title: { type: String, required: true },
    itemLink: { type: String, required: true },
  },
  data() {
    return {
      receipt,
    };
  },
  methods: {
    openLink(item: string) {
      window.open(item, "_blank");
    },
  },
};
</script>

<style lang="css" scoped>
.guide-hover {
  cursor: pointer;
}
</style>
