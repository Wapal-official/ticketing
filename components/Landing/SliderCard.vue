<template>
  <NuxtLink
    :to="`/nft/${collection?._id}`"
    class="swiper-slide tw-flex tw-flex-row tw-items-center tw-justify-center tw-transition-all tw-duration-150 tw-ease-linear tw-transform tw-cursor-pointer tw-group tw-select-none"
    :draggable="false"
  >
    <div
      class="tw-relative tw-rounded-lg tw-w-[300px] tw-h-[300px] lg:tw-w-[250px] lg:tw-h-[250px] xl:tw-w-[280px] xl:tw-h-[280px]"
    >
      <div
        class="tw-rounded-lg tw-w-[300px] tw-h-[300px] tw-overflow-hidden lg:tw-w-[250px] lg:tw-h-[250px] xl:tw-w-[280px] xl:tw-h-[280px]"
      >
        <img
          class="tw-object-cover tw-rounded-lg tw-w-[300px] tw-h-[300px] tw-mx-auto tw-group tw-transition-all tw-duration-200 tw-ease-linear lg:tw-w-[250px] lg:tw-h-[250px] md:tw-mx-0 group-hover:tw-scale-110 xl:tw-w-[280px] xl:tw-h-[280px]"
          :src="collection?.image"
          :alt="collection?.collection_name"
        />
      </div>
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-py-2 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card tw-opacity-0 tw-group tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
      >
        <h5 class="tw-uppercase tw-font-medium collection-name">
          {{ collection?.name }}
        </h5>
        <h6 class="tw-text-lg tw-text-wapal-pink tw-font-normal">Live</h6>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-6 tw-capitalize tw-w-full tw-text-sm"
        >
          <div>items {{ collection?.supply }}</div>
          <div>price 0.005 apt</div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
export default {
  props: { collection: { type: Object } },
};
</script>
