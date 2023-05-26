<template>
  <div v-if="!loadingAuction">
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
                  {{
                    item.wallet_address.slice(0, 5) +
                    "..." +
                    item.wallet_address.slice(-5, item.wallet_address.length)
                  }}
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
    <v-dialog
      v-model="showConnectWalletDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[35%]"
    >
      <connect-wallet-modal @closeModal="showConnectWalletDialog = false" />
    </v-dialog>
    <v-dialog
      v-model="showSignupDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[35%]"
    >
      <signup-modal
        message="Login into your wapal account to place a bid"
        @close="showSignupDialog = false"
      />
    </v-dialog>
  </div>
  <div class="tw-py-32 tw-w-full" v-else>
    <reusable-loading />
  </div>
</template>

<script>
import { publicRequest } from "@/services/fetcher";
import { getCurrentBid, placeBid } from "@/services/AuctionService";
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
      bid: 0,
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
      const res = await publicRequest.get(
        `/api/auction/${this.$route.params.id}`
      );

      let response = res.data.auction;
      let rev = response.biddings.reverse();
      response.biddings = rev;
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
      }
    },
    async withdrawBid() {
      if (!this.getWalletConnectedStatus) {
        this.showConnectWalletDialog = true;
        return;
      }
      this.loading = true;
      try {
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

.bid-list::-webkit-scrollbar {
  width: 3px;
}

.bid-list::-webkit-scrollbar-track {
  background: #d9d9d9;
}

.bid-list::-webkit-scrollbar-thumb {
  background-color: #ff36ab;
}
</style>
