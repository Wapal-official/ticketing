<template>
  <div class="tw-w-full" ref="top">
    <stepper
      :steps="formSteps"
      :stepNumber="formStepNumber"
      @stepClicked="changeStep"
    >
      <v-stepper-content step="1">
        <ValidationObserver
          ref="detailForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Event Details
          </h2>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="name"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Event Name"
              :required="true"
              v-model="collection.name"
              placeholder="Event Name"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="description"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-editor
              label="Event Description"
              :required="true"
              v-model="collection.description"
              placeholder="Event Description"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <div class="tw-flex tw-gap-4">
            <ValidationProvider
              rules="required"
              name="traitType"
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
              v-slot="{ errors }"
            >
              <input-text-field
                ref="LocationInput"
                label="Location"
                placeholder="Enter Location"
                v-model="collection.location"
                :required="true"
                :autocomplete="true"
                :autocompleteType="[
                  'locality',
                  'sublocality',
                  'country',
                  'administrative_area_level_1',
                  'administrative_area_level_2',
                ]"
                @placeChanged="updateLocationPin"
              >
                <template #prepend-icon>
                  <i class="bx bx-map tw-text-white tw-text-lg"></i>
                </template>
              </input-text-field>
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              name="traitType"
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
              v-slot="{ errors }"
            >
              <input-venue-field
                ref="venueInput"
                label="Venue"
                placeholder="Enter Venue"
                v-model="collection.venue"
                :required="true"
                :autocomplete="true"
                autocompleteType="establishment"
                :locationBias="venueBounds"
                @placeChanged="updateVenuePin"
              >
                <template #prepend-icon>
                  <i class="bx bx-map tw-text-white tw-text-lg"></i>
                </template>
              </input-venue-field>
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <GmapMap
            v-bind:center="mapCenter"
            :zoom="14"
            map-type-id="roadmap"
            style="
              width: 500px;
              height: 300px;
              border-radius: 3px;
              display: none;
            "
            :options="{ mapTypeControl: false, streetViewControl: false }"
          >
            <GmapMarker
              v-for="(m, index) in markers"
              v-bind:key="index"
              v-bind:position="m.position"
              v-bind:clickable="true"
            />
          </GmapMap>
          <ValidationProvider
            rules="email|required"
            name="email"
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
            v-slot="{ errors }"
          >
            <input-text-field
              label="E-mail"
              placeholder="E-mail"
              :required="true"
              v-model="collection.email"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="twitter"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Twitter Link"
              v-model="collection.twitter"
              placeholder="Twitter Link"
            />
            <div class="tw-text-red-600 tw-text-sm">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="discord"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Discord Link"
              v-model="collection.discord"
              placeholder="Discord Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="website"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Website Link"
              v-model="collection.website"
              placeholder="Website Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="instagram"
            rules="link"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Instagram Link"
              v-model="collection.instagram"
              placeholder="Instagram Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            <div class="tw-text-red-600 tw-text-sm" v-if="socialError">
              {{ socialErrorMessage }}
            </div>
          </ValidationProvider>
          <!-- <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="tweetLength"
            rules="tweetLength"
            v-slot="{ errors }"
          >
            <input-text-area
              label="Tweet Template (Optional)"
              v-model="collection.tweet"
              placeholder="Craft your tweetable moment! It's shareable on Twitter after minting your NFT."
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider> -->
          <div class="tw-flex tw-gap-5 tw-justify-end">
            <div class="tw-w-auto">
              <button-primary
                title="Draft"
                @click="saveDraft()"
                :bordered="true"
                class="tw-border-white"
              />
            </div>
            <div class="tw-w-auto !tw-text-black">
              <button-primary
                class="!tw-text-black"
                title="Next"
                @click="validateFormForNextStep"
              />
            </div>
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="2">
        <ValidationObserver
          ref="tokenDetailForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Ticket Details
          </h2>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="tokenName"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              :required="true"
              label="Ticket Name"
              v-model="collection.tokenName"
              placeholder="Ticket Name"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="tokenDescription"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-area
              :required="true"
              label="Ticket Description"
              v-model="collection.tokenDesc"
              placeholder="Ticket Description"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <!-- <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
          >
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="type"
              rules="required"
              v-slot="{ errors }"
            >
              <input-auto-complete
                :required="true"
                label="NFT Type"
                v-model="collection.type"
                placeholder="Select NFT Type"
                :items="nftType"
                text="name"
                itemValue="id"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="royalty_percentage"
              rules="required|percentage"
              v-slot="{ errors }"
            >
              <input-text-field
                :required="true"
                label="Royalty Percentage"
                v-model="collection.royalty_percentage"
                placeholder="Eg. 4"
                :showPercentage="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div> -->
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
            v-if="collection.type !== '1-1'"
          >
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="mint_time"
              rules="required"
              v-slot="{ errors }"
            >
              <input-date-picker
                :required="true"
                label="Event Live In"
                v-model="collection.public_sale_time"
                placeholder="Date"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="mint_price"
              rules="required|custom_numeric"
              v-slot="{ errors }"
            >
              <input-text-field
                :required="true"
                label="Ticket Price"
                v-model="collection.public_sale_price"
                placeholder="Eg. 1"
                type="number"
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
          </div>

          <div
            v-for="(attribute, index) in collection.attributes"
            :key="index"
            class="tw-w-full"
          >
            <div
              class="tw-flex tw-flex-col tw-gap-6 tw-items-start tw-justify-between tw-w-full md:tw-flex-row"
            >
              <!-- <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input-text-field
                      v-model="attribute.trait_type"
                      placeholder="Attribute Type"
                      label="Attribute Type"
                      :required="true"
                    />
                    <div class="tw-text-red-600 tw-text-sm">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider> -->
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <input-text-field
                  v-model="attribute.value"
                  placeholder="Vip Ticket"
                  label="Ticket Type"
                  :required="true"
                />

                <div class="tw-text-red-600 tw-text-sm">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <button
                v-if="index !== 0"
                @click="removeAttribute(index)"
                class="tw-mt-10"
              >
                <i class="bx bxs-trash tw-text-xl tw-text-dark-3"></i>
              </button>
            </div>
          </div>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-w-full lg:tw-w-[540px]"
          >
            <button-primary
              title="Add Type"
              :bordered="true"
              @click="addAttribute"
              class="tw-inline-flex tw-items-center tw-px-3 tw-py-2 tw-gap-2 tw-border-t tw-border-gray-300 tw-rounded-tl-lg tw-w-auto"
            >
              <template #prepend-icon>
                <i class="bx bx-plus tw-text-xl tw-pr-4"></i>
              </template>
            </button-primary>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
            v-if="collection.type !== '1-1'"
          >
            <!-- <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
              rules="required"
              v-slot="{ errors }"
            >
              <input-text-field
                v-model="collection.public_mint_limit"
                label="Mint Limit (0 for unlimited mint)"
                :required="true"
                placeholder="Eg. 10"
              />
              <div class="tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider> -->
            <ValidationProvider
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
              rules="required"
              v-slot="{ errors }"
              v-if="collection.type === 'limited-edition'"
            >
              <input-text-field
                v-model="collection.supply"
                label="Supply"
                :required="true"
                placeholder="Eg. 2"
              />
              <div class="tw-text-red-600">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <!-- <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
            rules="required"
            v-slot="{ errors }"
          >
            <input-auto-complete
              :required="true"
              label="Coin Type"
              v-model="collection.coinType"
              placeholder="Select Coin Type"
              :items="coinTypes"
              text="name"
              itemValue="id"
            />
            <div class="tw-text-red-600">{{ errors[0] }}</div>
          </ValidationProvider> -->
          <div class="select-type tw-mb-3">
            <div class="tw-mb-3">Select your file type:</div>
            <div class="select-type-radio tw-flex tw-justify-between">
              <div>
                <input
                  type="radio"
                  id="image"
                  name="fileType"
                  value="Image"
                  v-model="selectedFileType"
                  class="radio-input tw-gap-8"
                />
                <label for="image">Image</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="video"
                  name="fileType"
                  value="Video"
                  v-model="selectedFileType"
                  class="radio-input"
                />
                <label for="video">Video</label>
              </div>
              <!-- <div>
                <input
                  type="radio"
                  id="audio"
                  name="fileType"
                  value="Audio"
                  v-model="selectedFileType"
                  class="radio-input"
                />
                <label for="audio">Audio</label>
              </div> -->
            </div>
          </div>

          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          >
            <input-image-drag-and-drop
              :label="'Featured ' + value + selectedFileType"
              :required="true"
              :selectedType="selectedFileType"
              @cancel="clearFile"
              @fileSelected="selectImage"
              @fileSelectedThumbnail="thumbnailSelected"
              :thumbnail="collection.thumbnail"
              fileSize="Upto 15 MB"
              :file="collection.image"
              :previewUrl="collection.image"
            />
            <div class="tw-text-red-600 tw-text-sm" v-if="imageError">
              {{ imageErrorMessage }}
            </div>
          </ValidationProvider>
          <div class="tw-flex tw-gap-5 tw-justify-end">
            <div class="tw-w-auto">
              <button-primary
                title="Draft"
                @click="saveDraft()"
                :bordered="true"
                class="tw-border-white"
              />
            </div>
            <div class="tw-w-auto !tw-text-black">
              <button-primary
                class="!tw-text-black"
                title="Next"
                @click="submit"
              />
            </div>
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="3" class="tw-d-none">
        <ValidationObserver
          ref="attributeForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full"
        >
          <!-- <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Attributes
          </h2> -->
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-pb-14 md:tw-items-start md:tw-justify-start lg:tw-flex-row lg:tw-justify-start"
            style="position: relative"
          >
            <div
              id="image-preview"
              class="tw-h-[300px] tw-w-[300px] tw-d-none"
              style="background-color: #000"
            ></div>
            <!-- <div
              v-if="audioCheck"
              id="thumbnail-preview"
              class="audio-bg tw-h-[300px] tw-w-[300px]"
              style="background-color: #000; opacity: 0.7 !important"
            ></div> -->
            <!-- <audio-player
              v-if="audioCheck"
              class="audio-position audio-max-width"
              :audioSrc="this.audioUrl"
              style="top: 230px !important"
            ></audio-player> -->
            <!-- <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-w-full lg:tw-w-[540px]"
            > -->
            <!-- <div
                v-for="(attribute, index) in collection.attributes"
                :key="index"
                class="tw-w-full"
              >
                <div
                  class="tw-flex tw-flex-col tw-gap-6 tw-items-start tw-justify-between tw-w-full md:tw-flex-row"
                >
                  <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input-text-field
                      v-model="attribute.trait_type"
                      placeholder="Attribute Type"
                      label="Attribute Type"
                      :required="true"
                    />
                    <div class="tw-text-red-600 tw-text-sm">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full md:tw-w-1/2"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input-text-field
                      v-model="attribute.value"
                      placeholder="Value"
                      label="Value"
                      :required="true"
                    />

                    <div class="tw-text-red-600 tw-text-sm">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>

                  <button @click="removeAttribute(index)" class="tw-mt-10">
                    <i class="bx bxs-trash tw-text-xl tw-text-dark-3"></i>
                  </button>
                </div>
              </div>
              <button-primary
                title="Add Attribute"
                :bordered="true"
                @click="addAttribute"
                class="tw-my-5"
              >
                <template #prepend-icon>
                  <i class="bx bx-plus tw-text-xl tw-pr-4"></i>
                </template>
              </button-primary>
              <div class="tw-text-sm tw-text-red-600" v-if="attributeError">
                Please add at least 1 attribute
              </div>
              <div
                class="tw-w-full tw-flex tw-items-center tw-flex-row tw-justify-end"
              >
                <button-primary title="Next" @click="validateFormForNextStep" />
              </div>
            </div> -->
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="4" class="tw-d-none">
        <div
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Review
          </h2>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 md:tw-items-center md:tw-justify-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start"
            style="position: relative"
          >
            <div
              id="image-review"
              class="tw-h-[300px] tw-w-[300px] tw-ml-0"
              style="background-color: #000"
            ></div>
            <div
              v-if="audioCheck"
              id="thumbnail-review"
              class="audio-bg tw-h-[300px] tw-w-[300px]"
              style="background-color: #000; opacity: 0.7 !important"
            ></div>
            <audio-player
              v-if="audioCheck"
              class="audio-position audio-max-width"
              :audioSrc="this.audioUrlReview"
              style="top: 230px !important"
            ></audio-player>
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1 lg:tw-w-[540px]"
            >
              <h1
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 tw-font-medium tw-pb-2"
              >
                {{ collection.name }}
                <i class="bx bxs-badge-check tw-text-xl tw-text-primary-1"></i>
              </h1>
              <h2 class="tw-text-white tw-text-[1.375em] tw-font-medium">
                {{ collection.tokenName }}
              </h2>
              <div class="tw-pb-4 tw-text-dark-0 tw-text-sm">
                {{ collection.tokenDesc }}
              </div>

              <div
                class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5 tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-start md:tw-justify-between"
              >
                <div
                  class="tw-w-full tw-flex tw-flex-col tw-items-stat tw-justify-start tw-gap-3"
                >
                  <div>
                    <div
                      class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                    >
                      Royalties
                    </div>
                    <div
                      class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
                    >
                      {{ collection.royalty_percentage }}%
                    </div>
                  </div>
                </div>
                <div
                  class="tw-w-full tw-flex tw-flex-col tw-items-stat tw-justify-start md:tw-items-end md:tw-justify-end"
                >
                  <div
                    class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                  >
                    Edition
                  </div>
                  <div
                    class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
                  >
                    {{ getSelectedType }}
                  </div>
                </div>
              </div>
              <div class="tw-w-full tw-pt-2" v-if="collection.type !== '1-1'">
                <nft-mint-phase-box
                  :phase="{
                    name: 'Ticket Sale',
                    mint_time: collection.public_sale_time,
                    mint_price: collection.public_sale_price,
                  }"
                  :coinType="collection.coinType"
                />
              </div>

              <div
                class="tw-w-full tw-flex tw-items-center tw-flex-row tw-justify-end tw-py-5"
              >
                <button-primary title="Create" @click="submit" />
              </div>
            </div>
          </div>
        </div>
      </v-stepper-content>
    </stepper>
    <reusable-progress-modal
      :showProgressModal="createEditionModal"
      :showClose="showCloseModal"
      :progress="progress"
      :error="error"
      :steps="getSteps"
      :name="getName"
      :description="getDescription"
      @closeProgressModal="createEditionModal = false"
    />
  </div>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email } from "vee-validate/dist/rules";
