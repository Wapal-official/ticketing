<template>
  <div
    class="tw-min-h-[62px] md:tw-min-h-[73px] tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-bg-dark-9 tw-py-4 tw-border-b tw-border-dark-6 tw-container tw-mx-auto"
  >
    <nav
      class="tw-w-full tw-grid tw-grid-cols-12 tw-px-6 tw-max-h-[40px] lg:tw-gap-0 1xl:tw-px-[3.75em]"
    >
      <div
        v-if="ForMdScreenSize == false"
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-8 tw-col-span-3 lg:tw-col-span-3 xl:tw-col-span-4"
      >
        <NuxtLink to="/" class="">
          <img
            :src="logo"
            alt="logo"
            class="tw-min-w-[106px] tw-max-w-[106px] tw-min-h-[28px] tw-max-h-[28px]"
          />
        </NuxtLink>
        <div class="tw-hidden lg:tw-flex">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <NuxtLink
                  to="/latest-collection"
                  class="!tw-text-[#A6A7AB] tw-transition tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-center tw-gap-0.5 tw-justify-start hover:!tw-text-primary-1"
                >
                  <span>Explore</span>
                  <i class="bx bx-chevron-down !tw-text-[#A6A7AB]"></i>
                </NuxtLink>
              </div>
            </template>
            <v-list class="tw-bg-dark-7 !tw-min-w-[240px]">
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
              <explore-list-item
                name="Domain Name"
                link="/domain-name"
                :last="true"
                @close="close"
              />
            </v-list>
          </v-menu>
        </div>

        <!-- <div
          class="tw-hidden sm:tw-flex"
          @click="$store.commit('dialog/setWhatsNew', true)"
          style="cursor: pointer; min-width: 40px !important"
        >
          <img src="~/assets/img/star.svg" alt="new feature start" />
        </div> -->
      </div>

      <div
        v-else
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3 tw-col-span-4 lg:tw-col-span-3 xl:tw-col-span-4"
      >
        <NuxtLink to="/" class="">
          <img
            :src="logo"
            alt="logo"
            class="tw-min-w-[106px] tw-max-w-[106px] tw-min-h-[28px] tw-max-h-[28px]"
          />
        </NuxtLink>
        <div class="tw-hidden lg:tw-flex">
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <NuxtLink
                  to="/latest-collection"
                  class="!tw-text-[#A6A7AB] tw-transition tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-center tw-gap-0.5 tw-justify-start hover:!tw-text-primary-1"
                >
                  <span>Explore</span>
                  <i class="bx bx-chevron-down !tw-text-[#A6A7AB]"></i>
                </NuxtLink>
              </div>
            </template>
            <v-list class="tw-bg-dark-7 !tw-min-w-[240px]">
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
              <explore-list-item
                name="Domain Name"
                link="/domain-name"
                :last="true"
                @close="close"
              />
            </v-list>
          </v-menu>
        </div>

        <!-- <div
          class="tw-hidden sm:tw-flex"
          @click="$store.commit('dialog/setWhatsNew', true)"
          style="cursor: pointer; min-width: 40px !important"
        >
          <img src="~/assets/img/star.svg" alt="new feature start" />
        </div> -->
      </div>

      <div
        v-if="ForMdScreenSize == true"
        class="tw-hidden md:tw-flex tw-pr-6 tw-w-full tw-col-span-3"
      >
        <search-bar />
      </div>
      <div
        v-else
        class="tw-hidden md:tw-flex tw-w-full tw-pr-0 lg:tw-pr-10 tw-col-span-4"
      >
        <search-bar />
      </div>
      <div
        v-if="ForMdScreenSize == true"
        class="tw-w-full tw-hidden tw-col-span-4 lg:tw-flex lg:tw-col-span-6 xl:tw-col-span-4"
      >
        <div
          @click="nftTransferAction()"
          class="tw-mr-3 lg:mr-0 d-flex align-center"
          style="cursor: pointer; min-width: 46px"
        >
          <img src="~/assets/img/transfer.svg" alt="nft transfer" />
          <p
            class="transfer-text"
            style="margin-left: 4px !important; margin-bottom: 0 !important"
          >
            Nft
          </p>
        </div>
        <landing-menu />
      </div>
      <div
        v-else
        class="tw-w-full tw-hidden tw-col-span-4 lg:tw-flex lg:tw-col-span-5 xl:tw-col-span-4"
      >
        <div
          @click="nftTransferAction()"
          class="tw-mr-3 lg:mr-0 d-flex align-center"
          style="cursor: pointer; min-width: 46px"
        >
          <img src="~/assets/img/transfer.svg" alt="nft transfer" />
          <p
            class="transfer-text"
            style="margin-left: 4px !important; margin-bottom: 0 !important"
          >
            Nft
          </p>
        </div>
        <landing-menu />
      </div>
      <div
        class="tw-w-full tw-absolute tw-transition-all tw-duration-300 tw-ease-linear tw-z-50 tw-left-0 tw-top-0"
        :class="searchBarClass"
      >
        <search-bar @closeSearchBar="closeSearchBar" />
      </div>
      <div
        class="tw-hidden tw-col-span-5 tw-w-full tw-flex-row tw-items-center tw-justify-end md:tw-flex lg:tw-hidden tw-gap-4"
      >
        <div
          @click="nftTransferAction()"
          class="tw-mr-2 lg:mr-3 tw-align-center tw-flex"
          style="cursor: pointer"
        >
          <img src="~/assets/img/transfer.svg" alt="nft transfer" />
          <p
            class="transfer-text"
            style="margin-left: 4px !important; margin-bottom: 0 !important"
          >
            Nft
          </p>
        </div>
        <button @click="toggleLandingMenu">
          <i
            class="bx bx-menu !tw-text-wapal-gray tw-text-2xl"
            v-if="!landingMenuShowing"
          ></i>
          <i class="bx bx-x !tw-text-wapal-gray tw-text-2xl" v-else></i>
        </button>
      </div>

      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-3 tw-col-span-9 md:tw-hidden"
      >
        <!-- <div
          class="tw-flex sm:tw-hidden"
          @click="$store.commit('dialog/setWhatsNew', true)"
          style="cursor: pointer; min-width: 30px !important"
        >
          <img src="~/assets/img/star.svg" alt="new feature start" />
        </div> -->
        <div
          @click="nftTransferAction()"
          class="mr-2 mr-lg-3 d-flex align-center"
          style="cursor: pointer"
        >
          <img src="~/assets/img/transfer.svg" alt="nft transfer" />
          <p
            class="transfer-text"
            style="margin-left: 4px !important; margin-bottom: 0 !important"
          >
            Nft
          </p>
        </div>
        <button @click="displaySearchBar" class="tw-flex md:tw-hidden">
          <i class="bx bx-search !tw-text-wapal-gray tw-text-2xl"></i>
        </button>

        <button @click="toggleLandingMenu" class="tw-flex lg:tw-hidden">
          <i
            class="bx bx-menu !tw-text-wapal-gray tw-text-2xl"
            v-if="!landingMenuShowing"
          ></i>
          <i class="bx bx-x !tw-text-wapal-gray tw-text-2xl" v-else></i>
        </button>
      </div>
    </nav>
    <div
      class="tw-overflow-auto tw-px-4 tw-transition-all tw-duration-500 tw-ease-linear tw-bg-wapal-background tw-text-white tw-absolute tw-z-40 tw-top-[95px] tw-left-0 tw-w-screen tw-transform lg:tw-hidden mobile-menu"
      :class="landingMenuClass"
    >
      <landing-menu class="tw-py-4" @close="close" />
    </div>
    <whats-new />
    <nft-transfer />
    <v-dialog
      v-model="showConnectWalletModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <connect-wallet-modal
        @closeModal="showConnectWalletModal = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import logo from "@/assets/img/logo/logo.svg";
