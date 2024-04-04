<template>
  <div>
    <h2 class="tw-mb-6 tw-text-white tw-text-[1.75em] tw-font-bold">
      Wapal Season 1
    </h2>
    <v-row
      no-gutters
      class="!tw-mb-10 tw-p-8 tw-items-center tw-gap-2 rounded-lg"
      style="background-color: #25262b"
    >
      <v-col
        class="tw-mb-6 sm:tw-mb-0"
        cols="12"
        sm="4"
        md="4"
        :class="dynamicColClass"
      >
        <h4
          class="tw-mb-4 sm:tw-mb-8 tw-text-xl tw-font-semibold tw-text-wapal-gray"
        >
          Est. WPL Reward
        </h4>
        <div class="tw-items-bottom tw-mb-4 tw-flex tw-justify-start tw-gap-2">
          <img
            src="~/assets/img/creators/logo-round.svg"
            class="tw-w-full tw-h-full tw-rounded"
            alt="wapal logo"
            style="max-width: 24px; max-height: 24px"
          />
          <span style="font-size: 18px">0</span>
          <strong class="dark-text">WPL</strong>
        </div>
        <strong class="tw-capitalize dark-text">Total 500K Wpl</strong>
      </v-col>
      <v-col
        class="tw-mb-6 sm:tw-mb-0"
        :class="dynamicColClass"
        cols="12"
        sm="3"
        md="4"
      >
        <h4
          class="tw-mb-4 sm:tw-mb-8 tw-text-xl tw-font-semibold tw-text-wapal-gray"
        >
          Est. APT Reward
        </h4>
        <div class="tw-mb-4 tw-flex tw-justify-start tw-gap-2">
          <img
            src="~/assets/img/aptBlack.svg"
            class="tw-w-full tw-h-full tw-rounded"
            alt="aptos logo"
            style="max-width: 24px; max-height: 24px"
          />
          <span style="font-size: 18px">0</span>
          <strong class="dark-text">WPL</strong>
        </div>
        <strong class="tw-capitalize dark-text">Total 20.20K apt</strong>
      </v-col>
      <v-col
        class="tw-mb-6 sm:tw-mb-0"
        :class="dynamicColClass"
        cols="12"
        sm="3"
        md="4"
      >
        <h4
          class="tw-mb-4 sm:tw-mb-8 tw-text-xl tw-font-semibold tw-text-wapal-gray"
        >
          Ends in
        </h4>
        <reusable-count-down
          class="tw-mb-4"
          :startTime="'2024-04-04T12:00:00'"
          :textSmall="true"
          :changeColor="false"
        />
        <strong class="dark-text">Apr 26, 2024 06:00 GMT</strong>
      </v-col>
    </v-row>
    <h2 class="tw-mb-6 tw-text-white tw-text-[1.75em] tw-font-bold">
      Creator Studio
    </h2>
    <v-row
      no-gutters
      class="studio-row !tw-mb-10 tw-flex tw-flex-row tw-justify-between tw-items-center tw-gap-12 rounded-xl"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
        style="background-color: #25262b; max-width: 30% !important"
      >
        <img
          src="~/assets/img/creators/users.svg"
          class="tw-w-full tw-h-full tw-rounded"
          alt="total users"
          style="max-width: 60px; max-height: 60px"
        />
        <div class="tw-flex tw-justify-around tw-flex-col">
          <span class="d-block">Total Users </span>
          <span class="d-block">
            {{ formatNumber(totalUser) }}
            <strong class="dark-text" style="margin-left: -3px">{{
              checkNumber
            }}</strong>
          </span>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
        style="background-color: #25262b; max-width: 30% !important"
      >
        <img
          src="~/assets/img/creators/editions.svg"
          class="tw-w-full tw-h-full tw-rounded"
          alt="total editions"
          style="max-width: 60px; max-height: 60px"
        />
        <div class="tw-flex tw-justify-around tw-flex-col">
          <span class="d-block">Total Edition </span>
          <span class="d-block">
            {{ formatNumber(totalEdition) }}
            <strong class="dark-text" style="margin-left: -3px">{{
              checkNumber
            }}</strong>
          </span>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
        style="background-color: #25262b; max-width: 30% !important"
      >
        <img
          src="~/assets/img/creators/minted.svg"
          class="tw-w-full tw-h-full tw-rounded"
          alt="total minted"
          style="max-width: 60px; max-height: 60px"
        />
        <div class="tw-flex tw-justify-around tw-flex-col">
          <span class="d-block">Total NFT Minted </span>
          <span class="d-block">
            {{ formatNumber(totalMinted) }}
            <strong class="dark-text" style="margin-left: -3px">{{
              checkNumber
            }}</strong>
          </span>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
        style="background-color: #25262b; max-width: 47% !important"
      >
        <img
          src="~/assets/img/creators/Created.svg"
          class="tw-w-full tw-h-full tw-rounded"
          alt="total Created"
          style="max-width: 60px; max-height: 60px"
        />
        <div class="tw-flex tw-justify-around tw-flex-col">
          <span class="d-block">Total Collection Created </span>
          <span class="d-block">
            {{ formatNumber(totalCreated) }}
            <strong class="dark-text" style="margin-left: -3px">{{
              checkNumber
            }}</strong>
          </span>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="!tw-py-8 !tw-px-11 tw-flex tw-justify-start tw-gap-6 rounded-lg"
        style="background-color: #25262b; max-width: 47% !important"
      >
        <img
          src="~/assets/img/creators/auction.svg"
          class="tw-w-full tw-h-full tw-rounded"
          alt="total auction"
          style="max-width: 60px; max-height: 60px"
        />
        <div class="tw-flex tw-justify-around tw-flex-col">
          <span class="d-block">Total Auction </span>
          <span class="d-block">
            {{ totlaAuction }}
            <!-- <strong class="dark-text">M</strong> -->
          </span>
        </div>
      </v-col>
    </v-row>
    <h2 class="tw-mb-6 tw-text-white tw-text-[1.75em] tw-font-bold">
      Creators Leaderboard
    </h2>
    <dashboard-creators-table
      class="tw-mb-8"
      :headers="headers"
      :items="auctions"
    />
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      totalCreated: 10000,
      totalEdition: 1000,
      totalMinted: 100000,
      totalUser: 1000000,
      totlaAuction: 1000,
      checkNumber: "",
      headers: [
        { text: "Rank", value: "rank" },
        { text: "Name", value: "nameCheck" },
        { text: "project", value: "project" },
        { text: "total mint", value: "totalMint" },
        { text: "Total volume", value: "totalVolume" },
        { text: "Total points", value: "totalPoints" },
      ],
      auctions: [
        {
          rank: 1,
          nameCheck: "John Doe",
          project: 1000,
          totalMint: "1211",
          totalVolume: "1231",
          totalPoints: "1414",
        },
        {
          rank: 2,
          nameCheck: "Jane Smith",
          project: 1500,
          totalMint: "1211",
          totalVolume: "1231",
          totalPoints: "1414",
        },
        {
          rank: 3,
          nameCheck: "Alice Johnson",
          project: 2000,
          totalMint: "1211",
          totalVolume: "1231",
          totalPoints: "1414",
        },
        {
          rank: 4,
          nameCheck: "Alice Johnson",
          project: 2000,
          totalMint: "1211",
          totalVolume: "1231",
          totalPoints: "1414",
        },
      ],
    };
  },
  computed: {
    dynamicColClass() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return "dynamicColSm";
      } else {
        return "dynamicColMd";
      }
    },
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
};
</script>

<style lang="css" scoped>
.dark-text {
  color: #909296;
}

.dynamicColSm {
  /* max-width: 97%; */
}
.dynamicColMd {
  max-width: 31%;
  min-width: 31%;
}
</style>
