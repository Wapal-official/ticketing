<template>
  <div class="tw-py-4">
    <div
      v-if="tokens.length > 0"
      class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 3xl:tw-grid-cols-5"
    >
      <div
        class="tw-h-full tw-rounded tw-w-[250px] tw-max-w-[250px] tw-group tw-cursor-pointer"
        v-for="(item, i) in tokens"
        :key="i"
        @click="
          $router.push(`${$route.params.collectionId}/${item.tokenDataId}`)
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
      tokens: [],
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
      let res = await getTokensOfCollection({
        limit: this.limit,
        offset: this.offset,
        walletAddress: this.walletAddress,
        collectionId: this.$route.params.collectionId,
      });

      const data = res.data.current_token_ownerships_v2;

      if (data.length > 0) {
        data.map((token) => {
          const image = token.current_token_data.cdn_asset_uris.cdn_image_uri
            ? token.current_token_data.cdn_asset_uris.cdn_image_uri
            : token.current_token_data.cdn_asset_uris.raw_image_uri;

          this.tokens.push({
            tokenDataId: token.current_token_data.token_data_id,
            name: token.current_token_data.token_name,
            image: image,
          });
        });
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