import {
  uploadAndCreateFile,
  uploadAndCreateVideoFile,
} from "@/services/AuctionService";
import {
  createCollectionV2,
  mintCollection,
} from "@/services/AptosCollectionService";
import { createCollection } from "@/services/CollectionService";

import axios from "axios";
import {
  createDraft,
  sortPhases,
  getDraftById,
  editDraft,
  editImage,
  getDraftByIdInCreatorStudio,
} from "@/services/CollectionService";
import { getAvailableCoinTypes, getCoinType } from "@/utils/getCoinType";

extend("custom_numeric", {
  validate(value) {
    return !isNaN(value) && value >= 0;
  },
  message: "Please enter a valid number.",
});

extend("percentage", {
  validate(value) {
    const getDecimalVal = value.toString().indexOf(".");
    if (getDecimalVal < 1) {
      return true;
    }
    const decimalPart = value.toString().substring(getDecimalVal + 1);
    if (decimalPart.length > 1) {
      return false;
    }
    return true;
  },
  message: "Please enter only one decimal point in percentage",
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

extend("email", {
  ...email,
  message: "Please enter a valid email address",
});

extend("tweetLength", {
  validate(value) {
    if (value.length > 256) {
      return false;
    }
    return true;
  },
  message: "This field must not exceed 256 characters",
});

export default {
  layout: "dashboard",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: { draft: { type: Boolean, default: false } },
  data() {
    return {
      mapCenter: { lat: 27.7172, lng: 85.324 }, // Default center (Kathmandu)
      markers: [
        { position: { lat: 27.7172, lng: 85.324 } }, // Example marker
      ],
      venueBounds: {
        north: 27.788, // These bounds define the Kathmandu area; adjust as needed
        south: 27.664,
        east: 85.514,
        west: 85.254,
      },
      selectedFileType: "Image",
      selectedLocation: null,
      selectedLocation: null,
      venueBounds: null,
      step: 1,
      collection: {
        location: "",
        venue: "",
        email: "",
        name: "",
        description: "",
        image: "",
        thumbnail: "",
        baseURL: "",
        royalty_payee_address:
          this.$store.state.walletStore.wallet.walletAddress,
        royalty_percentage: "0", //changed
        whitelist_sale_time: null,
        public_sale_time: null,
        public_sale_price: null,
        whitelist_price: "",
        supply: "",
        twitter: "",
        discord: "",
        website: "",
        instagram: "",
        resource_account: "",
        txnhash: "",
        un: "",
        candy_id: process.env.CANDY_MACHINE_V2,
        tokenName: "",
        tokenDesc: "",
        attributes: [{ trait_type: "ticket type", value: "" }],
        twitter: "",
        instagram: "",
        discord: "",
        website: "",
        type: "ticket-open-edition", //changed
        public_mint_limit: "0", //changed
        seedz: false,
        coinType: "APT",
        tweet: "",
      },
      saveAsDraft: false,
      metadata: null,
      attribute: "",
      value: "",
      loading: false,
      valid: true,
      activePicker: "",
      startMenu: false,
      endMenu: false,
      file: null,
      image: { name: null },
      thumbnail: { name: null },
      imageError: false,
      imageErrorMessage: "",
      attributeError: false,
      createEditionModal: false,
      progress: 0,
      showCloseModal: false,
      error: false,
      oneOnOneSteps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Events" },
        { step: 3, name: "Minting Collection" },
      ],
      limitedEditionSteps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Events" },
      ],
      openEditionSteps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Events" },
      ],
      nftType: [
        //{ name: "One on One", id: "1-1" },
        // { name: "Limited Edition", id: "limited-edition" },
        { name: "ticket-open-edition", id: "open-edition" },
      ],
      folderInfo: null,
      folders: [],
      image: { name: null },
      coinTypes: getAvailableCoinTypes(),
      coinType: "APT",
      socialError: false,
      socialErrorMessage: "",
      // formSteps: ["Details", "Token", "Attributes", "Review"],  copy
      formSteps: ["Details", "Create Ticket"],
      formStepNumber: 1,
      checkVideo: false,
      audioUrl: "",
      audioUrlReview: "",
      audioCheck: false,
    };
  },
  watch: {
    startMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
    },
    endMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
    },
    formStepNumber() {
      const container = document.getElementById("container");
      container?.scrollTo(0, 0);
    },
  },
  computed: {
    quotedImage() {
      return `'${this.collection.image}'`; // Quote the URL as a string
    },

    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    selectedNft() {
      return this.$store.state.auction.selectedNft;
    },
    getSteps() {
      if (this.collection.type === "1-1") {
        return this.oneOnOneSteps;
      } else if (this.collection.type === "limited-edition") {
        return this.limitedEditionSteps;
      } else {
        return this.openEditionSteps;
      }
    },
    getName() {
      return "Create events";
    },
    getDescription() {
      return `Please review and approve up to ${this.getSteps.length} transactions in your wallet window to create your edition.`;
    },
    getSelectedType() {
      let selectedType = "1/1";

      switch (this.collection.type) {
        case "1-1":
          selectedType = "1/1";
          break;
        case "ticket-open-edition":
          selectedType = "open-edition";
          break;
        case "limited-edition":
          selectedType = "Limited Edition";
          break;
        default:
          break;
      }

      return selectedType;
    },
    selectedCoinType() {
      return getCoinType(this.collection.coinType);
    },
  },
  async mounted() {
    if (this.draft) {
      this.loading = true;
    }
    console.log(this.draft);
    if (this.draft) {
      await this.setCollectionDataFromDraft();
    }
    this.loading = false;
    console.log(this.collection, "this.draft");
  },

  methods: {
    updateLocationPin(place) {
      const location = place.geometry.location;
      (this.mapCenter = { lat: location.lat(), lng: location.lng() }),
        (this.zoomLevel = 15),
        (this.markers = []);

      const viewport = place.geometry.viewport;
      if (viewport) {
        this.venueBounds = {
          north: viewport.getNorthEast().lat(),
          south: viewport.getSouthWest().lat(),
          east: viewport.getNorthEast().lng(),
          west: viewport.getSouthWest().lng(),
        };
      }
    },

    updateVenuePin(place) {
      const location = place.geometry.location;
      this.mapCenter = { lat: location.lat(), lng: location.lng() };
      (this.zoomLevel = 15),
        (this.markers = [
          { position: { lat: location.lat(), lng: location.lng() } },
        ]);
    },

    saveStart(date) {
      this.$refs.startmenu.save(date);
    },
    saveEnd(date) {
      this.$refs.endmenu.save(date);
    },
    async nextStep() {
      this.imageError = false;
      if (!this.file) {
        this.imageError = true;
        this.imageErrorMessage = "Please Select an Image";
        return;
      }

      this.socialError = false;

      const socials = [
        this.collection.twitter,
        this.collection.discord,
        this.collection.website,
        this.collection.instagram,
      ];
      let counter = 0;

      socials.map((social) => {
        if (social) {
          counter++;
        }
      });

      if (counter <= 1) {
        this.socialError = true;
        this.socialErrorMessage = "Please Fill up at least 2 social links";

        return;
      }

      this.step = 2;
    },
    addAttribute() {
      this.collection.attributes.push({
        trait_type: "ticket type",
        value: "",
      });
    },
    removeAttribute(index) {
      this.collection.attributes.splice(index, 1);
    },
    displayImage() {
      console.log("Displaying image:", this.collection.image);
      const previewElement = document.getElementById("image-preview");
      const reviewElement = document.getElementById("image-review");

      if (!previewElement || !reviewElement) {
        console.error("Preview or review element not found");
        return;
      }

      const imageUrl = this.collection.image;

      const imageHtml = `
    <img 
      src="${imageUrl}" 
      class="tw-w-full tw-h-full tw-object-cover tw-max-h-[300px] tw-rounded" 
      alt="Preview" 
      onerror="this.onerror=null; this.src='/path/to/fallback-image.jpg'; console.error('Image load error:', this.src);" 
    />`;

      previewElement.innerHTML = imageHtml;
      reviewElement.innerHTML = imageHtml;
    },
    displayThumbnail(file) {
      if (!file) {
        console.error("File is null or undefined.");
        return;
      }

      const previewImgElement = document.createElement("img");
      const reviewImgElement = document.createElement("img");

      try {
        previewImgElement.src = reviewImgElement.src =
          URL.createObjectURL(file);
      } catch (error) {
        console.error("Error creating object URL:", error);
        return;
      }

      previewImgElement.classList.add(
        "tw-w-full",
        "tw-h-full",
        "tw-object-fill",
        "tw-max-h-[300px]",
        "tw-rounded"
      );
      reviewImgElement.classList.add(
        "tw-w-full",
        "tw-h-full",
        "tw-object-fill",
        "tw-max-h-[300px]",
        "tw-rounded"
      );

      const previewElement = document.getElementById("thumbnail-preview");
      const reviewElement = document.getElementById("thumbnail-review");

      if (!previewElement || !reviewElement) {
        console.error("Thumbnail preview or review element is null.");
        return;
      }

      while (previewElement.firstChild) {
        previewElement.removeChild(previewElement.firstChild);
      }
      while (reviewElement.firstChild) {
        reviewElement.removeChild(reviewElement.firstChild);
      }

      previewElement.prepend(previewImgElement);
      reviewElement.prepend(reviewImgElement);
    },

    displayVideo() {
      const previewVideoElement = document.createElement("video");
      const reviewVideoElement = document.createElement("video");

      previewVideoElement.src = reviewVideoElement.src = URL.createObjectURL(
        this.file
      );
      previewVideoElement.autoplay = reviewVideoElement.autoplay = false;
      previewVideoElement.muted = reviewVideoElement.muted = false;
      previewVideoElement.loop = reviewVideoElement.loop = true;
      previewVideoElement.playsInline = reviewVideoElement.playsInline = true;
      previewVideoElement.preload = reviewVideoElement.preload = "metadata";
      previewVideoElement.controls = reviewVideoElement.controls = true;

      previewVideoElement.classList.add("tw-w-full");
      previewVideoElement.classList.add("tw-h-full");
      previewVideoElement.classList.add("tw-object-fill");
      previewVideoElement.classList.add("tw-max-h-[300px]");
      previewVideoElement.classList.add("tw-rounded");

      reviewVideoElement.classList.add("tw-w-full");
      reviewVideoElement.classList.add("tw-h-full");
      reviewVideoElement.classList.add("tw-object-fill");
      reviewVideoElement.classList.add("tw-max-h-[300px]");
      reviewVideoElement.classList.add("tw-rounded");

      const previewElement = document.getElementById("image-preview");
      const reviewElement = document.getElementById("image-review");

      while (previewElement.firstChild) {
        previewElement.removeChild(previewElement.firstChild);
      }

      while (reviewElement.firstChild) {
        reviewElement.removeChild(reviewElement.firstChild);
      }

      previewElement.prepend(previewVideoElement);
      reviewElement.prepend(reviewVideoElement);
    },

    displayAudio() {
      const previewVideoElement = document.createElement("audio");
      const reviewVideoElement = document.createElement("audio");

      previewVideoElement.src = reviewVideoElement.src = URL.createObjectURL(
        this.file
      );
      previewVideoElement.autoplay = false;
      previewVideoElement.controls = true;
      previewVideoElement.muted = true;
      previewVideoElement.preload = reviewVideoElement.preload = "metadata";

      previewVideoElement.classList.add("tw-w-full");
      previewVideoElement.classList.add("tw-h-full");
      previewVideoElement.classList.add("tw-object-fill");
      previewVideoElement.classList.add("tw-max-h-[200px]");
      previewVideoElement.classList.add("tw-rounded");
      previewVideoElement.classList.add("audio-bg-opacity");

      reviewVideoElement.classList.add("tw-w-full");
      reviewVideoElement.classList.add("tw-h-full");
      reviewVideoElement.classList.add("tw-object-fill");
      reviewVideoElement.classList.add("tw-max-h-[200px]");
      reviewVideoElement.classList.add("tw-rounded");
      reviewVideoElement.classList.add("audio-bg-opacity");

      const previewElement = document.getElementById("image-preview");
      const reviewElement = document.getElementById("image-review");

      while (previewElement.firstChild) {
        previewElement.removeChild(previewElement.firstChild);
      }

      while (reviewElement.firstChild) {
        reviewElement.removeChild(reviewElement.firstChild);
      }
      this.audioUrl = previewVideoElement.src;
      this.audioUrlReview = previewVideoElement.src;
    },
    getAudioFileType(fileName) {
      const extension = fileName.split(".").pop().toLowerCase();
      const audioExtensions = [
        "mp3",
        "wav",
        "ogg",
        "aac",
        "flac",
        "wma",
        "alac",
        "aiff",
        "opus",
      ];

      if (audioExtensions.includes(extension)) {
        return "." + extension;
      } else {
        return;
      }
    },
    getFileExtension(fileName) {
      const parts = fileName.split(".");
      return parts[parts.length - 1];
    },
    clearFile() {
      his.$set(this.collection, "image", "");
      this.file = null;
      this.thumbnail = { name: null };
    },
    selectImage(file) {
      if (file instanceof File) {
        this.file = file;
        this.$set(this.collection, "image", URL.createObjectURL(file));
      } else if (typeof file === "string") {
        // Remove quotes if present
        const cleanUrl = file.replace(/^"|"$/g, "");
        if (cleanUrl.startsWith("http")) {
          this.file = cleanUrl;
          this.$set(this.collection, "image", cleanUrl);
        } else {
          console.error("Invalid URL:", file);
          this.$toast.showMessage({
            message: "Invalid URL",
            error: true,
          });
          return;
        }
      } else {
        console.error("Invalid file type:", file);
        this.$toast.showMessage({
          message: "Invalid file type",
          error: true,
        });
        return;
      }
    },
    thumbnailSelected(file) {
      this.thumbnail = file;
      if (Math.floor(this.thumbnail.size / (1024 * 1024)) >= 15) {
        this.imageError = true;
        this.imageErrorMessage = "Please Upload Image less than 15MB";
      } else {
        this.imageError = false;
      }
      if (file.name) {
        this.displayThumbnail(file);
      }
    },
    isImage(source) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp",
            "svg",
            "ico",
            "tiff",
          ].includes(extension)
        : false;
    },
    isVideo(source) {
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
            "mpeg",
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
    isAudio(source) {
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
          ].includes(extension)
        : false;
    },
    async submit() {
      console.log("Submit function called");
      const validate = await this.$refs.attributeForm.validate();
      console.log("Validation result:", validate);

      if (!validate) {
        console.log("Validation failed");
        return;
      }
      if (!this.collection.type) {
        console.warn(
          "Collection type is undefined, setting default to open-edition"
        );
        this.collection.type = "ticekt-open-edition";
      }
      if (!this.collection.coinType) {
        console.warn("Coin type is undefined, setting default to APT");
        this.collection.coinType = "APT";
      }

      console.log("Collection type:", this.collection.type);
      console.log("Coin type:", this.collection.coinType);

      this.checkCoinType();
      console.log("Collection type:", this.collection.type);
      console.log("Coin type:", this.collection.coinType);

      switch (this.collection.type) {
        case "1-1":
          await this.createOneOnOneCollection();
          break;
        case "ticekt-open-edition":
          await this.createOpenEdition();
          break;
        case "limited-edition":
          await this.createLimitedEdition();
          break;
        default:
          break;
      }
    },
    async createOneOnOneCollection() {
      try {
        if (!this.collection.attributes.length > 0) {
          throw new Error("Please provide at least one attribute");
        }

        this.error = false;
        this.loading = true;
        this.createEditionModal = true;

        this.progress = 1;
        let metadataUri = null;
        metadataUri = this.metadata = await this.uploadImageAndMetadata();

        this.collection.baseURL = metadataUri.metaUri
          ? metadataUri.metaUri
          : metadataUri;

        let mintTime = Math.floor(new Date().getTime() / 1000) + 30;

        this.progress = 2;

        const candyMachineArguments = {
          collection_name: this.collection.name,
          collection_description: this.collection.description,
          baseuri: this.collection.baseURL,
          royalty_payee_address: this.collection.royalty_payee_address,
          royalty_points_denominator: 1000,
          royalty_points_numerator: this.collection.royalty_percentage * 10,
          presale_mint_time: mintTime,
          public_sale_mint_time: mintTime + 1,
          presale_mint_price: 0,
          public_sale_mint_price: 0,
          total_supply: 1,
          public_mint_limit: 0,
          is_open_edition: false,
          coinType: this.collection.coinType,
          isRandom: true,
        };

        const res = await createCollectionV2(candyMachineArguments);

        const resource_account = res.resourceAccount;
        const txnhash = res.transactionHash;

        //mint
        setTimeout(async () => {
          try {
            this.progress = 3;

            const mint = await mintCollection({
              candy_machine_id: this.collection.candy_id,
              candy_object: resource_account,
              amount: 1,
              publicMint: true,
            });

            this.$toast.showMessage({
              message: "1/1 Collection Minted Successfully",
            });

            this.$router.push("/dashboard/edition/one-one");
          } catch (error) {
            console.log(error);
            this.loading = false;
            this.error = true;
            this.showCloseModal = true;
            this.$toast.showMessage({ message: error, error: true });
          }
        }, 30000);
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.error = true;
        this.showCloseModal = true;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    checkFileType(fileName) {
      const fileExtension = fileName.split(".").pop().toLowerCase();
      const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "bmp",
        "svg",
        "ico",
        "tiff",
      ];
      const videoExtensions = [
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
        "mpeg",
        "mpg",
        "divx",
        "rm",
        "asf",
        "vob",
        "ts",
        "m2ts",
      ];
      const audioExtensions = ["mp3", "ogg", "wav", "webm", "aac", "flac"];

      if (imageExtensions.includes(fileExtension)) {
        return "image";
      } else if (videoExtensions.includes(fileExtension)) {
        return "video";
      } else if (audioExtensions.includes(fileExtension)) {
        return "audio";
      } else {
        return "image";
      }
    },
    async validateFormForNextStep() {
      this.attributeError = false;
      this.socialError = false;
      this.imageError = false;
      switch (this.formStepNumber) {
        case 1:
          const detailValidated = await this.$refs.detailForm.validate();

          if (!detailValidated) {
            break;
          }

          this.socialError = false;

          this.socialError = false;

          const socials = [
            this.collection.twitter,
            this.collection.discord,
            this.collection.website,
            this.collection.instagram,
          ];
          let counter = 0;

          socials.map((social) => {
            if (social) {
              counter++;
            }
          });

          if (counter <= 1) {
            this.socialError = true;
            this.socialErrorMessage = "Please Fill up at least 2 social links";

            break;
          }

          this.formStepNumber++;
          break;

        case 2:
          const tokenValidated = await this.$refs.tokenDetailForm.validate();

          if (!tokenValidated) {
            break;
          }

          if (!this.file || !this.file.name) {
            this.imageError = true;
            this.imageErrorMessage = "Please select an image for collection";
            break;
          }
          const fileType = this.checkFileType(this.file.name);
          if (fileType === "video" || fileType === "audio") {
            console.log("fileee", this.file.name);
            console.log("fileee", this.thumbnail);

            if (!this.thumbnail.name && !this.file.name) {
              this.imageError = true;
              this.imageErrorMessage =
                "Please select an thumbnail for collection";
              return;
            }
          }
          if (this.imageError) {
            return;
          }
          this.formStepNumber++;
          break;
        case 3:
          if (this.collection.attributes.length < 1) {
            this.attributeError = true;
            break;
          }

          const validate = await this.$refs.attributeForm.validate();

          if (!validate) {
            break;
          }
          this.formStepNumber++;
          break;
        default:
          break;
      }
    },
    changeStep(step) {
      this.formStepNumber = step;
    },
    formatDate(date) {
      return date;
    },
    async createOpenEdition() {
      try {
        this.error = false;
        this.loading = true;
        this.createEditionModal = true;

        this.progress = 1;

        await this.createOpenEditionInChain();

        console.log("temp", this.collection);
        const tempCollection = structuredClone(this.collection);

        tempCollection.public_sale_time = new Date(
          tempCollection.public_sale_time
        ).toISOString();

        const metadataRes = await axios.get(this.collection.baseURL);

        const metadata = metadataRes.data;

        const imageUrl = metadata.image;
        let videoUrl;
        if (metadata.properties) {
          videoUrl = this.metadata.videoUri;
        }
        const formData = new FormData();

        formData.append("name", tempCollection.name);
        formData.append("description", tempCollection.description);
        formData.append(
          "royalty_percentage",
          tempCollection.royalty_percentage
        );
        formData.append(
          "royalty_payee_address",
          tempCollection.royalty_payee_address
        );
        formData.append(
          "whitelist_sale_time",
          tempCollection.public_sale_mint_time
        );
        formData.append("public_sale_time", tempCollection.public_sale_time);
        formData.append("public_sale_price", tempCollection.public_sale_price);
        formData.append("whitelist_price", tempCollection.public_sale_price);
        formData.append("supply", tempCollection.supply);
        formData.append("twitter", tempCollection.twitter);

        formData.append("discord", tempCollection.discord);
        formData.append("website", tempCollection.website);
        formData.append("instagram", tempCollection.instagram);
        formData.append("resource_account", tempCollection.resource_account);
        formData.append("value", tempCollection.attributes.value);
        formData.append("txnhash", tempCollection.txnhash);
        formData.append("candy_id", tempCollection.candy_id);
        formData.append("phases", JSON.stringify([]));
        formData.append("attributes", JSON.stringify([]));
        formData.append("tweet", tempCollection.tweet);
        formData.append("location", tempCollection.location);
        formData.append("venue", tempCollection.venue);
        formData.append("email", tempCollection.email);
        if (videoUrl) {
          formData.append("image", imageUrl);
          formData.append("media2", videoUrl);
        } else {
          formData.append("image", imageUrl);
        }

        formData.append("isEdition", true);
        formData.append("edition", tempCollection.type);

        formData.append("seedz", JSON.stringify(tempCollection.seedz));
        formData.append("coin_type", tempCollection.coinType);

        const res = await createCollection(formData);

        this.$toast.showMessage({
          message: "Open Event Created Successfully",
          error: false,
        });

        this.$router.push("/dashboard/edition/open-edition");
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;
        this.error = true;
        this.showCloseModal = true;
      }
    },
    async uploadImageAndMetadata() {
      const aptRes = await this.$store.dispatch(
        "walletStore/getAptForFileUpload"
      );

      const transactionRes = await this.$store.dispatch(
        "walletStore/signTransactionForFileUpload",
        aptRes.requiredBalance
      );

      if (!transactionRes.success && !transactionRes.hash) {
        throw new Error("Transaction Not Successful Please Try Again");
      }
      const fileExtension = this.getFileExtension(this.file.name);
      let metaUri;
      if (this.checkVideo === true) {
        const res = await uploadAndCreateVideoFile(this.file, this.thumbnail, {
          name: this.collection.tokenName,
          description: this.collection.tokenDesc,
          attributes: this.collection.attributes,
        });
        metaUri = res.metadata + "/";
        const videoUri = res.video + "/0." + fileExtension;
        return {
          metaUri: metaUri,
          videoUri: videoUri,
          imageUri: res.image,
        };
      } else {
        metaUri =
          (await uploadAndCreateFile(this.file, {
            name: this.collection.tokenName,
            description: this.collection.tokenDesc,
            attributes: this.collection.attributes,
          })) + "/";
      }
      return metaUri;
    },
    async createOpenEditionInChain() {
      let metadataUri = null;
      metadataUri = this.metadata = await this.uploadImageAndMetadata();

      this.progress = 2;

      this.collection.baseURL = metadataUri.metaUri
        ? metadataUri.metaUri
        : metadataUri;

      const tempCollection = structuredClone(this.collection);

      const mintTime = Math.floor(
        new Date(tempCollection.public_sale_time).getTime() / 1000
      );

      const mint_price = parseFloat(
        (tempCollection.public_sale_price * Math.pow(10, 8)).toFixed(4)
      );

      const candyMachineArguments = {
        collection_name: this.collection.name,
        collection_description: this.collection.description,
        baseuri: this.collection.baseURL,
        royalty_payee_address: this.collection.royalty_payee_address,
        royalty_points_denominator: 1000,
        royalty_points_numerator: this.collection.royalty_percentage * 10,
        presale_mint_time: mintTime,
        public_sale_mint_time: mintTime + 1,
        presale_mint_price: mint_price,
        public_sale_mint_price: mint_price,
        total_supply: 1,
        public_mint_limit: 0,
        is_open_edition: true,
        coinType: this.collection.coinType,
        isRandom: true,
      };

      const res = await createCollectionV2(candyMachineArguments);

      this.collection.resource_account = res.resourceAccount;
      this.collection.txnhash = res.transactionHash;
    },
    checkCoinType() {
      const coinTypeObject = getCoinType(this.collection.coinType);

      this.collection.candy_id = coinTypeObject.candy_id;
    },
    async sendDataToCreateDraft(tempCollection) {
      const formData = new FormData();

      formData.append("name", tempCollection.name);
      formData.append("description", tempCollection.description);
      formData.append("location", tempCollection.location);
      formData.append("venue", tempCollection.venue);
      formData.append("email", tempCollection.email);
      formData.append("edition", tempCollection.type);
      formData.append("royalty_percentage", tempCollection.royalty_percentage);
      formData.append(
        "royalty_payee_address",
        tempCollection.royalty_payee_address
      );
      formData.append("edition", tempCollection.type);
      formData.append("baseURL", tempCollection.baseURL);

      // formData.append("supply", tempCollection.supply);
      formData.append("tokenName", tempCollection.tokenName);
      formData.append("tokenDesc", tempCollection.tokenDesc);
      formData.append("traitType", tempCollection.attributes.trait_type);
      formData.append("value", tempCollection.attributes.value);
      formData.append("public_sale_price", tempCollection.public_sale_price);
      formData.append("whitelist_price", tempCollection.whitelist_price);
      formData.append("twitter", tempCollection.twitter);
      formData.append("discord", tempCollection.discord);
      formData.append("website", tempCollection.website);
      formData.append("instagram", tempCollection.instagram);
      formData.append("candy_id", tempCollection.candy_id);
      formData.append("phases", JSON.stringify(tempCollection.phases));
      formData.append("isApproved", "true");
      formData.append("isEdition", JSON.stringify(false));
      formData.append("attributes", JSON.stringify(tempCollection.attributes));

      formData.append("coin_type", tempCollection.coinType);
      formData.append("tweet", tempCollection.tweet);

      if (this.file && this.file.name) {
        const fileType = this.checkFileType(this.file.name);
        console.log("File type:", fileType);
        if (fileType === "image") {
          formData.append("image", this.file);
        } else {
          formData.append("media2", this.file);
          formData.append("image", this.thumbnail);
        }
      } else {
        formData.append("image", tempCollection.image);
      }

      if (!this.publicSaleTBD) {
        formData.append("public_sale_time", tempCollection.public_sale_time);
      }

      if (!this.whitelistTBD) {
        formData.append(
          "whitelist_sale_time",
          tempCollection.whitelist_sale_time
        );
      } else {
        formData.append("whitelistTBD", "true");
      }

      // Debugging logs
      console.log("Form Data Entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      await createDraft(formData);

      this.submitting = false;

      this.message = "Draft Created Successfully";
      this.$toast.showMessage({ message: this.message, error: false });
      this.$router.push("/dashboard/collection/draft");
    },
    async setCollectionDataFromDraft() {
      try {
        this.whitelistEnabled = false;
        // this.whitelistEnabled = this.collection.whitelist_sale_time
        //   ? true
        //   : false;

        const draftRes = await getDraftByIdInCreatorStudio(
          this.$route.params.id
        );

        const draftData = draftRes.data.draft.data;

        draftData.candy_id = this.collection.candy_id;

        // try {
        //   draftData.phases = JSON.parse(draftData.phases);
        // } catch {
        //   draftData.phases = [];
        // }
        console;
        if (typeof draftData.attributes === "string") {
          try {
            draftData.attributes = JSON.parse(draftData.attributes);
          } catch (error) {
            console.error("Error parsing attributes:", error);
            draftData.attributes = [{ trait_type: "ticket type", value: "" }];
          }
        } else if (!Array.isArray(draftData.attributes)) {
          draftData.attributes = [{ trait_type: "ticket type", value: "" }];
        }

        this.collection = draftData;
        console.log("Image after setting collection:", this.collection.image);

        if (this.collection.image) {
          this.file = this.collection.image;
          this.$nextTick(() => {
            this.selectImage(this.collection.image);
          });
        }

        this.$set(this.collection, "attributes", [
          ...this.collection.attributes,
        ]);

        this.collection.phases.map((phase) => {
          phase.mint_time = new Date(phase.mint_time);
        });

        this.folders.map((folder) => {
          // if (folder.metadata.baseURI === this.collection.baseURL) {

          if (folder.metadataBaseURI === this.collection.baseURL) {
            this.baseURL = folder.folder_name;
          }
        });

        // this.whitelistTBD = JSON.parse(this.collection.whitelistTBD)
        //   ? true
        //   : false;
        this.whitelistTBD = this.collection.whitelist_sale_time ? false : true;
        this.publicSaleTBD = this.collection.public_sale_time ? false : true;

        if (this.collection.whitelist_sale_time) {
          this.collection.whitelist_sale_time = new Date(
            this.collection.whitelist_sale_time
          );
        }

        if (this.collection.public_sale_time) {
          this.collection.public_sale_time = new Date(
            this.collection.public_sale_time
          );
        }
      } catch (e) {
        console.log("error", e);
      }
    },

    async saveDraft() {
      try {
        const formData = new FormData();
        const selectedFolder = this.folders.find(
          (folder) => folder.folder_name === this.baseURL
        );
        if (selectedFolder) {
          this.collection.baseURL = selectedFolder.metadata.baseURI;
        }

        const tempCollection = structuredClone(this.collection);

        for (const key in tempCollection) {
          formData.append(
            key,
            key !== "phases"
              ? tempCollection[key]
              : JSON.stringify(tempCollection.phases)
          );
        }

        if (this.image && this.image.name) {
          const fileType = this.checkFileType(this.image.name);
          if (fileType === "image") {
            formData.append("image", this.image);
          } else {
            formData.append("media2", this.image);
            formData.append("image", this.thumbnail);
          }
        } else {
          formData.append("image", this.collection.image);
        }

        if (this.$route.params.id) {
          await editDraft(this.$route.params.id, formData);
        } else {
          await this.sendDataToCreateDraft(tempCollection);
        }

        this.$toast.showMessage({ message: "Draft Updated Successfully" });
        this.$router.push("/dashboard/collection/draft");
        setTimeout(() => {
          this.$store.commit("general/setWhitelistSetup", true);
        }, 2000);
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({
          message: "Something went wrong. Please try again",
          error: true,
        });
      }
    },
  },
};
</script>

