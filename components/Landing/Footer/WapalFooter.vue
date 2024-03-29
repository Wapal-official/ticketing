<template>
  <footer
    class="tw-w-full tw-border-t tw-border-solid tw-border-t-dark-6 tw-pt-12"
  >
    <div
      class="tw-container tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-6 tw-px-8 tw-pb-4 md:tw-px-[3.75em] md:tw-grid-cols-3 md:tw-pb-32 lg:tw-grid-cols-7"
    >
      <div class="md:tw-col-span-1 lg:tw-col-span-4">
        <NuxtLink to="/">
          <img :src="logo" alt="logo" width="160px" height="64px" />
        </NuxtLink>
      </div>
      <div
        class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-6 md:tw-col-span-2 md:tw-grid-cols-3 lg:tw-col-span-3"
      >
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
        >
          <h3 class="tw-text-white tw-text-lg tw-pb-2 tw-font-medium">
            Resources
          </h3>
          <footer-link
            name="Blog"
            to="https://medium.com/wapal-studio"
            target="_blank"
            :external="true"
          />
          <footer-link
            name="Docs"
            to="https://docs.wapal.io/"
            target="_blank"
            :external="true"
          />
          <footer-link name="FAQs" to="/faq" />
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
        >
          <h3 class="tw-text-white tw-text-lg tw-pb-2 tw-font-medium">
            Company
          </h3>

          <footer-link name="Privacy Policy" to="/privacy-policy" />
          <footer-link name="Terms Of Service" to="/terms-of-service" />
        </div>
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
        >
          <h3 class="tw-text-white tw-text-lg tw-pb-2 tw-font-medium">
            Follow Us
          </h3>
          <div
            class="tw-flex tw-flex-row tw-items-start tw-justify-center tw-gap-4"
          >
            <!-- <a href="https://t.co/3KwwcoQ2xW" target="_blank"> -->
            <a href="https://discord.com/invite/vhQVSuqdKt" target="_blank">
              <i class="bx bxl-discord-alt tw-text-xl tw-text-dark-2"></i>
            </a>
            <a href="https://t.me/wapal_official" target="_blank">
              <i class="bx bxl-telegram tw-text-xl tw-text-dark-2"></i>
            </a>
            <a href="https://github.com/mokshyaprotocol" target="_blank">
              <i class="bx bxl-github tw-text-xl tw-text-dark-2"></i>
            </a>
            <a href="https://twitter.com/wapal_official" target="_blank">
              <i class="bx bxl-twitter tw-text-xl tw-text-dark-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="tw-w-full tw-border-t tw-border-solid tw-border-t-dark-6 tw-px-8 tw-py-2 tw-flex tw-flex-col tw-items-center tw-justify-center"
    >
      <div class="tw-text-sm tw-text-dark-2">
        &#169; Copyright {{ currentYear }} - Wapal
      </div>
    </div>
  </footer>
  <!-- <footer class="tw-w-full footer-shadow tw-bg-wapal-background">
    <div
      class="tw-w-full tw-mx-auto tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-3 tw-px-8 tw-py-8 lg:tw-w-4/5 lg:!tw-px-24"
    >
      <div
        class="tw-text-sm tw-font-normal tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      >
        <NuxtLink to="/">
          <img :src="logo" alt="logo" width="140px" height="55px" />
        </NuxtLink>
        <a
          href="https://t.co/3KwwcoQ2xW"
          target="_blank"
          class="tw-flex tw-flex-row- tw-items-center tw-justify-start tw-gap-1 tw-group"
        >
          <img :src="discord" alt="discord" class="tw-group" />
          <span
            class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear tw-group group-hover:!tw-text-wapal-pink"
            >Discord</span
          >
        </a>
        <a
          href="https://t.me/wapal_official"
          target="_blank"
          class="tw-flex tw-flex-row- tw-items-center tw-justify-start tw-gap-1 tw-group"
        >
          <img :src="telegram" alt="telegram" class="tw-group" />
          <span
            class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear tw-group group-hover:!tw-text-wapal-pink"
            >Telegram</span
          >
        </a>
        <a
          href="https://github.com/mokshyaprotocol"
          target="_blank"
          class="tw-flex tw-flex-row- tw-items-center tw-justify-start tw-gap-1 tw-group"
        >
          <img :src="github" alt="github" class="tw-group" />
          <span
            class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear tw-group group-hover:!tw-text-wapal-pink"
            >Github</span
          >
        </a>
        <a
          href="https://twitter.com/wapal_official"
          target="_blank"
          class="tw-flex tw-flex-row- tw-items-center tw-justify-start tw-gap-1 tw-group"
        >
          <img :src="twitter" alt="twitter" class="tw-group" />
          <span
            class="!tw-text-white tw-transition-all tw-duration-150 tw-ease-linear tw-group group-hover:!tw-text-wapal-pink"
            >Twitter</span
          >
        </a>
      </div>
      <div
        class="tw-text-sm tw-font-normal tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      >
        <h5 class="tw-text-base tw-font-medium md:tw-py-4">Resources</h5>
        <footer-link
          name="Blog"
          to="https://medium.com/wapal-studio"
          target="_blank"
          :external="true"
        />
        <footer-link
          name="Docs"
          to="https://docs.wapal.io/"
          target="_blank"
          :external="true"
        />
        <footer-link name="Faqs" to="/faq" />
      </div>
      <div
        class="tw-text-sm tw-font-normal tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      >
        <h5 class="tw-text-base tw-font-medium md:tw-py-4">Legal</h5>
        <footer-link name="Privacy Policy" to="/privacy-policy" />
        <footer-link name="Terms of Services" to="/terms-of-service" />
      </div>
    </div>

    <div class="footer-gradient-border tw-w-full">
      <div
        class="tw-w-full tw-bg-wapal-background tw-px-8 tw-py-2 tw-flex tw-flex-col tw-items-center tw-justify-center"
      >
        <div class="tw-text-xs">&#169; Copyright {{ currentYear }} - Wapal</div>
      </div>
    </div>
  </footer> -->
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";
import FooterLink from "@/components/Landing/Footer/FooterLink.vue";
import logo from "@/assets/img/logo/logo-white.svg";
import discord from "@/assets/img/footer/discord.svg";
import twitter from "@/assets/img/footer/twitter.svg";
import github from "@/assets/img/footer/github.svg";
import telegram from "@/assets/img/footer/telegram.svg";
export default {
  components: { FooterLink },
  data() {
    return { defaultTheme, logo, discord, twitter, github, telegram };
  },
  computed: {
    currentYear() {
      const date = new Date();
      return date.getFullYear();
    },
  },
  methods: {
    newsLetterSignup() {},
  },
};
</script>
