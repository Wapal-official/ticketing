<template>
  <div class="tw-flex tw-flex-row tw-flex-wrap">
    <nft-card
      v-for="collection in liveCollection"
      :key="collection._id"
      :collection="collection"
    />
  </div>
</template>
<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Collection from "@/interfaces/collection";
export default {
  props: { collections: { type: Array } },
  components: { NftCard },
  data() {
    return { liveCollection: [{ _id: null }] };
  },
  mounted() {
    const collections: Collection[] = this.collections;
    this.liveCollection = collections;
  },
};
</script>
