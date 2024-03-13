<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[5.5em] lg:tw-pb-[7.5em] xl:!tw-max-w-[1100px]"
    v-if="!loading"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <div
        class="tw-w-full tw-max-h-[338px] md:tw-w-[550px] md:tw-h-[550px] md:tw-max-h-[550px] lg:tw-w-[450px] lg:tw-min-w-[450px] lg:tw-h-[450px] xl:tw-w-[550px] xl:tw-h-[550px] xl:tw-max-h-[550px] tw-object-cover tw-rounded-xl"
        v-if="collection.video"
      >
        <video-player-featured :source="collection.video" />
      </div>
      <video-player-detailed
        class="video-detailed"
        v-else-if="isVideo(collection.image)"
        :source="collection.image"
      />
      <utility-image
        v-else
        :source="collection.image"
        :onerror="imageNotFound()"
        :alt="collection.name"
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
              :startTime="phases[0].mint_time"
              class="tw-font-bold"
              @countdownComplete="setCollectionToLive"
            />
          </div>
        </div>
        <div>
          <a
            :href="`${MARKETPLACE_URL}/collection/${collection.username}`"
            class="!tw-text-primary-2 tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 tw-font-medium"
            target="_blank"
            v-if="live && resource.minted > 0"
          >
            <span>List on Secondary</span>
            <i class="bx bx-link-external"></i>
          </a>
          <h1 class="tw-text-white tw-text-[2.5rem] tw-font-bold">
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
        <div class="tw-pb-2 tw-text-dark-0 description">
          {{ collection.description }}
        </div>
        <div
          v-if="collection._id === '65803e82022bc90954ea3ea4'"
          class="tw-pb-2 tw-text-dark-0"
        >
          1 NFT Per Wallet
        </div>

        <div v-if="externalWhitelisted">
          Your Whitelist Mint Tokens:
          {{ externalWhitelistMintNumber }} Remaining
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
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
          v-if="live"
        >
          <div
            class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-py-5 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 md:tw-flex-col md:tw-items-start md:tw-justify-start"
          >
            <h2
              class="tw-text-base tw-text-white tw-font-semibold tw-capitalize"
            >
              {{ currentSale.name }}
            </h2>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-w-full"
            >
              <div
                class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 md:tw-flex-col md:tw-items-start md:tw-justify-start tw-w-full"
                v-if="collection.username !== 'wapal-santa'"
              >
                <div
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
                >
                  <div
                    class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between 3xl:tw-text-lg"
                    v-if="
                      collection.isEdition &&
                      collection.edition === 'open-edition'
                    "
                  >
                    <div class="tw-text-white/70">
                      Total Minted: {{ resource.minted }}
                    </div>
                    <div v-if="currentSale.mint_price == 0">Free Mint</div>
                    <div
                      v-if="
                        currentSale.mint_price && currentSale.mint_price != 0
                      "
                    >
                      Price {{ currentSale.mint_price }}
                      {{
                        collection.seed && collection.seed.coin_type
                          ? collection.seed.coin_type
                          : "APT"
                      }}
                    </div>
                  </div>
                  <div
                    class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between 3xl:tw-text-lg"
                    v-else
                  >
                    <div class="tw-text-white/70">
                      {{ resource.minted }}/{{ resource.total_supply }} Minted
                    </div>
                    <div v-if="currentSale.mint_price == 0">Free Mint</div>
                    <div
                      v-if="
                        currentSale.mint_price && currentSale.mint_price != 0
                      "
                    >
                      Price {{ currentSale.mint_price }}
                      {{
                        collection.seed && collection.seed.coin_type
                          ? collection.seed.coin_type
                          : "APT"
                      }}
                    </div>
                  </div>
                  <div
                    class="tw-w-full tw-relative tw-rounded-full tw-h-2.5 tw-bg-white/10"
                    v-if="collection.edition !== 'open-edition'"
                  >
                    <div
                      class="tw-absolute tw-top-0 tw-h-2.5 tw-bg-primary-1 tw-rounded-full"
                      id="resourceMintedPercent"
                    ></div>
                  </div>
                </div>
              </div>
              <div
                class="tw-w-full tw-rounded-lg tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
              >
                <div
                  class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5 tw-text-white tw-rounded tw-border tw-border-solid tw-w-full md:tw-w-fit tw-border-dark-4 tw-bg-dark-6"
                >
                  <button
                    class="tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold tw-text-lg disabled:tw-cursor-not-allowed"
                    @click="decreaseNumberOfNft"
                    :disabled="externalWhitelisted || this.gettingProof"
                    @mouseup="stopDecrement"
                    @mousedown="startDecrement"
                    @touchstart="startDecrement"
                    @touchend="stopDecrement"
                  >
                    -
                  </button>
                  <input
                    class="no-spin-button tw-rounded tw-text-center tw-px-6 tw-py-2 tw-font-semibold tw-w-full md:tw-w-20 disabled:tw-cursor-not-allowed"
                    v-model="numberOfNft"
                    @input="checkNumberOfNft"
                    v-if="!externalWhitelisted || this.gettingProof"
                    type="number"
                  />
                  <div
                    class="tw-rounded tw-text-center tw-px-6 tw-py-2 tw-font-semibold tw-w-20 disabled:tw-cursor-not-allowed"
                    v-else
                  >
                    {{ externalWhitelistMintNumber }}
                  </div>
                  <button
                    class="tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold tw-text-lg disabled:tw-cursor-not-allowed"
                    @click="increaseNumberOfNft"
                    :disabled="externalWhitelisted || this.gettingProof"
                    @mouseup="stopIncrement"
                    @mousedown="startIncrement"
                    @touchstart="startIncrement"
                    @touchend="stopIncrement"
                  >
                    +
                  </button>
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
                <button-primary
                  :title="!collection.status.sold_out ? 'Mint' : 'Soldout'"
                  :disabled="getMintButtonDisabledStatus"
                  @click="mintBulkCollection"
                  :fullWidth="true"
                  :loading="minting"
                  v-else
                />
              </div>
              <div
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-text-dark-0"
                v-if="checkPublicSaleTimer() && getWalletAddress"
              >
                <i class="bx bx-info-circle tw-text-xl"></i>
                <div class="tw-text-sm">
                  <div v-if="gettingProof">
                    Getting Proof for {{ currentSale.name }}
                  </div>
                  <div v-if="notWhitelisted">
                    You are not whitelisted in {{ currentSale.name }} for this
                    collection
                  </div>
                  <div v-if="whitelisted">
                    You are eligible to mint for this phase
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-relative tw-rounded-lg"
          v-if="phaseCounter !== phases.length"
        >
          <div
            class="tw-absolute tw-w-full tw-h-1/4 tw-overflow-hidden tw-left-0 tw-bottom-0 tw-rounded-b-lg tw-bg-gradient-to-b tw-from-black/0 tw-to-black"
          ></div>
          <h2 class="tw-text-white tw-text-[1.375em] tw-font-bold">
            Mint Phases
          </h2>
          <div
            class="tw-w-full tw-overflow-auto no-scrollbar tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-rounded-lg"
            :style="`height:${
              phases.length - phaseCounter >= 3
                ? 440
                : (phases.length === 2 ? 142 : 120) *
                  (phases.length - phaseCounter)
            }px`"
          >
            <nft-mint-phase-box
              v-for="(phase, index) in phases"
              :key="index"
              :phase="phase"
              v-if="!checkIfPhaseStarted(phase.mint_time)"
              :coinType="collection.seed ? collection.seed.coin_type : 'APT'"
              :showWhitelistText="phase.id !== 'public-sale'"
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
      v-model="showErrorPopup"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-bg-modal-gray tw-text-white tw-px-4 tw-py-4 tw-rounded"
      >
        {{ errorMessage }}
      </div>
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
          <utility-image
            :source="collection.image"
            :onerror="imageNotFound()"
            :alt="collection.name"
            class="tw-w-full tw-h-full tw-rounded"
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
  <loading-collection v-else />
</template>
<script>
import {
  getOwnedCollectionOfUser,
  setSoldOut,
} from "@/services/CollectionService";
import { getProof, getMintLimit } from "@/services/WhitelistService";
import { getWhitelistEntryById } from "@/services/WhitelistService";
import {
  mintCollection,
  anotherCoinMintCollection,
} from "@/services/AptosCollectionService";
import imageNotFound from "@/utils/imageNotFound";
import santa from "@/assets/video/wapal-santa.MP4";
import xLogo from "@/assets/img/x-logo.svg";
import { checkIfCollectionIsSoldOut } from "@/utils/soldoutCollections";
export default {
  props: { collection: { type: Object } },
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
      proof: [],
      mintLimit: 1,
      totalMintLimit: 0,
      currentlyOwned: 0,
      gettingProof: true,
      notWhitelisted: false,
      whitelisted: false,
      currentSale: null,
      phases: [],
      phaseCounter: 0,
      phaseEndInTime: null,
      nextSale: null,
      v2: false,
      live: false,
      showShareBox: false,
      phaseInterval: null,
      externalWhitelisted: false,
      externalWhitelistMintNumber: 0,
      MARKETPLACE_URL: process.env.MARKETPLACE_URL,
      holdingIncreaseButtonInterval: null,
      holdingDecreaseButtonInterval: null,
      showShareModal: false,
      maxNumberOfNft: 35,
      imageNotFound,
      xLogo,
    };
  },
  methods: {
    isImage(source) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp",
            "svg",
            "ico",
            "tiff",
          ].includes(extension)
        : false;
    },
    isVideo(source) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp4",
            "mkv",
            "m4v",
            "webm",
            "avi",
            "mov",
            "wmv",
            "flv",
            "3gp",
            "ogv",
            "mpeg",
            "mpg",
            "divx",
            "rm",
            "asf",
            "vob",
            "ts",
            "m2ts",
          ].includes(extension)
        : false;
    },
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
      this.currentSale = {
        name: "public sale",
        id: "public-sale",
        mint_price: this.collection.candyMachine.public_sale_price,
        mint_time: this.collection.candyMachine.public_sale_time,
      };
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
    async hideEndInTimer() {
      this.phaseCounter = 0;
      this.currentSale = this.getCurrentSale();
      this.showEndInTimer = false;

      if (this.phaseCounter !== this.phases.length) {
        this.changeEndInTimer();

        await this.setProof();
      }
    },
    changeEndInTimer() {
      this.showEndInTimer = false;
      setTimeout(() => {
        this.showEndInTimer = true;
      }, 1);
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

        if (this.collection.status.sold_out) {
          clearInterval(this.progressInterval);
        }

        if (this.collection._id === "642bf277c10560ca41e179fa") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 239,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 222,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "64686db77db14461740bab0f") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 355,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "64625d957c7212d927559962") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 2333,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "6466a09b6fee90eea757521c") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 343,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "654c9afff8961c791c804cf1") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 1350,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "654e26260a58324d3465b4cb") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 955,
            paused: this.resource.paused,
          };
        }

        const soldOutCollectionSupply = checkIfCollectionIsSoldOut(
          this.collection
        );

        if (soldOutCollectionSupply) {
          this.resource.total_supply = soldOutCollectionSupply.supply;
        }

        if (
          this.resource.minted == this.resource.total_supply &&
          !this.collection.status.sold_out
        ) {
          this.collection.status.sold_out = true;
        }

        this.resource.mintedPercent = Math.floor(
          (this.resource.minted / this.resource.total_supply) * 100
        );

        if (
          this.collection.isEdition &&
          this.collection.edition === "open-edition"
        ) {
          return;
        } else {
          const resourceMintedPercent = document.querySelector(
            "#resourceMintedPercent"
          );

          resourceMintedPercent.style.width = this.resource.mintedPercent + "%";
        }
      }, 5000);
    },
    increaseNumberOfNft() {
      if (
        this.numberOfNft >=
        this.resource.total_supply - this.resource.minted
      ) {
        return;
      } else {
        if (this.numberOfNft >= this.maxNumberOfNft) {
          this.numberOfNft = this.maxNumberOfNft;
          return;
        }
        this.numberOfNft++;
      }
    },
    decreaseNumberOfNft() {
      if (this.numberOfNft <= 1) {
        return;
      } else {
        this.numberOfNft--;
      }
    },
    startDecrement() {
      this.holdingDecreaseButtonInterval = setInterval(() => {
        this.decreaseNumberOfNft();
      }, 100);
    },
    stopDecrement() {
      clearInterval(this.holdingDecreaseButtonInterval);
    },
    startIncrement() {
      this.holdingIncreaseButtonInterval = setInterval(() => {
        this.increaseNumberOfNft();
      }, 100);
    },
    stopIncrement() {
      clearInterval(this.holdingIncreaseButtonInterval);
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
        this.numberOfNft > this.maxNumberOfNft ||
        this.numberOfNft >= this.resource.total_supply - this.resource.minted
      ) {
        if (
          this.resource.total_supply - this.resource.minted >=
          this.maxNumberOfNft
        ) {
          this.numberOfNft = this.maxNumberOfNft;
        } else {
          this.numberOfNft = this.resource.total_supply - this.resource.minted;
        }
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

        if (this.collection.mintDetails) {
          this.mintCollectionExternally();
          return;
        }

        if (this.checkPublicSaleTimer()) {
          if (this.mintLimit <= this.currentlyOwned) {
            throw new Error("Mint Limit for this phase Exceeded");
          }
        }
        let res = null;
        if (!this.v2) {
          res = await this.$store.dispatch("walletStore/mintBulk", {
            resourceAccount: this.collection.candyMachine.resource_account,
            publicMint: !this.checkPublicSaleTimer(),
            candyMachineId: this.collection.candyMachine.candy_id,
            mintNumber: this.numberOfNft,
            proof: this.proof,
            mintLimit: this.totalMintLimit,
            sender: this.getSender,
          });
        } else {
          if (
            this.collection.seed &&
            this.collection.seed.coin_type !== "APT"
          ) {
            res = await anotherCoinMintCollection({
              candy_machine_id: this.collection.candyMachine.candy_id,
              candy_object: this.collection.candyMachine.resource_account,
              amount: this.numberOfNft,
              publicMint: !this.checkPublicSaleTimer(),
              proof: this.proof,
              mint_limit: this.totalMintLimit,
              coinType: this.collection.seed.coin_type,
              sender: this.getSender,
            });
          } else {
            res = await mintCollection({
              candy_machine_id: this.collection.candyMachine.candy_id,
              candy_object: this.collection.candyMachine.resource_account,
              amount: this.numberOfNft,
              publicMint: !this.checkPublicSaleTimer(),
              proof: this.proof,
              mint_limit: this.totalMintLimit,
              sender: this.getSender,
            });
          }
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

          if (this.collection._id === "642bf277c10560ca41e179fa") {
            res = {
              minted: res.minted,
              total_supply: 239,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
            res = {
              minted: res.minted,
              total_supply: 222,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "64686db77db14461740bab0f") {
            res = {
              minted: res.minted,
              total_supply: 355,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "6466a09b6fee90eea757521c") {
            res = {
              minted: this.resource.minted,
              total_supply: 343,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "654c9afff8961c791c804cf1") {
            res = {
              minted: this.resource.minted,
              total_supply: 1350,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "654e26260a58324d3465b4cb") {
            res = {
              minted: this.resource.minted,
              total_supply: 955,
              paused: this.resource.paused,
            };
          }

          if (res.total_supply === res.minted) {
            await setSoldOut(this.collection._id);
            this.collection.sold_out = true;
          }

          this.numberOfNft = 1;

          await this.getOwnedCollectionOfUser();
        } else {
          this.$toast.showMessage({
            message: "Collection Not Minted",
            error: true,
          });
        }

        this.minting = false;
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
    async setProof() {
      if (!this.getWalletAddress) {
        this.gettingProof = false;
        this.whitelisted = false;
        return;
      }
      try {
        this.whitelisted = false;

        this.gettingProof = true;

        this.proof = [];

        const proofParams = {
          walletAddress: this.getWalletAddress,
          collectionId: this.collection._id,
          phase: this.currentSale.id,
        };

        const res = await getProof(proofParams);

        const proofs = res.data.proofs;
        this.totalMintLimit = res.data.mint_limit;

        proofs.map((proof) => {
          this.proof.push(proof.data);
        });

        await this.getMintLimitOfPreviousPhases();

        await this.getOwnedCollectionOfUser();

        this.gettingProof = false;
        this.notWhitelisted = false;
        this.whitelisted = true;
      } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 400) {
          this.notWhitelisted = true;
          this.whitelisted = false;
        }

        this.notWhitelisted = true;
        this.whitelisted = false;

        this.numberOfNft = 1;

        this.gettingProof = false;
      }
    },
    async getOwnedCollectionOfUser() {
      const res = await getOwnedCollectionOfUser(
        this.getWalletAddress,
        this.collection.name
      );

      this.currentlyOwned = res;

      this.setMaxNumberOfNfts();
    },
    getCurrentSale() {
      this.phases.map((phase) => {
        if (new Date(phase.mint_time).getTime() < Date.now()) {
          this.phaseCounter++;
        }
      });

      if (this.phaseCounter === this.phases.length) {
        this.nextSale = this.phases[this.phases.length - 1];
        return this.phases[this.phases.length - 1];
      }

      this.nextSale = this.phases[this.phaseCounter];

      return this.phaseCounter > 0
        ? this.phases[this.phaseCounter - 1]
        : this.phases[0];
    },
    setPhases() {
      this.phases = [];

      this.phases = this.collection.phases ? this.collection.phases : [];

      if (!this.collection.phases) {
        if (
          this.collection.mintDetails &&
          this.collection.mintDetails.all_mint_at_same_time
        ) {
          if (
            new Date(this.collection.candyMachine.whitelist_sale_time) >
            new Date()
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

      const publicSale = {
        name: "public sale",
        id: "public-sale",
        mint_price: this.collection.candyMachine.public_sale_price,
        mint_time: this.collection.candyMachine.public_sale_time,
      };

      this.phases.push(publicSale);
    },
    checkLiveStatus() {
      const mintTime = new Date(this.currentSale.mint_time);
      if (mintTime < new Date()) {
        return true;
      }

      return false;
    },
    checkIfPhaseStarted(mint_time) {
      const mintTime = new Date(mint_time);
      if (mintTime < new Date()) {
        return true;
      }

      return false;
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
    async setCollectionToLive() {
      this.live = true;
      if (this.phases.length === 1) {
        this.phaseCounter = 1;
      }
    },
    startPhaseInterval() {
      this.phaseInterval = setInterval(async () => {
        const date = new Date(this.nextSale.mint_time);

        const now = new Date().getTime();

        const interval = date.getTime() - now;

        if (interval <= 0) {
          clearInterval(this.phaseInterval);
          this.phaseCounter = 0;
          this.currentSale = this.getCurrentSale();

          if (this.phaseCounter === this.phases.length) {
            this.notWhitelisted = false;
            this.gettingProof = false;

            return;
          }
          await this.setProof();
          this.startPhaseInterval();
        }
      }, 1000);
    },
    async mintCollectionExternally() {
      try {
        if (this.externalWhitelisted) {
          const res = await this.$store.dispatch("walletStore/externalMint", {
            mintFunction: this.collection.mintDetails.whitelist_mint_function,
            programId: this.collection.candyMachine.candy_id,
            moduleName: this.collection.mintDetails.module_name,
            numberOfNfts: this.numberOfNft,
          });
          this.minting = false;

          const whitelistRes = await this.$store.dispatch(
            "walletStore/checkIfWalletAddressIsWhitelisted",
            {
              walletAddress: this.getWalletAddress,
              programId: this.collection.candyMachine.candy_id,
              moduleName: this.collection.mintDetails.module_name,
              viewFunction:
                this.collection.mintDetails.check_whitelist_function,
            }
          );
        } else {
          this.publicMintCollectionExternally();
        }
      } catch (error) {
        if (error.message === "Error getting whitelist proof") {
          this.externalWhitelisted = false;
          this.currentSale.mint_price =
            this.collection.candyMachine.public_sale_price;
        } else {
          this.minting = false;
          this.$toast.showMessage({ message: error, error: true });
        }
      }
    },
    async publicMintCollectionExternally() {
      try {
        this.currentSale.mint_price =
          this.collection.candyMachine.public_sale_price;

        if (!this.collection.mintDetails.many && this.numberOfNft > 1) {
          throw new Error("Please Mint One NFT at a time");
        }

        if (this.numberOfNft > 1) {
          const res = await this.$store.dispatch(
            "walletStore/bulkExternalMint",
            {
              mintFunction:
                this.collection.mintDetails.public_mint_many_function,
              programId: this.collection.candyMachine.candy_id,
              moduleName: this.collection.mintDetails.module_name,
              numberOfNfts: this.numberOfNft,
            }
          );
        } else {
          const res = await this.$store.dispatch("walletStore/externalMint", {
            mintFunction: this.collection.mintDetails.public_mint_function,
            programId: this.collection.candyMachine.candy_id,
            moduleName: this.collection.mintDetails.module_name,
          });
        }
        this.minting = false;
        this.numberOfNft = 1;
      } catch (error) {
        console.log(error);
        this.minting = false;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async checkWhitelistForExternalMint() {
      try {
        const whitelistRes = await this.$store.dispatch(
          "walletStore/checkIfWalletAddressIsWhitelisted",
          {
            walletAddress: this.getWalletAddress,
            programId: this.collection.candyMachine.candy_id,
            moduleName: this.collection.mintDetails.module_name,
            viewFunction: this.collection.mintDetails.check_whitelist_function,
          }
        );

        if (whitelistRes) {
          this.currentSale.mint_price =
            this.collection.candyMachine.whitelist_price;

          this.externalWhitelistMintNumber = whitelistRes[0];
        }

        this.externalWhitelisted = true;
      } catch (error) {
        this.currentSale.mint_price =
          this.collection.candyMachine.public_sale_price;
        this.externalWhitelisted = false;
      }
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

    async getMintLimitOfPreviousPhases() {
      let mintLimit = 0;
      await Promise.all(
        this.collection.phases.map(async (phase) => {
          const date = new Date();

          const phaseStartDate = new Date(phase.mint_time);

          if (date > phaseStartDate) {
            const mintLimitRes = await getMintLimit({
              walletAddress: this.getWalletAddress,
              collectionId: this.collection._id,
              phase: phase.id,
            });

            const data = mintLimitRes.data.data;

            if (data) {
              mintLimit += data.mint_limit;
            }
          }
        })
      );

      this.mintLimit = mintLimit;
    },
    setMaxNumberOfNfts() {
      if (this.collection.isEdition) {
        this.maxNumberOfNft = 200;
        return;
      }

      if (!this.checkPublicSaleTimer()) {
        this.maxNumberOfNft = 35;
        return;
      }

      this.maxNumberOfNft = this.mintLimit - this.currentlyOwned;

      if (this.maxNumberOfNft <= 0) {
        this.maxNumberOfNft = 1;
      }

      if (this.maxNumberOfNft >= 35) {
        this.maxNumberOfNft = 35;
      }

      this.numberOfNft = 1;
    },
    async checkWhitelistForPhases() {
      if (!this.getWalletAddress) {
        this.phases = this.phases.map((phase) => {
          let tempPhase = structuredClone(phase);
          tempPhase.whitelisted = false;

          return tempPhase;
        });
        return;
      }

      this.phases = await Promise.all(
        this.phases.map(async (phase) => {
          let tempPhase = structuredClone(phase);
          try {
            if (tempPhase.id !== "public-sale") {
              const res = await getMintLimit({
                walletAddress: this.getWalletAddress,
                collectionId: this.collection._id,
                phase: tempPhase.id,
              });

              if (res.data.data) {
                tempPhase.whitelisted = true;
              } else {
                tempPhase.whitelisted = false;
              }
            }

            return tempPhase;
          } catch (error) {
            console.log(error);
            tempPhase.whitelisted = false;

            return tempPhase;
          }
        })
      );
    },
  },
  computed: {
    getCurrentPrice() {
      if (
        this.collection.candyMachine.public_sale_price ==
        this.collection.candyMachine.whitelist_price
      ) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (!this.showPublicSaleTimer) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (this.whitelistSaleDate && this.showPublicSaleTimer) {
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
    getWalletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    getSender() {
      return {
        walletAddress: this.$store.state.walletStore.wallet.walletAddress,
        publicKey: this.$store.state.walletStore.wallet.publicKey,
      };
    },
    generatedProof() {
      if (!this.checkPublicSaleTimer()) {
        return true;
      }

      if (!this.gettingProof) {
        return true;
      }

      return false;
    },
    getMintButtonDisabledStatus() {
      return (
        this.minting ||
        this.collection.status.sold_out ||
        this.gettingProof ||
        this.notWhitelisted ||
        this.resource.paused
      );
    },
  },
  async mounted() {
    if (this.collection) {
      if (this.collection.username === "proudlionsclub") {
        this.collection.username = "proud-lions-club";
      } else if (this.collection.username === "squids-|-aptos") {
        this.collection.username = "squid-aptos";
      }

      if (this.collection.username === "wapal-santa") {
        this.collection.video = santa;
      }

      this.setPhases();

      this.currentSale = this.getCurrentSale();

      this.live = this.checkLiveStatus();

      this.publicSaleDate = new Date(
        this.phases[this.phases.length - 1].mint_time
      );

      this.collection.candyMachine.public_sale_price =
        this.phases[this.phases.length - 1].mint_price;

      this.showWhitelistSaleTimer = this.checkWhitelistSaleTimer();
      this.showPublicSaleTimer = this.checkPublicSaleTimer();

      this.showEndInTimer = true;

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

      this.v2 = this.resource.v2;

      if (this.collection._id === "642bf277c10560ca41e179fa") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 239,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 222,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "64686db77db14461740bab0f") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 355,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "64625d957c7212d927559962") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 2333,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "6466a09b6fee90eea757521c") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 343,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "654c9afff8961c791c804cf1") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 1350,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "654e26260a58324d3465b4cb") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 955,
          paused: this.resource.paused,
        };
      }

      const soldOutCollectionSupply = checkIfCollectionIsSoldOut(
        this.collection
      );

      if (soldOutCollectionSupply) {
        this.resource.total_supply = soldOutCollectionSupply.supply;
      }

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
        const whitelistRes = await getWhitelistEntryById(
          this.collection._id,
          1,
          1,
          "whitelist"
        );

        this.whitelistNumber = whitelistRes.data.spotsCount;
      }

      this.loading = false;

      if (
        this.phases.length > 1 &&
        this.showPublicSaleTimer &&
        !this.showWhitelistSaleTimer
      ) {
        await this.setProof();
      } else {
        this.gettingProof = false;
      }

      if (this.phases.length > 1) {
        this.startPhaseInterval();
      }

      if (
        this.collection.mintDetails &&
        this.collection.mintDetails.check_whitelist_function &&
        this.collection.mintDetails.all_mint_at_same_time
      ) {
        await this.checkWhitelistForExternalMint();
      }

      this.checkWhitelistForPhases();

      setTimeout(() => {
        if (!this.collection.status.sold_out && this.live) {
          this.showMintedProgress();
        } else {
          if (
            this.collection.isEdition &&
            this.collection.edition === "open-edition"
          ) {
            return;
          } else {
            const resourceMintedPercent = document.querySelector(
              "#resourceMintedPercent"
            );

            resourceMintedPercent.style.width =
              this.resource.mintedPercent + "%";
          }
        }
      }, 200);
    }
  },
  beforeDestroy() {
    clearInterval(this.progressInterval);
  },
  watch: {
    async getWalletAddress() {
      if (this.phases.length > 1 && this.showPublicSaleTimer) {
        this.whitelisted = false;
        this.notWhitelisted = false;
        await this.setProof();
        await this.getOwnedCollectionOfUser();
      }

      if (
        this.collection.mintDetails &&
        this.collection.mintDetails.check_whitelist_function &&
        this.collection.mintDetails.all_mint_at_same_time
      ) {
        await this.checkWhitelistForExternalMint();
      }

      await this.checkWhitelistForPhases();
    },
  },
};
</script>
<style lang="css">
.video-detailed {
  max-width: 550px;
  height: 550px;
  border-radius: 0.25rem !important;
}
@media (max-width: 600px) {
  .video-detailed {
    height: 350px;
  }
}
</style>
