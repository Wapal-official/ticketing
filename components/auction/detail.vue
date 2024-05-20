<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[5.5em] lg:tw-pb-24 xl:!tw-max-w-[1100px]"
    v-if="!loadingAuction"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <utility-image
        :source="auction.nft.meta.image"
        :alt="auction.nft.meta.name"
        :onerror="imageNotFound()"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[550px] md:tw-h-[550px] md:tw-max-h-[550px] lg:tw-w-[450px] lg:tw-min-w-[450px] lg:tw-h-[450px] xl:tw-w-[550px] xl:tw-h-[550px] xl:tw-max-h-[550px] tw-object-cover tw-rounded-xl"
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
          {{ description }}
          <button
            class="tw-text-primary-1"
            @click="toggleDescription"
            v-if="auction.nft.meta.description.length > 200"
          >
            {{ description.length <= 203 ? "Read More" : "Read Less" }}
          </button>
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
                {{ current_bid }} {{ selectedCoinType.coinType }}
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
                :placeholder="`Bid price(${selectedCoinType.coinType})`"
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
                :loading="loading"
              />
            </div>
          </ValidationObserver>
          <div class="tw-text-dark-0 tw-text-sm">
            Minimum Acceptable Bid: {{ this.minimumBid }}
          </div>
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
                {{ current_bid }} {{ selectedCoinType.coinType }}
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
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-between tw-gap-2 md:tw-flex-row"
          >
            <div
              class="tw-w-full md:tw-w-[213px] md:tw-max-w-[213px] lg:tw-w-full lg:tw-max-w-full xl:tw-w-[213px] xl:tw-max-w-[213px]"
            >
              <input-text-field
                v-model="bid"
                :placeholder="`Bid price(${selectedCoinType.coinType})`"
                :disabled="true"
                class="tw-w-full"
              />
            </div>
            <div
              class="tw-w-full md:tw-w-[213px] md:tw-max-w-[213px] lg:tw-w-full lg:tw-max-w-full xl:tw-w-[213px] xl:tw-max-w-[213px]"
            >
              <button-primary
                title="Complete Auction"
                :fullWidth="true"
                :loading="loading"
                @click="completeAuction"
                :disabled="auction.completed || !checkOwner"
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
              v-if="royaltyPercentage"
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
                  {{
                    item.displayName
                      ? item.displayName
                      : sliceAddressForDisplay(item.wallet_address)
                  }}
                  bid for {{ item.bid }} {{ selectedCoinType.coinType }}
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
    <v-dialog
      v-model="showShareModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
      :persistent="true"
    >
      <div
        class="tw-w-full tw-bg-dark-9 tw-text-white tw-px-4 tw-py-4 tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
      >
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
        >
          <button @click="showShareModal = false">
            <i class="bx bx-x tw-text-xl"></i>
          </button>
        </div>
        <div class="tw-w-full tw-text-base">
          <h3 class="tw-text-center">
            Placed Bid on {{ auction.nft.meta.name }}
          </h3>
        </div>
        <div class="tw-w-full h-full tw-rounded">
          <img
            :src="auction.nft.meta.image"
            class="tw-w-full tw-h-full tw-rounded"
            :alt="auction.nft.meta.name"
          />
        </div>
        <button-primary
          :fullWidth="true"
          title="Share on Twitter"
          :bordered="true"
          @click="shareOnTwitterAfterBid"
        >
          <template #prepend-icon>
            <img
              :src="xLogo"
              alt="X"
              width="32px"
              height="32px"
              class="tw-pr-4"
            /> </template
        ></button-primary>
      </div>
    </v-dialog>
  </div>
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
  placeBidInChain,
  completeAuction,
  getRoyaltyFromResourceAccount,
} from "@/services/AuctionService";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { getCoinType } from "@/utils/getCoinType";

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
      description: "",
      showShareModal: false,
      minimumBid: 0,
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
      if (this.auction.nft.nft) {
        if (
          this.getWalletConnectedStatus === this.auction.nft.nft.owner_address
        ) {
          return true;
        }
      } else {
        if (this.getWalletConnectedStatus === this.auction.nft.ownerAddress) {
          return true;
        }
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
    selectedCoinType() {
      return getCoinType(this.auction.coin_type ? this.auction.coin_type : "");
    },
  },
  async mounted() {
    await this.getAuctionDetails();

    this.getDescription();

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

      const lastBid = this.auction.biddings[0]
        ? this.auction.biddings[0].bid
        : this.auction.min_bid;

      this.minimumBid = parseFloat(
        (lastBid + (this.auction.bid_inc * this.auction.min_bid) / 100).toFixed(
          8
        )
      );

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

        if (this.bid <= this.minimumBid) {
          this.loading = false;
          this.$toast.showMessage({
            message: "Bid Should be greater than minimum acceptable bid",
            error: true,
          });
          return;
        }

        let pid = process.env.AUCTION_PID;

        if (this.auction.contract) {
          pid = this.auction.contract;
        }

        let resource = await placeBidInChain({
          auctionId: this.auction.id,
          coinType: this.auction.coin_type,
          pid: pid,
          bid: this.bid,
        });

        if (!resource) {
          this.loading = false;
          return;
        }
        let creation_number = 0;
        if (resource.success || resource.hash) {
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
          if (this.auction.tweet) {
            this.showShareModal = true;
          }
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

          const pid = process.env.AUCTION_PID;

          const increaseBidRes = await placeBidInChain({
            auctionId: this.auction.id,
            coinType: this.auction.coin_type,
            pid: pid,
            bid: bid,
          });

          let creation_number = 0;

          if (increaseBidRes.success || increaseBidRes.hash) {
            increaseBidRes.events.map((event) => {
              if (
                event.type ===
                `${process.env.PID}::marketplace_bid_utils::IncreaseBidEvent<${this.selectedCoinType.coinObject}>`
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
            if (this.auction.tweet) {
              this.showShareModal = true;
            }
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
          coinType: this.selectedCoinType.coinType,
        });

        if (res.success || res.hash) {
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
        let pid = process.env.AUCTION_PID;

        if (this.auction.contract) {
          pid = this.auction.contract;
        }

        const res = await completeAuction({
          auctionId: this.auction.id,
          coinType: this.auction.coin_type,
          pid: pid,
        });

        if (res.success || res.hash) {
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
      try {
        const res = await getDomainNameFromWalletAddress(walletAddress);

        if (res.name) {
          return res.name + ".apt";
        }

        return this.sliceAddressForDisplay(walletAddress);
      } catch {
        return this.sliceAddressForDisplay(walletAddress);
      }
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
    shareOnTwitterAfterBid() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";
      const twitterURL = "https://twitter.com";
      const link = `${baseURL}/auctions/${this.auction.auction_name}`;
      const text = encodeURIComponent(this.auction.tweet);

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },
    hideShareBox() {
      this.showShareBox = false;
    },
    async setRoyaltyAndOwnerOfToken() {
      try {
        const creatorAddress = this.auction.nft.nft
          ? this.auction.nft.nft.current_token_data.creator_address
          : this.auction.nft.creatorAddress;

        const tokenDataId = this.auction.nft.nft
          ? this.auction.nft.nft.current_token_data.token_data_id_hash
          : this.auction.nft.tokenDataId;

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
            this.ownerAddress = this.sliceAddressForDisplay(
              royaltyAndOwnerAddressRes.owner
            );
          }
        } else {
          if (this.auction.biddings[0]) {
            this.ownerAddress = this.auction.biddings[0].displayName;
          } else {
            let ownerAddress = null;

            if (this.auction.nft.nft) {
              ownerAddress = this.auction.nft.nft.owner_address;
            } else {
              ownerAddress = this.auction.nft.ownerAddress;
            }

            this.ownerAddress = this.sliceAddressForDisplay(ownerAddress);
          }
        }

        if (this.auction.nft.resourceAccount) {
          this.royaltyPercentage = await getRoyaltyFromResourceAccount({
            resourceAccount: this.auction.nft.resourceAccount,
            candyId: this.auction.nft.candyId,
          });
        }
      } catch (error) {
        console.log(error);
        this.ownerAddress = this.sliceAddressForDisplay(
          this.auction.nft.owner_address
        );
      }
    },
    sliceAddressForDisplay(ownerAddress) {
      return (
        ownerAddress.slice(0, 4) +
        "..." +
        ownerAddress.slice(-2, ownerAddress.length)
      );
    },
    getDescription() {
      this.description = this.auction.nft.meta.description;

      if (this.auction.nft.meta.description.length > 200) {
        this.description =
          this.auction.nft.meta.description.slice(0, 200) + "...";
      }
    },
    toggleDescription() {
      if (this.description.length <= 203) {
        this.description = this.auction.nft.meta.description;
      } else {
        this.description =
          this.auction.nft.meta.description.slice(0, 200) + "...";
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
