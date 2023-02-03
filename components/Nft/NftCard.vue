<template>
  <NuxtLink
    :to="`/nft/${name}`"
    class="tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-w-1/4"
  >
    <div class="tw-rounded tw-relative tw-w-full">
      <img
        :src="image"
        :alt="name"
        class="tw-w-full tw-h-full tw-object-contain"
      />
      <div
        class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-px-8 tw-py-2 tw-text-white tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1 nft-card"
      >
        <h5 class="tw-text-lg tw-uppercase tw-font-medium">{{ name }}</h5>
        <h6 class="tw-text-xl tw-text-wapal-pink tw-font-normal">
          {{ status }}
        </h6>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-12 tw-capitalize tw-w-full"
        >
          <div>items {{ stock }}</div>
          <div>price {{ price }}</div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script lang="ts">
export default {
  props: {
    name: { type: String },
    image: { type: String },
    status: { type: String },
    stock: { type: Number },
    price: { type: String },
  },
};
</script>
<style scoped>
.nft-card {
  background: linear-gradient(
    180deg,
    rgba(221, 221, 221, 0.4) -72.58%,
    #050d1c 74.28%
  );
  border-bottom-left-radius: 500px;
  border-bottom-right-radius: 500px;
  border-top-right-radius: 9999px;
  box-shadow: -1px 1px 2px #ff36ab, 1.5px 1px 2px #ff36ab;
}
</style>
