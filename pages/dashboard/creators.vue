<template>
  <div>
    <h2 class="tw-mb-6 tw-text-white tw-text-[1.75em] tw-font-bold">
      Wapal Season 1
    </h2>
    <v-row
      no-gutters
      class="!tw-mb-10 tw-justify-between tw-p-8 tw-items-center rounded-lg"
      style="background-color: #1a1b1e"
    >
      <v-col class="!tw-mb-6 !sm:tw-mb-0 !tw-pr-5" cols="12" sm="4" md="4">
        <div style="border-right: 1px solid #25262b !important">
          <h4
            class="tw-mb-4 sm:tw-mb-8 tw-text-xl tw-font-semibold tw-text-wapal-white"
          >
            Est. WPL Reward
          </h4>
          <div
            class="tw-items-bottom tw-mb-4 tw-flex tw-justify-start tw-gap-2"
            style="align-items: center"
          >
            <img
              src="~/assets/img/creators/logo-round.svg"
              class="tw-w-full tw-h-full tw-rounded"
              alt="wapal logo"
              style="max-width: 24px; max-height: 24px"
            />
            <span style="font-size: 22px">0</span>
            <strong class="dark-text">WPL</strong>
          </div>
          <strong class="tw-capitalize dark-text reward-text"
            >Total 500K Wpl</strong
          >
        </div>
      </v-col>
      <v-col class="!tw-mb-6 !sm:tw-mb-0 !tw-pr-5" cols="12" sm="3" md="4">
        <div style="border-right: 1px solid #25262b !important">
          <h4
            class="tw-mb-4 sm:tw-mb-8 tw-text-xl tw-font-semibold tw-text-wapal-white"
          >
            Est. APT Reward
          </h4>
          <div
            class="tw-mb-4 tw-flex tw-justify-start tw-gap-2"
            style="align-items: center"
          >
            <img
              src="~/assets/img/aptBlack.svg"
              class="tw-w-full tw-h-full tw-rounded"
              alt="aptos logo"
              style="max-width: 24px; max-height: 24px"
            />
            <span style="font-size: 22px">0</span>
            <strong class="dark-text">WPL</strong>
          </div>
          <strong class="tw-capitalize dark-text reward-text"
            >Total 20.20K apt</strong
          >
        </div>
      </v-col>
      <v-col class="!tw-mb-6 !sm:tw-mb-0" cols="12" sm="3" md="4">
        <div>
          <h4
            class="tw-mb-4 sm:tw-mb-8 tw-text-xl tw-font-semibold tw-text-wapal-white"
          >
            Ends in
          </h4>
          <reusable-count-down
            class="tw-mb-4"
            :startTime="'2024-05-04T12:00:00'"
            :textSmall="true"
            :changeColor="false"
          />
          <strong class="dark-text reward-text">Apr 26, 2024 06:00 GMT</strong>
        </div>
      </v-col>
    </v-row>
    <h2 class="tw-mb-6 tw-text-white tw-text-[1.75em] tw-font-bold">
      Creator Studio
    </h2>
    <v-row
      no-gutters
      class="studio-row !tw-mb-10 tw-flex tw-flex-row tw-justify-between tw-items-center rounded-xl"
    >
      <v-col cols="12" sm="6" md="4" class="!tw-pr-4 !tw-pb-4">
        <div
          class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
          style="background-color: #1a1b1e"
        >
          <img
            src="~/assets/img/creators/users.svg"
            class="tw-w-full tw-h-full tw-rounded"
            alt="total users"
            style="max-width: 60px; max-height: 60px"
          />
          <div class="tw-flex tw-justify-around tw-flex-col">
            <span class="d-block">Total Users </span>
            <span class="d-block studio-text">
              {{ formatNumber(totalUser) }}
              <strong class="dark-text reward-text" style="margin-left: -3px">{{
                checkNumber
              }}</strong>
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="!tw-pr-4 !tw-pb-4">
        <div
          class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
          style="background-color: #1a1b1e"
        >
          <img
            src="~/assets/img/creators/editions.svg"
            class="tw-w-full tw-h-full tw-rounded"
            alt="total editions"
            style="max-width: 60px; max-height: 60px"
          />
          <div class="tw-flex tw-justify-around tw-flex-col">
            <span class="d-block">Total Edition </span>
            <span class="d-block studio-text">
              {{ formatNumber(totalEdition) }}
              <strong class="dark-text reward-text" style="margin-left: -3px">{{
                checkNumber
              }}</strong>
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="!tw-pr-4 !tw-pb-4">
        <div
          class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
          style="background-color: #1a1b1e"
        >
          <img
            src="~/assets/img/creators/minted.svg"
            class="tw-w-full tw-h-full tw-rounded"
            alt="total minted"
            style="max-width: 60px; max-height: 60px"
          />
          <div class="tw-flex tw-justify-around tw-flex-col">
            <span class="d-block">Total NFT Minted </span>
            <span class="d-block studio-text">
              {{ formatNumber(totalMinted) }}
              <strong class="dark-text reward-text" style="margin-left: -3px">{{
                checkNumber
              }}</strong>
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="!tw-pr-4 !tw-pb-4">
        <div
          class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
          style="background-color: #1a1b1e"
        >
          <img
            src="~/assets/img/creators/Created.svg"
            class="tw-w-full tw-h-full tw-rounded"
            alt="total Created"
            style="max-width: 60px; max-height: 60px"
          />
          <div class="tw-flex tw-justify-around tw-flex-col">
            <span class="d-block">Total Collection Created </span>
            <span class="d-block studio-text">
              {{ formatNumber(totalCreated) }}
              <strong class="dark-text reward-text" style="margin-left: -3px">{{
                checkNumber
              }}</strong>
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="!tw-pr-4 !tw-pb-4">
        <div
          class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
          style="background-color: #1a1b1e"
        >
          <img
            src="~/assets/img/creators/auction.svg"
            class="tw-w-full tw-h-full tw-rounded"
            alt="total auction"
            style="max-width: 60px; max-height: 60px"
          />
          <div class="tw-flex tw-justify-around tw-flex-col">
            <span class="d-block">Total Auction </span>
            <span class="d-block studio-text">
              {{ totalAuction }}
              <!-- <strong class="dark-text">M</strong> -->
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- <h2 class="tw-mb-6 tw-text-white tw-text-[1.75em] tw-font-bold">
      Creators Leaderboard
    </h2>
    <dashboard-creators-table
      class="tw-mb-8"
      :headers="headers"
      :items="auctions"
    /> -->
  </div>
