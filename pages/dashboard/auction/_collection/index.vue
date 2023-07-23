<template>
  <div class="tw-py-4">
    <div
      v-if="nfts.length > 0"
      class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
    >
      <div
        class="tw-h-full tw-rounded tw-w-[250px] tw-max-w-[250px] tw-group tw-cursor-pointer"
        v-for="(item, i) in metadata"
        :key="i"
        @click="
          $router.push('/dashboard/auction/start'),
            $store.commit('auction/selectNft', { nft: nfts[i], meta: item })
        "
      >
        <div
          class="tw-rounded-t tw-overflow-hidden tw-w-[250px] tw-max-w-[250px]"
        >
          <img
            :src="item.image"
            :alt="item.name"
            :onerror="imageNotFound()"
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
        </div>
      </div>
    </div>
    <div no-gutters v-else class="py-10" justify="center">
      <p v-if="end && !loading">No nfts</p>
      <ReusableLoading v-else />
    </div>
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
import { getTokensOfCollection } from "@/services/AuctionService";
import imageNotFound from "@/utils/imageNotFound";
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
      let data = await getTokensOfCollection({
        limit: this.limit,
        offset: this.offset,
        walletAddress: this.walletAddress,
        collectionName: this.$route.params.collection,
      });

      if (data.data.current_token_ownerships.length > 0) {
        const nfts = data.data.current_token_ownerships;
        for (var x = 0; x < nfts.length; x++) {
          try {
            let meta = null;
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

            if (imageURL.slice(0, 4) === "ipfs") {
              const url = this.sliceIPFSUrl(imageURL);

              imageURL = `https://cloudflare-ipfs.com/ipfs/${url}`;
            }

            if (imageURL.includes("ipfs.apt.land")) {
              const index = imageURL.indexOf("ipfs.apt.land");

              const slicedURL = imageURL.slice(index, imageURL.length);

              imageURL = slicedURL.replaceAll("/", "-");

              imageURL =
                "https://ipfs.bluemove.net/uploads/cdn-image/" + imageURL;
            }
            meta.data.image = imageURL;

            this.metadata.push(meta.data);

            this.nfts.push(nfts[x]);
          } catch {}
        }
      } else {
        this.end = true;
      }
    },
    sliceIPFSUrl(url) {
      return url.slice(7, url.length);
    },
  },
};
</script>
