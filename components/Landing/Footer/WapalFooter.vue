<template>
  <footer class="tw-w-full footer-shadow tw-mt-12">
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
        <footer-link name="Blog" />
        <footer-link name="API" />
        <footer-link name="Docs" />
        <footer-link name="Faqs" to="/faq" />
        <footer-link name="Newsletter" />
      </div>
      <div
        class="tw-text-sm tw-font-normal tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      >
        <h5 class="tw-text-base tw-font-medium md:tw-py-4">Company</h5>

        <footer-link name="About Us" />
        <footer-link name="Privacy Policy" />
        <footer-link name="Terms of Services" />
      </div>
    </div>

    <div class="footer-gradient-border tw-w-full">
      <div
        class="tw-w-full tw-bg-wapal-background tw-px-8 tw-py-2 tw-flex tw-flex-col tw-items-center tw-justify-center"
      >
        <div class="tw-text-xs">&#169; Copyright {{ currentYear }} - Wapal</div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";
import FooterLink from "@/components/Landing/Footer/FooterLink.vue";
import logo from "@/assets/img/logo/logo-horizontal-white.png";
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
