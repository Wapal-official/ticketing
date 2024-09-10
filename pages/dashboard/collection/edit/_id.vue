<template>
  <div
    class="tw-pt-3 tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 xl:tw-flex-row xl:tw-items-start xl:tw-justify-start"
    v-if="!loading"
  >
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6">
      <div style="position: relative">
        <video-player-detailed
          class="video-detailed-edit"
          v-if="isVideo(collection.media2)"
          :source="collection.media2"
        />
        <utility-image
          :source="collection?.image"
          :alt="collection.name"
          class="tw-rounded tw-w-[421px] tw-h-[421px]"
          width="421px"
          height="421px"
          v-else
        />
        <audio-player
          v-if="isAudio(collection.media2)"
          class="audio-bg"
          :audioSrc="collection.media2"
        ></audio-player>
      </div>
    </div>

    <ValidationObserver
      class="tw-w-full tw-flex tw-flex-col tw-gap-6 xl:tw-max-w-[534px]"
      ref="editForm"
    >
      <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2">
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
        >
          <h2
            class="tw-text-[1.375rem] tw-font-semibold tw-leading-7 tw-tracking-[0.01375rem] tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
          >
            <span> {{ collection.name }}</span>
            <i
              class="bx bxs-badge-check tw-text-primary-1 tw-text-lg"
              v-if="collection.isVerified"
            ></i>
          </h2>
          <tool-tip>
            <template #text>
              <i class="bx bx-info-circle tw-text-xl"></i>
            </template>
            <template #tip>
              <div
                class="tw-flex tw-flex-col tw-items-start-tw-justify-start tw-text-white tw-text-sm"
              >
                <div class="tw-font-semibold">Caution</div>
                <div>Make sure to click 'Set Whitelist' button</div>
                <div>
                  in whitelist page after editing mint price or mint time in
                  phases
                </div>
              </div>
            </template>
          </tool-tip>
        </div>
        <div class="" v-html="collection.description" id="markup-desc"></div>
      </div>

      <div class="tw-w-full" v-if="!collection.isEdition">
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-font-semibold tw-w-full"
          v-if="!editingTotalSupply"
        >
          <div class="tw-text-sm tw-font-semibold">
            Total Supply: {{ collection.supply }}
          </div>
          <button
            class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
            @click="editingTotalSupply = true"
          >
            <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
          </button>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-text-sm tw-gap-2"
          v-else
        >
          <div class="tw-font-medium">Total Supply</div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
          >
            <ValidationProvider
              class="tw-w-full"
              rules="required|number"
              v-slot="{ errors }"
            >
              <input-text-field
                placeholder="Total Supply"
                v-model="editCollection.totalSupply"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row md:tw-justify-start"
            >
              <button-primary
                title="Cancel"
                @click="editingTotalSupply = false"
                :bordered="true"
                :fullWidth="true"
              />
              <button-primary
                title="Save Changes"
                @click="checkChangeCondition('totalSupply')"
                :loading="savingChanges"
                :fullWidth="true"
              />
            </div>
          </div>
          <div class="tw-text-red-600 tw-text-sm" v-if="supplyError.error">
            {{ supplyError.message }}
          </div>
        </div>
      </div>
      <!-- <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-p-4"
        v-if="collection.phases.length === 1"
      >
        <div class="tw-text-white tw-font-semibold tw-capitalize tw-text-sm">
          Whitelist Sale
        </div> -->
      <div
        v-if="collection.phases.length === 1"
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
      >
        <div class="tw-text-white tw-font-semibold tw-capitalize">
          Whitelist Sale
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-flex-row md:tw-items-baseline md:tw-justify-between"
        >
          <div class="tw-w-full">
            <div
              class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
            >
              Whitelist Sale Time
            </div>
            <div
              class="tw-w-full tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 md:tw-justify-start"
              v-if="!editingWhitelistSaleTime"
            >
              <span>
                {{
                  formatDateTime(collection.candyMachine.whitelist_sale_time)
                }}</span
              >
              <button
                class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                @click="editingWhitelistSaleTime = true"
              >
                <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
              </button>
            </div>
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8"
              v-else
            >
              <ValidationProvider
                class="tw-w-full"
                rules="required|date"
                v-slot="{ errors }"
              >
                <input-date-picker
                  placeholder="Select Whitelist Sale Time"
                  v-model="editCollection.whitelistSaleTime"
                />
                <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-items-end"
          >
            <div
              class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
            >
              Price
            </div>
            <div
              class="tw-w-full tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 md:tw-justify-end"
              v-if="!editingWhitelistSalePrice"
            >
              <span
                >{{ collection.candyMachine.whitelist_price }}
                {{
                  collection.seed && collection.seed.coin_type
                    ? collection.seed.coin_type
                    : "APT"
                }}</span
              >
              <button
                class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                @click="editingWhitelistSalePrice = true"
              >
                <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
              </button>
            </div>
            <ValidationProvider
              class="tw-w-full"
              rules="required|number"
              v-slot="{ errors }"
              v-else
            >
              <input-text-field
                placeholder="Whitelist Sale Price"
                v-model="editCollection.whitelistPrice"
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
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row md:tw-justify-start"
          v-if="editingWhitelistSalePrice || editingWhitelistSaleTime"
        >
          <button-primary
            title="Cancel"
            @click="resetEditingWhitelistSale"
            :bordered="true"
            :fullWidth="true"
          />
          <button-primary
            title="Save Changes"
            @click="saveWhitelistSale"
            :loading="savingChanges"
            :fullWidth="true"
          />
        </div>
      </div>
      <!-- </div> -->
      <!-- <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-p-4"
        v-if="collection.phases.length > 1"
      >
        <div class="tw-w-full tw-flex tw-flex-row tw-justify-between">
          <h3 class="tw-text-sm tw-font-semibold">Mint Phases</h3>
        </div> -->
      <dashboard-collection-phase-edit-box
        v-if="collection.phases.length > 1"
        v-for="(phase, index) in editCollection.phases"
        :phase="phase"
        :coinType="
          collection.seed && collection.seed.coin_type
            ? collection.seed.coin_type
            : 'APT'
        "
        :savingChanges="savingChanges"
        :key="index"
        :saved="!savingChanges"
        @editPhases="editPhases"
      />
      <!-- </div> -->
      <!-- <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-p-4"
      >
        <div class="tw-text-white tw-font-semibold tw-capitalize tw-text-sm">
          Public Sale
        </div> -->
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
      >
        <div class="tw-text-white tw-font-semibold tw-capitalize">
          Public Sale
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-flex-row md:tw-items-baseline md:tw-justify-between"
        >
          <div class="tw-w-full">
            <div
              class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
            >
              Public Sale Time
            </div>
            <div
              class="tw-w-full tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 md:tw-justify-start"
              v-if="!editingPublicSaleTime"
            >
              <span>
                {{
                  formatDateTime(collection.candyMachine.public_sale_time)
                }}</span
              >
              <button
                class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                @click="editingPublicSaleTime = true"
              >
                <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
              </button>
            </div>
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8"
              v-else
            >
              <ValidationProvider
                class="tw-w-full"
                rules="required|date"
                v-slot="{ errors }"
              >
                <input-date-picker
                  placeholder="Select Whitelist Sale Time"
                  v-model="editCollection.publicSaleTime"
                />
                <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-items-end"
          >
            <div
              class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
            >
              Price
            </div>
            <div
              class="tw-w-full tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 md:tw-justify-end"
              v-if="!editingPublicSalePrice"
            >
              <span
                >{{ collection.candyMachine.public_sale_price }}
                {{
                  collection.seed && collection.seed.coin_type
                    ? collection.seed.coin_type
                    : "APT"
                }}</span
              >
              <button
                class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                @click="editingPublicSalePrice = true"
              >
                <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-lg"></i>
              </button>
            </div>
            <ValidationProvider
              class="tw-w-full"
              rules="required|number"
              v-slot="{ errors }"
              v-else
            >
              <input-text-field
                placeholder="Whitelist Sale Price"
                v-model="editCollection.publicSalePrice"
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
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-flex-row md:tw-justify-start"
          v-if="editingPublicSalePrice || editingPublicSaleTime"
        >
          <button-primary
            title="Cancel"
            @click="resetEditingPublicSale"
            :bordered="true"
            :fullWidth="true"
          />
          <button-primary
            title="Save Changes"
            @click="savePublicSale"
            :loading="savingChanges"
            :fullWidth="true"
          />
        </div>
      </div>
      <!-- </div> -->
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
      >
        <div class="tw-w-full md:tw-w-1/2">
          <button
            class="resume-button tw-w-full tw-relative tw-rounded-md tw-text-white tw-px-6 tw-py-2.5 tw-h-10 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
            @click="pauseOrResumeMint"
            v-if="mintingPaused"
          >
            <div
              class="tw-w-full tw-h-full tw-rounded-sm tw-absolute tw-top-0 tw-left-0 tw-py-2.5 tw-bg-black/40"
            >
              <span>Resume Mint</span>
            </div>
          </button>

          <button-primary
            title="Pause Mint"
            @click="pauseOrResumeMint"
            :fullWidth="true"
            v-else
          />
        </div>
      </div>
    </ValidationObserver>
    <reusable-progress-modal
      :showProgressModal="showSettingUpNextPhaseModal"
      :showClose="showCloseSettingUpNextPhaseModal"
      name="Initiating Next Phase"
      description="Please review and approve up to three transactions in your wallet window to start next mint phase."
      :steps="steps"
      :progress="settingUpNextPhaseProgress"
      :error="settingUpNextPhaseError"
      @closeProgressModal="showSettingUpNextPhaseModal = false"
    />
  </div>
  <div class="py-16" v-else>
    <reusable-loading />
  </div>
