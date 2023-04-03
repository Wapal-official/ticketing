<template>
  <div
    class="tw-w-full tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 md:tw-px-8 tw-pb-8 tw-pt-4 lg:tw-gap-16 lg:tw-flex-row lg:tw-justify-start xl:tw-w-4/5"
    v-if="!loading"
  >
    <div
      class="tw-px-8 tw-py-8 tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 tw-group md:tw-px-0 md:tw-py-8 md:tw-max-w-[60%] lg:tw-max-w-full lg:tw-w-[90%] xl:tw-w-full"
    >
      <div
        class="tw-rounded-lg nft-preview-card-border tw-w-full tw-overflow-hidden tw-transition-all tw-duration-150 tw-ease-linear xl:tw-w-[60%]"
      >
        <img
          :src="collection.image"
          :alt="collection.name"
          class="tw-w-full tw-max-h-[500px] tw-rounded-lg tw-object-fill"
        />
      </div>
      <h3 class="tw-text-[1.75rem] tw-text-wapal-pink tw-font-normal tw-w-full">
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full"
          v-if="showLiveInTimer"
        >
          <span class="tw-pr-4 lg:tw-pr-8">Live In</span>
          <count-down
            :shadow="true"
            :startTime="
              collection.candyMachine_id.whitelist_sale_time
                ? collection.candyMachine_id.whitelist_sale_time
                : collection.candyMachine_id.public_sale_time
            "
          />
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full tw-mx-auto lg:tw-w-[70%]"
          v-else-if="showWhitelistSaleTimer || showPublicSaleTimer"
        >
          <h6
            class="tw-uppercase tw-text-wapal-pink tw-text-xl tw-font-medium"
            v-if="showEndInTimer"
          >
            End In
          </h6>
          <count-down
            :vertical="true"
            :startTime="this.collection.candyMachine_id.public_sale_time"
            :shadow="true"
            :textWhite="true"
            :textSmall="true"
            @countdownComplete="hideEndInTimer"
            v-if="showEndInTimer"
          />
        </div>
        <span
          class="tw-text-3xl tw-flex tw-flex-row tw-items-center tw-justify-center live-counter live-counter-shadow tw-tracking-widest tw-uppercase"
          v-else
          >Live</span
        >
      </h3>
    </div>
    <div
      class="tw-rounded tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-bg-[#001233] banner-shadow tw-px-8 tw-py-8"
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
      >
        <div
          class="tw-border tw-border-[#e229a0] tw-uppercase tw-text-xs tw-text-[#e229a0] tw-px-4 tw-py-2"
          v-if="collection.isVerified"
        >
          Doxxed
        </div>
        <a :href="collection.twitter" target="_blank">
          <v-icon
            class="!tw-text-2xl tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink"
            >mdi-twitter</v-icon
          > </a
        ><a :href="collection.discord" target="_blank" class="nft-discord-icon">
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
      </div>
      <div class="tw-text-wapal-gray tw-pb-8">
        <h1
          class="tw-text-2xl tw-pb-4 tw-font-medium tw-uppercase md:tw-text-[2rem]"
        >
          {{ collection.name }}
        </h1>
        <p class="tw-font-light">
          {{ collection.description }}
        </p>
      </div>
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-bg-[#0C224B] tw-text-[#F0F0F0] tw-px-6 tw-py-4 tw-w-full tw-rounded md:tw-flex-row"
        v-if="showMintBox"
      >
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full"
        >
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
          >
            <div v-if="!showWhitelistSaleTimer && showPublicSaleTimer">
              Whitelist Sale
            </div>
            <div v-if="!showWhitelistSaleTimer && !showPublicSaleTimer">
              Public Sale
            </div>
            <h6 class="tw-capitalize tw-text-white" v-if="getCurrentPrice != 0">
              price {{ getCurrentPrice }} apt
            </h6>
            <h6 class="tw-capitalize tw-text-white" v-else>Free Mint</h6>
          </div>
          <button
            class="tw-text-base tw-uppercase tw-text-white tw-bg-[#FF36AB] tw-rounded tw-w-full tw-py-2 tw-text-center tw-font-semibold tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 disabled:tw-cursor-not-allowed"
            :class="{
              '!tw-w-[30%]': !showWhitelistSaleTimer && !showPublicSaleTimer,
            }"
            @click="mintCollection"
            :disabled="minting || collection.status.sold_out"
          >
            <v-progress-circular indeterminate v-if="minting" color="white">
            </v-progress-circular>
            {{ !collection.status.sold_out ? "Mint" : "Sold Out" }}
          </button>
        </div>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      >
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-2 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-w-full tw-rounded md:tw-flex-row"
          v-if="showWhitelistSaleTimer"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-0 md:tw-gap-2"
          >
            <div>Whitelist Sale</div>
            <div class="tw-capitalize">
              price {{ collection.candyMachine_id.whitelist_price }} apt
            </div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start tw-w-fit"
          >
            Starts In
            <count-down
              :startTime="collection.candyMachine_id.whitelist_sale_time"
              @countdownComplete="whitelistCountdownComplete"
            />
          </div>
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-2 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-w-full tw-rounded md:tw-flex-row"
          v-if="showPublicSaleTimer"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-0 tw-w-fit md:tw-gap-2"
          >
            <div>Public Sale</div>
            <div class="tw-capitalize">
              price {{ collection.candyMachine_id.public_sale_price }} apt
            </div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start tw-w-fit"
          >
            Starts In
            <count-down
              :startTime="collection.candyMachine_id.public_sale_time"
              @countdownComplete="publicSaleCountdownComplete"
            />
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="showConnectWalletModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <connect-wallet-modal
        message="Please Connect your wallet to Mint"
        @closeModal="showConnectWalletModal = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
  </div>
  <div
    class="tw-w-[95%] tw-mx-auto tw-px-8 tw-py-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-16 lg:tw-flex-row lg:tw-justify-start"
    v-else
  >
    <div
      class="tw-w-full lg:tw-w-[40%] tw-bg-wapal-gray tw-min-h-[400px] tw-rounded-lg tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
    ></div>
    <div
      class="tw-px-8 tw-py-8 tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 lg:tw-w-[60%] tw-bg-[#001233] banner-shadow"
    >
      <div
        class="tw-py-4 tw-bg-wapal-gray tw-w-[75%] tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
      ></div>
      <div
        class="tw-py-4 tw-bg-wapal-gray tw-w-[75%] tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
      ></div>
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-w-full"
      >
        <div
          class="tw-py-16 tw-bg-wapal-gray tw-w-full tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
        <div
          class="tw-py-16 tw-bg-wapal-gray tw-w-full tw-rounded tw-transition-all tw-duration-100 tw-ease-linear tw-animate-pulse"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getCollection, setSoldOut } from "@/services/CollectionService";
