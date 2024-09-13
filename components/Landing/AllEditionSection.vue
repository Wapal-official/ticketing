<template>
  <!-- <section class="tw-w-full tw-bg-dark-8 tw-py-14 tw-min-h-[500px]" id="all-editions">
    <div class="tw-container tw-mx-auto tw-px-8 xl:tw-px-[3.75rem]">
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-justify-between md:tw-items-center tw-pb-8"
      >
        <h2 class="tw-uppercase pt-20 tw-text-white tw-font-bold tw-text-[2rem]">
          All Events
        </h2>
        <button-primary
          :bordered="true"
          title="View All"
          contentClass="tw-px-2"
          @click="$router.push('/live-editions')"
          class="lg:tw-mr-5"
        />
      </div>
      <div
        class="tw-w-full tw-overflow-auto tw-pb-4 lg:tw-pb-0"
        v-if="!loading"
      >
        <div
          class="tw-grid tw-gap-6 tw-grid-cols-4 tw-w-full tw-min-w-[1300px] lg:tw-min-w-full"
        >
          <all-collection-card
            v-for="(collection, index) in collections"
            :key="index"
            :collectionNumber="index + 1"
            :collection="collection"
          />
        </div>
      </div>
      <div
        class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-4"
        v-else
      >
        <div
          class="!tw-w-full !tw-h-[96px] tw-rounded-lg tw-cursor-pointer tw-bg-dark-4 tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
          v-for="index in 16"
          :key="index"
        ></div>
      </div>
    </div>
  </section> -->
</template>
<!-- <script lang="ts">
import { getAllEditions } from "@/services/EditionService";
export default {
  data() {
    return { collections: [], loading: true };
  },
  async mounted() {
    this.mapAllCollections();
  },
  methods: {
    async mapAllCollections() {
      const res = await getAllEditions({ page: 1, limit: 16 });

      this.collections = res;

      this.loading = false;
    },
  },
};
</script> -->
