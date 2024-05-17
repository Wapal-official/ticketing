<template>
  <div
    class="tw-w-full tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 lg:tw-mx-0 lg:tw-pt-4 lg:tw-pb-24"
    v-if="!loading"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center xl:tw-flex-row xl:tw-items-start xl:tw-justify-start xl:tw-gap-[3em]"
    >
      <img
        :src="token.meta.image"
        :alt="token.meta.name"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[550px] md:tw-h-[550px] md:tw-max-h-[550px] lg:tw-w-[450px] lg:tw-min-w-[450px] lg:tw-h-[450px] xl:tw-w-[550px] xl:tw-h-[550px] xl:tw-max-h-[550px] tw-object-cover tw-rounded-xl"
        :onerror="imageNotFound()"
      />
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-flex-grow"
      >
        <h1 class="tw-text-white tw-text-[2.5em] tw-font-bold">
          {{ token.meta.name }}
        </h1>
        <div class="tw-pb-2 tw-text-dark-0">
          {{ token.meta.description }}
        </div>
        <h2 class="tw-text-white tw-text-[1.375em] tw-font-bold">
          Create Auction
        </h2>
        <ValidationObserver
          ref="form"
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
        >
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
          >
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
              rules="required|auctionTime"
              name="auction_start"
              v-slot="{ errors }"
            >
              <input-date-picker
                v-model="start_date"
                label="Start Date"
                placeholder="Start Date"
                :required="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
              rules="required|endTime:@auction_start"
              name="auction_end"
              v-slot="{ errors }"
            >
              <input-date-picker
                v-model="end_date"
                label="End Date"
                placeholder="End Date"
                :required="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>

          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
            rules="required|bidAmount"
            name="min_bid"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Min. Bid Price"
              placeholder="Eg. 0"
              v-model="minimumBid"
            >
              <template #append-icon>
                <img
                  :src="selectedCoinType.imageWhite"
                  alt="Coin Type"
                  width="14px"
                  height="14px"
                />
              </template>
            </input-text-field>
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>

          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
            rules="required"
            v-slot="{ errors }"
          >
            <input-auto-complete
              :required="true"
              label="Coin Type"
              v-model="coinType"
              placeholder="Select Coin Type"
              :items="coinTypes"
              text="name"
              itemValue="id"
            />
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>

          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
            rules="link"
            name="twitter"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Collection/Artist Twitter Profile"
              placeholder="Twitter Link"
              v-model="twitter"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
            rules="link"
            name="instagram"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Collection/Artist Instagram Profile"
              placeholder="Instagram Link"
              v-model="instagram"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            <div class="tw-text-red-600 tw-text-sm" v-if="socialError">
              {{ socialErrorMessage }}
            </div>
          </ValidationProvider>
          <div class="tw-w-full">
            <button-primary
              title="Add To Auction"
              @click="startAuction"
              :fullWidth="true"
              :loading="submitting"
            />
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
  <reusable-loading v-else />
</template>
<script>
import generateName from "@/utils/generateName";

import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import imageNotFound from "@/utils/imageNotFound";
import aptIcon from "@/assets/img/aptBlack.svg";
import {
  getAvailableCoinTypesForAuction,
  getCoinType,
} from "@/utils/getCoinType";
import {
  createAuctionV1InChain,
  createAuctionV2InChain,
  getToken,
  saveAuctionInDatabase,
} from "@/services/AuctionService";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("bidAmount", {
  validate(value) {
    if (value <= 0) {
      return false;
    }
    return true;
  },
  message: "Minimum bid amount should be greater than zero",
});

extend("auctionTime", {
  validate(value) {
    if (new Date().getTime() > value.getTime()) {
      return false;
    }

    return true;
  },
  message: "Auction Start Time should be greater than current time",
});

extend("endTime", {
  params: ["target"],
  validate(value, target) {
    if (new Date(target.target).getTime() > value.getTime()) {
      return false;
    }

    return true;
  },
  message: "Auction End Time should be greater than Auction Start Time",
});

extend("link", {
  validate(value) {
    try {
      const givenURL = new URL(value);
    } catch (error) {
      return false;
    }
    return true;
  },
  message: "Please enter a valid link",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      token: { meta: { name: "", description: "", image: "" } },
      start_date: null,
      end_date: null,
      minimumBid: null,
      valid: true,
      loading: false,
      validRules: {
        required: (value) => !!value || "Required.",
        positive: (v) => (v && v > 0) || "Should be more than zero.",
      },
      twitter: "",
      instagram: "",
      socialError: false,
      socialErrorMessage: "",
      coinTypes: getAvailableCoinTypesForAuction(),
      coinType: "APT",
      loading: true,
      submitting: false,
      imageNotFound,
      aptIcon,
    };
  },
  computed: {
    selectedCoinType() {
      return getCoinType(this.coinType);
    },
  },
  mounted() {
    this.getTokenDetails();
  },
  methods: {
    async startAuction() {
      try {
        this.socialError = false;
        const validated = await this.$refs.form.validate();

        if (validated) {
          if (!this.twitter && !this.instagram) {
            this.socialError = true;
            this.socialErrorMessage =
              "Please Provide at least a Twitter link or Instagram link";
            return;
          }

          this.submitting = true;

          let auction = null;
          if (this.token.tokenStandard === "v2") {
            auction = await createAuctionV2InChain({
              tokenDataId: this.token.tokenDataId,
              startTime: this.start_date,
              minimumBid: this.minimumBid,
              bidIncrement: 0,
              auctionEndTime: this.end_date,
              minimumBidTimeBeforeEnd: this.end_date,
              coinType: this.coinType,
            });
          } else {
            auction = await createAuctionV1InChain({
              creatorAddress: this.token.creatorAddress,
              collectionName: this.token.collectionName,
              tokenName: this.token.meta.name,
              propertyVersion: this.token.propertyVersion,
              startTime: this.start_date,
              minimumBid: this.minimumBid,
              bidIncrement: 0,
              auctionEndTime: this.end_date,
              minimumBidTimeBeforeEnd: this.end_date,
              coinType: this.coinType,
            });
          }

          const changes = auction.changes;

          let listingId = "";

          changes.forEach((change) => {
            if (change.data && change.data.type === `0x1::object::ObjectCore`) {
              listingId = change.address;
            }
          });

          const auction_name = generateName(this.token.meta.name);

          const res = await saveAuctionInDatabase({
            token: this.token,
            startAt: this.start_date,
            endAt: this.end_date,
            min_bid: this.minimumBid,
            id: listingId,
            auction_name: auction_name,
            twitter: this.twitter,
            instagram: this.instagram,
            user_id: this.$store.state.userStore.user.user_id,
            coin_type: this.coinType,
          });

          this.$toast.showMessage({
            message: "Auction Created Successfully",
            error: false,
          });

          this.$router.push("/dashboard/auction/under-review");

          this.submitting = false;
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });

        this.submitting = false;
      }
    },
    async getTokenDetails() {
      const tokenDataId = this.$route.params.tokenDataId;
      const collectionId = this.$route.params.collectionId;

      const token = await getToken({ tokenDataId, collectionId });

      this.token = token;

      this.loading = false;
    },
  },
};
</script>
<style>
.theme-border {
  border: 2px solid rgb(250, 8, 222);
}
.theme-text {
  color: #ff36ab;
}
</style>
