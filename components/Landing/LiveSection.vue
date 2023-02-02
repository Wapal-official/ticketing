<template>
  <section class="tw-py-8 tw-container tw-mx-auto">
    <landing-section-heading heading="Live" class="tw-px-4" />
    <div class="tw-flex tw-flex-row tw-flex-wrap">
      <nft-card
        v-for="nft in liveNfts"
        :key="nft.name"
        :name="nft.name"
        :image="nft.image"
        :status="nft.status"
        :price="nft.price"
        :stock="nft.stock"
      />
    </div>
  </section>
</template>
<script>
import LandingSectionHeading from "@/components/Landing/LandingSectionHeading.vue";
import NftCard from "@/components/Nft/NftCard.vue";
import fox from "@/assets/img/fox.png";
import pirate from "@/assets/img/6195.png";
import astronaut from "@/assets/img/6197.png";
export default {
  components: { LandingSectionHeading, NftCard },
  data() {
    return { liveNfts: [], fox, pirate, astronaut };
  },
  mounted() {
    this.liveNfts.push({
      name: "NINE TAILS NFT",
      image: this.fox,
      status: "Live",
      price: "0.2 sol",
      stock: 14,
    });
    this.liveNfts.push({
      name: "Pirate NFT",
      image: this.pirate,
      status: "Live",
      price: "0.2 sol",
      stock: 14,
    });
    this.liveNfts.push({
      name: "Astronaut NFT",
      image: this.astronaut,
      status: "Live",
      price: "0.2 sol",
      stock: 14,
    });
    this.liveNfts.push({
      name: "Second Pirate NFT",
      image: this.pirate,
      status: "Live",
      price: "0.2 sol",
      stock: 14,
    });
  },
};
</script>
