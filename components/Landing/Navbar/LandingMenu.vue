<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-text-base tw-gap-4 lg:tw-flex-row lg:!tw-justify-end lg:tw-items-center"
  >
    <div class="tw-flex tw-w-full lg:tw-hidden">
      <v-list-group
        :ripple="false"
        id="explore-list-group"
        v-model="showExploreMenu"
        active-class="!tw-text-primary-1 "
        class="!tw-text-white tw-w-full"
      >
        <template
          v-slot:activator
          class="focus:before:!tw-opacity-0"
          @click="showExploreMenu = !showExploreMenu"
        >
          <span class="tw-w-full">Explore</span>
        </template>
        <explore-list-item
          name="All NFT"
          link="/latest-collection"
          @close="close"
        />
        <explore-list-item
          name="Live"
          link="/latest-collection"
          @close="close"
        />
        <explore-list-item
          name="Upcoming"
          link="/upcoming-collection"
          @close="close"
        />
        <!-- <explore-list-item
          name="Domain Name"
          link="/domain-name"
          :last="true"
          @close="close"
        /> -->
      </v-list-group>
    </div>
    <div
      v-if="ForXlScreenSize == true"
      @click="nftTransferAction()"
      class="tw-mr-3 lg:mr-0 d-flex align-center"
      style="cursor: pointer; min-width: 46px"
    >
    </div>

    <button-primary
      @click="checkWalletStatus"
      title="Create Event"
      :bordered="true"
    />
    <connect-wallet @close="close" class="tw-mt-8 lg:tw-mt-0" />
    <v-dialog
      v-model="showConnectWalletModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <connect-wallet-modal
        message="Please Connect your wallet to Launch"
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
  </div>
</template>
<script lang="ts">
import MenuItem from "@/components/Landing/Navbar/MenuItem.vue";
import ConnectWallet from "@/components/Reusable/ConnectWallet.vue";
import ExploreListItem from "@/components/Landing/Navbar/ExploreListItem.vue";
import ConnectWalletModal from "@/components/ConnectWallet/ConnectWalletModal.vue";
import SignupModal from "@/components/Signup/SignupModal.vue";
export default {
  components: {
    MenuItem,
    ConnectWallet,
    ExploreListItem,
    ConnectWalletModal,
    SignupModal,
  },
  data() {
    return {
      showExploreMenu: false,
      showConnectWalletModal: false,
      showSignupDialog: false,
      MARKETPLACE_URL: process.env.MARKETPLACE_URL,
      ForXlScreenSize: false,
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      const screenWidth = window.innerWidth;
      this.ForXlScreenSize = screenWidth >= 1920;
    },
    async nftTransferAction() {
      if (!this.getWalletStatus) {
        this.showConnectWalletModal = true;
      } else {
        this.$store.commit("dialog/setNftTransferDialog", true);
      }
    },
    close() {
      this.showExploreMenu = false;
      this.$emit("close");
    },
    checkWalletStatus() {
      if (this.getWalletStatus && this.getUserStatus) {
        this.$emit("close");
        this.$router.push("/dashboard/edition");
      } else if (!this.getWalletStatus) {
        this.showConnectWalletModal = true;
      } else {
        this.showSignupDialog = true;
      }
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet} Wallet Connected Successfully`,
      });

      this.showSignupDialog = true;
    },
  },
  computed: {
    getWalletStatus() {
      if (this.$store.state.walletStore.wallet.wallet) {
        return true;
      }
      return false;
    },
    getUserStatus() {
      if (this.$store.state.userStore.user.token) {
        return true;
      }
      return false;
    },
  },
};
</script>
