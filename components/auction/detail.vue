<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[5.5em] lg:tw-pb-24 xl:!tw-max-w-[1100px]"
    v-if="!loadingAuction"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <img
        :src="auction.nft.meta.image"
        :alt="auction.nft.meta.name"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[550px] md:tw-h-[550px] md:tw-max-h-[550px] lg:tw-w-[450px] lg:tw-min-w-[450px] lg:tw-h-[450px] xl:tw-w-[550px] xl:tw-h-[550px] xl:tw-max-h-[550px] tw-object-cover tw-rounded-xl"
        :onerror="imageNotFound()"
      />
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 lg:tw-w-[474px]"
      >
        <h1 class="tw-text-white tw-text-[2.5em] tw-font-bold">
          {{ auction.nft.meta.name }}
        </h1>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <a
            :href="auction.twitter"
            target="_blank"
            v-if="auction.twitter"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-twitter tw-text-lg tw-transition tw-duration-200 tw-ease-linear tw-ml-0.5"
            ></i>
          </a>
          <a
            :href="auction.instagram"
            target="_blank"
            v-if="auction.instagram"
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
          {{ auction.nft.meta.description }}
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
          v-if="!auctionStarted"
        >
          <h3
            class="tw-uppercase tw-text-dark-2 tw-font-semibold 3xl:tw-text-lg"
          >
            Auction Starts In
          </h3>
          <count-down
            :startTime="auction?.startAt"
            @countdownComplete="startAuction"
          />
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
          v-if="!auctionEnded && auctionStarted"
        >
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between"
          >
            <div>
              <div class="tw-font-semibold tw-text-dark-0 tw-uppercase tw-pb-1">
                Current Bid
              </div>
              <div class="tw-text-white tw-text-[1.75em] tw-font-medium">
                {{ current_bid }} APT
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
              <div class="tw-font-semibold tw-text-dark-0 tw-uppercase tw-pb-1">
                End Time
              </div>
              <count-down
                :startTime="auction.endAt"
                @countdownComplete="endAuction"
              />
            </div>
          </div>
          <ValidationObserver
            ref="form"
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between lg:tw-flex-col lg:tw-items-start lg:tw-justify-start xl:tw-flex-row xl:tw-items-start xl:tw-justify-between"
          >
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full md:tw-w-[213px] md:tw-max-w-[213px] lg:tw-w-full lg:tw-max-w-full xl:tw-w-[213px] xl:tw-max-w-[213px]"
              rules="required|bidAmount|lamport"
              v-slot="{ errors }"
            >
              <input-text-field
                v-model="bid"
                placeholder="Bid price(APT)"
                class="tw-w-full"
              />
              <div class="tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <div
              class="md:tw-w-[213px] md:tw-max-w-[213px] lg:tw-w-full lg:tw-max-w-full xl:tw-w-[213px] xl:tw-max-w-[213px]"
            >
              <button-primary
                title="Place a Bid"
                :fullWidth="true"
                @click="placeBid"
                v-if="showPlaceBidButton"
                :loading="loading"
              />
              <button-primary
                title="Increase Your Bid"
                :fullWidth="true"
                @click="increaseBid"
                :loading="loading"
                v-else
              />
            </div>
          </ValidationObserver>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
          v-if="auctionEnded"
        >
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between"
          >
            <div>
              <div class="tw-font-semibold tw-text-dark-0 tw-uppercase tw-pb-1">
                Final Bid
              </div>
              <div class="tw-text-white tw-text-[1.75em] tw-font-medium">
                {{ current_bid }} APT
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
              <div class="tw-font-semibold tw-text-dark-0 tw-uppercase tw-pb-1">
                Auction Ended
              </div>
              <count-down :startTime="auction.endAt" />
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-baseline tw-justify-between tw-gap-2 md:tw-flex-row"
          >
            <div
              class="tw-w-full md:tw-w-[213px] md:tw-max-w-[213px] lg:tw-w-full lg:tw-max-w-full xl:tw-w-[213px] xl:tw-max-w-[213px]"
            >
              <input-text-field
                v-model="bid"
                placeholder="Bid price(APT)"
                :disabled="true"
                class="tw-w-full"
              />
            </div>
            <div
              class="tw-w-full md:tw-w-[213px] md:tw-max-w-[213px] lg:tw-w-full lg:tw-max-w-full xl:tw-w-[213px] xl:tw-max-w-[213px]"
            >
              <button-primary
                title="Withdraw Bid"
                :fullWidth="true"
                :loading="loading"
                :title="
                  auction.nft.nft.owner_address === getWalletConnectedStatus
                    ? 'Complete Auction'
                    : 'Claim NFT'
                "
                @click="completeAuction"
                :disabled="auction.completed"
                v-if="checkOwner"
              />
              <button-primary
                title="Withdraw Bid"
                :fullWidth="true"
                @click="withdrawBid"
                v-else
              />
            </div>
          </div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5 tw-relative"
          v-if="auctionStarted"
        >
          <div
            class="tw-absolute tw-w-full tw-h-1/4 tw-overflow-hidden tw-left-0 tw-bottom-0 tw-rounded-b-lg tw-bg-gradient-to-b tw-from-black/0 tw-to-black"
          ></div>
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-pb-2"
            v-if="ownerAddress"
          >
            <div
              class="tw-flex tw-flex-row tw-items-baseline tw-justify-start tw-gap-2"
            >
              <span
                class="tw-uppercase tw-text-xs tw-font-semibold tw-text-dark-2 tw-tracking-[0.015rem]"
              >
                Owner</span
              >
              <span class="tw-text-primary-1 tw-text-sm tw-font-medium">{{
                ownerAddress
              }}</span>
            </div>
            <div
              class="tw-flex tw-flex-row tw-items-baseline tw-justify-start tw-gap-2"
            >
              <span
                class="tw-uppercase tw-text-xs tw-font-semibold tw-text-dark-2 tw-tracking-[0.015rem]"
              >
                Royalty</span
              >
              <span class="tw-text-sm tw-text-white tw-font-normal"
                >{{ royaltyPercentage }}%</span
              >
            </div>
          </div>
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
          >
            <div class="tw-font-semibold">Last bid</div>
          </div>
          <div
            v-if="auction.biddings.length > 0"
            class="tw-w-full tw-pr-4 no-scrollbar tw-overflow-auto tw-h-[80px]"
          >
            <div
              v-for="(item, i) in auction.biddings"
              :key="i"
              class="tw-w-full"
            >
              <div
                class="tw-py-2 tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-items-center md:tw-justify-between md:tw-flex-row"
              >
                <div
                  class="!tw-text-dark-0 tw-flex tw-flex-row tw-items-center tw-justify-start tw-w-full md:tw-w-[70%]"
                >
                  {{ item.displayName }}
                  bid for {{ item.bid }} APT
                </div>
                <div
                  class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-w-full md:tw-w-[30%]"
                >
                  <small class="tw-text-sm tw-font-medium tw-text-dark-2">{{
                    $moment(item.time).fromNow()
                  }}</small>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-center">No biddings yet</p>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="showConnectWalletDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[35%]"
    >
      <connect-wallet-modal @closeModal="showConnectWalletDialog = false" />
    </v-dialog>
  </div>
  <!-- <div v-if="!loadingAuction">
    <div
      class="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-px-4 tw-pt-16 tw-pb-16 md:tw-px-16 xl:tw-flex-row xl:tw-gap-16 xl:tw-items-start"
    >
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-w-full tw-group md:tw-w-[60%] xl:tw-w-[40%]"
      >
        <div
          class="tw-rounded-lg nft-preview-card-border tw-w-full tw-overflow-hidden tw-transition-all tw-duration-150 tw-ease-linear"
        >
          <img
            :src="auction.nft.meta.image"
            :alt="auction.nft.meta.name"
            class="tw-w-full tw-rounded-lg tw-max-h-[550px] tw-object-fill"
          />
        </div>
        <div class="tw-w-full" v-if="auctionStarted">
          <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full lg:tw-flex-row xl:tw-flex-col 2xl:tw-flex-row tw-gap-4"
            v-if="!auctionEnded"
          >
            <span
              class="tw-text-wapal-pink tw-text-3xl 2xl:tw-text-2xl 3xl:tw-text-3xl"
              >Auction Ends In</span
            >
            <reusable-count-down
              :startTime="auction.endAt"
              :shadow="true"
              @countdownComplete="endAuction"
            />
          </div>
          <span
            class="tw-text-wapal-pink tw-text-3xl 2xl:tw-text-2xl 3xl:tw-text-3xl"
            v-else
            >Auction Ended</span
          >
        </div>
      </div>
      <div
        class="tw-rounded tw-w-full tw-bg-[#001233] tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-px-4 tw-py-8 md:tw-px-8 xl:tw-w-[60%] preview-shadow"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
        >
          <a :href="auction.twitter" target="_blank" v-if="auction.twitter">
            <v-icon
              class="!tw-text-2xl tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink"
              >mdi-twitter</v-icon
            >
          </a>
          <a :href="auction.instagram" target="_blank" v-if="auction.instagram">
            <v-icon
              class="!tw-text-2xl tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink"
              >mdi-instagram</v-icon
            >
          </a>
        </div>
        <div class="tw-text-wapal-gray tw-pb-8">
          <h1
            class="tw-text-2xl tw-pb-4 tw-font-semibold tw-capitalize md:tw-text-4xl"
          >
            {{ auction.nft.meta.name }}
          </h1>
          <p class="tw-font-light">
            {{ auction.nft.meta.description }}
          </p>
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-w-full"
          v-if="!auctionStarted"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-py-4 tw-px-4 tw-bg-[#0C224B] tw-rounded tw-w-fit lg:tw-flex-row lg:tw-items-center lg:tw-justify-between lg:tw-px-8"
          >
            <div
              class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-gap-4"
            >
              <span
                class="tw-text-wapal-pink tw-text-3xl 2xl:tw-text-2xl 3xl:tw-text-3xl"
                >Auction Starts In</span
              >
              <reusable-count-down
                :startTime="auction.startAt"
                :shadow="true"
                @countdownComplete="startAuction"
              />
            </div>
          </div>
        </div>
        <ValidationObserver
          ref="form"
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-p-4 tw-bg-[#0C224B] tw-rounded tw-w-full lg:tw-flex-row lg:tw-items-center lg:tw-justify-between"
          v-else
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1 tw-w-fit"
          >
            <div class="tw-text-xs">Current Bid</div>
            <div class="tw-text-3xl xl:tw-text-xl 2xl:tw-text-3xl">
              {{ current_bid }} APT
            </div>
          </div>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-max-w-[300px]"
            rules="required|bidAmount|lamport"
            v-slot="{ errors }"
          >
            <reusable-text-field
              v-model="bid"
              background="#0C224B"
              type="number"
            ></reusable-text-field>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <div v-if="!auctionEnded">
            <ReusableThemeButton
              title="Place Your Bid"
              @click="placeBid"
              :loading="loading"
              :disabled="!auctionStarted"
              v-if="showPlaceBidButton"
            />
            <ReusableThemeButton
              title="Increase Your Bid"
              @click="increaseBid"
              :loading="loading"
              v-else
            />
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
            v-else
          >
            <reusable-theme-button
              :loading="loading"
              :title="
                auction.nft.nft.owner_address === getWalletConnectedStatus
                  ? 'Complete Auction'
                  : 'Claim NFT'
              "
              @click="completeAuction"
              :disabled="auction.completed"
              v-if="checkOwner"
            />
            <reusable-theme-button
              :loading="loading"
              title="Withdraw Bid"
              @click="withdrawBid"
              v-else
            />
          </div>
        </ValidationObserver>
        <div
          class="tw-text-green-600 tw-text-lg"
          v-if="
            auction.completed &&
            checkOwner &&
            auction.nft.nft.owner_address !== getWalletConnectedStatus
          "
        >
          Congratulations on winning the bid. NFT has been sent to your wallet.
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
          v-if="auctionStarted"
        >
          <h4 class="tw-text-xl tw-font-semibold tw-text-wapal-gray">
            Last Bid
          </h4>
          <div
            v-if="auction.biddings.length > 0"
            class="tw-w-full tw-h-[375px] tw-overflow-auto tw-pr-4 bid-list"
          >
            <div
              v-for="(item, i) in auction.biddings"
              :key="i"
              class="tw-w-full"
            >
              <div
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-py-2"
              >
                <div class="!tw-text-white">
                  {{ item.displayName }}
                  bid for {{ item.bid }} APT
                </div>
                <div>
                  <small class="tw-text-sm">{{
                    $moment(item.time).fromNow()
                  }}</small>
                </div>
              </div>
              <div
                v-if="i < auction.biddings.length - 1"
                class="tw-w-full tw-h-[1px] tw-bg-wapal-gray"
              ></div>
            </div>
          </div>
          <p v-else class="text-center">No biddings yet</p>
        </div>
      </div>
    </div>
  </div> -->
  <div class="tw-py-32 tw-w-full" v-else>
    <reusable-loading />
  </div>
</template>

<script>
import { publicRequest } from "@/services/fetcher";
import imageNotFound from "@/utils/imageNotFound";
import {
  getCurrentBid,
  getDomainNameFromWalletAddress,
  placeBid,
  setCompleteAuction,
  getOwnerAndRoyaltyOfTokenInAuction,
} from "@/services/AuctionService";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";

extend("bidAmount", {
  validate(value) {
    if (value <= 0) {
      return false;
    }
    return true;
  },
  message: "Bid amount should be greater than 0",
});

extend("lamport", {
  validate(value) {
    if (value * Math.pow(10, 8) < 1) {
      return false;
    }
    return true;
  },
  message: "Please Enter value with only 8 decimal places",
});

export default {
  props: { propAuctionName: { type: String } },
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      valid: true,
      errMsg: "",
      current_bid: "",
      error: false,
      loading: false,
      validRules: {
        required: (value) => !!value || "Required.",
      },
      bid: null,
      endInterval: 0,
      showSignupDialog: false,
      showConnectWalletDialog: false,
      loading: false,
      loadingAuction: true,
      showIncreaseBidButton: false,
      showPlaceBidButton: true,
      auctionEnded: false,
      auctionStarted: false,
      previousBid: 0,
      bidInterval: null,
      showMoreBiddings: false,
      showShareBox: false,
      royaltyPercentage: null,
      ownerAddress: "",
      imageNotFound,
    };
  },
  watch: {
    bid() {
      this.error = false;
      this.errMsg = "";
    },
  },
  computed: {
    getWalletConnectedStatus() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    checkOwner() {
      if (
        this.getWalletConnectedStatus === this.auction.nft.nft.owner_address
      ) {
        return true;
      }

      if (this.auction.biddings.length > 0) {
        if (
          this.getWalletConnectedStatus ===
          this.auction.biddings[0].wallet_address
        ) {
          return true;
        }
      }
      return false;
    },
  },
  async mounted() {
    await this.getAuctionDetails();

    this.auctionStarted = this.checkAuctionStarted();
    this.auctionEnded = this.checkAuctionEnded();
    await this.setBid();

    await this.setRoyaltyAndOwnerOfToken();

    if (!this.auctionEnded) {
      this.bidInterval = setInterval(async () => {
        await this.getAuctionDetails();
      }, 5000);
    }
  },
  methods: {
    checkAuctionStarted() {
      if (new Date(this.auction.startAt) > new Date()) {
        return false;
      }
      return true;
    },
    checkAuctionEnded() {
      if (new Date(this.auction.endAt) > new Date()) {
        return false;
      }

      return true;
    },
    async getAuctionDetails() {
      let res = null;
      if (!this.propAuctionName) {
        try {
          res = await publicRequest.get(
            `/api/auction/${this.$route.params.id}`
          );
        } catch (error) {
          if (this.$route.params.id.includes("\\")) {
            const cleanedParams = this.$route.params.id.split("\\").join("%5C");
            res = await publicRequest.get(`/api/auction/${cleanedParams}`);
          }
        }
      } else {
        res = await publicRequest.get(`/api/auction/${this.propAuctionName}`);
      }

      let response = res.data.auction;

      console.log(response);
      let rev = response.biddings.reverse();
      response.biddings = rev;

      const bidRes = await Promise.all(
        response.biddings.map(async (bid) => {
          const domainNameRes = await this.getFormattedWalletAddress(
            bid.wallet_address
          );

          bid.displayName = domainNameRes;
        })
      );

      this.auction = response;

      this.current_bid = getCurrentBid(this.auction);

      this.loadingAuction = false;
      this.checkWalletInBiddings();
    },
    async setBid() {
      if (this.getWalletConnectedStatus) {
        const bidRes = await publicRequest.get(
          `/api/auction/bid?auction_id=${this.auction._id}&wallet_address=${this.getWalletConnectedStatus}`
        );

        const biddings = bidRes.data.bids.biddings;

        if (biddings.length > 0) {
          this.previousBid = biddings[biddings.length - 1].bid;
        }
      }
      this.bid = 0;

      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
    async placeBid() {
      if (!this.getWalletConnectedStatus) {
        this.showConnectWalletDialog = true;
        return;
      }
      try {
        this.loading = true;

        let cur_bid = getCurrentBid(this.auction);

        if (this.bid <= cur_bid) {
          this.loading = false;
          this.$toast.showMessage({
            message: "Bid Should be greater than current bid",
            error: true,
          });
          return;
        }

        let resource = await this.$store.dispatch("walletStore/placeBid", {
          detail: this.auction,
          offer_price: Number(this.bid).toFixed(8),
        });

        if (!resource) {
          this.loading = false;
          return;
        }
        let creation_number = 0;
        if (resource.success) {
          resource.events.map((event) => {
            if (event.type === `${process.env.PID}::auction::BidEvent`) {
              creation_number = event.data.bid_id.listing_id.creation_num;
            }
          });

          const res = await placeBid(
            this.getWalletConnectedStatus,
            this.bid,
            this.auction._id,
            creation_number
          );

          this.auction.biddings.unshift(...res.data.newBid.biddings);

          this.$toast.showMessage({ message: "Bid Placed Successfully" });
          this.loading = false;
          this.showPlaceBidButton = false;
          this.current_bid = getCurrentBid(this.auction);
          this.checkWalletInBiddings();
          this.$refs.form.reset();

          await this.setBid();
        } else {
          this.$toast.showMessage({
            message: resource.vm_status,
            error: true,
          });
        }

        this.loading = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
      }
    },
    async increaseBid() {
      if (!this.getWalletConnectedStatus) {
        this.showConnectWalletDialog = true;
        return;
      }
      try {
        let cur_bid = getCurrentBid(this.auction);

        let bid = Number(this.bid) + Number(this.previousBid);
        bid = bid.toFixed(8);

        if (bid <= cur_bid) {
          this.loading = false;
          this.$toast.showMessage({
            message: "Bid Should be greater than current bid",
            error: true,
          });
          return;
        }

        const validated = await this.$refs.form.validate();
        if (validated) {
          this.loading = true;
          const increaseBidRes = await this.$store.dispatch(
            "walletStore/increaseAuctionBid",
            { price: this.bid, auction_id: this.auction.id }
          );

          let creation_number = 0;
          if (increaseBidRes.success) {
            increaseBidRes.events.map((event) => {
              if (
                event.type ===
                `${process.env.PID}::marketplace_bid_utils::IncreaseBidEvent<0x1::aptos_coin::AptosCoin>`
              ) {
                creation_number = event.data.bid_id.listing_id.creation_num;
              }
            });

            const res = await placeBid(
              this.getWalletConnectedStatus,
              bid,
              this.auction._id,
              creation_number
            );

            this.auction.biddings.unshift(...res.data.newBid.biddings);

            this.$toast.showMessage({ message: "Bid Increased Successfully" });
            this.loading = false;
            this.bid = 0;
            this.current_bid = getCurrentBid(this.auction);
            this.checkWalletInBiddings();
            this.$refs.form.reset();

            await this.setBid();
          } else {
            this.$toast.showMessage({
              message: increaseBidRes.vm_status,
              error: true,
            });
          }

          this.loading = false;
        }
      } catch (error) {
        console.log(error);

        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
      }
    },
    async endAuction() {
      await this.getAuctionDetails();
      this.auctionEnded = true;
    },
    startAuction() {
      this.auctionStarted = true;
    },
    checkWalletInBiddings() {
      if (this.getWalletConnectedStatus) {
        const alreadyBided = this.auction.biddings.some((bid) => {
          return bid.wallet_address === this.getWalletConnectedStatus;
        });

        if (alreadyBided) {
          this.showPlaceBidButton = false;
          this.showIncreaseBidButton = true;
        } else {
          this.showPlaceBidButton = true;
          this.showIncreaseBidButton = false;
        }
      } else {
        this.showPlaceBidButton = true;
        this.showIncreaseBidButton = false;
      }
    },
    async withdrawBid() {
      if (!this.getWalletConnectedStatus) {
        this.showConnectWalletDialog = true;
        return;
      }
      this.loading = true;

      if (this.auction.biddings.length < 1) {
        this.$toast.showMessage({
          message: "Auction has no bids",
          error: true,
        });

        this.loading = false;
        return;
      }

      try {
        if (this.auction.biddings.length < 1) {
          this.$toast.showMessage({
            message: "Auction has no bids",
            error: true,
          });

          this.loading = false;
          return;
        }

        const creation_number = this.auction.biddings[0].creation_number;

        const res = await this.$store.dispatch("walletStore/withdrawBid", {
          lister_address: this.auction.nft.nft.owner_address,
          creation_number: creation_number,
        });

        if (res.success) {
          this.$toast.showMessage({ message: "Bid Withdrawn Successfully" });
        }

        this.loading = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
      }
    },
    async completeAuction() {
      if (!this.getWalletConnectedStatus) {
        this.showConnectWalletDialog = true;
        return;
      }

      try {
        this.loading = true;
        const res = await this.$store.dispatch("walletStore/completeAuction", {
          auction_id: Number(this.auction.id),
        });

        if (res.success) {
          await setCompleteAuction(this.auction._id);

          await this.getAuctionDetails();

          this.$toast.showMessage({
            message: "Auction Completed Successfully",
          });
        }

        this.loading = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
      }
    },
    async getFormattedWalletAddress(walletAddress) {
      const res = await getDomainNameFromWalletAddress(walletAddress);

      if (res.name) {
        return res.name + ".apt";
      }

      return (
        walletAddress.slice(0, 4) +
        "..." +
        walletAddress.slice(-2, walletAddress.length)
      );
    },
    async copyLink(event) {
      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent?.clipboardData ||
        navigator.clipboard;

      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      clipboardData.writeText(
        `${baseURL}/auctions/${this.auction.auction_name}`
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

      const link = `${baseURL}/auctions/${this.auction.auction_name}`;

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}&via=wapal_official`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },
    hideShareBox() {
      this.showShareBox = false;
    },
    async setRoyaltyAndOwnerOfToken() {
      const creatorAddress =
        this.auction.nft.nft.current_token_data.creator_address;

      const tokenDataId =
        this.auction.nft.nft.current_token_data.token_data_id_hash;

      const royaltyAndOwnerAddressRes =
        await getOwnerAndRoyaltyOfTokenInAuction({
          creatorAddress,
          tokenDataId,
        });

      this.royaltyPercentage = royaltyAndOwnerAddressRes.royalty;

      if (royaltyAndOwnerAddressRes.owner) {
        const ownerNameRes = await getDomainNameFromWalletAddress(
          royaltyAndOwnerAddressRes.owner
        );

        if (ownerNameRes.name) {
          this.ownerAddress = ownerNameRes.name + ".apt";
        } else {
          this.ownerAddress =
            royaltyAndOwnerAddressRes.owner.slice(0, 4) +
            "..." +
            royaltyAndOwnerAddressRes.owner.slice(
              -2,
              royaltyAndOwnerAddressRes.owner.length
            );
        }
      } else {
        this.ownerAddress = this.auction.biddings[0].displayName;
      }
    },
  },
  watch: {
    async getWalletConnectedStatus() {
      await this.checkWalletInBiddings();
      await this.setBid();
    },
  },
  beforeDestroy() {
    clearInterval(this.bidInterval);
  },
};
</script>

<style scoped>
.theme-border {
  border: 2px solid rgb(250, 8, 222);
}

.theme-text {
  color: #ff36ab;
}
</style>
