<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[7em] lg:tw-pb-0 lg:tw-px-28 1xl:!tw-w-[1320px] 1xl:!tw-max-w-[1320px] 2xl:tw-pt-[7.5em]"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-center lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <div
        class="tw-w-full tw-max-h-[338px] md:tw-w-[400px] md:tw-h-[400px] md:tw-max-h-[400px] lg:tw-w-[400px] lg:tw-min-w-[400px] lg:tw-h-[400px] xl:tw-w-[400px] xl:tw-h-[400px] xl:tw-max-h-[400px] tw-object-cover tw-rounded-xl"
        v-if="collection.video"
      >
        <video-player-featured :source="collection.video" />
      </div>
      <utility-image
        v-else
        :source="collection.image"
        :onerror="imageNotFound()"
        :alt="collection.name"
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
        <div class="tw-text-dark-0 tw-pb-4 description">
          {{ collection.description }}
        </div>
        <div
          v-if="collection._id === '65803e82022bc90954ea3ea4'"
          class="tw-pb-2 tw-text-dark-0"
        >
          1 NFT Per Wallet
        </div>
        <div
          class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-py-5 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-col"
          v-if="resource.paused"
        >
          <h2
            class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3 tw-text-dark-0"
          >
            <i class="bx bx-stop-circle tw-text-2xl"></i>
            <span class="tw-font-semibold">Ended</span>
          </h2>
          <div class="tw-text-dark-0">Creator has ended the mint.</div>
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
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
            >
              <div
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
                v-if="collection.username !== 'wapal-santa'"
              >
                <div
                  class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between"
                  v-if="
                    collection.isEdition &&
                    collection.edition === 'open-edition'
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
                  <div v-if="getCurrentPrice !== undefined">
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
            </div>
            <a
              class="tw-w-full tw-rounded-md tw-bg-primary-1 !tw-text-white tw-px-6 tw-py-2.5 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
              :href="collection.mintDetails.link"
              target="_blank"
              v-if="collection.mintDetails && collection.mintDetails.link"
            >
              {{
                collection.username === "wapal-santa"
                  ? "Reveal Your Present 🎁"
                  : "Mint"
              }}
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
          <h3 class="tw-text-center">{{ collection.name }} Minted</h3>
        </div>
        <div class="tw-w-full h-full tw-rounded">
          <img
            :src="collection.image"
            class="tw-w-full tw-h-full tw-rounded"
            :alt="collection.name"
          />
        </div>
        <button-primary
          :fullWidth="true"
          title="Share on Twitter"
          :bordered="true"
          @click="shareOnTwitterAfterMinting"
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
</template>
<script lang="ts">
import { setSoldOut } from "@/services/CollectionService";
import imageNotFound from "@/utils/imageNotFound";
import {
  mintCollection,
  anotherCoinMintCollection,
} from "@/services/AptosCollectionService";

import santa from "@/assets/video/wapal-santa.MP4";
import xLogo from "@/assets/img/x-logo.svg";
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
        seed: {
          seedz: false,
          coin_type: "APT",
        },
        video: "",
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
      showShareModal: false,
      imageNotFound,
      xLogo,
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

          if (
            this.collection.seed &&
            this.collection.seed.coin_type !== "APT"
          ) {
            res = await anotherCoinMintCollection({
              candy_machine_id: this.collection.candyMachine.candy_id,
              candy_object: this.collection.candyMachine.resource_account,
              amount: 1,
              publicMint: !this.checkPublicSaleTimer(),
              proof: this.proof,
              mint_limit: this.mintLimit,
              coinType: this.collection.seed.coin_type,
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

            if (this.collection.tweet) {
              this.showShareModal = true;
            }

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

          if (this.resource.total_supply === 0) {
            this.resource = await this.$store.dispatch(
              "walletStore/getSupplyAndMintedOfCollection",
              {
                resourceAccountAddress:
                  this.collection.candyMachine.resource_account,
                candyMachineId: this.collection.candyMachine.candy_id,
              }
            );
          }
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

      const link = `${baseURL}/${
        this.collection.isEdition ? "editions" : "nft"
      }/${this.collection.username}`;

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}&via=wapal_official`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },
    hideShareBox() {
      this.showShareBox = false;
    },
    shareOnTwitterAfterMinting() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      const twitterURL = "https://twitter.com";

      const link = `${baseURL}/${
        this.collection.isEdition ? "editions" : "nft"
      }/${this.collection.username}`;

      const text = encodeURIComponent(this.collection.tweet);

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}`;

      window.open(twitterShareLink, "_blank");

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

      if (this.collection.username === "wapal-santa") {
        this.collection.video = santa;
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

        if (this.resource.total_supply === 0) {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfCollection",
            {
              resourceAccountAddress:
                this.collection.candyMachine.resource_account,
              candyMachineId: this.collection.candyMachine.candy_id,
            }
          );
        }
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
