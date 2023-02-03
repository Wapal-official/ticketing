<template>
  <div class="tw-py-8 tw-w-full">
    <v-tabs
      active-class="!tw-text-wapal-pink"
      class="!tw-bg-transparent"
      id="explore-tab"
      v-model="exploreTab"
    >
      <v-tab :ripple="false" class="!tw-capitalize !tw-text-white">Top</v-tab>
      <v-tab :ripple="false" class="!tw-capitalize !tw-text-white"
        >Trending</v-tab
      >
      <v-tab :ripple="false" class="!tw-capitalize !tw-text-white"
        >All NFTs</v-tab
      >
    </v-tabs>
    <v-tabs-items
      v-model="exploreTab"
      id="explore-tab-items"
      class="tw-py-8 tw-px-8"
    >
      <v-tab-item class="tw-container tw-mx-auto">
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
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import NftCard from "@/components/Nft/NftCard.vue";
import fox from "@/assets/img/fox.png";
import pirate from "@/assets/img/6195.png";
import astronaut from "@/assets/img/6197.png";
export default {
  components: { NftCard },
  data() {
    return { exploreTab: null, liveNfts: [], fox, pirate, astronaut };
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
