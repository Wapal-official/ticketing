<template>
  <div class="rounded relative">
    <img :src="image" :alt="name" class="w-full h-full object-contain" />
    <div
      class="absolute bottom-0 left-0 w-full px-8 py-2 text-white flex flex-col items-center justify-center gap-1 nft-card"
    >
      <h5 class="text-lg uppercase font-medium">{{ name }}</h5>
      <h6 class="text-xl text-wapal-pink font-normal">{{ status }}</h6>
      <div
        class="flex flex-row items-center justify-start gap-12 capitalize w-full"
      >
        <div>items {{ stock }}</div>
        <div>price {{ price }}</div>
      </div>
    </div>
  </div>
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
