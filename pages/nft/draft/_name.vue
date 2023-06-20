<template>
  <div>
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
            <count-down
              :shadow="true"
              :startTime="this.collection.public_sale_time"
            />
          </div>
          <span
            class="tw-text-3xl tw-flex tw-flex-row tw-items-center tw-justify-center tw-tracking-widest"
            v-else
            >Live In TBD</span
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
        <div class="tw-w-full tw-flex tw-flex-col tw-gap-2">
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-text-white"
          >
            <span class="tw-capitalize tw-text-sm">Whitelist Sale</span>
            <span class="tw-capitalize tw-text-sm"
              >0%
              <span class="tw-text-[#ACACAC]"
                >0 out of
                {{ collection.supply ? collection.supply : "TBD" }}</span
              ></span
            >
          </div>
          <div
            class="tw-w-full tw-rounded-full tw-relative tw-bg-[#263D68] tw-h-[10px]"
          >
            <div
              class="tw-absolute tw-h-[10px] tw-top-0 tw-bg-[#E500A4] tw-rounded-full tw-transition-all tw-duration-200 tw-ease-linear"
            ></div>
          </div>
        </div>

        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-2 tw-bg-[#0C224B] tw-text-white tw-px-6 tw-py-4 tw-w-full tw-rounded md:tw-flex-row"
          v-if="showWhitelistSaleTimer"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-0 md:tw-gap-4"
          >
            <div class="tw-capitalize">Whitelist Sale</div>
            <div v-if="collection.whitelist_price">
              <div class="tw-capitalize" v-if="collection.whitelist_price != 0">
                price {{ collection.whitelist_price }} apt
              </div>
              <div class="tw-capitalize" v-else>Free Mint</div>
            </div>
            <div v-else>Price TBD</div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start"
          >
            Starts In
            <count-down
              class="tw-pl-2"
              :startTime="collection.whitelist_sale_time"
              @countdownComplete="whitelistCountdownComplete"
              v-if="collection.whitelist_sale_time"
            />
            <div v-else class="tw-pl-2 tw-text-wapal-pink">TBD</div>
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
            <div v-if="collection.public_sale_price">
              <div
                class="tw-capitalize"
                v-if="collection.public_sale_price != 0"
              >
                price {{ collection.public_sale_price }} apt
              </div>
              <div class="tw-capitalize" v-else>Free Mint</div>
            </div>
            <div v-else>Price TBD</div>
          </div>
          <div
            class="tw-text-lg tw-flex tw-flex-row tw-items-center tw-justify-start"
          >
            Starts In
            <count-down
              class="tw-pl-2"
              :startTime="collection.public_sale_time"
              v-if="collection.public_sale_time"
            />
            <div v-else class="tw-pl-2 tw-text-wapal-pink">TBD</div>
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
  </div>
</template>
<script>
import { getCollection, getDraftById } from "@/services/CollectionService";
import CountDown from "@/components/Reusable/CountDown.vue";
import Loading from "@/components/Reusable/Loading.vue";

export default {
  async asyncData({ params }) {
    const name = params.name;
    let collection;
    try {
      const res = await getDraftById(name);
      collection = res.data.draft.data;

      if (collection) {
        return { collection };
      } else {
        throw new Error("Collection Not Found by Username");
      }
    } catch {}
  },
  head() {
    return {
      title: this.getTitle,
      meta: [
        { hid: "twitter:title", name: "twitter:title", content: this.getTitle },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:title", name: "twitter:title", content: this.getTitle },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.collection.image,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.collection.description,
        },
        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-image",
          property: "og:image",
          content: this.collection.image,
        },
        { hid: "og:title", property: "og:title", content: this.getTitle },

        {
          hid: "description",
          name: "description",
          content: this.collection.description,
        },
      ],
    };
  },
  components: { CountDown, Loading },
  data() {
    return {
      loading: true,
      whitelistSaleDate: null,
      publicSaleDate: null,
      showWhitelistSaleTimer: true,
      showPublicSaleTimer: true,
    };
  },
  methods: {},
  computed: {
    showLiveInTimer() {
      if (
        this.collection.whitelist_sale_time &&
        this.collection.public_sale_time
      ) {
        return true;
      }

      return false;
    },
    getTitle() {
      return this.collection.name ? "Wapal - " + this.collection.name : "Title";
    },
  },
  async mounted() {
    this.loading = false;
  },
};
</script>