</template>

<script>
import {
  getTotalCollections,
  getTotalAuctions,
  getTotalusers,
} from "@/services/creatorAirdrop";

export default {
  layout: "dashboard",
  data() {
    return {
      totalCreated: null,
      totalEdition: null,
      totalMinted: null,
      totalUser: null,
      totalAuction: null,
      checkNumber: "",
      // headers: [
      //   { text: "Rank", value: "rank" },
      //   { text: "Creator Address", value: "nameCheck" },
      //   { text: "project", value: "project" },
      //   { text: "total mint", value: "totalMint" },
      //   { text: "Total volume", value: "totalVolume" },
      //   { text: "Total points", value: "totalPoints" },
      // ],
      // auctions: [
      //   {
      //     rank: 1,
      //     nameCheck: "John Doe",
      //     project: 1000,
      //     totalMint: "1211",
      //     totalVolume: "1231",
      //     totalPoints: "1414",
      //   },
      //   {
      //     rank: 2,
      //     nameCheck: "Jane Smith",
      //     project: 1500,
      //     totalMint: "1211",
      //     totalVolume: "1231",
      //     totalPoints: "1414",
      //   },
      //   {
      //     rank: 3,
      //     nameCheck: "Alice Johnson",
      //     project: 2000,
      //     totalMint: "1211",
      //     totalVolume: "1231",
      //     totalPoints: "1414",
      //   },
      //   {
      //     rank: 4,
      //     nameCheck: "Alice Johnson",
      //     project: 2000,
      //     totalMint: "1211",
      //     totalVolume: "1231",
      //     totalPoints: "1414",
      //   },
      // ],
    };
  },
  methods: {
    formatNumber(number) {
      if (number >= 1000000) {
        this.checkNumber = "M";
        return (number / 1000000).toFixed(1);
      } else if (number >= 1000) {
        this.checkNumber = "k";
        return (number / 1000).toFixed(1);
      } else {
        this.checkNumber = "";
        return number;
      }
    },
  },
  async mounted() {
    const totals = await getTotalCollections();
    this.totalCreated = totals.totalCollections;
    this.totalEdition = totals.totalEditions;
    const totalAuction = await getTotalAuctions();
    this.totalAuction = totalAuction[0].total;
    const totalUser = await getTotalusers();
    this.totalUser = totalUser[0].total;
    console.log("total", totalUser);
  },
};
</script>

<style lang="css" scoped>
.dark-text {
  color: #909296;
}

.reward-text {
  font-size: 12px !important;
  text-transform: uppercase;
}
.studio-text {
  font-size: 18px;
}
</style>
