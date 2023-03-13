<template>
  <div
    v-if="!loading"
    class="tw-flex tw-flex-col tw-items-start tw-justify-end tw-w-full tw-gap-4"
  >
    <div
      class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-center tw-text-wapal-pink tw-text-xl"
      v-if="!whitelists[0] || !whitelists[0]._id"
    >
      No Whitelist Opportunities
    </div>
    <div
      class="tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2 lg:tw-grid-cols-4"
      v-else
    >
      <whitelist-card
        v-for="whitelist in whitelists"
        :key="whitelist._id"
        :whitelist="whitelist"
      />
    </div>
    <gradient-border-button @click.native="" class="tw-mt-2 tw-self-end">
      View All
    </gradient-border-button>
  </div>
  <loading v-else />
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
    const res = await getAllWhitelist();
    this.whitelists = res.data.whitelists.slice(0, 4);
    this.loading = false;
  },
};
</script>
