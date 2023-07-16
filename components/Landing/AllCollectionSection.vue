<template>
  <section class="tw-w-full tw-bg-dark-8 tw-pb-24">
    <div class="tw-container tw-mx-auto tw-px-8 xl:tw-px-[3.75rem]">
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-justify-between md:tw-items-center tw-pb-8"
      >
        <h2 class="tw-uppercase tw-text-white tw-font-bold tw-text-[2rem]">
          All Collection
        </h2>
        <button-primary
          :bordered="true"
          title="View All"
          @click="$router.push('/latest-collection')"
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
      <div
        class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-4"
        v-else
      >
        <div
          class="!tw-w-full !tw-h-[96px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
          v-for="index in 16"
          :key="index"
        ></div>
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
