<template>
  <div>
    <div
      class="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-px-4 tw-pt-16 tw-pb-16 md:tw-px-16 lg:tw-flex-row lg:tw-gap-16"
      v-if="!loading"
    >
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-w-full tw-group md:tw-w-[60%] lg:tw-w-[40%]"
      >
        <div
          class="tw-rounded-lg nft-preview-card-border tw-w-full tw-overflow-hidden tw-transition-all tw-duration-150 tw-ease-linear"
        >
          <img
            :src="collection.image"
            :alt="collection.name"
            class="tw-w-full tw-rounded-lg tw-max-h-[550px] tw-object-fill"
          />
        </div>
        <h3
          class="tw-text-[1.75rem] tw-text-wapal-pink tw-font-normal tw-w-full"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full md:tw-items-center lg:tw-flex-row lg:tw-items-center"
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
          <span
            class="tw-text-3xl tw-flex tw-flex-row tw-items-center tw-justify-center live-counter live-counter-shadow tw-tracking-widest tw-uppercase"
            v-else
            >Live</span
          >
        </h3>
      </div>
      <div
        class="tw-rounded tw-w-full tw-bg-[#001233] tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-px-8 tw-py-8 lg:tw-w-[60%] preview-shadow"
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
          ><a
            :href="collection.discord"
            target="_blank"
            class="nft-discord-icon"
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
        <div class="tw-w-full tw-flex tw-flex-col tw-gap-2">
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-text-white"
          >
            <span class="tw-capitalize tw-text-sm">{{
              showPublicSaleTimer &&
              collection.candyMachine_id.whitelist_sale_time
                ? "whitelist mint"
                : "public sale mint"
            }}</span>
            <span class="tw-capitalize tw-text-sm"
              >{{ resource.mintedPercent }}%
              <span class="tw-text-[#ACACAC]"
                >({{ resource.minted }} out of
                {{ resource.total_supply }})</span
              ></span
            >
          </div>
          <div
            class="tw-w-full tw-rounded-full tw-relative tw-bg-[#263D68] tw-h-[10px]"
          >
            <div
              class="tw-absolute tw-h-[10px] tw-top-0 tw-bg-[#E500A4] tw-rounded-full tw-transition-all tw-duration-200 tw-ease-linear"
              id="resourceMintedPercent"
            ></div>
          </div>
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-bg-[#0C224B] tw-text-[#F0F0F0] tw-px-6 tw-py-4 tw-w-full tw-rounded md:tw-flex-row"
          v-if="showMintBox"
        >
          <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full"
          >
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6"
              :class="{
                'md:tw-flex-row md:tw-items-end md:tw-justify-between':
                  !showWhitelistSaleTimer && !showPublicSaleTimer,
                'md:tw-flex-col md:tw-items-start md:tw-justify-start tw-gap-6':
                  showPublicSaleTimer,
              }"
            >
              <div
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
              >
                <h6
                  class="tw-capitalize tw-text-white"
                  v-if="getCurrentPrice != 0"
                >
                  price {{ getCurrentPrice }} apt
                </h6>
                <h6 class="tw-capitalize tw-text-white" v-else>Free Mint</h6>
                <div
                  class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5 tw-text-white"
                >
                  <button
                    class="tw-bg-[#001233] tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold disabled:tw-cursor-not-allowed"
                    @click="decreaseNumberOfNft"
                    :disabled="showPublicSaleTimer"
                  >
                    -
                  </button>
                  <input
                    class="tw-bg-[#001233] tw-rounded tw-text-center tw-px-6 tw-py-2 tw-font-semibold tw-w-24 tw-max-w-32 disabled:tw-cursor-not-allowed"
                    v-model="numberOfNft"
                    @input="checkNumberOfNft"
                    :disabled="showPublicSaleTimer"
                  />
                  <button
                    class="tw-bg-[#001233] tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold disabled:tw-cursor-not-allowed"
                    @click="increaseNumberOfNft"
                    :disabled="showPublicSaleTimer"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                class="tw-text-base tw-uppercase tw-text-white tw-bg-[#FF36AB] tw-rounded tw-w-full tw-px-2 tw-py-2 tw-text-center tw-font-semibold tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 disabled:tw-cursor-not-allowed"
                :class="{
                  '!tw-w-[30%]':
                    !showWhitelistSaleTimer && !showPublicSaleTimer,
                }"
                @click="mintBulkCollection"
                :disabled="minting || collection.status.sold_out"
              >
                <v-progress-circular indeterminate v-if="minting" color="white">
                </v-progress-circular>
                {{ !collection.status.sold_out ? "Mint" : "Sold Out" }}
              </button>
              <div
                class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-6"
                v-if="!showWhitelistSaleTimer && !showPublicSaleTimer"
              >
                <div>Public Sale</div>
                <div v-if="checkWhitelistSale">
                  No of Whitelisted Users: {{ whitelistNumber }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-w-full"
            v-if="showWhitelistSaleTimer || showPublicSaleTimer"
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
              @countdownComplete="hideEndInTimer"
              v-if="showEndInTimer"
            />
          </div>
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-2 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-w-full tw-rounded md:tw-flex-row"
          v-if="showWhitelistSaleTimer"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-0 md:tw-gap-4"
          >
            <div>Whitelist Sale</div>
            <div
              class="tw-capitalize"
              v-if="collection.candyMachine_id.whitelist_price != 0"
            >
              price {{ collection.candyMachine_id.whitelist_price }} apt
            </div>
            <div class="tw-capitalize" v-else>Free Mint</div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start"
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
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-0 md:tw-gap-4"
          >
            <div>Public Sale</div>
            <div
              class="tw-capitalize"
              v-if="collection.candyMachine_id.public_sale_price != 0"
            >
              price {{ collection.candyMachine_id.public_sale_price }} apt
            </div>
            <div class="tw-capitalize" v-else>Free Mint</div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start"
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
    <div
      class="tw-py-32 tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
      v-else
    >
      <loading />
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
    <v-dialog
      v-model="showErrorPopup"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-bg-modal-gray tw-text-white tw-px-4 tw-py-4 tw-rounded"
      >
        {{ errorMessage }}
      </div>
    </v-dialog>
  </div>
</template>
<script>
import {
  getCollection,
  getCollectionByUsername,
  setSoldOut,
} from "@/services/CollectionService";
import { getWhitelistEntryById } from "@/services/WhitelistService";
import CountDown from "@/components/Reusable/CountDown.vue";
import Loading from "@/components/Reusable/Loading.vue";

export default {
  ssr: false,
  cache: false,
  async asyncData({ params }) {
    const name = params.name;
    let collection;
    try {
      const res = await getCollectionByUsername(name);
      collection = res.data.collection[0];

      if (collection) {
        return { collection };
      } else {
        throw new Error("Collection Not Found by Username");
      }
    } catch {
      try {
        const res = await getCollection(name);
        collection = res.collection[0];

        return { collection };
      } catch (error) {
        collection = null;
        return { collection };
      }
    }
  },
  head() {
    return {
      title: this.getTitle,
      meta: [
        { hid: "twitter:title", name: "twitter:title", content: this.getTitle },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:title", name: "twitter:title", content: this.getTitle },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.collection.image,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.collection.description,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-image",
          property: "og:image",
          content: this.collection.image,
        },
        { hid: "og:title", property: "og:title", content: this.getTitle },

        {
          hid: "description",
          name: "description",
          content: this.collection.description,
        },
      ],
    };
  },
  components: { CountDown, Loading },
  data() {
    return {
      loading: true,
      whitelistSaleDate: null,
      publicSaleDate: null,
      showWhitelistSaleTimer: false,
      showPublicSaleTimer: false,
      showEndInTimer: false,
      minting: false,
      showConnectWalletModal: false,
      resource: {
        total_supply: 0,
        minted: 0,
        mintedPercent: 0,
      },
      progressInterval: null,
      whitelistNumber: 0,
      numberOfNft: 1,
      showErrorPopup: false,
      errorMessage: null,
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

      if (!this.whitelistSaleDate || this.whitelistSaleDate < date) {
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
      } catch (error) {
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

        this.resource.mintedPercent = Math.floor(
          (this.resource.minted / this.resource.total_supply) * 100
        );

        const resourceMintedPercent = document.querySelector(
          "#resourceMintedPercent"
        );

        resourceMintedPercent.style.width = this.resource.mintedPercent + "%";
      }, 5000);
    },
    increaseNumberOfNft() {
      if (
        this.numberOfNft >=
        this.resource.total_supply - this.resource.minted
      ) {
        return;
      } else {
        if (this.numberOfNft >= 500) {
          this.numberOfNft = 500;
          return;
        }
        this.numberOfNft++;
      }
    },
    decreaseNumberOfNft() {
      if (this.numberOfNft === 1) {
        return;
      } else {
        this.numberOfNft--;
      }
    },
    checkNumberOfNft() {
      if (isNaN(this.numberOfNft)) {
        this.$toast.showMessage({
          message: "Please Enter a number",
          error: true,
        });
        this.numberOfNft = 1;
        return;
      }

      if (this.numberOfNft < 1 && this.numberOfNft !== "") {
        this.numberOfNft = 1;
        return;
      }

      if (
        this.numberOfNft > 500 ||
        this.numberOfNft >= this.resource.total_supply - this.resource.minted
      ) {
        this.numberOfNft = 500;
        return;
      }
    },
    async mintBulkCollection() {
      try {
        if (!this.$store.state.walletStore.wallet.wallet) {
          this.showConnectWalletModal = true;
          return;
        }

        this.minting = true;

        const res = await this.$store.dispatch("walletStore/mintBulk", {
          resourceAccount: this.collection.candyMachine_id.resource_account,
          publicMint: !this.checkPublicSaleTimer(),
          collectionId: this.collection._id,
          candyMachineId: this.collection.candyMachine_id.candy_id,
          mintNumber: this.numberOfNft,
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

          this.numberOfNft = 0;
        } else {
          this.$toast.showMessage({
            message: "Collection Not Minted",
            error: true,
          });
        }

        this.minting = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.minting = false;
      }
    },
  },
  computed: {
    getCurrentPrice() {
      if (
        this.collection.candyMachine_id.public_sale_price ==
        this.collection.candyMachine_id.whitelist_price
      ) {
        return this.collection.candyMachine_id.public_sale_price;
      }

      if (!this.showPublicSaleTimer) {
        return this.collection.candyMachine_id.public_sale_price;
      }

      if (this.whitelistSaleDate && this.showPublicSaleTimer) {
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
    getTitle() {
      return this.collection.name ? "Wapal - " + this.collection.name : "Title";
    },

    getImage() {
      return this.collection.image ? this.collection.image : "";
    },
    getDescription() {
      return this.collection.description ? this.collection.description : "";
    },
    checkWhitelistSale() {
      const whitelistTime = new Date(
        this.collection.candyMachine_id.whitelist_sale_time
      ).getTime();
      const publicSaleTime = new Date(
        this.collection.candyMachine_id.public_sale_time
      ).getTime();

      if (publicSaleTime - whitelistTime === 1000) {
        return false;
      } else {
        return true;
      }
    },
  },
  async mounted() {
    if (this.collection) {
      this.whitelistSaleDate = this.checkWhitelistSale
        ? new Date(this.collection.candyMachine_id.whitelist_sale_time)
        : null;

      this.publicSaleDate = new Date(
        this.collection.candyMachine_id.public_sale_time
      );

      this.showWhitelistSaleTimer = this.checkWhitelistSaleTimer();
      this.showPublicSaleTimer = this.checkPublicSaleTimer();

      this.showEndInTimer = true;

      this.resource = await this.$store.dispatch(
        "walletStore/getSupplyAndMintedOfCollection",
        {
          resourceAccountAddress:
            this.collection.candyMachine_id.resource_account,
          candyMachineId: this.collection.candyMachine_id.candy_id,
        }
      );

      this.resource.mintedPercent = Math.floor(
        (this.resource.minted / this.resource.total_supply) * 100
      );

      if (
        this.resource.minted == this.resource.total_supply &&
        !this.collection.status.sold_out
      ) {
        this.collection.status.sold_out = true;
        await setSoldOut(this.collection._id);
      }

      if (this.checkWhitelistSale) {
        const whitelistRes = await getWhitelistEntryById(this.collection._id);

        this.whitelistNumber = whitelistRes.data.whitelistEntries.length;
      }

      this.loading = false;

      setTimeout(() => {
        const resourceMintedPercent = document.querySelector(
          "#resourceMintedPercent"
        );

        resourceMintedPercent.style.width = this.resource.mintedPercent + "%";

        this.showMintedProgress();
      }, 200);
    }
  },
  beforeDestroy() {
    clearInterval(this.progressInterval);
  },
};
</script>
