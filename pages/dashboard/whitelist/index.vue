<template>
  <div class="tw-w-full">
    <dashboard-page-heading heading="Whitelist" />
    <launchpad-guide
      title="Whitelist Guide"
      itemLink="https://docs.wapal.io/launchpad-overall-guide/create-a-collection/whitelist"
    ></launchpad-guide>
    <div
      class="tw-w-full tw-pb-6 tw-pt-2 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
    >
      <div class="tw-w-full">
        <tab-bordered :tabs="tabs" :tab="tab" @tabChanged="tabChanged" />
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start md:tw-justify-end"
      >
        <button-primary
          :bordered="true"
          title="Create New Collection"
          @click="$router.push('/dashboard/create-collection')"
        >
          <template #prepend-icon>
            <i class="bx bx-plus tw-text-xl tw-pr-2"></i>
          </template>
        </button-primary>
      </div>
    </div>
    <v-tabs-items
      v-model="tab"
      v-if="!loading"
      class="!tw-bg-transparent !tw-py-8"
    >
      <v-tab-item>
        <dashboard-collection-table
          :headers="collectionHeaders"
          :items="collections"
          @rowClicked="redirectToWhitelistPage"
          v-if="collections.length > 0"
        />
        <dashboard-no-collection
          message="You do not have any Collections"
          buttonTitle="Create Collection"
          @click="$router.push('/dashboard/create-collection')"
          v-if="collections.length === 0 && !loading"
        />
      </v-tab-item>
      <v-tab-item>
        <dashboard-collection-table
          :headers="whitelistHeaders"
          :items="whitelists"
          @rowClicked="redirectToWhitelistPage"
          v-if="whitelists.length > 0"
        />
        <dashboard-no-collection
          message="You do not have any Whitelist Collections"
          buttonTitle="Create Collection"
          @click="$router.push('/dashboard/create-collection')"
          v-if="whitelists.length === 0 && !loading"
        />
      </v-tab-item>
    </v-tabs-items>
    <reusable-loading v-else />
    <v-dialog
      v-model="showWhitelistSetup"
      content-class=" !tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="!tw-bg-dark-9"
        style="border: 1px solid #25262b; border-radius: 8px"
      >
        <p
          class="tw-text-center tw-uppercase tw-py-3 tw-px-5 !tw-mb-0"
          style="font-size: 14px"
        >
          Caution: Set whitelist an hour before minting!
        </p>
        <v-divider></v-divider>
        <div class="tw-py-3 tw-px-5">
          <div class="swiper mySwiper" ref="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <p class="tw-text-center tw-text-dark-1">
                  Step 1: Select Collection
                </p>
                <img
                  class="tw-mx-auto"
                  src="~/assets/img/dialogs/step1.jpg"
                  alt="step1"
                  style="width: 100%; max-width: 440px"
                />
              </div>
              <div class="swiper-slide">
                <p class="tw-text-center tw-text-dark-1">
                  Step 2: Confirm Collection
                </p>
                <img
                  class="tw-mx-auto"
                  src="~/assets/img/dialogs/step2.jpg"
                  alt="step2"
                  style="width: 100%; max-width: 440px"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="tw-flex tw-px-5 tw-pt-3 tw-pb-5 tw-mt-3 tw-gap-3 tw-justify-between tw-items-center"
        >
          <button-primary
            :fullWidth="true"
            title="Don’t show this again"
            :bordered="true"
            @click="dontShowAgain"
          ></button-primary>
          <button-primary
            title="Remind me later"
            :fullWidth="true"
            @click="remindMeLater"
          ></button-primary>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import Swiper from "swiper/swiper-bundle.min";

import "swiper/swiper-bundle.min.css";

