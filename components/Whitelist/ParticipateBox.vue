<template>
  <div
    class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-pt-[5.5em] lg:tw-pb-[7.5em] xl:!tw-max-w-[1100px]"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
    >
      <h2 class="tw-font-semibold tw-text-[1.375em]">How to participate:</h2>
      <div
        class="tw-w-full tw-px-4 tw-py-3 tw-bg-dark-7 tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded"
      >
        <div class="tw-text-medium">Connect Wallet</div>
        <div>
          <button-primary
            title="Connect Wallet"
            :dark="true"
            @click="showConnectWalletModal = true"
            v-if="!getWalletStatus"
          />
          <i
            class="bx bxs-check-circle !tw-text-primary-1 tw-py-2.5 tw-text-2xl"
            v-else
          ></i>
        </div>
      </div>
      <div
        class="tw-w-full tw-px-4 tw-py-3 tw-bg-dark-7 tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded"
      >
        <div class="tw-text-medium">Login to your Wapal Account</div>
        <div>
          <button-primary
            title="Login"
            :dark="true"
            @click="showSignupDialog = true"
            v-if="!getUserStatus"
          />
          <i
            class="bx bxs-check-circle !tw-text-primary-1 tw-py-2.5 tw-text-2xl"
            v-else
          ></i>
        </div>
      </div>
      <div
        class="tw-w-full tw-px-4 tw-py-3 tw-bg-dark-7 tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded"
      >
        <div class="tw-text-medium">Connect Discord</div>
        <div>
          <button-primary
            title="Connect Discord"
            :dark="true"
            @click="connectDiscord"
            v-if="!getDiscordConnected"
          />
          <i
            class="bx bxs-check-circle !tw-text-primary-1 tw-py-2.5 tw-text-2xl"
            v-else
          ></i>
        </div>
      </div>
      <div
        class="tw-w-full tw-px-4 tw-py-3 tw-bg-dark-7 tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded"
        v-if="whitelist?.discord_server_id"
      >
        <div class="tw-text-medium">
          Join
          <a
            :href="whitelist?.discord_server_url"
            target="_blank"
            class="!tw-text-white hover:!tw-text-primary-1"
            @click.stop=""
            >{{ whitelist?.discord_server_name }}</a
          >
          Discord Server
        </div>
        <div>
          <div
            class="tw-flex tw-flex-row tw-items-start tw-justify-center tw-gap-4"
            v-if="!joinedDiscordServer"
          >
            <button-primary
              title="Join"
              :dark="true"
              @click="showDiscordPopup"
            />
            <button-primary
              title="Verify"
              :dark="true"
              @click="checkIfUserHasJoinedDiscordServer(false)"
              :loading="verifyingJoinedDiscordServer"
              :disabled="verifyingJoinedDiscordServer"
            />
          </div>
          <i
            class="bx bxs-check-circle !tw-text-primary-1 tw-py-2.5 tw-text-2xl"
            v-else
          ></i>
        </div>
      </div>
      <div
        class="tw-w-full tw-px-4 tw-py-3 tw-bg-dark-7 tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-rounded"
        v-if="whitelist?.twitter"
      >
        <div class="tw-text-medium">
          Follow
          <a
            :href="whitelist?.twitter"
            target="_blank"
            class="!tw-text-white hover:!tw-text-primary-1"
            @click.stop=""
            >{{ whitelist?.twitter }}</a
          >
          on Twitter
        </div>
        <div>
          <div
            class="tw-flex tw-flex-row tw-items-start tw-justify-center tw-gap-4"
            v-if="!followedTwitter"
          >
            <button-primary
              title="Join"
              :dark="true"
              @click="showTwitterPopupWindow"
            />
            <button-primary
              title="Verify"
              :dark="true"
              @click="followedTwitter = true"
            />
          </div>
          <i
            class="bx bxs-check-circle !tw-text-primary-1 tw-py-2.5 tw-text-2xl"
            v-else
          ></i>
        </div>
      </div>
    </div>
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-pt-6"
    >
      <button-primary
        title="Verify and Enter"
        @click="checkUserForVerification"
        :disabled="!getVerificationStatus"
      />
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
        <reusable-loading v-if="!error.discord.error && !error.twitter.error" />
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-center md:tw-justify-between"
          v-if="
            whitelist?.discord_server_name &&
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
import { discordRequest } from "@/services/DiscordInterceptor";
import Cookies from "js-cookie";
import { createWhitelistEntry } from "@/services/WhitelistService";

