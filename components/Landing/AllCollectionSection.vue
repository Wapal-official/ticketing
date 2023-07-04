<template>
  <section class="tw-w-full tw-bg-dark-8 tw-pb-24">
    <div
      class="tw-container tw-px-8 tw-mx-auto md:tw-px-0 md:tw-w-[90%] lg:tw-w-[95%] 2xl:tw-w-[90%]"
    >
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-justify-between md:tw-items-center tw-pb-8"
      >
        <h2 class="tw-uppercase tw-text-white tw-font-bold tw-text-[2rem]">
          All Collection
        </h2>
        <button-primary
          :bordered="true"
          title="View All"
          @click="this.$router.push('/explore/all')"
        />
      </div>
      <div
        class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-4"
        v-if="!loading"
      >
        <all-collection-card
          v-for="(collection, index) in collections"
          :key="index"
          :collectionNumber="index + 1"
          :collection="collection"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { getCollections } from "@/services/CollectionService";

export default {
  data() {
    return { collections: [], loading: true };
  },
  async mounted() {
    const res = await getCollections(1, 16);

    this.collections = res;

    this.loading = false;
  },
};
</script>
