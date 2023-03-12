<template>
  <div class="tw-w-full">
    <div
      class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-w-full tw-mb-8"
    >
      <NuxtLink to="/dashboard/create-whitelist">
        <gradient-border-button>Create Whitelist</gradient-border-button>
      </NuxtLink>
    </div>
    <div
      class="tw-container tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3"
      v-if="!loading"
    >
      <whitelist-card
        v-for="whitelist in whitelists"
        :key="whitelist._id"
        :whitelist="whitelist"
        v-if="whitelists[0]._id"
      />
    </div>
    <loading v-else />
  </div>
</template>
<script lang="ts">
import WhitelistCard from "@/components/Whitelist/WhitelistCard.vue";
import Loading from "@/components/Reusable/Loading.vue";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import { getWhitelistOfUser } from "@/services/WhitelistService";
export default {
  layout: "dashboard",
  components: { WhitelistCard, Loading, GradientBorderButton },
  data() {
    return {
      whitelists: [{ _id: null }],
      loading: true,
    };
  },
  computed: {},
  methods: {},
  async mounted() {
    const res = await getWhitelistOfUser(
      this.$store.state.walletStore.user.user_id
    );
    this.whitelists = res.data.whitelists;
    this.loading = false;
  },
};
</script>