import LandingMenu from "@/components/Landing/Navbar/LandingMenu.vue";
import SearchBar from "@/components/Landing/Navbar/SearchBar.vue";
import ExploreListItem from "@/components/Landing/Navbar/ExploreListItem.vue";
import WhatsNew from "@/components/Landing/WhatsNew/WhatsNew.vue";
import NftTransfer from "@/components/Landing/NftTransfer/nftTransfer.vue";
export default {
  name: "Navbar",
  components: {
    LandingMenu,
    SearchBar,
    ExploreListItem,
    WhatsNew,
    NftTransfer,
  },
  data() {
    return {
      landingMenuClass: "tw-translate-x-full",
      landingMenuShowing: false,
      searchBarShowing: false,
      searchBarClass: "tw--translate-y-full",
      logo,
      ForMdScreenSize: false,
      showConnectWalletModal: false,
    };
  },
  computed: {
    getWalletStatus() {
      return this.$store.state.walletStore.wallet.walletAddress ? true : false;
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    async nftTransferAction() {
      if (!this.getWalletStatus) {
        this.showConnectWalletModal = true;
      } else {
        this.$store.commit("dialog/setNftTransferDialog", true);
      }
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet.wallet} Wallet Connected Successfully`,
      });
    },
    checkScreenSize() {
      const screenWidth = window.innerWidth;
      this.ForMdScreenSize = screenWidth >= 1020 && screenWidth <= 1370;
    },
    toggleLandingMenu() {
      if (!this.landingMenuShowing) {
        this.landingMenuClass = "tw-flex tw-translate-x-full";
        setTimeout(() => {
          this.landingMenuClass = "tw-translate-x-0";
        }, 100);
      } else {
        this.landingMenuClass = "tw-translate-x-full";
      }
      this.landingMenuShowing = !this.landingMenuShowing;
      this.$emit("landingMenuToggled", this.landingMenuShowing);
    },
    close() {
      this.landingMenuClass = "tw-translate-x-full";
      this.landingMenuShowing = false;
      this.$emit("landingMenuToggled", this.landingMenuShowing);
      setTimeout(() => {
        this.landingMenuClass = "tw-hidden";
      }, 200);
    },
    displaySearchBar() {
      this.searchBarClass = "tw-translate-y-0";
    },
    closeSearchBar() {
      this.searchBarClass = "tw--translate-y-full";
    },
  },
};
</script>
<style scoped>
.mobile-menu {
  height: calc(100vh - 95px);
}
.transfer-text {
  color: #8759ff;
}
::v-deep .v-list-item {
  padding: 0rem 0.375rem !important;
}
</style>
