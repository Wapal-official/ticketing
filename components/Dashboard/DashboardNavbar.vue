<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full">
    <nav
      class="tw-flex tw-flex-row tw-container tw-mx-auto tw-items-center tw-justify-between tw-gap-8 tw-text-white tw-w-full tw-px-6 tw-py-4"
    >
      <NuxtLink to="/">
        <img
          :src="logo"
          alt="logo"
          class="tw-min-w-[106px] tw-max-w-[106px] tw-min-h-[28px] tw-max-h-[28px]"
        />
      </NuxtLink>
      <div class="tw-hidden lg:tw-flex">
        <connect-wallet />
      </div>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4 lg:tw-hidden"
      >
        <button @click="toggleSidebar" class="tw-flex">
          <v-icon class="!tw-text-wapal-gray" v-if="!sidebarIsShowing">mdi-menu</v-icon>
          <v-icon class="!tw-text-wapal-gray" v-else>mdi-close</v-icon>
        </button>
      </div>
    </nav>
    <v-dialog
      v-model="showWhitelistSetup"
      persistent
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[40%]"
    >
      <div
        class="!tw-bg-dark-9"
        style="border: 1px solid #25262b; border-radius: 8px"
      >
        <p
          class="tw-text-center tw-uppercase tw-py-3 tw-px-5 !tw-mb-0"
          style="font-size: 14px"
        >
          REMINDER: Set whitelist an hour before minting!
        </p>
        <v-divider></v-divider>
        <div class="tw-py-3 tw-px-5 tw-relative">
          <div class="icon-holder" v-if="!isSliderPlayed" @click="playSlider()">
            <img
              class="tw-mx-auto"
              src="~/assets/img/dialogs/bx-play-circle.svg"
              alt="playicon"
              
            />
          </div>
          <div class="swiper mySwiper" ref="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <p class="tw-text-center tw-text-dark-1">
                  Step 1: Select Collection
                </p>
                <img
                  class="tw-mx-auto"
                  src="~/assets/img/dialogs/step1.jpg"
                  alt="step1"
                  style="width: 100%; max-width: 600px"
                />
              </div>
              <div class="swiper-slide">
                <p class="tw-text-center tw-text-dark-1">
                  Step 2: Confirm Collection
                </p>
                <img
                  class="tw-mx-auto"
                  src="~/assets/img/dialogs/step2.jpg"
                  alt="step2"
                  style="width: 100%; max-width: 600px"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="tw-flex tw-px-5 tw-pt-3 tw-pb-5 tw-mt-3 tw-gap-3 tw-justify-between tw-items-center"
        >
          <button-primary
            :fullWidth="true"
            title="Don’t show this again"
            :bordered="true"
            @click="dontShowAgain"
          ></button-primary>
          <button-primary
            title="Remind me later"
            :fullWidth="true"
            @click="remindMeLater"
          ></button-primary>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";
import logo from "@/assets/img/logo/wapal-ticket.svg";
import ConnectWallet from "@/components/Reusable/ConnectWallet.vue";
export default {
  components: { ConnectWallet },
  props: {
    closeIcon: {
      type: Boolean,
    },
  },
  data() {
    return {
      sidebarIsShowing: false,
      logo,
      showWhitelistSetup: false,
      isSliderPlayed: false,
    };
  },
  computed: {
    getWhitelistSetup() {
      return this.$store.state.general.whitelistSetup;
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggleSidebar", this.sidebarIsShowing);
      this.sidebarIsShowing = !this.sidebarIsShowing;
    },
    dontShowAgain() {
      localStorage.setItem("showWhitelistSetup", "false");
      this.showWhitelistSetup = false;
    },
    remindMeLater() {
      const remindTime = new Date().getTime() + 30 * 60 * 1000;
      localStorage.setItem("remindWhitelistSetup", remindTime.toString());
      this.showWhitelistSetup = false;
    },
    checkWhitelistPopup() {
      const showWhitelistSetup = localStorage.getItem("showWhitelistSetup");
      if (showWhitelistSetup === "false" || !this.getWhitelistSetup) {
        this.showWhitelistSetup = false;
        return;
      }

      const remindTime = localStorage.getItem("remindWhitelistSetup");
      if (remindTime) {
        const currentTime = new Date().getTime();
        if (currentTime < parseInt(remindTime)) {
          this.showWhitelistSetup = false;
          return;
        }
      }

      this.showWhitelistSetup = true;
    },
    async playSlider() {
      this.isSliderPlayed = true;
      await this.$nextTick();
      new Swiper(this.$refs.swiper, {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        loop: true,
        grabCursor: true,
      });
    },
    startReminderCheck() {
      setInterval(() => {
        const remindTime = localStorage.getItem("remindWhitelistSetup");
        if (remindTime) {
          const currentTime = new Date().getTime();
          if (currentTime >= parseInt(remindTime)) {
            this.showWhitelistSetup = true;
            localStorage.removeItem("remindWhitelistSetup");
          }
        }
      }, 60000); 
    },
  },
  mounted() {
    this.checkWhitelistPopup();
    this.startReminderCheck();
  },
  watch: {
    closeIcon(closeIcon: Boolean) {
      this.sidebarIsShowing = closeIcon;
    },
    getWhitelistSetup() {
      this.checkWhitelistPopup();
    },
  },
};
</script>
<style lang="css">
.icon-holder {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; 
  background: #00000073;
  z-index: 2;
  display: flex;
  align-items: center; 
  cursor: pointer;
}
</style>