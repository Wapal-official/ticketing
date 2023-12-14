<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 xl:tw-flex-row xl:tw-items-start xl:tw-justify-start"
    v-if="!loading"
  >
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6">
      <img
        :src="collection.image"
        :alt="collection.name"
        class="tw-rounded tw-w-[421px] tw-h-[421px]"
        width="421px"
        height="421px"
      />
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
      >
        <button-primary
          title="Start Next Phase"
          @click="startNextPhase"
          :bordered="true"
          v-if="showStartNextPhaseButton && collection.phases.length > 1"
        />
        <button-primary
          title="Resume Mint"
          @click="pauseOrResumeMint"
          v-if="mintingPaused && !collection.isEdition"
          :bordered="true"
        />
        <button-primary
          :title="mintingPaused ? 'Resume Mint' : 'Pause Mint'"
          @click="pauseOrResumeMint"
          v-if="collection.isEdition"
          :bordered="true"
        />
      </div>
    </div>

    <ValidationObserver
      class="tw-w-full tw-flex tw-flex-col tw-gap-6 xl:tw-max-w-[534px]"
      ref="editForm"
    >
      <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2">
        <h2
          class="tw-text-[1.375rem] tw-font-semibold tw-leading-7 tw-tracking-[0.01375rem] tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <span> {{ collection.name }}</span>
          <i
            class="bx bxs-badge-check tw-text-primary-1 tw-text-lg"
            v-if="collection.isVerified"
          ></i>
        </h2>
        <div class="">{{ collection.description }}</div>
      </div>

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
          <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
          <span>Edit</span>
        </button>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-text-sm tw-gap-2"
        v-else
      >
        <div class="tw-font-medium">Total Supply</div>
        <div
          class="tw-w-full tw-flex tw-flex-col md:tw-flex-row tw-items-start tw-justify-start tw-gap-3"
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
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-4 md:tw-justify-start"
          >
            <button-primary
              title="Cancel"
              @click="editingTotalSupply = false"
              :bordered="true"
            />
            <button-primary
              title="Save Changes"
              @click="checkChangeCondition('totalSupply')"
              :loading="savingChanges"
            />
          </div>
        </div>
        <div class="tw-text-red-600 tw-text-sm" v-if="supplyError.error">
          {{ supplyError.message }}
        </div>
      </div>
      <div
        v-if="collection.phases.length === 1"
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-p-4"
      >
        <div class="tw-text-white tw-font-semibold tw-capitalize tw-text-sm">
          Whitelist Sale
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
        >
          <div class="tw-text-white tw-font-semibold tw-capitalize">
            Whitelist Sale
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-flex-row md:tw-items-baseline md:tw-justify-between"
            v-if="!editingWhitelistSaleTime && !editingWhitelistSalePrice"
          >
            <div class="tw-w-full">
              <div
                class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
              >
                Whitelist Sale Time
              </div>
              <div
                class="tw-w-full tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 md:tw-justify-start"
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
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
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
              >
                <span>{{ collection.candyMachine.whitelist_price }}APT</span>
                <button
                  class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                  @click="editingWhitelistSalePrice = true"
                >
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
            v-if="editingWhitelistSaleTime"
          >
            <ValidationProvider
              class="tw-w-full md:tw-w-[60%]"
              rules="required|date"
              v-slot="{ errors }"
            >
              <input-date-picker
                placeholder="Select Whitelist Sale Time"
                v-model="editCollection.whitelistSaleTime"
              />
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between md:tw-justify-end md:tw-gap-4"
            >
              <button-primary
                title="Cancel"
                @click="editingWhitelistSaleTime = false"
                :bordered="true"
              />
              <button-primary
                title="Save Changes"
                @click="checkChangeCondition('whitelist_sale_time')"
                :loading="savingChanges"
              />
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
            v-if="editingWhitelistSalePrice"
          >
            <ValidationProvider
              class="tw-w-full md:tw-w-[60%]"
              rules="required|number"
              v-slot="{ errors }"
            >
              <input-text-field
                placeholder="Whitelist Sale Price"
                v-model="editCollection.whitelistPrice"
              >
                <template #append-icon>
                  <img :src="aptIcon" alt="apt icon" />
                </template>
              </input-text-field>
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>

            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between md:tw-justify-end md:tw-gap-4"
            >
              <button-primary
                title="Cancel"
                @click="editingWhitelistSalePrice = false"
                :bordered="true"
              />
              <button-primary
                title="Save Changes"
                @click="checkChangeCondition('whitelist_sale_price')"
                :loading="savingChanges"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-p-4"
        v-if="collection.phases.length > 1"
      >
        <div class="tw-w-full tw-flex tw-flex-row tw-justify-between">
          <h3 class="tw-text-sm tw-font-semibold">Mint Phases</h3>
          <button
            class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
            @click="editingPhases = true"
            v-if="!editingPhases"
          >
            <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
            <span>Edit</span>
          </button>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
          v-if="!editingPhases"
        >
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
            v-for="phase in collection.phases"
            :key="phase.id"
          >
            <div class="tw-text-white tw-font-semibold tw-capitalize">
              {{ phase.name }}
            </div>
            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-baseline tw-justify-between"
            >
              <div class="">
                <div
                  class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
                >
                  {{ phase.name }} Time
                </div>
                <div
                  class="tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
                >
                  <span> {{ formatDateTime(phase.mint_time) }}</span>
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-items-end tw-justify-end">
                <div
                  class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
                >
                  Price
                </div>
                <div
                  class="tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
                >
                  <span>{{ phase.mint_price }}APT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ValidationObserver
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
          ref="phaseForm"
          v-else
        >
          <div
            v-for="(phase, index) in editCollection.phases"
            :key="index"
            class="tw-w-full tw-rounded-lg tw-border tw-border-dark-6 tw-px-4 tw-py-5"
          >
            <div
              class="tw-flex tw-flex-col tw-gap-4 tw-items-start tw-justify-between tw-w-full"
            >
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <input-text-field
                  v-model="phase.name"
                  placeholder="Phase Name"
                  label="Phase Name"
                  :required="true"
                  :disabled="phase.id === 'whitelist'"
                />
                <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
              </ValidationProvider>
              <div
                class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
              >
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                  rules="required|saleTime"
                  v-slot="{ errors }"
                >
                  <input-date-picker
                    v-model="phase.mint_time"
                    type="datetime"
                    placeholder="Select Mint Time"
                    label="Mint Time"
                    :required="true"
                  ></input-date-picker>
                  <div class="tw-text-red-600 tw-text-sm">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  rules="required|number"
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                  v-slot="{ errors }"
                >
                  <div
                    class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 tw-w-full"
                  >
                    <input-text-field
                      label="Mint Price"
                      placeholder="Mint Price"
                      v-model="phase.mint_price"
                      :required="true"
                    >
                      <template #append-icon>
                        <img :src="aptIcon" alt="apt icon" />
                      </template>
                    </input-text-field>

                    <!-- <button
                    @click="removeMintPhase(index)"
                    class="tw-mt-8"
                    v-if="index !== editCollection.phases.length - 1"
                  >
                    <i class="bx bxs-trash tw-text-xl tw-text-dark-3"></i>
                  </button> -->
                  </div>

                  <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <!-- <button-primary
            title="Add Phase"
            @click="addPhase"
            :bordered="true"
          /> -->
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 md:tw-flex-row md:tw-items-center md:tw-justify-between"
          >
            <button-primary
              :bordered="true"
              title="Cancel"
              @click="cancelEditingPhases"
              :fullWidth="true"
            />
            <button-primary
              title="Save Changes"
              @click="editPhases"
              :loading="savingChanges"
              :fullWidth="true"
            />
          </div>
        </ValidationObserver>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-p-4"
      >
        <div class="tw-text-white tw-font-semibold tw-capitalize tw-text-sm">
          Public Sale
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5"
        >
          <div class="tw-text-white tw-font-semibold tw-capitalize">
            Public Sale
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 md:tw-flex-row md:tw-items-baseline md:tw-justify-between"
            v-if="!editingPublicSaleTime && !editingPublicSalePrice"
          >
            <div class="tw-w-full">
              <div
                class="tw-text-xs tw-font-semibold tw-text-dark-2 tw-uppercase tw-pb-1"
              >
                Public Sale Time
              </div>
              <div
                class="tw-w-full tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-2 md:tw-justify-start"
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
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
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
              >
                <span>{{ collection.candyMachine.public_sale_price }}APT</span>
                <button
                  class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-2"
                  @click="editingPublicSalePrice = true"
                >
                  <i class="bx bxs-edit-alt tw-text-dark-0 tw-text-2xl"></i>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
            v-if="editingPublicSaleTime"
          >
            <ValidationProvider
              class="tw-w-full md:tw-w-[60%]"
              rules="required|date"
              v-slot="{ errors }"
            >
              <input-date-picker
                placeholder="Select Whitelist Sale Time"
                v-model="editCollection.publicSaleTime"
              />
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between md:tw-justify-end md:tw-gap-4"
            >
              <button-primary
                title="Cancel"
                @click="editingPublicSaleTime = false"
                :bordered="true"
              />
              <button-primary
                title="Save Changes"
                @click="checkChangeCondition('public_sale_time')"
                :loading="savingChanges"
              />
            </div>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
            v-if="editingPublicSalePrice"
          >
            <ValidationProvider
              class="tw-w-full md:tw-w-[60%]"
              rules="required|number"
              v-slot="{ errors }"
            >
              <input-text-field
                placeholder="Whitelist Sale Price"
                v-model="editCollection.publicSalePrice"
              >
                <template #append-icon>
                  <img :src="aptIcon" alt="apt icon" />
                </template>
              </input-text-field>
              <div class="tw-text-sm tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>

            <div
              class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between md:tw-justify-end md:tw-gap-4"
            >
              <button-primary
                title="Cancel"
                @click="editingPublicSalePrice = false"
                :bordered="true"
              />
              <button-primary
                title="Save Changes"
                @click="checkChangeCondition('public_sale_price')"
                :loading="savingChanges"
              />
            </div>
          </div>
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
    };
  },
  async mounted() {
    this.fetchCollection();
  },
  methods: {
    async fetchCollection() {
      this.loading = true;
      const res = await getCollection(this.$route.params.id);

      this.collection = res.collection[0];

      const chainRes = await getCollectionDetails({
        candyMachineId: this.collection.candyMachine.candy_id,
        candy_object: this.collection.candyMachine.resource_account,
      });

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
        const validated = await this.$refs.phaseForm.validate();

        if (!validated) {
          return;
        }

        this.savingChanges = true;

        const sortedPhases = sortPhases(this.editCollection.phases);

        if (
          new Date(
            this.collection.candyMachine.whitelist_sale_time
          ).getTime() !== new Date(sortedPhases[0].mint_time).getTime()
        ) {
          await updateWhitelistSaleTime({
            candy_object: this.collection.candyMachine.resource_account,
            candy_machine_id: this.collection.candyMachine.candy_id,
            pre_sale_mint_time: sortedPhases[0].mint_time,
          });
        }

        if (
          this.collection.candyMachine.whitelist_price !=
          sortedPhases[0].mint_price
        ) {
          await updateWhitelistSalePrice({
            candy_object: this.collection.candyMachine.resource_account,
            candy_machine_id: this.collection.candyMachine.candy_id,
            pre_sale_price: sortedPhases[0].mint_price,
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
          message: "Minting Resumed Successfully",
          error: false,
        });
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
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
  },
};
</script>
