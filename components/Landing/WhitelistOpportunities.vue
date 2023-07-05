<template>
  <section class="tw-w-full tw-bg-dark-8 tw-pb-24">
    <div
      class="tw-container tw-mx-auto tw-px-8 md:tw-w-[90%] lg:tw-w-full 2xl:tw-px-[3.75rem] 3xl:tw-w-[90%]"
    >
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-justify-between md:tw-items-center tw-pb-8"
      >
        <landing-section-heading heading="Whitelist Opportunities" />
        <button-primary
          :bordered="true"
          title="View All"
          @click="$router.push('/whitelist')"
        />
      </div>
      <div
        class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3 1xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
        v-if="!loading"
      >
        <whitelist-landing-card
          v-for="(whitelist, index) in whitelists"
          :key="index"
          :whitelist="whitelist"
          :class="{
            'lg:tw-hidden 1xl:tw-flex': index === 3,
            'tw-hidden 3xl:tw-flex': index === 4,
          }"
        />
      </div>
      <loading-collections v-else />
    </div>
  </section>
</template>
<script lang="ts">
import Loading from "@/components/Reusable/Loading.vue";
import WhitelistCard from "@/components/Whitelist/WhitelistCard.vue";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";

import { getAllWhitelist } from "@/services/WhitelistService";
export default {
  components: { Loading, WhitelistCard, GradientBorderButton },
  data() {
    return {
      loading: true,
      whitelists: [{ _id: "" }],
    };
  },
  async mounted() {
    const res = await getAllWhitelist(1, 5);
    console.log("test");
    this.whitelists = res.data.whitelists;
    this.loading = false;
  },
  methods: {
    gotoWhitelistPage() {
      this.$router.push("/whitelist");
    },
  },
};
</script>
<style>
.landing-grid {
  grid-auto-rows: 0;
  overflow-y: hidden;
}
</style>
