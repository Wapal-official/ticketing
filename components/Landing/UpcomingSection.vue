<template>
  <section class="py-8">
    <landing-section-heading heading="Upcoming" />
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
      status: "23h 32m 56s",
      price: "0.2 sol",
      stock: 14,
    });
    this.liveNfts.push({
      name: "Pirate NFT",
      image: this.pirate,
      status: "2h 32m 56s",
      price: "0.2 sol",
      stock: 14,
    });
    this.liveNfts.push({
      name: "Astronaut NFT",
      image: this.astronaut,
      status: "3h 32m 56s",
      price: "0.2 sol",
      stock: 14,
    });
    this.liveNfts.push({
      name: "Second Pirate NFT",
      image: this.pirate,
      status: "23h 32m 56s",
      price: "0.2 sol",
      stock: 14,
    });
  },
};
</script>
