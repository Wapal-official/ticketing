<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[5.5em] lg:tw-pb-0 xl:!tw-max-w-[1100px]"
    v-if="!loading"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <img
        :src="collection?.image"
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
            <div class="tw-text-white tw-font-bold">Live in</div>
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
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
        >
          <a
            :href="collection?.twitter"
            target="_blank"
            v-if="collection?.twitter"
          >
            <v-icon
              class="tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-primary-1"
              >mdi-twitter</v-icon
            > </a
          ><a
            :href="collection?.discord"
            target="_blank"
            class="nft-discord-icon"
            v-if="collection?.discord"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
              ></path>
            </svg>
          </a>
          <a
            :href="collection?.instagram"
            target="_blank"
            v-if="collection?.instagram"
          >
            <v-icon
              class="tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-primary-1"
              >mdi-instagram</v-icon
            >
          </a>
          <button>
            <v-icon class="!tw-text-white">mdi-share-variant</v-icon>
          </button>
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
import { getWhitelistEntryById } from "~/services/WhitelistService";

export default {
  props: { collection: { type: Object }, whitelist: { type: Object } },
  data() {
    return {
      live: true,
      interval: null,
      resource: { occupiedSpots: 0, totalSpots: 0 },
      loading: true,
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

    if (new Date(this.whitelist.start_date) < new Date()) {
      this.live = false;
    }

    this.loading = false;

    setTimeout(() => {
      this.resource.spotPercent = Math.floor(
        (this.resource.occupiedSpots / this.resource.totalSpots) * 100
      );

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

        const noOfSpotsPercent: any = this.$refs.noOfSpotsPercent;

        noOfSpotsPercent.style.width = this.resource.spotPercent + "%";

        if (this.resource.occupiedSpots >= this.resource.totalSpots) {
          this.full = true;
          clearInterval(this.interval);
        }
      }, 5000);
    },
  },
};
</script>