import CountDown from "@/components/Reusable/CountDown.vue";

export default {
  props: { collectionId: { type: String } },
  components: { CountDown },
  data() {
    return {
      loading: true,
      collection: {
        candyMachine_id: {
          public_sale_price: null,
          public_sale_time: "",
          resource_account: null,
          whitelist_price: null,
          whitelist_sale_time: "",
        },
        _id: null,
        name: "",
        description: null,
        image: "",
        twitter: "",
        discord: "",
        isVerified: false,
        status: { sold_out: false },
      },
      whitelistSaleDate: null,
      publicSaleDate: null,
      showWhitelistSaleTimer: false,
      showPublicSaleTimer: false,
      showEndInTimer: false,
      minting: false,
      showConnectWalletModal: false,
      resource: null,
      progressInterval: null,
    };
  },
  methods: {
    countdownComplete() {
      this.showCountdown = false;
    },
    whitelistCountdownComplete() {
      this.showWhitelistSaleTimer = false;
      this.changeEndInTimer();
    },
    publicSaleCountdownComplete() {
      this.showPublicSaleTimer = false;
      this.changeEndInTimer();
    },

    checkWhitelistSaleTimer() {
      const date = new Date();

      if (this.whitelistSaleDate < date) {
        return false;
      }
      return true;
    },
    checkPublicSaleTimer() {
      const date = new Date();
      if (this.publicSaleDate < date) {
        return false;
      }
      return true;
    },
    hideEndInTimer() {
      this.showEndInTimer = false;
    },
    changeEndInTimer() {
      this.showEndInTimer = false;
      setTimeout(() => {
        this.showEndInTimer = true;
      }, 1);
    },
    async mintCollection() {
      try {
        if (this.$store.state.walletStore.wallet.wallet) {
          this.minting = true;
          const res = await this.$store.dispatch("walletStore/mintCollection", {
            resourceAccount: this.collection.candyMachine_id.resource_account,
            publicMint: !this.checkPublicSaleTimer(),
            collectionId: this.collection._id,
            candyMachineId: this.collection.candyMachine_id.candy_id,
          });

          if (res.success) {
            this.$toast.showMessage({
              message: `${this.collection.name} Minted Successfully`,
            });

            const res = await this.$store.dispatch(
              "walletStore/getSupplyAndMintedOfCollection",
              {
                resourceAccountAddress:
                  this.collection.candyMachine_id.resource_account,
                candyMachineId: this.collection.candyMachine_id.candy_id,
              }
            );

            if (res.total_supply === res.minted) {
              await setSoldOut(this.collection._id);
              this.collection.sold_out = true;
            }
          } else {
            this.$toast.showMessage({
              message: "Collection Not Minted",
              error: true,
            });
          }

          this.minting = false;
        } else {
          this.showConnectWalletModal = true;
          return;
        }
      } catch (error: any) {
        console.log(error);
        if (
          error.response &&
          error.response.data.msg &&
          error.response.data.msg ===
            "Whitelist entry associated with this wallet address not found."
        ) {
          this.$toast.showMessage({
            message: "You are not listed in Whitelist for this Collection",
            error: true,
          });
        } else {
          this.$toast.showMessage({ message: error, error: true });
        }
        this.minting = false;
      }
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet.wallet} Wallet Connected Successfully`,
      });
    },
    showMintedProgress() {
      this.progressInterval = setInterval(async () => {
        this.resource = await this.$store.dispatch(
          "walletStore/getSupplyAndMintedOfCollection",
          {
            resourceAccountAddress:
              this.collection.candyMachine_id.resource_account,
            candyMachineId: this.collection.candyMachine_id.candy_id,
          }
        );

        if (
          this.resource.minted == this.resource.total_supply &&
          !this.collection.status.sold_out
        ) {
          this.collection.status.sold_out = true;
        }
      }, 5000);
    },
  },
  computed: {
    getCurrentPrice() {
      const whiteListDate = this.collection.candyMachine_id.whitelist_sale_time
        ? new Date(this.collection.candyMachine_id.whitelist_sale_time)
        : null;

      if (
        this.collection.candyMachine_id.public_sale_price ==
        this.collection.candyMachine_id.whitelist_price
      ) {
        return this.collection.candyMachine_id.public_sale_price;
      }

      if (!this.showPublicSaleTimer) {
        return this.collection.candyMachine_id.public_sale_price;
      }

      if (whiteListDate && this.showPublicSaleTimer) {
        return this.collection.candyMachine_id.whitelist_price;
      } else {
        return this.collection.candyMachine_id.public_sale_price;
      }
    },
    showMintBox() {
      if (!this.whitelistSaleDate) {
        return !this.showPublicSaleTimer;
      }

      return !this.showWhitelistSaleTimer || !this.showPublicSaleTimer;
    },
    showLiveInTimer() {
      if (!this.whitelistSaleDate) {
        return this.showPublicSaleTimer;
      } else {
        return this.showWhitelistSaleTimer && this.showPublicSaleTimer;
      }
    },
  },
  async mounted() {
    try {
      let res = null;
      if (!process.env.baseURL?.includes("staging")) {
        res = await getCollection("6415331e9cb214a367f1ee7a");
      } else {
        res = await getCollection("6411e5928d694e608061b029");
      }

      this.collection = res.collection[0];

      this.whitelistSaleDate = this.collection.candyMachine_id
        .whitelist_sale_time
        ? new Date(this.collection.candyMachine_id.whitelist_sale_time)
        : null;

      this.publicSaleDate = new Date(
        this.collection.candyMachine_id.public_sale_time
      );

      this.showWhitelistSaleTimer = this.checkWhitelistSaleTimer();
      this.showPublicSaleTimer = this.checkPublicSaleTimer();

      this.showEndInTimer = true;

      this.loading = false;

      this.resource = await this.$store.dispatch(
        "walletStore/getSupplyAndMintedOfCollection",
        {
          resourceAccountAddress:
            this.collection.candyMachine_id.resource_account,
          candyMachineId: this.collection.candyMachine_id.candy_id,
        }
      );

      if (
        this.resource.minted == this.resource.total_supply &&
        !this.collection.status.sold_out
      ) {
        this.collection.status.sold_out = true;
        await setSoldOut(this.collection._id);
      }

      setTimeout(() => {
        this.showMintedProgress();
      }, 200);
    } catch (error) {
      this.loading = true;
    }
  },
  beforeDestroy() {
    clearInterval(this.progressInterval);
  },
};
</script>
<style></style>
