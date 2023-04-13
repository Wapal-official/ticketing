<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <div
      class="tw-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between">
      <div class="collection1">
        <NuxtLink to="/dashboard/create-collection"><gradient-border-button>Create New Collection</gradient-border-button>
        </NuxtLink>
      </div>
    </div>
    <div class="tw-container tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-4 tw-py-4 md:tw-grid-cols-2 lg:tw-grid-cols-3"
      v-if="!loading">
      <nft-card v-for="collection in collections" :key="collection._id" v-if="collections[0]._id"
        :collection="collection" />
    </div>
    <loading v-else />
    <v-tour name="myTour2" :steps="steps"></v-tour>
  </div>
</template>

<script lang="ts">
import NftCard from "@/components/Nft/NftCard.vue";
import Loading from "@/components/Reusable/Loading.vue";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import { getCollectionsOfUser } from "@/services/CollectionService";
export default {
  layout: "dashboard",
  components: { NftCard, Loading, GradientBorderButton },
  data() {
    return {
      collections: [{ _id: "" }],
      loading: true,
      steps: [
        {
          target: '.dashboard2',
          content: `Create your launchpad`,
          header: {
            title: 'Lauchpad Page',
          },
          params: {
            placement: 'right',
            highlight: true
          },
        },
        {
          target: '.collection1',
          content: ' Create your own launchpad on “Create your collection',
          params: {
            highlight: true,
          },
        },
        {
          target: '.dashboard3',
          content: `To run WL campaign`,
          before: (_type: any) => {
            return new Promise<void>((resolve, _reject) => {
              this.$router.push('/dashboard/whitelist');
              resolve();
            });
          },
          params: {
            placement: 'right',
            highlight: true,
          },
        },
      ],

    };
  },
  methods: {},
  async mounted() {
    const res = await getCollectionsOfUser(
      this.$store.state.userStore.user.user_id
    );

    this.collections = res.data.data;

    this.loading = false;

    if (localStorage.getItem('seen_collection_tour') === null) {
      this.$tours['myTour2'].start();
      localStorage.setItem('seen_collection_tour', 'true');
    }


  },
};
</script>
