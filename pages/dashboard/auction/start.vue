<template>
  <div
    class="tw-w-full tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 lg:tw-mx-0 lg:tw-pt-4 lg:tw-pb-24"
  >
    <div
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-place-items-center xl:tw-flex-row xl:tw-items-start xl:tw-justify-start xl:tw-gap-[3em]"
    >
      <img
        :src="selectedNft.meta.image"
        :alt="selectedNft.meta.name"
        class="tw-w-full tw-max-h-[338px] md:tw-w-[550px] md:tw-h-[550px] md:tw-max-h-[550px] lg:tw-w-[450px] lg:tw-min-w-[450px] lg:tw-h-[450px] xl:tw-w-[550px] xl:tw-h-[550px] xl:tw-max-h-[550px] tw-object-cover tw-rounded-xl"
        :onerror="imageNotFound()"
      />
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 xl:tw-w-[474px]"
      >
        <h1 class="tw-text-white tw-text-[2.5em] tw-font-bold">
          {{ selectedNft.meta.name }}
        </h1>
        <div class="tw-pb-2 tw-text-dark-0">
          {{ selectedNft.meta.description }}
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
              v-model="apt"
              :showAptIcon="true"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
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
            />
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>

  <!-- <div
    class="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-start tw-gap-8 tw-pt-16 tw-pb-16 3xl:tw-px-16 xl:tw-flex-row xl:tw-gap-16 xl:tw-items-start"
  >
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-w-full tw-group md:tw-w-[60%] xl:tw-w-[40%]"
    >
      <div
        class="tw-rounded-lg nft-preview-card-border tw-w-full tw-overflow-hidden tw-transition-all tw-duration-150 tw-ease-linear"
      >
        <img
          :src="selectedNft.meta.image"
          :alt="selectedNft.meta.name"
          class="tw-w-full tw-rounded-lg tw-max-h-[550px] tw-object-fill"
        />
      </div>
    </div>
    <div
      class="tw-rounded tw-w-full tw-bg-[#001233] tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-px-4 tw-py-8 md:tw-px-8 xl:tw-w-[60%] preview-shadow"
    >
      <div class="tw-text-wapal-gray tw-pb-4">
        <h1
          class="tw-text-2xl tw-pb-4 tw-font-medium tw-uppercase md:tw-text-[2rem]"
        >
          {{ selectedNft.meta.name }}
        </h1>
        <div class="tw-font-light">
          {{ selectedNft.meta.description }}
        </div>
      </div>
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-p-4 tw-bg-[#0C224B] tw-rounded tw-w-full"
      >
        <h3 class="tw-text-wapal-pink tw-text-2xl tw-font-medium">
          Create Auction
        </h3>
        <ValidationObserver
          ref="form"
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
        >
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 lg:tw-flex-row lg:tw-items-start lg:tw-justify-between tw-w-full"
          >
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
              rules="required|auctionTime"
              name="auction_start"
              v-slot="{ errors }"
            >
              <label for="startTime">Start Time</label>
              <reusable-date-picker
                v-model="start_date"
                type="datetime"
                placeholder="Select Auction Start Time"
                background="#0C224B"
              />
              <div class="tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
              rules="required|endTime:@auction_start"
              v-slot="{ errors }"
            >
              <label for="endTime">End Time</label>
              <reusable-date-picker
                v-model="end_date"
                type="datetime"
                placeholder="Select Auction End Time"
                background="#0C224B"
              />
              <div class="tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
            rules="link"
            v-slot="{ errors }"
          >
            <label for="twitter">Collection/Artist Twitter Profile</label>
            <reusable-text-field
              v-model="twitter"
              background="#0C224B"
            ></reusable-text-field>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
            rules="link"
            v-slot="{ errors }"
          >
            <label for="instagram">Collection/Artist Instagram Profile</label>
            <reusable-text-field
              v-model="instagram"
              background="#0C224B"
            ></reusable-text-field>
          </ValidationProvider>
          <div v-if="socialError" class="tw-text-red-600">
            {{ socialErrorMessage }}
          </div>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group"
            rules="required|bidAmount"
            v-slot="{ errors }"
          >
            <label for="startTime">Min Bid Amount</label>
            <reusable-text-field
              v-model="apt"
              placeholder="eg: 1.5 APT"
              type="number"
              background="#0C224B"
            ></reusable-text-field>
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider>
          <ReusableThemeButton
            title="Add to auction"
            @click="startAuction"
            :loading="loading"
          />
        </ValidationObserver>
      </div>
    </div>
  </div> -->
</template>
<script>
import generateName from "@/utils/generateName";

import { publicRequest } from "../../../services/fetcher";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import imageNotFound from "@/utils/imageNotFound";

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
      start_date: null,
      end_date: null,
      apt: null,
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
      imageNotFound,
    };
  },
  computed: {
    selectedNft() {
      return this.$store.state.auction.selectedNft;
    },
  },
  mounted() {
    if (!this.selectedNft) {
      this.$router.push("/dashboard/auction");
    }
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

          this.loading = true;
          let auction = await this.$store.dispatch(
            "walletStore/createAuction",
            {
              start_date: this.start_date,
              end_date: this.end_date,
              min_bid: this.apt,
            }
          );

          const auction_name = generateName(this.selectedNft.meta.name);

          publicRequest
            .post("/api/auction", {
              nft: this.selectedNft,
              startAt: this.start_date,
              endAt: this.end_date,
              min_bid: this.apt,
              id: auction.cur_auction_id,
              auction_name: auction_name,
              twitter: this.twitter,
              instagram: this.instagram,
            })
            .then((res) => {
              this.$toast.showMessage({
                message: "Auction Created Successfully",
                error: false,
              });
              this.loading = false;
              this.$router.push("/dashboard/auction/list");
            })
            .catch((err) => {
              console.log(err.response);
              this.$toast.showMessage({ message: err, error: true });
            });
        }
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
      }
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
