<template>
  <section class="tw-py-8 tw-container tw-mx-auto">
    <landing-section-heading heading="Upcoming" class="tw-px-4" />
    <div class="tw-flex tw-flex-row tw-flex-wrap">
      <nft-card
        v-for="collection in upcomingCollection"
        :key="collection._id"
        :collection="collection"
      />
    </div>
  </section>
</template>
<script lang="ts">
import LandingSectionHeading from "@/components/Landing/LandingSectionHeading.vue";
import NftCard from "@/components/Nft/NftCard.vue";
import Collection from "@/interfaces/collection";
export default {
  props: { loading: { type: Boolean }, collections: { type: Array } },
  components: { LandingSectionHeading, NftCard },
  data() {
    return { upcomingCollection: [{ _id: null }] };
  },
  mounted() {
    const collections: Collection[] = this.collections;
    this.upcomingCollection = collections;
  },
};
</script>
