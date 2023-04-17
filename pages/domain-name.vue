<template>
  <div
    class="tw-px-4 tw-py-16 tw-container tw-mx-auto tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 lg:tw-flex-row lg:tw-items-center lg:tw-gap-16 lg:tw-px-8"
  >
    <div class="tw-w-full lg:tw-w-[40%]">
      <img
        :src="domain"
        alt="domain-name"
        class="tw-object-cover tw-w-full tw-h-full"
      />
    </div>
    <div
      class="tw-rounded tw-w-full tw-bg-[#001233] tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-px-8 tw-py-8 lg:tw-w-[60%] preview-shadow"
    >
      <div class="tw-text-wapal-gray tw-pb-8">
        <h1
          class="tw-text-2xl tw-pb-4 tw-font-medium tw-uppercase md:tw-text-[2rem]"
        >
          Domain Name
        </h1>
        <div class="tw-text-lg">
          Secure your <strong>.apt</strong> domain for your journey through the
          Aptos ecosystem.
        </div>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8"
      >
        <div class="tw-relative tw-w-full">
          <input
            class="tw-w-full tw-rounded-md !tw-border-solid !tw-border !tw-border-wapal-gray tw-py-2 tw-px-8 tw-text-wapal-gray placeholder:tw-text-wapal-gray focus:tw-outline-none focus:!tw-border-wapal-gray"
            placeholder="Search Domain Names"
            v-model="domainName"
            @keyup.enter="findDomainName"
          />
          <button
            class="tw-absolute tw-right-3 tw-top-[15%]"
            @click="findDomainName"
            v-if="!showDomainName || !domainName"
          >
            <v-icon class="!tw-text-wapal-gray !tw-text-2xl"
              >mdi-magnify</v-icon
            >
          </button>
          <button
            class="tw-absolute tw-right-3 tw-top-[15%]"
            @click.prevent="clearDomainName"
            v-else
          >
            <v-icon class="!tw-text-wapal-gray !tw-text-2xl">mdi-close</v-icon>
          </button>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-text-black md:tw-flex-row md:tw-items-center"
          v-if="showDomainName"
        >
          <div
            class="tw-w-full md:tw-w-[90%] tw-bg-wapal-gray tw-flex tw-flex-row tw-items-center tw-justify-between tw-py-4 tw-px-4 tw-rounded-md"
          >
            <div>
              <div class="tw-text-lg">{{ domainStatus.domainName }}.Apt</div>
              <div
                class="tw-text-green-800 tw-text-sm"
                v-if="domainStatus.available"
              >
                Available
              </div>
              <div class="tw-text-red-800 tw-text-sm" v-else>Unavailable</div>
            </div>
            <div v-if="domainStatus.available">
              <div class="tw-text-lg">{{ domainStatus.price }} APT</div>
              <div class="tw-text-sm">Domain Cost</div>
            </div>
          </div>
          <button
            class="tw-full tw-rounded tw-text-white tw-bg-wapal-pink tw-py-4 tw-px-6"
            v-if="domainStatus.available"
            @click="buyDomainName"
          >
            BUY
          </button>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="showConnectWalletModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <connect-wallet-modal
        message="Please Connect your wallet to Buy Domain Name"
        @closeModal="showConnectWalletModal = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import domain from "@/assets/img/domain-name.png";
export default {
  data() {
    return {
      domainName: null,
      showDomainName: false,
      domainStatus: {
        domainName: "",
        available: true,
        price: 0,
      },
      showConnectWalletModal: false,
      domain,
    };
  },
  methods: {
    async findDomainName() {
      if (!this.$store.state.walletStore.wallet.walletAddress) {
        this.showConnectWalletModal = true;
        return;
      }
      try {
        if (this.domainName.length < 3) {
          throw new Error("Please enter at least 3 characters");
        }
        if (this.domainName) {
          const res = await this.$axios.post(
            `https://indexer.mainnet.aptoslabs.com/v1/graphql`,
            {
              operationName: "current_ans_lookup",
              variables: {
                domain: this.domainName,
                creator_address:
                  this.$store.state.walletStore.wallet.walletAddress,
              },
              query:
                'query current_ans_lookup($domain: String, $creator_address: String) {\n  current_ans_lookup(where: {domain: {_eq: $domain}, subdomain: {_eq: ""}}) {\n    registered_address\n    expiration_timestamp\n    domain\n    all_token_ownerships(\n      where: {amount: {_gt: "0"}, creator_address: {_eq: $creator_address}}\n    ) {\n      owner_address\n      __typename\n    }\n    __typename\n  }\n}',
            }
          );

          if (res.data.data.current_ans_lookup.length === 0) {
            if (this.domainName.length === 3) {
              this.domainStatus.price = 20;
            } else if (this.domainName.length === 4) {
              this.domainStatus.price = 10;
            } else if (this.domainName.length === 5) {
              this.domainStatus.price = 5;
            } else {
              this.domainStatus.price = 1;
            }
            this.domainStatus.available = true;
          } else {
            this.domainStatus.available = false;
            this.domainStatus.price = 0;
          }

          this.domainStatus.domainName = this.domainName;

          this.showDomainName = true;
        }
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async buyDomainName() {
      try {
        if (!this.$store.state.walletStore.wallet.wallet) {
          this.showConnectWalletModal = true;
          return;
        }
        const res = await this.$store.dispatch(
          "walletStore/buyDomainName",
          this.domainStatus.domainName
        );

        if (res.success) {
          this.$toast.showMessage({
            message: `Domain Name Registered Successfully`,
          });
        } else {
          this.$toast.showMessage({
            message: "Domain Name Not Registerd",
            error: true,
          });
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
      }
    },

    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet.wallet} Wallet Connected Successfully`,
      });
    },
    clearDomainName() {
      this.showDomainName = false;
      this.domainName = "";
    },
  },
  watch: {
    domainName(newVal: string) {
      if (!newVal) {
        this.showDomainName = false;
      }
    },
  },
};
</script>
