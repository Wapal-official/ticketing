<template>
  <section class="tw-w-full tw-bg-dark-8 tw-pb-24">
    <div class="tw-container tw-mx-auto tw-px-8 xl:tw-px-[3.75rem]">
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-justify-between md:tw-items-center tw-pb-8"
      >
        <h2 class="tw-uppercase tw-text-white tw-font-bold tw-text-[2rem]">
          All Collection
        </h2>
        <button-primary
          :bordered="true"
          title="View All"
          contentClass="tw-px-2"
          @click="$router.push('/latest-collection')"
          class="lg:tw-mr-5"
        />
      </div>
      <div
        class="tw-w-full tw-overflow-auto tw-pb-4 lg:tw-pb-0"
        v-if="!loading"
      >
        <div
          class="tw-grid tw-gap-6 tw-grid-cols-4 tw-w-full tw-min-w-[1300px] lg:tw-min-w-full"
        >
          <all-collection-card
            v-for="(collection, index) in collections"
            :key="index"
            :collectionNumber="index + 1"
            :collection="collection"
          />
        </div>
      </div>
      <div
        class="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-4"
        v-else
      >
        <div
          class="!tw-w-full !tw-h-[96px] tw-rounded-lg tw-cursor-pointer tw-bg-wapal-gray tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
          v-for="index in 16"
          :key="index"
        ></div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import {
  getApprovedDrafts,
  getCollections,
} from "@/services/CollectionService";

import sanctuary from "@/assets/img/199.png";
export default {
  data() {
    return { collections: [], loading: true };
  },
  async mounted() {
    this.mapAllCollections();
  },
  methods: {
    async mapAllCollections() {
      const res = await getCollections(1, 16);

      this.collections = res;

      const collection = {
        name: "Aptos Monkeys Sanctuary",
        description:
          "Sanctuaries are homes to the fighting Monkeys who stood their ground to protect their lands and fortunes.",
        image: sanctuary,
        twitter: "https://twitter.com/AptosMonkeys",
        website: "https://www.aptosmonkeys.club/",
        discord: "https://discord.com/invite/sFfe75BHQ3",
        mintDetails: {
          link: "https://monkeys.wapal.io",
        },
        candyMachine: {
          public_sale_time: "2023-10-31T06:23:35.216Z",
          resource_account:
            "0x39f1338e6b69c3ed2f0caa95876e898dbe4c9b272d721626d577554015d033b8",
          candy_id:
            "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0",
        },
        status: {
          sold_out: false,
        },
        username: "monkkesanturies",
      };

      this.collections.unshift(collection);
      this.collections.pop();
      if (this.collections.length < 16) {
        const draftRes = await getApprovedDrafts(
          1,
          16 - this.collections.length
        );
        const drafts: any[] = [];

        draftRes.map((draft: any) => {
          drafts.push({
            baseURL: draft.data.baseURL,
            candy_id: draft.data.candy_id,
            description: draft.data.description,
            discord: draft.data.discord,
            image: draft.data.image,
            instagram: draft.data.instagram,
            isApproved: draft.data.isApproved,
            name: draft.data.name,
            phases: draft.data.phases,
            public_sale_price: draft.data.public_sale_price,
            public_sale_time: draft.data.public_sale_time,
            royalty_payee_address: draft.data.royalty_payee_address,
            royalty_percentage: draft.data.royalty_percentage,
            supply: draft.data.supply,
            twitter: draft.data.twitter,
            website: draft.data.website,
            whitelist_price: draft.data.whitelist_price,
            redirectTo: "landingDraft",
            _id: draft._id,
          });
        });

        this.collections.push(...drafts);
      }

      this.loading = false;
    },
  },
};
</script>
