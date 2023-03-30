<template>
  <div>
    <div
      class="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-px-4 tw-pt-28 tw-pb-16 md:tw-px-16 lg:tw-flex-row lg:tw-gap-16"
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
            class="tw-w-full tw-rounded-lg"
          />
        </div>
        <h3
          class="tw-text-[1.75rem] tw-text-wapal-pink tw-font-normal tw-w-full"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full md:tw-items-center lg:tw-flex-row lg:tw-items-center"
          >
            <span class="tw-pr-4 lg:tw-pr-8">{{ getWhitelistStatusText }}</span>
            <count-down
              :shadow="true"
              :startTime="getWhitelistTime"
              v-if="!getWhitelistEnded"
            />
          </div>
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
          >
            {{ collection.isVerified ? "Doxxed" : "Undoxxed" }}
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
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-8 tw-bg-[#0C224B] tw-text-wapal-gray tw-px-6 tw-py-6 tw-w-full tw-rounded md:tw-flex-row"
        >
          <div class="tw-text-lg">Mint Date</div>
          <div class="tw-text-xl">{{ getMintDate }}</div>
        </div>
        <div class="tw-w-full tw-flex tw-flex-col tw-gap-2 tw-py-4">
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-text-white"
          >
            <span class="tw-capitalize tw-text-sm">No of Spots</span>
            <span class="tw-capitalize tw-text-sm"
              >{{ resource.spotPercent }}%
              <span class="tw-text-[#ACACAC]"
                >({{ resource.occupiedSpots }} out of
                {{ whitelist.whitelist_spots }})</span
              ></span
            >
          </div>
          <div
            class="tw-w-full tw-rounded-full tw-relative tw-bg-[#263D68] tw-h-[10px] tw-overflow-hidden"
          >
            <div
              class="tw-absolute tw-h-[10px] tw-top-0 tw-bg-[#E500A4] tw-rounded-full tw-transition-all tw-duration-200 tw-ease-linear"
              id="noOfSpotsPercent"
            ></div>
          </div>
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-w-full tw-rounded"
        >
          <div class="tw-text-lg">Connect Wallet</div>
          <button
            class="tw-font-semibold tw-bg-[#FF36AB] tw-px-8 tw-py-2 tw-rounded"
            @click="showConnectWalletModal = true"
            v-if="!getWalletStatus"
          >
            Connect
          </button>
          <div v-else>
            <v-icon class="!tw-text-emerald-600 !tw-text-2xl !tw-font-bold"
              >mdi-check-circle</v-icon
            >
          </div>
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-w-full tw-rounded"
        >
          <div class="tw-text-lg">Login to your Wapal Account</div>
          <button
            class="tw-font-semibold tw-bg-[#FF36AB] tw-px-8 tw-py-2 tw-rounded"
            @click="showSignupDialog = true"
            v-if="!getUserStatus"
          >
            LogIn
          </button>
          <div v-else>
            <v-icon class="!tw-text-emerald-600 !tw-text-2xl !tw-font-bold"
              >mdi-check-circle</v-icon
            >
          </div>
        </div>
        <div
          class="tw-flex tw-flex-col tw-w-full tw-items-start tw-justify-start tw-gap-8 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-rounded tw-cursor-pointer"
          @click="showDiscordOptions = !showDiscordOptions"
        >
          <div
            class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-between tw-w-full md:tw-flex-row md:tw-gap-8"
          >
            <div class="tw-text-lg">Connect to Discord</div>
            <div
              class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2"
            >
              <div v-if="getDiscordConnected && joinedDiscordServer">
                <v-icon class="!tw-text-emerald-600 !tw-text-2xl !tw-font-bold"
                  >mdi-check-circle</v-icon
                >
              </div>
              <button>
                <v-icon
                  class="!tw-text-wapal-gray !tw-text-2xl !tw-font-bold tw-transition-all tw-duration-300 tw-ease-linear tw-transform"
                  :class="{ 'tw-rotate-180': showDiscordOptions }"
                  >mdi-chevron-down</v-icon
                >
              </button>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-w-full"
            v-if="showDiscordOptions"
          >
            <div
              class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-between tw-w-full md:tw-flex-row md:tw-gap-8"
            >
              <div class="tw-text-lg">Connect to Discord</div>
              <button
                class="tw-font-semibold tw-bg-[#FF36AB] tw-px-8 tw-py-2 tw-rounded"
                @click.stop="connectDiscord"
                v-if="!getDiscordConnected"
              >
                Connect
              </button>
              <div v-else>
                <v-icon class="!tw-text-emerald-600 !tw-text-2xl !tw-font-bold"
                  >mdi-check-circle</v-icon
                >
              </div>
            </div>
            <div
              class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-between tw-w-full md:tw-flex-row md:tw-gap-8"
              v-if="whitelist.discord_server_url"
            >
              <div class="tw-text-lg">
                Join
                <a
                  :href="whitelist.discord_server_url"
                  target="_blank"
                  class="!tw-text-wapal-pink"
                  @click.stop=""
                  >{{ whitelist.discord_server_name }}</a
                >
                Discord
              </div>
              <div>
                <div v-if="!joinedDiscordServer">
                  <button-with-loader
                    class="tw-font-semibold tw-bg-[#FF36AB] tw-px-8 tw-py-2 tw-rounded"
                    @click.native.stop="checkIfUserHasJoinedDiscordServer"
                    :loading="verifyingJoinedDiscordServer"
                    loading-text="Verifying..."
                    text="Verify"
                  >
                  </button-with-loader>
                </div>

                <div v-else>
                  <v-icon
                    class="!tw-text-emerald-600 !tw-text-2xl !tw-font-bold"
                    >mdi-check-circle</v-icon
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="tw-flex tw-flex-col tw-w-full tw-items-start tw-justify-start tw-gap-8 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-rounded tw-cursor-pointer"
          @click="showTwitterOptions = !showTwitterOptions"
        >
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-8 tw-w-full"
          >
            <div class="tw-text-lg">Connect to Twitter</div>
            <div
              class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2"
            >
              <div v-if="followedTwitter">
                <v-icon class="!tw-text-emerald-600 !tw-text-2xl !tw-font-bold"
                  >mdi-check-circle</v-icon
                >
              </div>
              <button>
                <v-icon
                  class="!tw-text-wapal-gray !tw-text-2xl !tw-font-bold tw-transition-all tw-duration-300 tw-ease-linear tw-transform"
                  :class="{ 'tw-rotate-180': showTwitterOptions }"
                  >mdi-chevron-down</v-icon
                >
              </button>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-between tw-w-full md:tw-flex-row md:tw-gap-8"
            v-if="whitelist.twitter && showTwitterOptions"
          >
            <div class="tw-text-lg">
              Follow
              <a
                :href="whitelist.twitter"
                @click.stop=""
                target="_blank"
                class="!tw-text-wapal-pink"
                >{{ whitelist.twitter }}</a
              >
              on Twitter
            </div>
            <div>
              <div v-if="!followedTwitter">
                <button-with-loader
                  class="tw-font-semibold tw-bg-[#FF36AB] tw-px-8 tw-py-2 tw-rounded"
                  @click.native.stop="checkIfUserHasFollowedTwitterAccount"
                  :loading="verifyingFollowedOnTwitter"
                  loading-text="Verifying..."
                  text="Verify"
                >
                </button-with-loader>
              </div>

              <div v-else>
                <v-icon class="!tw-text-emerald-600 !tw-text-2xl !tw-font-bold"
                  >mdi-check-circle</v-icon
                >
              </div>
            </div>
          </div>
        </div>
        <div class="tw-w-full tw-flex tw-flex-row tw-justify-center">
          <button
            class="tw-font-semibold tw-bg-[#FF36AB] tw-px-8 tw-py-2 tw-rounded md:tw-py-3 md:tw-px-16 disabled:tw-bg-[#FF36AB]/75"
            @click="checkUserForVerification"
            :disabled="!getVerificationStatus"
          >
            Verify and Enter
          </button>
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
        @closeModal="showConnectWalletModal = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
    <v-dialog
      v-model="showSignupDialog"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[35%]"
    >
      <signup-modal
        @close="showSignupDialog = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
    <v-dialog
      v-model="showVerifyingDialog"
      content-class="!tw-w-full md:!tw-w-1/2"
      persistent
    >
      <div
        class="tw-relative tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-bg-modal-gray tw-rounded tw-py-8 tw-px-4 tw-gap-6"
      >
        <button
          class="tw-absolute tw-top-4 tw-right-4"
          @click="showVerifyingDialog = false"
        >
          <v-icon class="!tw-text-lg !tw-text-white">mdi-close</v-icon>
        </button>
        <h2 class="tw-text-xl tw-font-medium tw-capitalize">Verifying</h2>
        <loading v-if="!error.discord.error && !error.twitter.error" />
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-center md:tw-justify-between"
          v-if="
            whitelist.discord_server_name &&
            error.discord.type === 'not promoted'
          "
        >
          <div class="tw-text-lg">
            Please get promoted to
            <span
              v-for="(role, index) in whitelist?.discord_roles"
              :key="role.id"
              v-if="whitelist?.discord_roles[0].name"
            >
              <span v-if="index === whitelist?.discord_roles.length - 1"
                >{{ role.name }}
              </span>
              <span v-else>{{ role.name }}, </span>
            </span>
            on {{ whitelist.discord_server_name }} server
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import CountDown from "@/components/Reusable/CountDown.vue";
import Loading from "@/components/Reusable/Loading.vue";
import ConnectWalletModal from "@/components/ConnectWallet/ConnectWalletModal.vue";
import SignupModal from "@/components/Signup/SignupModal.vue";
import ButtonWithLoader from "@/components/Button/ButtonWithLoader.vue";

import {
  getWhitelistById,
  createWhitelistEntry,
  getWhitelistEntryById,
} from "@/services/WhitelistService";

import { getCollection } from "@/services/CollectionService";
import { discordRequest } from "@/services/DiscordInterceptor";

import moment from "moment";
import Cookies from "js-cookie";

export default {
  components: {
    CountDown,
    Loading,
    ConnectWalletModal,
    SignupModal,
    ButtonWithLoader,
  },
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
      },
      showConnectWalletModal: false,
      showSignupDialog: false,
      whitelist: {
        whitelist_start: "",
        discord_roles: [{ name: "", id: "" }],
        whitelist_spots: "",
        discord_server_name: "",
        discord_server_url: "",
        twitter: "",
      },
      error: {
        discord: {
          message: "",
          type: "",
          error: false,
        },
        twitter: {
          message: "",
          type: "",
          error: false,
        },
      },
      showVerifyingDialog: false,
      disableVerifyAndEnter: false,
      verifying: false,
      verified: false,
      discordDetails: null,
      discordStatus: false,
      joinedDiscordServer: false,
      promotedToRequiredRoles: false,
      verifyingJoinedDiscordServer: false,
      verifyingPromotedToDiscordRoles: false,
      discordResponse: { data: "" },
      followedTwitter: false,
      verifyingFollowedOnTwitter: false,
      showDiscordOptions: false,
      showTwitterOptions: false,
      resource: {
        totalSpots: 0,
        occupiedSpots: 0,
        spotPercent: 0,
      },
      full: false,
      interval: null,
    };
  },
  methods: {
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet.wallet} Wallet Connected Successfully`,
      });
    },
    displayMessageSignedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `Logged In Successfully`,
      });
    },
    async connectTwitter() {},
    async connectDiscord() {
      try {
        const discordOptions = this.$auth.strategies.discord.options;

        const scopes = encodeURIComponent(discordOptions.scope.join(" "));

        const discordConnectionURL = `${discordOptions.endpoints.authorization}?client_id=${discordOptions.clientId}&redirect_uri=${discordOptions.redirectUri}&response_type=code&scope=${scopes}`;

        window.open(discordConnectionURL, "_blank");

        this.watchCookies();
      } catch (error) {
        console.log(error);
      }
    },
    async checkUserForVerification() {
      this.verifying = true;
      this.disableVerifyAndEnter = true;
      this.error = {
        discord: {
          message: "",
          type: "",
          error: false,
        },
        twitter: {
          message: "",
          type: "",
          error: false,
        },
      };

      this.showVerifyingDialog = true;

      if (!this.whitelist.discord_roles || !this.whitelist.discord_server_id) {
        this.sendUserDetailsToCreateWhitelistEntry();
      } else {
        const discordConditions =
          await this.checkIfUserHasFulfilledDiscordCondition();

        if (discordConditions) {
          this.sendUserDetailsToCreateWhitelistEntry();
        }
      }
      return;
    },
    async checkIfUserHasJoinedDiscordServer() {
      try {
        this.verifyingJoinedDiscordServer = true;
        this.discordRes = await discordRequest.get(
          `users/@me/guilds/${this.whitelist.discord_server_id}/member`
        );

        this.discordDetails = this.discordRes.data.user;
        this.verifyingJoinedDiscordServer = false;
        this.joinedDiscordServer = true;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          if (error.response.data.message === "Unknown Guild") {
            this.$toast.showMessage({
              message: "Please Join Discord Server First",
              error: true,
            });
          }
        } else {
          this.$toast.showMessage({
            message: "Please Connect Discord First",
            error: true,
          });
        }
        this.verifyingJoinedDiscordServer = false;
      }
    },
    async checkIfUserHasFulfilledDiscordCondition() {
      try {
        const roles = this.discordRes.data.roles;
        const promoted = this.checkDiscordRoles(roles);

        if (promoted) {
          this.promotedToRequiredRoles = true;
          this.verifyingPromotedToDiscordRoles = false;
        } else {
          this.error.discord.error = true;
          this.error.discord.type = "not promoted";
          this.$toast.showMessage({
            message: "Please get promoted to required roles",
            error: true,
          });

          return false;
        }

        return true;
      } catch (error: any) {
        this.$toast.showMessage({
          message: "Please get promoted to required roles",
          error: true,
        });

        return false;
      }
    },
    checkDiscordRoles(roles: any[]) {
      let checkedRoles = this.whitelist.discord_roles.length;

      roles.map((role: any) => {
        this.whitelist.discord_roles.map((whitelistRole: any) => {
          if (role == whitelistRole.id) {
            checkedRoles--;
            return;
          }
        });
      });

      if (checkedRoles !== 0) {
        return false;
      }

      return true;
    },
    checkIfUserHasFollowedTwitterAccount() {
      this.verifyingFollowedOnTwitter = true;
      setTimeout(() => {
        this.followedTwitter = true;
        this.verifyingFollowedOnTwitter = false;
      }, 1500);
    },
    enableVerifyAndEnterButton() {
      setTimeout(() => {
        this.disableVerifyAndEnter = false;
      }, 3000);
    },
    async sendUserDetailsToCreateWhitelistEntry() {
      try {
        const discordRoles: string[] = [];

        this.whitelist.discord_roles.map((role: any) => {
          discordRoles.push(role.name);
        });

        let whitelistData;

        if (
          !this.whitelist.discord_roles ||
          !this.whitelist.discord_server_id
        ) {
          const discordDetailsRes = await discordRequest.get("users/@me");
          this.discordDetails = discordDetailsRes.data;

          whitelistData = {
            wallet_address: this.$store.state.walletStore.wallet.walletAddress,
            discord: {
              username: `${this.discordDetails.username}#${this.discordDetails.discriminator}`,
              id: this.discordDetails.id,
              roles: discordRoles,
            },
            date: new Date().toISOString(),
            collection_id: this.whitelist.collection_id,
            mint_limit: 1,
          };
        } else {
          whitelistData = {
            wallet_address: this.$store.state.walletStore.wallet.walletAddress,
            discord: {
              username: `${this.discordDetails.username}#${this.discordDetails.discriminator}`,
              id: this.discordDetails.id,
              roles: discordRoles,
            },
            date: new Date().toISOString(),
            collection_id: this.whitelist.collection_id,
            mint_limit: 1,
          };
        }

        await createWhitelistEntry(whitelistData);

        this.showVerifyingDialog = false;

        this.$toast.showMessage({
          message: "Whitelist Request Sent Successfully",
        });
      } catch (error: any) {
        if (
          error.response.data.msg &&
          error.response.data.msg === "Duplicate entry."
        ) {
          this.$toast.showMessage({
            message: "You have Already Applied For this whitelist",
            error: true,
          });
        } else {
          this.$toast.showMessage({
            message: error,
            error: true,
          });
        }
        this.showVerifyingDialog = false;
      }
    },
    watchCookies() {
      const interval = setInterval(() => {
        const discord = Cookies.get("discord");
        if (discord) {
          this.discordStatus = true;
          clearInterval(interval);
        }
      }, 3000);
    },
    showNoOfSpotsProgress() {
      this.interval = setInterval(async () => {
        const spotsRes = await getWhitelistEntryById(
          this.whitelist.collection_id,
          1,
          1
        );

        this.resource.occupiedSpots = spotsRes.data.spotsCount;

        if (this.resource.occupiedSpots >= this.resource.totalSpots) {
          this.full = true;
        }

        this.resource.spotPercent = Math.floor(
          (this.resource.occupiedSpots / this.resource.totalSpots) * 100
        );

        const noOfSpotsPercent: any =
          document.querySelector("#noOfSpotsPercent");

        noOfSpotsPercent.style.width = this.resource.spotPercent + "%";
      }, 5000);
    },
  },
  computed: {
    getMintDate() {
      return moment(this.whitelist.whitelist_end).format("MMM DD, hh:mm A");
    },
    getWalletStatus() {
      return this.$store.state.walletStore.wallet.walletAddress ? true : false;
    },
    getUserStatus() {
      return this.$store.state.userStore.user.token ? true : false;
    },
    getDiscordConnected() {
      return this.$store.state.discordStore.discord.token
        ? this.$store.state.discordStore.discord.token
        : this.discordStatus;
    },
    getVerificationStatus() {
      const now = new Date();
      const whitelistStartDate = new Date(this.whitelist.whitelist_start);
      const whitelistEndDate = new Date(this.whitelist.whitelist_end);

      if (this.full) {
        return false;
      }

      if (
        !this.getWalletStatus ||
        !this.getUserStatus ||
        !this.getDiscordConnected ||
        !this.joinedDiscordServer
      ) {
        return false;
      }

      if (now < whitelistStartDate || now > whitelistEndDate) {
        return false;
      }
      return true;
    },
    getFulfilledConditionStatus() {
      if (!this.joinedDiscordServer || !this.promotedToRequiredRoles) {
        return false;
      }
      return true;
    },
    getWhitelistStatusText() {
      const whitelistStartDate = new Date(this.whitelist.whitelist_start);
      const whitelistEndDate = new Date(this.whitelist.whitelist_end);
      const now = new Date();

      if (whitelistEndDate < now) {
        return "Whitelist Ended";
      }

      if (whitelistStartDate > now) {
        return "Live In";
      }

      if (now < whitelistEndDate) {
        return "End In";
      }
    },
    getWhitelistTime() {
      const whitelistStartDate = new Date(this.whitelist.whitelist_start);
      const whitelistEndDate = new Date(this.whitelist.whitelist_end);
      const now = new Date();

      if (whitelistStartDate > now) {
        return whitelistStartDate.toString();
      }

      if (whitelistEndDate > now) {
        return whitelistEndDate.toString();
      }
    },
    getWhitelistEnded() {
      const whitelistEndDate = new Date(this.whitelist.whitelist_end);
      const now = new Date();

      if (now > whitelistEndDate) {
        return true;
      }
      return false;
    },
  },
  async mounted() {
    const res = await getWhitelistById(this.$route.params.id);

    this.whitelist = res.data.whitelist;

    const collectionRes = await getCollection(this.whitelist.collection_id);

    this.collection = collectionRes.collection[0];

    this.showEndInTimer = true;

    if (!this.whitelist.twitter) {
      this.followedTwitter = true;
    }

    if (!this.whitelist.discord_server_id) {
      this.joinedDiscordServer = true;
    }

    const spotsRes = await getWhitelistEntryById(
      this.whitelist.collection_id,
      1,
      1
    );

    this.resource.totalSpots = this.whitelist.whitelist_spots;

    this.resource.occupiedSpots = spotsRes.data.spotsCount;

    if (this.resource.occupiedSpots >= this.resource.totalSpots) {
      this.full = true;
    }

    this.resource.spotPercent = Math.floor(
      (this.resource.occupiedSpots / this.resource.totalSpots) * 100
    );

    this.loading = false;

    if (this.getDiscordStatus) {
      this.discordStatus = true;
    }

    setTimeout(() => {
      const noOfSpotsPercent: any = document.querySelector("#noOfSpotsPercent");

      noOfSpotsPercent.style.width = this.resource.spotPercent + "%";
      this.showNoOfSpotsProgress();
    }, 200);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
