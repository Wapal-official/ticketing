<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[7em] lg:tw-pb-0 lg:tw-px-28 1xl:!tw-w-[1320px] 1xl:!tw-max-w-[1320px] 2xl:tw-pt-[7.5em]"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-center lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <img
        :src="collection.image"
        :alt="collection.name"
        :onerror="imageNotFound()"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[400px] md:tw-h-[400px] md:tw-max-h-[400px] lg:tw-w-[400px] lg:tw-min-w-[400px] lg:tw-h-[400px] xl:tw-w-[400px] xl:tw-h-[400px] xl:tw-max-h-[400px] tw-object-cover tw-rounded-xl"
      />
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 lg:tw-mb-8 lg:tw-w-[512px] xl:tw-pr-[7em]"
      >
        <div>
          <a
            :href="MARKETPLACE_URL"
            class="!tw-text-primary-2 tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 tw-font-medium"
            target="_blank"
            v-if="!showLiveInTimer && resource.minted > 0"
          >
            <span>List on Secondary</span>
            <i class="bx bx-link-external"></i>
          </a>
          <h1 class="tw-text-4xl tw-font-bold tw-tracking-[-0.025em]">
            {{ collection.name }}
          </h1>
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <a
            :href="collection.discord"
            target="_blank"
            v-if="collection.discord"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-discord-alt tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
            ></i>
          </a>
          <a
            :href="collection.twitter"
            target="_blank"
            v-if="collection.twitter"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-twitter tw-text-lg tw-transition tw-duration-200 tw-ease-linear tw-ml-0.5"
            ></i>
          </a>
          <a
            :href="collection.instagram"
            target="_blank"
            v-if="collection.instagram"
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
        <div class="tw-text-dark-0 tw-pb-4">
          {{ collection.description }}
        </div>
        <div
          class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-py-5 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-col"
          v-if="resource.paused"
        >
          <h2
            class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3 tw-text-dark-0"
          >
            <i class="bx bx-pause-circle tw-text-2xl"></i>
            <span class="tw-font-semibold">Paused</span>
          </h2>
          <div class="tw-text-dark-0">Creator has paused the mint.</div>
        </div>
        <div class="tw-w-full">
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1"
            v-if="showLiveInTimer"
          >
            <h3 class="tw-uppercase tw-text-dark-2 tw-font-semibold tw-text-sm">
              {{ currentSale.name }} Starts In
            </h3>
            <count-down
              :startTime="currentSale.mint_time"
              @countdownComplete="countdownComplete"
            />
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
            v-else
          >
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
            >
              <div
                class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between"
                v-if="
                  collection.isEdition && collection.edition === 'open-edition'
                "
              >
                <div class="tw-text-white/70">
                  Total Minted: {{ resource.minted }}
                </div>
                <div v-if="getCurrentPrice !== 0">
                  Price {{ getCurrentPrice }}
                  {{
                    collection.seed && collection.seed.coin_type
                      ? collection.seed.coin_type
                      : "APT"
                  }}
                </div>
                <div v-else>Free Mint</div>
              </div>
              <div
                class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between"
                v-else
              >
                <div class="tw-text-white/70">
                  {{ resource.minted }}/{{ resource.total_supply }} Minted
                </div>
                <div v-if="getCurrentPrice !== 0">
                  {{ getCurrentPrice }}
                  {{
                    collection.seed && collection.seed.coin_type
                      ? collection.seed.coin_type
                      : "APT"
                  }}
                </div>
                <div v-else>Free Mint</div>
              </div>

              <div
                class="tw-w-full tw-relative tw-rounded-full tw-h-2.5 tw-bg-white/10"
                v-if="collection.edition !== 'open-edition'"
              >
                <div
                  class="tw-absolute tw-top-0 tw-h-2.5 tw-bg-primary-1 tw-rounded-full"
                  ref="mintProgress"
                ></div>
              </div>
            </div>
            <a
              class="tw-w-full tw-rounded-md tw-bg-primary-1 !tw-text-white tw-px-6 tw-py-2.5 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
              :href="collection.mintDetails.link"
              target="_blank"
              v-if="collection.mintDetails && collection.mintDetails.link"
            >
              Mint
            </a>
            <NuxtLink
              class="tw-w-full tw-rounded-md tw-bg-primary-1 !tw-text-white tw-px-6 tw-py-2.5 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
              :to="`/nft/${collection.username}`"
              v-else-if="collection.mintDetails"
            >
              {{ collection.status.sold_out ? "Soldout" : "Mint" }}
            </NuxtLink>
            <button-primary
              :title="!collection.status.sold_out ? 'Mint' : 'Soldout'"
              :fullWidth="true"
              :disabled="minting || collection.status.sold_out"
              @click="mintCollection"
              v-else
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
  <!-- <div
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
          <count-down :shadow="true" :startTime="currentSale.mint_time" />
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
            :startTime="nextSale.mint_time"
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
            <div
              v-if="!showWhitelistSaleTimer && showPublicSaleTimer"
              class="tw-capitalize"
            >
              {{ currentSale.name }}
            </div>
            <div v-if="!showWhitelistSaleTimer && !showPublicSaleTimer">
              Public Sale
            </div>
            <h6
              class="tw-capitalize tw-text-white"
              v-if="currentSale.mint_price != 0"
            >
              price {{ currentSale.mint_price }} apt
            </h6>
            <h6 class="tw-capitalize tw-text-white" v-else>Free Mint</h6>
          </div>
          <button
            class="tw-text-base tw-uppercase tw-text-white tw-bg-[#FF36AB] tw-rounded tw-w-full tw-py-2 tw-text-center tw-font-semibold tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 disabled:tw-cursor-not-allowed"
            :class="{
              'md:!tw-w-[30%]': !showWhitelistSaleTimer && !showPublicSaleTimer,
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
            <div class="tw-capitalize">{{ currentSale.name }}</div>
            <div
              class="tw-capitalize"
              v-if="collection.candyMachine.whitelist_price != 0"
            >
              price {{ collection.candyMachine.whitelist_price }} apt
            </div>
            <div v-else>Free Mint</div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start tw-w-fit"
          >
            Starts In
            <count-down
              class="tw-pl-2"
              :startTime="currentSale.mint_time"
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
            <div
              class="tw-capitalize"
              v-if="collection.candyMachine.public_sale_price != 0"
            >
              price {{ collection.candyMachine.public_sale_price }} apt
            </div>
            <div v-else>Free Mint</div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start tw-w-fit"
          >
            Starts In
            <count-down
              class="tw-pl-2"
              :startTime="this.phases[this.phases.length - 1].mint_time"
              @countdownComplete="publicSaleCountdownComplete"
            />
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script lang="ts">
import { setSoldOut } from "@/services/CollectionService";
import imageNotFound from "@/utils/imageNotFound";
import {
  mintCollection,
  seedzMintCollection,
} from "@/services/AptosCollectionService";
export default {
  props: {
    propCollection: { type: Object },
  },
  data() {
    return {
      loading: true,
      collection: {
        candyMachine: {
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
        instagram: "",
        isVerified: false,
        status: { sold_out: false },
        mintDetails: {
          link: null,
        },
        username: "",
        isEdition: false,
        edition: "",
        seedz: {
          seedz: false,
          coin_type: "APT",
        },
      },
      whitelistSaleDate: null,
      publicSaleDate: null,
      showWhitelistSaleTimer: false,
      showPublicSaleTimer: false,
      showEndInTimer: false,
      minting: false,
      showConnectWalletModal: false,
      resource: { minted: 0, total_supply: 0, paused: false },
      progressInterval: null,
      phases: [],
      currentSale: { name: "", mint_time: "", mint_price: 0 },
      nextSale: { name: "", mint_time: "", mint_price: 0 },
      phaseCounter: 0,
      showShareBox: false,
      collectionLink: "",
      MARKETPLACE_URL: process.env.MARKETPLACE_URL,
      imageNotFound,
    };
  },
  methods: {
    countdownComplete() {
      this.showPublicSaleTimer = false;
      this.showWhitelistSaleTimer = false;
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
      if (this.phases.length === 1) {
        return false;
      } else {
        if (new Date(this.phases[0].mint_time).getTime() > Date.now()) {
          return true;
        }
      }
      return false;
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
      this.phaseCounter = 0;
      this.currentSale = this.getCurrentSale();
      this.showEndInTimer = false;

      if (this.phaseCounter !== this.phases.length) {
        this.changeEndInTimer();
      }
    },
    changeEndInTimer() {
      this.showEndInTimer = false;
      setTimeout(() => {
        this.showEndInTimer = true;
      }, 1);
    },
    async mintCollection() {
      try {
        if (this.showPublicSaleTimer) {
          this.$router.push(`/nft/${this.collection.username}`);
          return;
        }
        if (this.$store.state.walletStore.wallet.wallet) {
          this.minting = true;

          let res: any = null;

          if (this.collection.seed && this.collection.seed.seedz) {
            res = await seedzMintCollection({
              candy_machine_id: this.collection.candyMachine.candy_id,
              candy_object: this.collection.candyMachine.resource_account,
              amount: 1,
              publicMint: !this.checkPublicSaleTimer(),
              proof: this.proof,
              mint_limit: this.mintLimit,
            });
          } else {
            res = await mintCollection({
              candy_machine_id: this.collection.candyMachine.candy_id,
              candy_object: this.collection.candyMachine.resource_account,
              amount: 1,
              publicMint: !this.checkPublicSaleTimer(),
              proof: this.proof,
              mint_limit: this.mintLimit,
            });
          }

          if (res.success) {
            this.$toast.showMessage({
              message: `${this.collection.name} Minted Successfully`,
            });

            let res = await this.$store.dispatch(
              "walletStore/getSupplyAndMintedOfCollection",
              {
                resourceAccountAddress:
                  this.collection.candyMachine.resource_account,
                candyMachineId: this.collection.candyMachine.candy_id,
              }
            );

            if (this.collection._id === "64625d957c7212d927559962") {
              res = {
                minted: res.minted,
                total_supply: 2333,
              };
            } else if (this.collection._id === "654c9afff8961c791c804cf1") {
              res = {
                minted: this.resource.minted,
                total_supply: 1350,
              };
            }

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
        if (this.collection.mintDetails) {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfExternalCollection",
            {
              collectionId: this.collection.candyMachine.resource_account,
            }
          );
        } else {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfCollection",
            {
              resourceAccountAddress:
                this.collection.candyMachine.resource_account,
              candyMachineId: this.collection.candyMachine.candy_id,
            }
          );
        }

        if (this.collection._id === "654c9afff8961c791c804cf1") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 1350,
          };
        }

        if (
          !this.collection.isEdition ||
          this.collection.edition !== "open-edition"
        ) {
          this.resource.mintedPercent = Math.floor(
            (this.resource.minted / this.resource.total_supply) * 100
          );

          this.$refs.mintProgress.style.width =
            this.resource.mintedPercent + "%";
        }

        if (
          this.resource.minted == this.resource.total_supply &&
          !this.collection.status.sold_out
        ) {
          this.collection.status.sold_out = true;
        }
      }, 5000);
    },
    setPhases() {
      this.phases = [];
      this.phases = this.collection.phases ? this.collection.phases : [];

      if (!this.collection.phases) {
        if (
          !this.collection.mintDetails &&
          !this.collection.mintDetails.all_mint_at_same_time
        ) {
          if (
            new Date(this.collection.candyMachine.public_sale_time).getTime() -
              new Date(
                this.collection.candyMachine.whitelist_sale_time
              ).getTime() >
            1000
          ) {
            this.phases.push({
              name: "whitelist sale",
              id: "whitelist",
              mint_price: this.collection.candyMachine.whitelist_price,
              mint_time: this.collection.candyMachine.whitelist_sale_time,
            });
          }
        } else {
          this.phases.push({
            name: "whitelist sale",
            id: "whitelist",
            mint_price: this.collection.candyMachine.whitelist_price,
            mint_time: this.collection.candyMachine.whitelist_sale_time,
          });
        }
      }

      this.phases.map((phase: any) => {
        phase.mint_price = this.collection.candyMachine.whitelist_price;
      });

      const publicSale = {
        name: "public sale",
        id: "public-sale",
        mint_price: this.collection.candyMachine.public_sale_price,
        mint_time: this.collection.candyMachine.public_sale_time,
      };

      this.phases.push(publicSale);
    },
    getCurrentSale() {
      this.phases.map((phase: any) => {
        if (new Date(phase.mint_time).getTime() < Date.now()) {
          this.phaseCounter++;
        }
      });

      if (this.phaseCounter === this.phases.length) {
        this.nextSale = this.phases[this.phases.length - 1];
        return this.phases[this.phases.length - 1];
      }

      this.phaseEndInTime = this.phases[this.phaseCounter].mint_time;

      this.nextSale = this.phases[this.phaseCounter];

      return this.phaseCounter > 0
        ? this.phases[this.phaseCounter - 1]
        : this.phases[0];
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

      clipboardData.writeText(`${baseURL}/nft/${this.collection.username}`);

      this.$toast.showMessage({ message: "Link Copied" });

      this.showShareBox = false;
    },
    shareOnTwitter() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      const twitterURL = "https://twitter.com";

      const text = "Check out this collection on Wapal";

      const link = `${baseURL}/nft/${this.collection.username}`;

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}&via=wapal_official`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },
    hideShareBox() {
      this.showShareBox = false;
    },
  },
  computed: {
    getCurrentPrice() {
      const whiteListDate = this.collection.candyMachine.whitelist_sale_time
        ? new Date(this.collection.candyMachine.whitelist_sale_time)
        : null;

      if (
        this.collection.candyMachine.public_sale_price ==
        this.collection.candyMachine.whitelist_price
      ) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (!this.showPublicSaleTimer) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (whiteListDate && this.showPublicSaleTimer) {
        return this.collection.candyMachine.whitelist_price;
      } else {
        return this.collection.candyMachine.public_sale_price;
      }
    },
    showMintBox() {
      if (this.phases.length < 2) {
        return !this.showPublicSaleTimer;
      }
      return !this.showWhitelistSaleTimer || !this.showPublicSaleTimer;
    },
    showLiveInTimer() {
      if (this.phases.length > 1) {
        return this.showWhitelistSaleTimer && this.showPublicSaleTimer;
      }
      return this.showPublicSaleTimer;
    },
    checkWhitelistSale() {
      const whitelistTime = new Date(
        this.collection.candyMachine.whitelist_sale_time
      ).getTime();
      const publicSaleTime = new Date(
        this.collection.candyMachine.public_sale_time
      ).getTime();

      if (publicSaleTime - whitelistTime === 1000) {
        return false;
      } else {
        return true;
      }
    },
  },
  async mounted() {
    try {
      this.collection = this.propCollection;

      if (this.collection._id === "651295af57079307bdb1cfe9") {
        delete this.collection["candyMachine"].whitelist_sale_time;
        delete this.collection["candyMachine"].whitelist_price;

        delete this.collection.phases;
      }

      if (this.collection.username === "proudlionsclub") {
        this.MARKETPLACE_URL = `${this.MARKETPLACE_URL}/collection/proud-lions-club`;
      } else {
        this.MARKETPLACE_URL = `${this.MARKETPLACE_URL}/collection/${this.collection.username}`;
      }

      this.setPhases();

      this.currentSale = this.getCurrentSale();

      this.publicSaleDate = new Date(
        this.phases[this.phases.length - 1].mint_time
      );

      this.collection.candyMachine.public_sale_price =
        this.phases[this.phases.length - 1].mint_price;

      this.showWhitelistSaleTimer = this.checkWhitelistSaleTimer();
      this.showPublicSaleTimer = this.checkPublicSaleTimer();

      this.showEndInTimer = true;

      this.loading = false;

      if (this.collection.mintDetails) {
        this.resource = await this.$store.dispatch(
          "walletStore/getSupplyAndMintedOfExternalCollection",
          {
            collectionId: this.collection.candyMachine.resource_account,
          }
        );
      } else {
        this.resource = await this.$store.dispatch(
          "walletStore/getSupplyAndMintedOfCollection",
          {
            resourceAccountAddress:
              this.collection.candyMachine.resource_account,
            candyMachineId: this.collection.candyMachine.candy_id,
          }
        );
      }

      if (this.collection._id === "654c9afff8961c791c804cf1") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 1350,
        };
      }
      if (
        !this.collection.isEdition ||
        this.collection.edition !== "open-edition"
      ) {
        this.resource.mintedPercent = Math.floor(
          (this.resource.minted / this.resource.total_supply) * 100
        );

        this.$refs.mintProgress.style.width = this.resource.mintedPercent + "%";
      }

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
      console.log(error);
      this.loading = true;
    }
  },
  beforeDestroy() {
    clearInterval(this.progressInterval);
  },
};
</script>
<style scoped>
.featured {
  height: calc(100vh - 40px);
}
</style>