import LaunchpadGuide from "~/components/Dashboard/launchpadGuide.vue";
import {
  getCollectionInCreatorStudio,
  getCollectionsOfUser,
} from "@/services/CollectionService";
import {
  getWhitelistEntryByIdInCreatorStudio,
  getWhitelistOfUser,
} from "@/services/WhitelistService";
import { getCollectionDetails } from "@/services/AptosCollectionService";
export default {
  layout: "dashboard",
  components: {
    LaunchpadGuide,
  },
  data() {
    return {
      collections: [{ _id: null }],
      whitelists: [{ _id: null }],
      loading: true,
      tabs: ["All Collection", "Whitelist Collection"],
      tab: 0,
      collectionHeaders: [
        {
          text: "Collection Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "264px",
          class: "default-data-table-header",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Price",
          align: "start",
          sortable: true,
          value: "price",
          width: "200px",
          class: "default-data-table-header",
          showAptIcon: true,
        },
        {
          text: "Item",
          align: "start",
          sortable: true,
          value: "supply",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          text: "Minted",
          align: "start",
          sortable: true,
          value: "progress",
          width: "200px",
          class: "default-data-table-header",
          progress: true,
        },
      ],
      whitelistHeaders: [
        {
          text: "Collection Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "264px",
          class: "default-data-table-header",
          showImage: true,
          showSerialNumber: true,
        },
        {
          text: "Price",
          align: "start",
          sortable: true,
          value: "price",
          width: "200px",
          class: "default-data-table-header",
          showAptIcon: true,
        },
        {
          text: "Item",
          align: "start",
          sortable: true,
          value: "supply",
          width: "200px",
          class: "default-data-table-header",
        },
        {
          text: "Spots",
          align: "start",
          sortable: true,
          value: "progress",
          width: "200px",
          class: "default-data-table-header",
          progress: true,
        },
      ],
      fetchedCollections: false,
      fetchedWhitelists: false,
      showWhitelistSetup: false,
    };
  },
  computed: {},
  methods: {
    tabChanged(tab: number) {
      this.tab = tab;
      switch (tab) {
        case 0:
          if (!this.fetchedCollections) {
            this.mapCollections();
          }
          break;
        case 1:
          if (!this.fetchedWhitelists) {
            this.mapWhitelists();
          }
          break;
      }
    },
    getPrice(collection: any) {
      if (
        collection.candyMachine.whitelist_sale_time &&
        collection.candyMachine.public_sale_time
      ) {
        const whitelistDate = new Date(
          collection.candyMachine.whitelist_sale_time
        );
        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        );

        if (new Date() > publicSaleDate) {
          return collection.candyMachine.public_sale_price;
        }

        if (new Date() > whitelistDate) {
          return collection.candyMachine.whitelist_price;
        }
      }

      return collection.candyMachine.public_sale_price;
    },
    async mapCollections() {
      this.loading = true;
      const collectionRes = await getCollectionsOfUser(
        this.$store.state.userStore.user.user_id
      );

      const whitelistRes = await getWhitelistOfUser(
        this.$store.state.userStore.user.user_id
      );

      let collections = collectionRes.data.data.filter((collection: any) => {
        const whitelistSaleDate = new Date(
          collection.candyMachine.whitelist_sale_time
        ).getTime();

        const publicSaleDate = new Date(
          collection.candyMachine.public_sale_time
        ).getTime();

        if (publicSaleDate - whitelistSaleDate !== 1000) {
          return collection;
        }
      });

      const whitelists = whitelistRes.data.whitelists;

      collections = collections.filter((collection: any) => {
        try {
          this.whitelists.map((whitelist: any) => {
            if (whitelist.collection_id === collection._id) {
              throw new Error("Collection In Whitelist");
            }
          });
          return collection;
        } catch (error) {}
      });

      const mappedCollections = await Promise.all(
        collections.map(async (collection: any) => {
          let collectionResource = null;
          try {
            //Get Collection Detail
            const resource = await getCollectionDetails({
              candyMachineId: collection.candyMachine.candy_id,
              candy_object: collection.candyMachine.resource_account,
            });

            //Store minted and total supply of collection and calculate minted percent
            collectionResource = {
              minted: resource.minted,
              total: resource.total_supply,
              progressPercent: Math.floor(
                (resource.minted / resource.total_supply) * 100
              ),
              text: `${resource.minted}/${resource.total_supply} Minted`,
            };
          } catch {
            const resource = {
              minted: 0,
              total_supply: 0,
            };
            collectionResource = {
              minted: resource.minted,
              total: resource.total_supply,
              progressPercent: Math.floor(
                (resource.minted / resource.total_supply) * 100
              ),
              text: `${resource.minted}/${resource.total_supply} Minted`,
            };
          }

          collection.price = this.getPrice(collection);

          collection.progress = collectionResource;

          this.collections.push(collection);
        })
      );

      this.loading = false;
      this.fetchedCollections = true;
    },
    async mapWhitelists() {
      this.loading = true;
      const whitelistRes = await getWhitelistOfUser(
        this.$store.state.userStore.user.user_id
      );

      const whitelists = whitelistRes.data.whitelists;

      const mappedWhitelists = await Promise.all(
        whitelists.map(async (whitelist: any) => {
          //Get Whitelist Detail
          const { data } = await getWhitelistEntryByIdInCreatorStudio(
            whitelist.collection_id,
            1,
            1,
            "whitelist"
          );

          const collectionRes = await getCollectionInCreatorStudio(
            whitelist.collection_id
          );

          whitelist.name = collectionRes.collection[0].name;
          whitelist.image = collectionRes.collection[0].image;
          whitelist.supply = collectionRes.collection[0].supply;
          whitelist.username = collectionRes.collection[0].username;

          //Store minted and total supply of collection and calculate minted percent
          const collectionResource = {
            total: data.spotsCount,
            occupied: whitelist.whitelist_spots,
            progressPercent: Math.floor(
              (data.spotsCount / whitelist.whitelist_spots) * 100
            ),
            text: `${data.spotsCount}/${whitelist.whitelist_spots} Spots Taken`,
          };

          whitelist.price = this.getPrice(collectionRes.collection[0]);

          whitelist.progress = collectionResource;

          this.whitelists.push(whitelist);
        })
      );
      this.loading = false;
      this.fetchedWhitelists = true;
    },
    redirectToWhitelistPage(whitelist: any) {
      this.$router.push(`/dashboard/whitelist/${whitelist.username}`);
    },
    dontShowAgain() {
      localStorage.setItem("showWhitelistSetup", "false");
      this.showWhitelistSetup = false;
    },
    remindMeLater() {
      const remindTime = new Date().getTime() + 30 * 60 * 1000;
      localStorage.setItem("remindWhitelistSetup", remindTime.toString());
      this.showWhitelistSetup = false;
    },
    checkWhitelistPopup() {
      const showWhitelistSetup = localStorage.getItem("showWhitelistSetup");
      if (showWhitelistSetup === "false") {
        this.showWhitelistSetup = false;
        return;
      }

      const remindTime = localStorage.getItem("remindWhitelistSetup");
      if (remindTime) {
        const currentTime = new Date().getTime();
        if (currentTime < parseInt(remindTime)) {
          this.showWhitelistSetup = false;
          return;
        }
      }

      this.showWhitelistSetup = true;
    },
  },
  async mounted() {
    this.collections = [];
    this.whitelists = [];

    this.loading = false;
    this.$nextTick(() => {
      new Swiper(this.$refs.swiper, {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: false,
        grabCursor: true,
      });
    });
    this.checkWhitelistPopup();
    await this.mapCollections();
  },
};
</script>