export default {
  props: { whitelist: { type: Object } },
  data() {
    return {
      showConnectWalletModal: false,
      showSignupDialog: false,
      showVerifyingDialog: false,
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
      joinedDiscordServer: false,
      followedTwitter: false,
      interval: null,
      discordStatus: false,
      verifyingJoinedDiscordServer: false,
    };
  },
  methods: {
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet.wallet} Wallet Connected Successfully`,
      });
    },
    async checkIfUserHasJoinedDiscordServer(isMounted: boolean) {
      try {
        this.verifyingJoinedDiscordServer = true;
        this.discordRes = await discordRequest.get(
          `users/@me/guilds/${this.whitelist.discord_server_id}/member`
        );

        this.discordDetails = this.discordRes.data.user;
        this.verifyingJoinedDiscordServer = false;
        this.joinedDiscordServer = true;
      } catch (error: any) {
        if (!isMounted) {
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
        }
        this.verifyingJoinedDiscordServer = false;
      }
    },
    showDiscordPopup() {
      const windowWidth = 500;
      const windowHeight = 600;

      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const windowLeft = (screenWidth - windowWidth) / 2;
      const windowTop = (screenHeight - windowHeight) / 2;

      const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;

      window.open(
        `${this.whitelist.discord_server_url}`,
        "discord",
        windowFeatures
      );
    },
    showTwitterPopupWindow() {
      const windowWidth = 500;
      const windowHeight = 600;

      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const windowLeft = (screenWidth - windowWidth) / 2;
      const windowTop = (screenHeight - windowHeight) / 2;

      const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;

      window.open(
        `https://twitter.com/${this.whitelist.twitter}`,
        "twitter",
        windowFeatures
      );
    },

    async connectDiscord() {
      try {
        const discordOptions = this.$auth.strategies.discord.options;

        const scopes = encodeURIComponent(discordOptions.scope.join(" "));

        const discordConnectionURL = `${discordOptions.endpoints.authorization}?client_id=${discordOptions.clientId}&redirect_uri=${discordOptions.redirectUri}&response_type=code&scope=${scopes}`;

        const windowWidth = 500;
        const windowHeight = 600;

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        const windowLeft = (screenWidth - windowWidth) / 2;
        const windowTop = (screenHeight - windowHeight) / 2;

        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;

        window.open(discordConnectionURL, "discord", windowFeatures);

        this.watchCookies();
      } catch (error) {
        console.log(error);
      }
    },
    watchCookies() {
      const interval = setInterval(() => {
        const discord = JSON.parse(
          localStorage.getItem("discord") ?? JSON.stringify({ token: "" })
        );
        if (discord.token) {
          this.discordStatus = true;
          clearInterval(interval);
        }
      }, 3000);
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

      if (checkedRoles === this.whitelist.discord_roles.length) {
        return false;
      }

      return true;
    },
    async checkIfUserHasFulfilledDiscordCondition() {
      try {
        const roles = this.discordRes.data.roles;
        const promoted = this.checkDiscordRoles(roles);

        if (promoted) {
          this.promotedToRequiredRoles = true;
          this.verifyingPromotedToDiscordRoles = false;
        } else {
          this.discordRes = await discordRequest.get(
            `users/@me/guilds/${this.whitelist.discord_server_id}/member`
          );

          const roles = this.discordRes.data.roles;
          const newPromoted = this.checkDiscordRoles(roles);

          if (newPromoted) {
            this.promotedToRequiredRoles = true;
          } else {
            this.error.discord.error = true;
            this.error.discord.type = "not promoted";
            this.$toast.showMessage({
              message: "Please get promoted to required roles",
              error: true,
            });

            return false;
          }
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
    async sendUserDetailsToCreateWhitelistEntry() {
      try {
        const discordRoles: string[] = [];

        this.whitelist.discord_roles.map((role: any) => {
          discordRoles.push(role.name);
        });

        let whitelistData: any;

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

        try {
          const sendWhitelistRequests = await Promise.all(
            this.discordRes.data.roles.map(async (userRole: any) => {
              try {
                const roles: string[] = [];
                const res = await Promise.all(
                  this.whitelist.discord_roles.map(
                    async (whitelistRole: any) => {
                      try {
                        if (userRole == whitelistRole.id) {
                          roles.push(whitelistRole.name);

                          whitelistData.discord.roles = roles;
                          whitelistData.phase = whitelistRole.phase;

                          await createWhitelistEntry(whitelistData);
                        }
                      } catch (error: any) {
                        throw error;
                      }
                    }
                  )
                );
              } catch (error: any) {
                throw error;
              }
            })
          );
        } catch (error: any) {
          throw error;
        }

        this.showVerifyingDialog = false;

        this.$toast.showMessage({
          message: "Whitelist Request Sent Successfully",
        });
      } catch (error: any) {
        console.log(error);
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
    getDiscordStatus() {
      const discord = JSON.parse(
        localStorage.getItem("discord") ?? JSON.stringify({ token: "" })
      );

      if (discord.token) {
        const date = Date.now();

        const expireDate = new Date(discord.expiresIn).getTime();

        if (date > expireDate) {
          localStorage.removeItem("discord");
          this.$store.dispatch("discordStore/setDiscordToken", "");
          return;
        }

        this.discordStatus = true;
      }
    },
  },
  computed: {
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
  },
  async mounted() {
    if (process.client) {
      if (!this.whitelist.twitter) {
        this.followedTwitter = true;
      }

      if (!this.whitelist.discord_server_id) {
        this.joinedDiscordServer = true;
      }

      this.getDiscordStatus();

      await this.checkIfUserHasJoinedDiscordServer(true);

      if (this.joinedDiscordServer) {
        this.showDiscordOptions = false;
      }
    }
  },
};
</script>
