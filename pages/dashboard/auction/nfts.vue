<template>
  <div class="tw-py-4">
    <div
      v-if="nfts.length > 0"
      class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
    >
      <div
        class="tw-h-full tw-rounded tw-w-[250px] tw-max-w-[250px] tw-group tw-cursor-pointer"
        v-for="(item, i) in nfts"
        :key="i"
        @click="$router.push(`/dashboard/auction/${item.name}`)"
      >
        <div
          class="tw-rounded-t tw-overflow-hidden tw-w-[250px] tw-max-w-[250px]"
        >
          <utility-image
            :source="item.image"
            :onerror="imageNotFound()"
            :alt="item.name"
            class="tw-rounded-t tw-w-[250px] tw-h-[250px] tw-object-cover tw-transition-all tw-duration-200 tw-ease-linear tw-group group-hover:tw-scale-125"
          />
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-p-4 tw-border tw-border-solid tw-border-t-0 tw-border-dark-6 tw-rounded-b"
        >
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
          >
            <h2 class="tw-text-lg tw-font-bold">{{ item.name }}</h2>
            <i class="bx bxs-badge-check tw-text-sm tw-text-primary-1"></i>
          </div>
          <div>{{ item.ownedNumber }}</div>
        </div>
      </div>
    </div>
    <v-row no-gutters v-else>
      <dashboard-no-collection
        message="You Do Not Have Any NFTs"
        buttonTitle="Mint and Add to Auction"
        @click="$router.push('/dashboard/mint-auction')"
        v-if="end"
      />
      <ReusableLoading v-else />
    </v-row>
    <v-card
      color="transparent"
      v-if="!end"
      v-intersect="{
        handler: fetchNfts,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      class="!tw-shadow-none"
    >
    </v-card>
  </div>
</template>
<script>
import {
  getOwnedCollectionsOfUser,
  getNumberOfTokensInOwnedCollectionOfUser,
} from "@/services/AuctionService";
import imageNotFound from "@/utils/imageNotFound";
import { getCachedUrlOfImage } from "@/utils/imageCache";
export default {
  data() {
    return {
      end: false,
      nfts: [],
      metadata: [],
      offset: 0,
      page: 0,
      limit: 20,
      imageNotFound,
    };
  },
  mounted() {
    this.fetchNfts();
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
  },
  methods: {
    async fetchNfts() {
      this.loading = true;
      this.offset = this.page * this.limit;
      this.page++;
      let data = await getOwnedCollectionsOfUser({
        limit: this.limit,
        offset: this.offset,
        walletAddress: this.walletAddress,
      });

      if (data.data.current_token_ownerships.length > 0) {
        const nfts = data.data.current_token_ownerships;
        for (var x = 0; x < nfts.length; x++) {
          try {
            let meta = null;
            const numberRes = await getNumberOfTokensInOwnedCollectionOfUser(
              nfts[x].current_token_data.collection_name,
              this.walletAddress
            );

            if (
              nfts[x].current_token_data.metadata_uri.slice(0, 4) === "ipfs"
            ) {
              const url = this.sliceIPFSUrl(
                nfts[x].current_token_data.metadata_uri
              );
              meta = await this.$axios.get(
                `https://cloudflare-ipfs.com/ipfs/${url}`
              );
            } else {
              meta = await this.$axios.get(
                nfts[x].current_token_data.metadata_uri
              );
            }

            let imageURL = meta.data.image;

            imageURL = getCachedUrlOfImage(imageURL);

            if (imageURL.includes("ipfs.apt.land")) {
              const index = imageURL.indexOf("ipfs.apt.land");

              const slicedURL = imageURL.slice(index, imageURL.length);

              imageURL = slicedURL.replaceAll("/", "-");

              imageURL =
                "https://ipfs.bluemove.net/uploads/cdn-image/" + imageURL;
            }

            this.nfts.push({
              name: nfts[x].current_token_data.collection_name,
              image: imageURL,
              ownedNumber:
                numberRes.data.current_token_ownerships_aggregate.aggregate
                  .count,
            });
          } catch {}
        }
      } else {
        this.end = true;
      }
      this.loading = false;
    },

    sliceIPFSUrl(url) {
      return url.slice(7, url.length);
    },
  },
};
</script>
