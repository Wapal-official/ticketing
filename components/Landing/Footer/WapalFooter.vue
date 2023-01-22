<template>
  <footer class="w-full footer-shadow mt-12">
    <div
      class="w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-8 py-8 lg:!px-24"
    >
      <div
        class="text-sm font-normal flex flex-col items-start justify-start gap-4"
      >
        <h5 class="text-base font-medium pb-8">Marketplace</h5>
        <footer-link name="All NFTs" />
        <footer-link name="Domain Names" />
        <footer-link name="Virtual World" />
        <footer-link name="Collectibles" />
      </div>
      <div
        class="text-sm font-normal flex flex-col items-start justify-start gap-4"
      >
        <h5 class="text-base font-medium pb-8">Resources</h5>
        <footer-link name="Help Center" />
        <footer-link name="Partners" />
        <footer-link name="Suggestions" />
        <footer-link name="Discord" />
        <footer-link name="Docs" />
        <footer-link name="Newsletter" />
      </div>
      <div
        class="text-sm font-normal flex flex-col items-start justify-start gap-4"
      >
        <h5 class="text-base font-medium pb-8">Community</h5>
        <footer-link name="Community" />
        <footer-link name="Documentation" />
        <footer-link name="Brand Access" />
        <footer-link name="Blog" />
        <footer-link name="Forum" />
        <footer-link name="Mailing List" />
      </div>
      <div
        class="text-sm font-normal flex flex-col items-start justify-start gap-4"
      >
        <h5 class="text-base font-medium pb-8">Newsletter</h5>
        <p>Signup for our newsletter to get the latest news in your inbox.</p>
        <v-text-field
          label="Enter your email"
          color="#fff"
          class="w-full"
          single-line
          prepend-inner-icon="mdi-email"
          append-icon="mdi-arrow-right"
        >
        </v-text-field>
        <p>Your email is safe with us. We don't spam.</p>
      </div>
    </div>
    <div class="footer-gradient-border w-full">
      <div
        class="w-full bg-wapal-background px-8 py-2 flex flex-col items-center gap-4 md:flex-row md:justify-between lg:!px-24"
      >
        <div class="text-xs">&#169; Copyright {{ currentYear }} - Wapal</div>
        <div class="flex flex-row items-center gap-4 justify-start">
          <a href="https://twitter.com/wapal_official" target="_blank">
            <div
              class="relative footer-icon-container rounded-full flex flex-col items-center justify-center"
            >
              <div
                class="w-full h-full flex flex-col items-center justify-center bg-wapal-background z-20 rounded-full"
              >
                <v-icon class="!text-white !text-xl">mdi-twitter</v-icon>
              </div>
              <div
                class="absolute z-10 w-full h-full footer-icon-border top-0 left-0"
              ></div>
            </div>
          </a>
          <a href="https://t.co/3KwwcoQ2xW" target="_blank">
            <div
              class="relative footer-icon-container rounded-full flex flex-col items-center justify-center"
            >
              <div
                class="w-full h-full flex flex-col items-center justify-center bg-wapal-background z-20 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 16 16"
                  fill="#fff"
                >
                  <path
                    d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
                  ></path>
                </svg>
              </div>
              <div
                class="absolute z-10 w-full h-full footer-icon-border top-0 left-0"
              ></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";
import FooterLink from "@/components/Landing/Footer/FooterLink.vue";
export default {
  components: { FooterLink },
  data() {
    return { defaultTheme };
  },
  computed: {
    currentYear() {
      const date = new Date();
      return date.getFullYear();
    },
  },
};
</script>
