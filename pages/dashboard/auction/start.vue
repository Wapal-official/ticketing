<template>
  <div
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
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { publicRequest } from "../../../services/fetcher";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";

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
    DatePicker,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      start_date: "",
      end_date: "",
      apt: "",
      valid: true,
      loading: false,
      validRules: {
        required: (value) => !!value || "Required.",
        positive: (v) => (v && v > 0) || "Should be more than zero.",
      },
      twitter: null,
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
        const validated = await this.$refs.form.validate();

        if (validated) {
          this.loading = true;
          let auction = await this.$store.dispatch(
            "walletStore/createAuction",
            {
              start_date: this.start_date,
              end_date: this.end_date,
              min_bid: this.apt,
            }
          );

          const auction_name = this.selectedNft.meta.name.replaceAll("#", "");

          publicRequest
            .post("/api/auction", {
              nft: this.selectedNft,
              startAt: this.start_date,
              endAt: this.end_date,
              min_bid: this.apt,
              id: auction.cur_auction_id,
              auction_name: auction_name,
              twitter: this.twitter,
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