</template>
<script lang="ts">
import {
  getCollection,
  updateCollection,
  getMetadataFromTokenURI,
  sortPhases,
} from "@/services/CollectionService";
import {
  getCollectionDetails,
  updateWhitelistSaleTime,
  updatePublicSaleTime,
  updateWhitelistSalePrice,
  updatePublicSalePrice,
  updateTotalSupply,
  pauseOrResumeMinting,
} from "@/services/AptosCollectionService";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import moment from "moment";

import aptIcon from "@/assets/img/aptBlack.svg";
import { getCoinType } from "@/utils/getCoinType";

extend("date", {
  validate(value) {
    if (new Date(value).getTime() < Date.now()) {
      return false;
    }
    return true;
  },
  message: "Sale time should be greater than current time",
});

extend("number", {
  validate(value) {
    if (isNaN(value)) {
      return false;
    }
    return true;
  },
  message: "This field must be a number",
});

extend("saleTime", {
  validate(value) {
    if (new Date(value).getTime() <= Date.now()) {
      return false;
    }
    return true;
  },
  message: "Sale time should be greater than current time",
});

export default {
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      collection: {
        _id: null,
        name: "",
        image: "",
        description: "",
        candyMachine: {
          whitelist_sale_time: "",
          whitelist_price: "",
          public_sale_time: "",
          public_sale_price: "",
        },
        supply: "",
        isVerified: false,
        phases: [{ id: "", name: "", mint_time: "", mint_price: "" }],
        isEdition: false,
        media2: "",
        seed: {
          seedz: false,
          coin_type: "APT",
        },
      },
      loading: true,
      whitelistSaleTime: "",
      editCollectionDialog: false,
      editCollection: {
        whitelistSaleTime: "",
        publicSaleTime: "",
        whitelistPrice: "",
        publicSalePrice: "",
        totalSupply: "",
        royalty: "",
        phases: [{ id: "", mint_time: "", mint_price: "", name: "" }],
      },
      changeDialog: false,
      changeDialogTitle: "",
      changeDialogButtonTitle: "",
      changeDialogInputType: "",
      changeDialogValue: null,
      changeDialogType: "",
      editingTotalSupply: false,
      editingWhitelistSalePrice: false,
      editingWhitelistSaleTime: false,
      editingPublicSalePrice: false,
      editingPublicSaleTime: false,
      supplyError: {
        error: false,
        message: "",
      },
      editingPhases: false,
      savingChanges: false,
      showSettingUpNextPhaseModal: false,
      showCloseSettingUpNextPhaseModal: false,
      steps: [
        { step: 1, name: "Pausing Mint" },
        { step: 2, name: "Changing Sale Price" },
        { step: 3, name: "Resuming Mint" },
      ],
      settingUpNextPhaseProgress: 0,
      settingUpNextPhaseError: false,
      mintingPaused: false,
      aptIcon,
      fileType: "",
    };
  },
  async mounted() {
    this.fetchCollection();
  },
  methods: {
    isVideo(source: string) {
      if (!source) {
        return false;
      }
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp4",
            "mkv",
            "m4v",
            "webm",
            "avi",
            "mov",
            "wmv",
            "flv",
            "3gp",
            "ogv",
            "mpg",
            "divx",
            "rm",
            "asf",
            "vob",
            "ts",
            "m2ts",
          ].includes(extension)
        : false;
    },
    isAudio(source: string) {
      if (!source) {
        return false;
      }
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp3",
            "wav",
            "ogg",
            "aac",
            "flac",
            "wma",
            "alac",
            "aiff",
            "opus",
            "mpeg",
          ].includes(extension)
        : false;
    },
    async fetchCollection() {
      this.loading = true;
      this.collection = await getCollection(this.$route.params.id);
      console.log("collection", this.collection);

      const chainRes = await getCollectionDetails({
        candyMachineId: this.collection.candyMachine.candy_id,
        candy_object: this.collection.candyMachine.resource_account,
      });
      console.log("chainRes", chainRes);

      this.mintingPaused = chainRes.paused;

      this.editCollection.whitelistSaleTime = new Date(
        this.collection.candyMachine.whitelist_sale_time
      );

      this.editCollection.publicSaleTime = new Date(
        this.collection.candyMachine.public_sale_time
      );

      this.editCollection.publicSalePrice =
        this.collection.candyMachine.public_sale_price;

      this.editCollection.whitelistPrice =
        this.collection.candyMachine.whitelist_price;

      this.editCollection.totalSupply = this.collection.supply;

      this.editCollection.royalty =
        (chainRes.royalty_points_numerator * 100) /
        chainRes.royalty_points_denominator;

      this.editCollection.phases = structuredClone(this.collection.phases);

      this.loading = false;
    },
    formatDateTime(date: string) {
      return moment(date).format("MMM DD, hh:mm A");
    },
    async checkChangeCondition(type: string) {
      const validate = await this.$refs.editForm.validate();
      if (!validate) {
        return;
      }

      this.savingChanges = true;

      switch (type) {
        case "whitelist_sale_time":
          await this.updateWhitelistSaleTime();
          break;
        case "public_sale_time":
          await this.updatePublicSaleTime();
          break;
        case "whitelist_sale_price":
          await this.updateWhitelistSalePrice();
          break;
        case "public_sale_price":
          await this.updatePublicSalePrice();
          break;
        case "totalSupply":
          await this.updateTotalSupply();
          break;
        default:
          break;
      }

      this.savingChanges = false;
    },
    async updateWhitelistSaleTime() {
      try {
        await updateWhitelistSaleTime({
          candy_object: this.collection.candyMachine.resource_account,
          pre_sale_mint_time: this.editCollection.whitelistSaleTime,
          candy_machine_id: this.collection.candyMachine.candy_id,
        });

        const candyMachine = this.collection.candyMachine;

        const whitelist_sale_time =
          this.editCollection.whitelistSaleTime.toISOString();

        candyMachine.whitelist_sale_time = whitelist_sale_time;

        const phases = this.collection.phases;

        phases.map((phase: any) => {
          if (phase.id === "whitelist") {
            phase.mint_time = whitelist_sale_time;
          }
        });

        const res = await updateCollection(this.collection._id, {
          candyMachine,
          phases,
        });

        this.editingWhitelistSaleTime = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
        this.editingWhitelistSaleTime = false;
      }
    },
    async updatePublicSaleTime() {
      try {
        await updatePublicSaleTime({
          candy_object: this.collection.candyMachine.resource_account,
          public_sale_time: this.editCollection.publicSaleTime,
          candy_machine_id: this.collection.candyMachine.candy_id,
        });

        const candyMachine = this.collection.candyMachine;

        if (
          new Date(candyMachine.public_sale_time).getTime() -
            new Date(candyMachine.whitelist_sale_time).getTime() <=
          1000
        ) {
          candyMachine.whitelist_sale_time = this.editCollection.publicSaleTime;
        }

        candyMachine.public_sale_time = this.editCollection.publicSaleTime;

        const res = await updateCollection(this.collection._id, {
          candyMachine,
        });

        this.editingPublicSaleTime = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
        this.editingPublicSaleTime = false;
      }
    },
    async updateWhitelistSalePrice() {
      try {
        await updateWhitelistSalePrice({
          candy_object: this.collection.candyMachine.resource_account,
          pre_sale_price: this.editCollection.whitelistPrice,
          candy_machine_id: this.collection.candyMachine.candy_id,
          coinType: this.collection.seed ? this.collection.seed.coin_type : "",
        });

        const candyMachine = this.collection.candyMachine;

        candyMachine.whitelist_price = this.editCollection.whitelistPrice;

        const phases = this.collection.phases;

        phases.map((phase: any) => {
          if (phase.id === "whitelist") {
            phase.mint_price = this.editCollection.whitelistPrice;
          }
        });

        const res = await updateCollection(this.collection._id, {
          candyMachine,
          phases,
        });

        this.editingWhitelistSalePrice = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
        this.editingWhitelistSalePrice = false;
      }
    },
    async updatePublicSalePrice() {
      try {
        await updatePublicSalePrice({
          candy_object: this.collection.candyMachine.resource_account,
          public_sale_price: this.editCollection.publicSalePrice,
          candy_machine_id: this.collection.candyMachine.candy_id,
          coinType: this.collection.seed ? this.collection.seed.coin_type : "",
        });

        const candyMachine = this.collection.candyMachine;

        candyMachine.public_sale_price = this.editCollection.publicSalePrice;

        const res = await updateCollection(this.collection._id, {
          candyMachine,
        });

        this.editingPublicSalePrice = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
        this.editingPublicSalePrice = false;
      }
    },
    async updateTotalSupply() {
      try {
        if (!this.collection.isEdition) {
          const supplyRes = await getMetadataFromTokenURI(
            `${this.collection.baseURL}${
              this.editCollection.totalSupply - 1
            }.json`
          );

          if (!supplyRes) {
            this.supplyError.error = true;
            this.supplyError.message =
              "Metadata For This supply does not exists please decrease supply";

            return;
          }
        }

        await updateTotalSupply({
          candy_object: this.collection.candyMachine.resource_account,
          total_supply: this.editCollection.totalSupply,
          candy_machine_id: this.collection.candyMachine.candy_id,
        });

        const editParameters: any = {
          supply: this.editCollection.totalSupply,
        };

        if (this.collection.isEdition) {
          editParameters.edition = "limited-edition";
        }

        const res = await updateCollection(this.collection._id, editParameters);

        this.collection.supply = this.editCollection.totalSupply;

        this.editingTotalSupply = false;

        this.supplyError.error = false;

        this.$toast.showMessage({ message: "Collection Updated Successfully" });
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.changeDialog = false;
        this.editingTotalSupply = false;

        this.supplyError.error = false;
      }
    },
    async editPhases() {
      try {
        this.savingChanges = true;

        const sortedPhases = sortPhases(
          structuredClone(this.editCollection.phases)
        );

        if (
          new Date(
            this.collection.candyMachine.whitelist_sale_time
          ).getTime() !== new Date(sortedPhases[0].mint_time).getTime()
        ) {
          const phaseWithTimeGreaterThanCurrentTime = sortedPhases.find(
            (phase) => new Date(phase.mint_time).getTime() > Date.now()
          );

          if (!phaseWithTimeGreaterThanCurrentTime) {
            throw new Error(
              "At least one phase should be greater than current time"
            );
          }

          await updateWhitelistSaleTime({
            candy_object: this.collection.candyMachine.resource_account,
            candy_machine_id: this.collection.candyMachine.candy_id,
            pre_sale_mint_time: phaseWithTimeGreaterThanCurrentTime.mint_time,
          });
        }

        const tempCollection = structuredClone(this.collection);

        tempCollection.candyMachine.whitelist_sale_time = new Date(
          sortedPhases[0].mint_time
        );
        tempCollection.candyMachine.whitelist_price =
          sortedPhases[0].mint_price;

        tempCollection.phases = sortedPhases;

        await updateCollection(this.collection._id, tempCollection);

        this.editCollection.phases = sortedPhases;

        this.collection = tempCollection;

        this.$toast.showMessage({
          message: "Collection Updated Successfully",
          error: false,
        });

        this.savingChanges = false;
        this.editingPhases = false;
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.savingChanges = false;
        this.editingPhases = false;
      }
    },
    removeMintPhase(index: number) {
      this.editCollection.phases.splice(index, 1);
    },
    cancelEditingPhases() {
      this.editCollection.phases = structuredClone(this.collection.phases);

      this.editingPhases = false;
    },
    async startNextPhase() {
      try {
        if (this.mintingPaused) {
          throw new Error("Please Resume Minting First");
        }

        this.settingUpNextPhaseError = false;
        this.showSettingUpNextPhaseModal = true;
        this.showCloseSettingUpNextPhaseModal = false;
        this.settingUpNextPhaseProgress = 1;

        const pauseRes: any = await pauseOrResumeMinting({
          candy_machine_id: this.collection.candyMachine.candy_id,
          candy_object: this.collection.candyMachine.resource_account,
        });

        if (pauseRes.success) {
          this.mintingPaused = true;
          this.settingUpNextPhaseProgress = 2;

          let currentSalePrice = this.collection.candyMachine.whitelist_price;

          let allPhaseCompleted = true;

          for (let i = 0; i < this.collection.phases.length; i++) {
            const now = new Date();

            const phaseDate = new Date(this.collection.phases[i].mint_time);

            if (phaseDate > now) {
              currentSalePrice = this.collection.phases[i].mint_price;
              allPhaseCompleted = false;
              break;
            }
          }

          if (!allPhaseCompleted) {
            const updateWhitelistSalePriceRes: any =
              await updateWhitelistSalePrice({
                candy_machine_id: this.collection.candyMachine.candy_id,
                candy_object: this.collection.candyMachine.resource_account,
                pre_sale_price: currentSalePrice,
                coinType: this.collection.seed
                  ? this.collection.seed.coin_type
                  : "",
              });

            if (updateWhitelistSalePriceRes.success) {
              this.settingUpNextPhaseProgress = 3;
              const resumeRes: any = await pauseOrResumeMinting({
                candy_machine_id: this.collection.candyMachine.candy_id,
                candy_object: this.collection.candyMachine.resource_account,
              });

              if (resumeRes.success) {
                this.mintingPaused = false;
                this.settingUpNextPhaseProgress = 4;
                this.showSettingUpNextPhaseModal = false;
                this.$toast.showMessage({
                  message: "Phase Started Successfully",
                  error: false,
                });
              } else {
                throw new Error("Error Resuming Mint");
              }
            } else {
              throw new Error("Price in chain not updated");
            }
          } else {
            throw new Error("All Phases are Over");
          }
        } else {
          throw new Error("Error Pausing Mint");
        }
      } catch (error) {
        console.log(error);
        this.settingUpNextPhaseError = true;
        this.showCloseSettingUpNextPhaseModal = true;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async pauseOrResumeMint() {
      try {
        const resumeRes: any = await pauseOrResumeMinting({
          candy_machine_id: this.collection.candyMachine.candy_id,
          candy_object: this.collection.candyMachine.resource_account,
        });

        this.mintingPaused = !this.mintingPaused;

        this.$toast.showMessage({
          message: `Minting ${
            this.mintingPaused ? "Paused" : "Resumed"
          } Successfully`,
          error: false,
        });
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    resetEditingPublicSale() {
      if (this.editingPublicSalePrice) {
        this.editingPublicSalePrice = false;
      }

      if (this.editingPublicSaleTime) {
        this.editingPublicSaleTime = false;
      }
    },
    savePublicSale() {
      if (this.editingPublicSalePrice) {
        this.checkChangeCondition("public_sale_price");
      }

      if (this.editingPublicSaleTime) {
        this.checkChangeCondition("public_sale_time");
      }
    },
    resetEditingWhitelistSale() {
      if (this.editingWhitelistSalePrice) {
        this.editingWhitelistSalePrice = false;
      }

      if (this.editingWhitelistSaleTime) {
        this.editingWhitelistSaleTime = false;
      }
    },
    saveWhitelistSale() {
      if (this.editingWhitelistSalePrice) {
        this.checkChangeCondition("whitelist_sale_price");
      }

      if (this.editingWhitelistSaleTime) {
        this.checkChangeCondition("whitelist_sale_time");
      }
    },
  },
  computed: {
    showStartNextPhaseButton() {
      const phases = this.collection.phases;

      let counter = 0;

      for (let i = 0; i < phases.length; i++) {
        const now = new Date().getTime();
        const phaseDate = new Date(phases[i].mint_time).getTime();

        if (now > phaseDate) {
          counter++;
        }
      }

      return counter !== phases.length;
    },
    selectedCoinType() {
      return getCoinType(
        this.collection.seed && this.collection.seed.coin_type
          ? this.collection.seed.coin_type
          : ""
      );
    },
  },
};
</script>
<style lang="css">
.video-detailed-edit {
  max-width: 421px;
  height: 421px;
  border-radius: 0.25rem;
}

.resume-button {
  background: linear-gradient(0deg, #8cd867, #8cd867),
    linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
}
</style>
