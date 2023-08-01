<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[5.5em] lg:tw-pb-[7.5em] xl:!tw-max-w-[1100px]"
    v-if="!loading"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start xl:tw-gap-[4.5em]"
    >
      <img
        :src="collection.image"
        :alt="collection.name"
        :onerror="imageNotFound()"
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
            />
          </div>
        </div>
        <h1 class="tw-text-white tw-text-[2.5em] tw-font-bold">
          {{ collection.name }}
        </h1>
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
        <div class="tw-pb-2 tw-text-dark-0">
          {{ collection.description }}
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
          v-if="live"
        >
          <div
            class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-py-5 tw-px-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 md:tw-flex-col md:tw-items-start md:tw-justify-start"
          >
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
            >
              <div
                class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between 3xl:tw-text-lg"
              >
                <div class="tw-text-white/70">
                  {{ resource.minted }}/{{ resource.total_supply }} Minted
                </div>
                <div v-if="currentSale.mint_price !== 0">
                  Price {{ currentSale.mint_price }} APT
                </div>
                <div v-else>Free Mint</div>
              </div>
              <div
                class="tw-w-full tw-relative tw-rounded-full tw-h-2.5 tw-bg-white/10"
              >
                <div
                  class="tw-absolute tw-top-0 tw-h-2.5 tw-bg-primary-1 tw-rounded-full"
                  id="resourceMintedPercent"
                ></div>
              </div>
            </div>
            <div
              class="tw-w-full tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
            >
              <div
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5 tw-text-white tw-rounded tw-border tw-border-solid tw-border-dark-4 tw-bg-dark-6"
              >
                <button
                  class="tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold tw-text-lg disabled:tw-cursor-not-allowed"
                  @click="decreaseNumberOfNft"
                >
                  -
                </button>
                <input
                  class="tw-rounded tw-text-center tw-px-6 tw-py-2 tw-font-semibold tw-w-20 disabled:tw-cursor-not-allowed"
                  v-model="numberOfNft"
                  @input="checkNumberOfNft"
                />
                <button
                  class="tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold tw-text-lg disabled:tw-cursor-not-allowed"
                  @click="increaseNumberOfNft"
                >
                  +
                </button>
              </div>
              <button-primary
                :title="!collection.status.sold_out ? 'Mint' : 'Soldout'"
                :disabled="minting || collection.status.sold_out"
                @click="mintBulkCollection"
                :fullWidth="true"
              />
            </div>
          </div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-relative tw-rounded-lg"
          v-if="currentSale.id !== 'public-sale'"
        >
          <div
            class="tw-absolute tw-w-full tw-h-1/4 tw-overflow-hidden tw-left-0 tw-bottom-0 tw-rounded-b-lg tw-bg-gradient-to-b tw-from-black/0 tw-to-black"
          ></div>
          <h2 class="tw-text-white tw-text-[1.375em] tw-font-bold">
            Mint Phases
          </h2>
          <div
            class="tw-w-full tw-h-[250px] tw-overflow-auto no-scrollbar tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-rounded-lg"
          >
            <nft-mint-phase-box
              v-for="(phase, index) in phases"
              :key="index"
              :phase="phase"
              v-if="!checkIfPhaseStarted(phase.mint_time)"
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
  </div>
  <loading-collection v-else />
  <!-- <div>
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
              <count-down :shadow="true" :startTime="currentSale.mint_time" />
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
          <div class="tw-text-red-600" v-if="gettingProof">
            Getting Proof for Whitelist Mint
          </div>
          <div class="tw-text-red-600" v-if="!gettingProof && notWhitelisted">
            You are not whitelisted in {{ currentSale.name }} phase for this
            collection
          </div>
          <div class="tw-w-full tw-flex tw-flex-col tw-gap-2">
            <div
              class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-text-white"
            >
              <span class="tw-capitalize tw-text-sm">{{ currentSale.name }}</span>
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
                    v-if="currentSale.mint_price != 0"
                  >
                    price {{ currentSale.mint_price }} apt
                  </h6>
                  <h6 class="tw-capitalize tw-text-white" v-else>Free Mint</h6>
                  <div
                    class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5 tw-text-white"
                  >
                    <button
                      class="tw-bg-[#001233] tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold disabled:tw-cursor-not-allowed"
                      @click="decreaseNumberOfNft"
                    >
                      -
                    </button>
                    <input
                      class="tw-bg-[#001233] tw-rounded tw-text-center tw-px-6 tw-py-2 tw-font-semibold tw-w-24 tw-max-w-32 disabled:tw-cursor-not-allowed"
                      v-model="numberOfNft"
                      @input="checkNumberOfNft"
                    />
                    <button
                      class="tw-bg-[#001233] tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold disabled:tw-cursor-not-allowed"
                      @click="increaseNumberOfNft"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  class="tw-text-base tw-uppercase tw-text-white tw-bg-[#FF36AB] tw-rounded tw-w-full tw-px-2 tw-py-2 tw-text-center tw-font-semibold tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 disabled:tw-cursor-not-allowed"
                  :class="{
                    'md:!tw-w-[30%]':
                      !showWhitelistSaleTimer && !showPublicSaleTimer,
                  }"
                  @click="mintBulkCollection"
                  :disabled="
                    minting ||
                    collection.status.sold_out ||
                    !generatedProof ||
                    notWhitelisted
                  "
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
                :startTime="nextSale.mint_time"
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
              <div class="tw-capitalize">{{ currentSale.name }}</div>
              <div class="tw-capitalize" v-if="currentSale.mint_price != 0">
                price {{ currentSale.mint_price }} apt
              </div>
              <div class="tw-capitalize" v-else>Free Mint</div>
            </div>
            <div
              class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start"
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
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-0 md:tw-gap-4"
            >
              <div>Public Sale</div>
              <div
                class="tw-capitalize"
                v-if="collection.candyMachine.public_sale_price != 0"
              >
                price {{ collection.candyMachine.public_sale_price }} apt
              </div>
              <div class="tw-capitalize" v-else>Free Mint</div>
            </div>
            <div
              class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start"
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
    </div> -->