<style scoped>
.upload-bar {
  margin: 0px 0px 30px 0px;
  width: 100%;
  border: 2px dashed #d9d9d9;
}

.v-stepper__content {
  padding: 0px !important;
}

.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.mint-auction-stepper .v-stepper__step__step {
  background: black !important;
}

@media (min-width: 1024px) and (max-width: 1200px) {
  .audio-max-width {
    max-width: 34%;
    min-width: 300px;
  }

  #image-preview,
  #image-review {
    min-width: 300px;
  }
}
.audio-bg {
  position: absolute;
  top: 0;
  padding: 0 !important;
}
.audio-bg-opacity {
  opacity: 0.7 !important;
}
.select-type {
  max-width: 50%;
}
@media (max-width: 600px) {
  .select-type {
    max-width: 100%;
  }
}
.select-type-radio div {
  display: flex;
  align-items: center;
}
.radio-input {
  width: 16px;
  height: 16px;
  border: 1px solid #383a3f;
  outline: none;
  appearance: none;
  border-radius: 50%;
  background: #25262b;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
}
.radio-input:checked {
  background-color: #8ee3fb;
}
.radio-input:checked::before {
  content: " ";
  background: #1a1b1e;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.audio-position {
  position: absolute;
  bottom: 30px;
}

.add-type-button {
  width: 122px;
  height: 44px;
  padding: 10px 12px;
  gap: 10px;
  border-radius: 4px 0 0 0;
  border-width: 1px 0 0 0;
  opacity: 0; /* This will make the button invisible */
}
</style>
