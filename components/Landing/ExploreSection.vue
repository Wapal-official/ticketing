<template>
  <section class="tw-w-full tw-bg-dark-8 tw-py-24">
    <div class="tw-container tw-mx-auto md:tw-w-[90%]">
      <tab :tabs="tabs" @tabChanged="tabChanged" />
    </div>
  </section>
</template>
<script lang="ts">
export default {
  data() {
    return {
      tabs: ["Featured", "Drops", "Editions", "Auctions", "Live"],
    };
  },
  methods: {
    tabChanged(tab: number) {
      console.log(tab);
    },
  },
};
</script>