</template>
<script>
import {
  getOwnedCollectionOfUser,
  setSoldOut,
} from "@/services/CollectionService";
import { getProof, getMintLimit } from "@/services/WhitelistService";
import { getWhitelistEntryById } from "@/services/WhitelistService";
import { mintMany } from "~/services/AptosCollectionService";
import imageNotFound from "@/utils/imageNotFound";
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
      currentlyOwned: 0,
      gettingProof: true,
      notWhitelisted: false,
      currentSale: null,
      phases: [],
      phaseCounter: 0,
      phaseEndInTime: null,
      nextSale: null,
      v2: false,
      live: false,
      showShareBox: false,
      imageNotFound,
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
        this.resource = await this.$store.dispatch(
          "walletStore/getSupplyAndMintedOfCollection",
          {
            resourceAccountAddress:
              this.collection.candyMachine.resource_account,
            candyMachineId: this.collection.candyMachine.candy_id,
          }
        );

        if (this.collection.status.sold_out) {
          clearInterval(this.progressInterval);
        }

        if (this.collection._id === "642bf277c10560ca41e179fa") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 777,
          };
        } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 222,
          };
        } else if (this.collection._id === "64686db77db14461740bab0f") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 355,
          };
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
      if (this.numberOfNft <= 1) {
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
        if (this.resource.total_supply - this.resource.minted >= 500) {
          this.numberOfNft = 500;
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

        if (this.checkPublicSaleTimer()) {
          if (this.mintLimit <= this.currentlyOwned) {
            throw new Error("Mint Limit Reached");
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
            mintLimit: this.mintLimit,
          });
        } else {
          res = await mintMany({
            candy_machine_id: this.collection.candyMachine.candy_id,
            candy_object: this.collection.candyMachine.resource_account,
            amount: this.numberOfNft,
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

          if (this.collection._id === "642bf277c10560ca41e179fa") {
            res = {
              minted: res.minted,
              total_supply: 777,
            };
          } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
            res = {
              minted: res.minted,
              total_supply: 222,
            };
          } else if (this.collection._id === "64686db77db14461740bab0f") {
            res = {
              minted: res.minted,
              total_supply: 355,
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
        return;
      }
      try {
        this.gettingProof = true;

        this.proof = [];

        const proofParams = {
          walletAddress: this.getWalletAddress,
          collectionId: this.collection._id,
          phase: this.currentSale.id,
        };

        // const mintLimitRes = await getMintLimit(proofParams);

        const res = await getProof(proofParams);

        const proofs = res.data.proofs;

        proofs.map((proof) => {
          this.proof.push(proof.data);
        });

        this.mintLimit = res.data.mint_limit;

        await getOwnedCollectionOfUser();

        this.gettingProof = false;
        this.notWhitelisted = false;
      } catch (error) {
        console.log(error);

        if (error.response.status === 400) {
          this.notWhitelisted = true;
        }

        this.gettingProof = false;
      }
    },
    async getOwnedCollectionOfUser() {
      const res = await getOwnedCollectionOfUser(
        this.getWalletAddress,
        this.collection.name
      );

      this.currentlyOwned = res.data.data.current_token_ownerships.length;
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

      this.phaseEndInTime = this.phases[this.phaseCounter].mint_time;

      this.nextSale = this.phases[this.phaseCounter];

      return this.phaseCounter > 0
        ? this.phases[this.phaseCounter - 1]
        : this.phases[0];
    },
    setPhases() {
      this.phases = this.collection.phases ? this.collection.phases : [];

      if (!this.collection.phases) {
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

      this.phases.map((phase) => {
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
        : "https://wapal.io";

      clipboardData.writeText(`${baseURL}/nft/${this.collection.username}`);

      this.$toast.showMessage({ message: "Link Copied" });

      this.showShareBox = false;
    },
    shareOnTwitter() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://wapal.io";

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
    generatedProof() {
      if (!this.checkPublicSaleTimer()) {
        return true;
      }

      if (!this.gettingProof) {
        return true;
      }

      return false;
    },
  },
  async mounted() {
    if (this.collection) {
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

      this.resource = await this.$store.dispatch(
        "walletStore/getSupplyAndMintedOfCollection",
        {
          resourceAccountAddress: this.collection.candyMachine.resource_account,
          candyMachineId: this.collection.candyMachine.candy_id,
        }
      );

      this.v2 = this.resource.v2;

      if (this.collection._id === "642bf277c10560ca41e179fa") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 777,
        };
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 222,
        };
      } else if (this.collection._id === "64686db77db14461740bab0f") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 355,
        };
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

      setTimeout(() => {
        const resourceMintedPercent = document.querySelector(
          "#resourceMintedPercent"
        );

        resourceMintedPercent.style.width = this.resource.mintedPercent + "%";

        if (!this.collection.status.sold_out) {
          this.showMintedProgress();
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
        await this.setProof();
        await this.getOwnedCollectionOfUser();
      }
    },
  },
};
</script>
