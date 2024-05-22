<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[5.5em] lg:tw-pb-0 xl:!tw-max-w-[1100px]"
    v-if="!loading"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <utility-image
        :source="collection?.image"
        :onerror="imageNotFound()"
        :alt="collection?.name"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[550px] md:tw-h-[550px] md:tw-max-h-[550px] lg:tw-w-[450px] lg:tw-min-w-[450px] lg:tw-h-[450px] xl:tw-w-[550px] xl:tw-h-[550px] xl:tw-max-h-[550px] tw-object-cover tw-rounded-xl"
      />
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 lg:tw-w-[474px]"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3"
          v-if="!live"
        >
          <div class="tw-w-3 tw-h-3 tw-rounded-full tw-bg-primary-1"></div>
          <div
            class="tw-text-white tw-flex tw-flex-row tw-items-start tw-justify-center tw-gap-1"
          >
            <div class="tw-text-white tw-font-bold">Starts in</div>
            <count-down-plain
              :startTime="whitelist?.whitelist_start"
              class="tw-font-bold"
              @countdownComplete="setWhitelistListLiveStatus"
            />
          </div>
        </div>
        <h1 class="tw-text-white tw-text-[2.5em] tw-font-bold">
          {{ collection?.name }}
        </h1>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <a
            :href="collection?.discord"
            target="_blank"
            v-if="collection?.discord"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-discord-alt tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
            ></i>
          </a>
          <a
            :href="collection?.twitter"
            target="_blank"
            v-if="collection?.twitter"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-twitter tw-text-lg tw-transition tw-duration-200 tw-ease-linear tw-ml-0.5"
            ></i>
          </a>
          <a
            :href="collection?.instagram"
            target="_blank"
            v-if="collection?.instagram"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-instagram tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
            ></i>
          </a>
          <div class="tw-relative">
            <button
              class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6"
              @click="showShareBox = !showShareBox"
            >
              <i
                class="bx bxs-share-alt tw-text-lg tw-transition tw-duration-200 tw-ease-linear !tw-text-white"
              ></i>
            </button>
            <div
              class="tw-absolute tw-z-20 tw-overflow-hidden tw-bg-dark-6 tw-top-[110%] tw-w-[200px] tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-py-4"
              v-if="showShareBox"
              v-click-outside="hideShareBox"
            >
              <button
                class="tw-w-full tw-px-4 tw-py-4 tw-relative tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 before:tw-w-full before:tw-h-full before:tw-left-0 before:tw-bg-white/20 before:tw-opacity-0 before:tw-absolute hover:before:tw-opacity-[0.08]"
                @click="copyLink"
              >
                <i class="bx bx-copy tw-text-lg"></i>
                <span>Copy Link</span>
              </button>
              <button
                class="tw-w-full tw-px-4 tw-py-4 tw-relative tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 before:tw-w-full before:tw-h-full before:tw-left-0 before:tw-bg-white/20 before:tw-opacity-0 before:tw-absolute hover:before:tw-opacity-[0.08]"
                @click="shareOnTwitter"
              >
                <i class="bx bxl-twitter tw-text-lg"></i>
                <span>Share on Twitter</span>
              </button>
            </div>
          </div>
        </div>
        <div class="tw-pb-2 tw-text-dark-0">
          {{ collection?.description }}
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
        >
          <div class="tw-font-semibold tw-uppercase tw-text-dark-0">
            Mint Date
          </div>
          <div class="tw-text-white tw-font-medium tw-text-[1.75em]">
            {{ getMintDate }}
          </div>
          <div class="tw-w-full">
            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-text-white/70 tw-pb-2"
            >
              <div>No. Of Spots</div>
              <div>
                {{ resource.occupiedSpots }}/{{ resource.totalSpots }} Spots
                Taken
              </div>
            </div>
            <div
              class="tw-relative tw-w-full tw-rounded-full tw-bg-white/20 tw-h-2"
            >
              <div
                class="tw-absolute tw-top-0 tw-bg-primary-1 tw-h-2 tw-rounded-full"
                ref="noOfSpotsPercent"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <loading-collection v-else />
</template>
<script lang="ts">
import moment from "moment";
import { getWhitelistEntryById } from "@/services/WhitelistService";
import imageNotFound from "@/utils/imageNotFound";
export default {
  props: { collection: { type: Object }, whitelist: { type: Object } },
  data() {
    return {
      live: false,
      interval: null,
      resource: { occupiedSpots: 0, totalSpots: 0 },
      loading: false,
      start_date: null,
      showShareBox: false,
      imageNotFound,
    };
  },
  computed: {
    getMintDate() {
      if (this.collection.phases) {
        return moment(
          this.collection.phases[this.collection.phases.length - 1]
        ).format("MMM DD, hh:mm A");
      }

      return moment(this.collection.whitelist_sale_time).format(
        "MMM DD, hh:mm A"
      );
    },
  },
  async mounted() {
    this.loading = true;

    const spotsRes = await getWhitelistEntryById(
      this.whitelist.collection_id,
      1,
      1,
      "whitelist"
    );

    this.resource.totalSpots = this.whitelist.whitelist_spots;

    this.resource.occupiedSpots = spotsRes.data.spotsCount;

    if (this.resource.occupiedSpots >= this.resource.totalSpots) {
      this.full = true;
    }

    if (new Date(this.whitelist.whitelist_start) < new Date()) {
      this.live = true;
    }

    this.loading = false;

    setTimeout(() => {
      this.resource.spotPercent = Math.floor(
        (this.resource.occupiedSpots / this.resource.totalSpots) * 100
      );

      if (this.resource.spotPercent >= 100) {
        this.resource.spotPercent = 100;
      }

      const noOfSpotsPercent: any = this.$refs.noOfSpotsPercent;

      noOfSpotsPercent.style.width = this.resource.spotPercent + "%";

      if (new Date(this.whitelist.start_date) > new Date()) {
        this.showNoOfSpotsProgress();
      }
    }, 100);
  },
  methods: {
    setWhitelistListLiveStatus() {
      this.live = true;
    },
    showNoOfSpotsProgress() {
      this.interval = setInterval(async () => {
        const spotsRes = await getWhitelistEntryById(
          this.whitelist.collection_id,
          1,
          1,
          "whitelist"
        );

        this.resource.occupiedSpots = spotsRes.data.spotsCount;

        this.resource.spotPercent = Math.floor(
          (this.resource.occupiedSpots / this.resource.totalSpots) * 100
        );

        if (this.resource.spotPercent >= 100) {
          this.resource.spotPercent = 100;
        }

        const noOfSpotsPercent: any = this.$refs.noOfSpotsPercent;

        noOfSpotsPercent.style.width = this.resource.spotPercent + "%";

        if (this.resource.occupiedSpots >= this.resource.totalSpots) {
          this.full = true;
          clearInterval(this.interval);
        }
      }, 5000);
    },
    async copyLink(event: any) {
      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent?.clipboardData ||
        navigator.clipboard;

      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      clipboardData.writeText(
        `${baseURL}/whitelist/${this.collection.username}`
      );

      this.$toast.showMessage({ message: "Link Copied" });

      this.showShareBox = false;
    },
    shareOnTwitter() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      const twitterURL = "https://twitter.com";

      const text = "Check out this collection on Wapal";

      const link = `${baseURL}/whitelist/${this.collection.username}`;

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}&via=wapal_official`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },
    hideShareBox() {
      this.showShareBox = false;
    },
  },
};
</script>
