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
            Nft Collection Details
          </h2>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="name"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              label="Collection Name"
              :required="true"
              v-model="mint.colName"
              placeholder="Collection Name"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="description"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-area
              label="Collection Description"
              :required="true"
              v-model="mint.colDesc"
              placeholder="Collection Description"
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
              v-model="mint.twitter"
              placeholder="Twitter Link"
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
              v-model="mint.instagram"
              placeholder="Instagram Link"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            <div class="tw-text-red-600 tw-text-sm" v-if="socialError">
              {{ socialErrorMessage }}
            </div>
          </ValidationProvider>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
          >
            <button-primary title="Next" @click="validateFormForNextStep" />
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="2">
        <ValidationObserver
          ref="tokenDetailForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full xl:tw-w-[658px]"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Token Details
          </h2>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
            name="tokenName"
            rules="required"
            v-slot="{ errors }"
          >
            <input-text-field
              :required="true"
              label="Token Name"
              v-model="mint.tokenName"
              placeholder="Token Name"
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
              label="Token Description"
              v-model="mint.tokenDesc"
              placeholder="Token Description"
            />
            <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
          </ValidationProvider>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
          >
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="startDate"
              rules="required|auctionTime"
              v-slot="{ errors }"
            >
              <input-date-picker
                :required="true"
                label="Start Date"
                v-model="mint.startDate"
                placeholder="Auction Start Date"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="endDate"
              rules="required|endTime:@startDate"
              v-slot="{ errors }"
            >
              <input-date-picker
                :required="true"
                label="End Date"
                v-model="mint.endDate"
                placeholder="Auction End Date"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-start md:tw-justify-between"
          >
            <ValidationProvider
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
              name="minBid"
              rules="required|bidAmount"
              v-slot="{ errors }"
            >
              <input-text-field
                :required="true"
                label="Min. Bid Price"
                v-model="mint.minBid"
                placeholder="Eg. 0.5"
              >
                <template #append-icon>
                  <img :src="darkAptIcon" alt="APT" />
                </template>
              </input-text-field>
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
                v-model="mint.royalty"
                placeholder="Eg. 4"
              >
                <template #append-icon>
                  <i class="tw-text-sm">%</i>
                </template>
              </input-text-field>
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <ValidationProvider
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 dashboard-text-field-group"
          >
            <input-image-drag-and-drop
              :required="true"
              label="Image"
              :file="mint.colImage"
              @fileSelected="selectImage"
            />
            <div class="tw-text-red-600 tw-text-sm" v-if="imageError">
              {{ imageErrorMessage }}
            </div>
          </ValidationProvider>
          <div
            class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
          >
            <button-primary title="Next" @click="validateFormForNextStep" />
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="3">
        <ValidationObserver
          ref="attributeForm"
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Attributes
          </h2>
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-pb-14 md:tw-items-center md:tw-justify-center lg:tw-flex-row lg:tw-justify-start"
          >
            <div
              id="image-preview"
              class="tw-w-full tw-h-[300px] md:tw-w-[300px]"
            ></div>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-w-full lg:tw-w-[540px]"
            >
              <div
                v-for="(attribute, index) in mint.attributes"
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
              <div
                class="tw-w-full tw-flex tw-items-center tw-flex-row tw-justify-end"
              >
                <button-primary title="Next" @click="validateFormForNextStep" />
              </div>
            </div>
          </div>
        </ValidationObserver>
      </v-stepper-content>
      <v-stepper-content step="4">
        <div
          class="tw-py-4 tw-flex tw-flex-col tw-gap-4 tw-text-wapal-gray tw-w-full"
        >
          <h2 class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4">
            Review
          </h2>
          <div
            class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 md:tw-items-center md:tw-justify-center lg:tw-flex-row lg:tw-items-start lg:tw-justify-start"
          >
            <div
              id="image-review"
              class="tw-w-full tw-h-[300px] md:tw-w-[300px]"
            ></div>
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-1 lg:tw-w-[540px]"
            >
              <h1
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 tw-font-medium tw-pb-2"
              >
                {{ mint.colName }}
                <i class="bx bxs-badge-check tw-text-xl tw-text-primary-1"></i>
              </h1>
              <h2 class="tw-text-white tw-text-[1.375em] tw-font-medium">
                {{ mint.tokenName }}
              </h2>
              <div class="tw-pb-4 tw-text-dark-0 tw-text-sm">
                {{ mint.tokenDesc }}
              </div>
              <div
                class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-px-4 tw-py-5 tw-flex tw-flex-row tw-items-start tw-justify-between"
              >
                <div
                  class="tw-w-full tw-flex tw-flex-col tw-items-stat tw-justify-start tw-gap-3"
                >
                  <div>
                    <div
                      class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                    >
                      Start Date
                    </div>
                    <div class="tw-text-white tw-text-sm tw-font-semibold">
                      {{ formatDate(mint.startDate) }}
                    </div>
                  </div>
                  <div>
                    <div
                      class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                    >
                      Min Bid
                    </div>
                    <div
                      class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
                    >
                      {{ mint.minBid }} <img :src="aptIcon" />
                    </div>
                  </div>
                </div>
                <div
                  class="tw-w-full tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-3"
                >
                  <div>
                    <div
                      class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                    >
                      End Date
                    </div>
                    <div class="tw-text-white tw-text-sm tw-font-semibold">
                      {{ formatDate(mint.endDate) }}
                    </div>
                  </div>
                  <div>
                    <div
                      class="tw-text-dark-2 tw-text-xs tw-font-semibold tw-uppercase tw-leading-5"
                    >
                      Royalties
                    </div>
                    <div
                      class="tw-text-white tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1"
                    >
                      {{ mint.royalty }}%
                    </div>
                  </div>
                </div>
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
      :showProgressModal="createAuctionModal"
      :showClose="showCloseAuctionModal"
      name="Create Auction"
      description="Please review and approve up to four transactions in your wallet window to create your NFT."
      :steps="steps"
      :progress="auctionProgress"
      :error="createError"
      @closeProgressModal="createAuctionModal = false"
    />
  </div>
  <!-- <div>
    <p class="tw-text-3xl tw-text-wapal-gray !tw-font-medium">NFT Details</p>

    <v-stepper v-model="step" class="!tw-bg-transparent">
      <v-stepper-items>
        <v-stepper-content step="1">
          <p class="text-h6">Collection</p>
          <ValidationObserver ref="collectionForm" v-slot="{ handleSubmit }">
            <form
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 xl:tw-w-1/2"
              @submit.prevent="handleSubmit(nextStep)"
            >
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Collection Name</label
                >
                <reusable-text-field
                  v-model="mint.colName"
                  type="text"
                  placeholder="Collection Name"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Collection Description</label
                >
                <reusable-text-area
                  v-model="mint.colDesc"
                  placeholder="Collection Description"
                  type="text"
                ></reusable-text-area>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="link"
                v-slot="{ errors }"
              >
                <label ref="social">Twitter Link</label>
                <reusable-text-field
                  v-model="mint.twitter"
                  type="text"
                  placeholder="Twitter Link"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="link"
                v-slot="{ errors }"
              >
                <label>Instagram Link</label>
                <reusable-text-field
                  v-model="mint.instagram"
                  type="text"
                  placeholder="Instagram Link"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <div v-if="socialError" class="tw-text-red-600">
                {{ socialErrorMessage }}
              </div>
              <p class="text-h6">Token Details</p>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Token Name</label
                >
                <reusable-text-field
                  v-model="mint.tokenName"
                  placeholder="Token Name"
                  type="text"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label
                  class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                  >Token Description</label
                >
                <reusable-text-area
                  v-model="mint.tokenDesc"
                  placeholder="Token Description"
                  type="text"
                ></reusable-text-area>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <div
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
              >
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|auctionTime"
                  name="auction_start"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >Start Date</label
                  >
                  <reusable-date-picker
                    v-model="mint.startDate"
                    placeholder="Select Auction Start Time"
                    type="datetime"
                  />
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|endTime:@auction_start"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >End Date</label
                  >
                  <reusable-date-picker
                    v-model="mint.endDate"
                    placeholder="Select Auction End Time"
                    type="datetime"
                  />
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-w-full tw-gap-4 md:tw-flex-row md:tw-items-start md:tw-justify-between"
              >
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|bidAmount"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >Min. Bid in Apt</label
                  >
                  <reusable-text-field
                    v-model="mint.minBid"
                    placeholder="Eg. 1"
                    type="text"
                  ></reusable-text-field>
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
                <ValidationProvider
                  class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                  rules="required|percentage"
                  v-slot="{ errors }"
                >
                  <label
                    class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2"
                    >Royalties Fees in Percent</label
                  >
                  <reusable-text-field
                    v-model="mint.royalty"
                    type="text"
                    placeholder="Eg. 2"
                  ></reusable-text-field>
                  <div class="tw-text-red-600">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div class="upload-bar tw-w-full" id="drop-container">
                <v-col style="padding: 30px" align="center">
                  <img :src="uploadIcon" alt="upload" /><br />
                  <small>Drag And Drop Your Files Here</small><br />
                  <small>OR</small><br />
                  <button
                    class="tw-px-6 tw-py-2 tw-rounded tw-bg-wapal-gray tw-text-black"
                    @click.prevent="$refs.imageUploader.click()"
                    v-if="file == null"
                  >
                    Browse
                  </button>
                  <button
                    class="tw-px-6 tw-py-2 tw-rounded tw-bg-wapal-gray tw-text-black"
                    @click.prevent="$refs.imageUploader.click()"
                    v-else
                  >
                    {{ file.name }}
                  </button>
                  <div v-if="imageError" class="tw-text-red-600">
                    {{ imageErrorMessage }}
                  </div>
                </v-col>
              </div>
              <input
                ref="imageUploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="selectImage"
              />
              <reusable-theme-button title="Next" />
            </form>
          </ValidationObserver>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="text-h6 tw-py-2">NFT</div>
          <div
            class="tw-w-full tw-grid tw-grid-cols-1 tw-gap-8 md:tw-grid-cols-2"
          >
            <div class="tw-w-full" id="image-preview"></div>
            <ValidationObserver v-slot="{ handleSubmit }" ref="attributeForm">
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label>Name</label>
                <reusable-text-field
                  v-model="mint.tokenName"
                  type="text"
                  :disabled="true"
                ></reusable-text-field>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <ValidationProvider
                class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                rules="required"
                v-slot="{ errors }"
              >
                <label>Description</label>
                <reusable-text-area
                  v-model="mint.tokenDesc"
                  type="text"
                  :readOnly="true"
                ></reusable-text-area>
                <div class="tw-text-red-600">{{ errors[0] }}</div>
              </ValidationProvider>
              <form @submit.prevent="handleSubmit()">
                <div class="tw-pb-2">Add Attributes</div>
                <div
                  class="tw-w-full"
                  v-for="(attribute, index) in mint.attributes"
                  :key="index"
                >
                  <div
                    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-start md:tw-justify-between md:tw-gap-4"
                  >
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2 tw-text-sm"
                        >Attribute Type</label
                      >
                      <reusable-text-field
                        v-model="attribute.trait_type"
                        type="text"
                        placeholder="Background"
                      ></reusable-text-field>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                    <ValidationProvider
                      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 dashboard-text-field-group tw-w-full"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        class="after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2 tw-text-sm"
                        >Value</label
                      >
                      <div
                        class="tw-flex tw-flex-row tw-items-baseline tw-justify-start tw-gap-2"
                      >
                        <reusable-text-field
                          v-model="attribute.value"
                          type="text"
                          placeholder="Blue"
                        ></reusable-text-field>
                        <button
                          class="tw-bg-transparent !tw-border !tw-border-solid !tw-border-wapal-pink tw-text-white tw-px-4 tw-py-2 tw-mb-4 tw-rounded-lg"
                          @click.prevent="removeAttribute(index)"
                        >
                          <v-icon>mdi-trash-can</v-icon>
                        </button>
                      </div>
                      <div class="tw-text-red-600">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                </div>
                <button
                  class="tw-bg-transparent !tw-border !tw-border-solid !tw-border-wapal-pink tw-text-white tw-px-6 tw-py-2 tw-mb-4 tw-rounded-lg"
                  @click.prevent="addAttribute"
                >
                  <v-icon class="!tw-text-white !tw-pr-2">mdi-plus</v-icon
                  ><span>Add</span>
                </button>
                <div
                  class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
                >
                  <reusable-theme-button title="Back" @click="step = 1" />
                  <reusable-theme-button
                    title="Submit"
                    @click="submit"
                    :loading="loading"
                  />
                </div>
              </form>
            </ValidationObserver>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <reusable-progress-modal
      :showProgressModal="createAuctionModal"
      :showClose="showCloseAuctionModal"
      name="Create Auction"
      description="Please review and approve up to four transactions in your wallet window to create your NFT."
      :steps="steps"
      :progress="auctionProgress"
      :error="createError"
      @closeProgressModal="createAuctionModal = false"
    />
  </div> -->
</template>

<script>
import { uploadAndCreateFile } from "../../services/AuctionService";
import { createCollection } from "@/services/CollectionService";
import { getWalletNFT } from "@/services/AuctionService";
import { publicRequest } from "@/services/fetcher";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { defaultTheme } from "@/theme/wapaltheme";
import generateName from "@/utils/generateName";
import aptIcon from "@/assets/img/apt.svg";
import darkAptIcon from "@/assets/img/aptBlack.svg";
import moment from "moment";

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
    const difference = Math.floor(
      value.getTime() / (1000 * 60) - new Date().getTime() / (1000 * 60)
    );

    if (difference < 3) {
      return false;
    }

    return true;
  },
  message:
    "Auction Start Time should be at least 3 minutes greater than current time",
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

export default {
  layout: "dashboard",
  components: { DatePicker, ValidationObserver, ValidationProvider },
  data() {
    return {
      step: 1,
      validRules: {
        required: (value) => !!value || "Required.",
        positive: (v) => (v && v > 0) || "Should be more than zero.",
      },
      mint: {
        colName: null,
        colDesc: null,
        tokenName: null,
        tokenDesc: null,
        startDate: null,
        endDate: null,
        minBid: null,
        royalty: null,
        colImage: null,
        nftName: null,
        nftDesc: null,
        attributes: [{ trait_type: null, value: null }],
        twitter: null,
        instagram: null,
      },
      attribute: "",
      value: "",
      loading: false,
      valid: true,
      activePicker: "",
      startMenu: false,
      endMenu: false,
      file: null,
      imageError: false,
      imageErrorMessage: "",
      createAuctionModal: false,
      auctionProgress: 0,
      showCloseAuctionModal: false,
      createError: false,
      socialError: false,
      socialErrorMessage: "",
      steps: [
        { step: 1, name: "Uploading Image and Metadata" },
        { step: 2, name: "Creating Collection" },
        { step: 3, name: "Minting Collection" },
        { step: 4, name: "Adding Collection to Auction" },
      ],
      formSteps: ["Details", "Token", "Attributes", "Review"],
      formStepNumber: 1,
      defaultTheme,
      aptIcon,
      darkAptIcon,
    };
  },
  watch: {
    startMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
    },
    endMenu(val) {
      val && setTimeout(() => (this.activePicker = "DAY"));
    },
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    selectedNft() {
      return this.$store.state.auction.selectedNft;
    },
  },
  async mounted() {},
  methods: {
    saveStart(date) {
      this.$refs.startmenu.save(date);
    },
    saveEnd(date) {
      this.$refs.endmenu.save(date);
    },
    async nextStep() {
      this.imageError = false;
      this.socialError = false;

      if (!this.file) {
        this.imageError = true;
        this.imageErrorMessage = "Please Select an Image";
        return;
      }

      if (!this.mint.twitter && !this.mint.instagram) {
        this.socialError = true;
        this.socialErrorMessage =
          "Please provide a twitter link or instagram link";

        this.$refs["social"].scrollIntoView({ behavior: "smooth" });

        return;
      }

      this.step = 2;
    },
    addAttribute() {
      this.mint.attributes.push({
        trait_type: "",
        value: "",
      });
    },
    removeAttribute(index) {
      this.mint.attributes.splice(index, 1);
    },
    displayImage() {
      const previewImgElement = document.createElement("img");
      const reviewImgElement = document.createElement("img");

      reviewImgElement.src = previewImgElement.src = URL.createObjectURL(
        this.file
      );
      previewImgElement.classList.add("tw-w-full");
      previewImgElement.classList.add("tw-h-full");
      previewImgElement.classList.add("tw-object-fill");
      previewImgElement.classList.add("tw-max-h-[300px]");
      previewImgElement.classList.add("tw-rounded");

      reviewImgElement.classList.add("tw-w-full");
      reviewImgElement.classList.add("tw-h-full");
      reviewImgElement.classList.add("tw-object-fill");
      reviewImgElement.classList.add("tw-max-h-[300px]");
      reviewImgElement.classList.add("tw-rounded");

      const previewElement = document.getElementById("image-preview");
      const reviewElement = document.getElementById("image-review");

      if (previewElement.firstChild) {
        previewElement.removeChild(previewElement.firstChild);
      }

      if (reviewElement.firstChild) {
        reviewElement.removeChild(reviewElement.firstChild);
      }

      previewElement.prepend(previewImgElement);

      reviewElement.prepend(reviewImgElement);
    },
    selectImage(file) {
      this.file = file;
      this.displayImage();
    },
    async submit() {
      const validate = await this.$refs.attributeForm.validate();

      if (!validate) {
        return;
      }

      try {
        if (this.file != null) {
          if (this.mint.attributes.length > 0) {
            this.createError = false;
            this.loading = true;
            this.createAuctionModal = true;

            this.auctionProgress = 1;

            const aptRes = await this.$store.dispatch(
              "walletStore/getAptForFileUpload"
            );

            const transactionRes = await this.$store.dispatch(
              "walletStore/signTransactionForFileUpload",
              aptRes.requiredBalance
            );

            if (!transactionRes.success) {
              throw new Error("Transaction Not Successful Please Try Again");
            }

            //uploading and creating metadata file
            const metaUri =
              (await uploadAndCreateFile(this.file, {
                name: this.mint.tokenName,
                description: this.mint.tokenDesc,
                attributes: this.mint.attributes,
              })) + "/";

            let mintTime = Math.floor(new Date().getTime() / 1000) + 10;

            if (this.$store.state.walletStore.wallet.wallet === "Martian") {
              mintTime += 20;
            }

            this.auctionProgress = 2;

            //creating collection
            const candymachine = await this.$store.dispatch(
              "walletStore/createCandyMachine",
              {
                collection_name: this.mint.colName,
                collection_description: this.mint.colDesc,
                baseuri: metaUri,
                royalty_payee_address: this.walletAddress,
                royalty_points_denominator: 1000,
                royalty_points_numerator: this.mint.royalty * 10,
                presale_mint_time: mintTime,
                public_sale_mint_time: mintTime + 1,
                presale_mint_price: 0,
                public_sale_mint_price: 0,
                total_supply: 1,
              }
            );

            const resource_account = candymachine.resourceAccount;
            const txnhash = candymachine.transactionHash;

            //saving collection to db
            const formData = new FormData();

            formData.append("name", this.mint.colName);
            formData.append("description", this.mint.colDesc);
            formData.append("royalty_percentage", this.mint.royalty);
            formData.append("royalty_payee_address", this.walletAddress);
            formData.append(
              "whitelist_sale_time",
              Math.floor(new Date().getTime() / 1000) + 10
            );
            formData.append(
              "public_sale_time",
              Math.floor(new Date().getTime() / 1000) + 10
            );

            formData.append("public_sale_price", this.mint.minBid * 100000000);
            formData.append("whitelist_price", this.mint.minBid * 100000000);
            formData.append("supply", 1);
            formData.append("twitter", this.mint.twitter);
            formData.append("discord", "");
            formData.append("website", "");
            formData.append("instagram", this.mint.instagram);
            formData.append("resource_account", resource_account);
            formData.append("txnhash", txnhash);
            formData.append("candy_id", process.env.CANDY_MACHINE_V1);
            formData.append("image", this.file);
            formData.append("phases", JSON.stringify([]));

            await createCollection(formData);

            //mint
            setTimeout(async () => {
              try {
                this.auctionProgress = 3;

                const mint = await this.$store.dispatch(
                  "walletStore/mintCollection",
                  {
                    resourceAccount: resource_account,
                    publicMint: true,
                    candyMachineId: process.env.CANDY_MACHINE_V1,
                  }
                );

                if (mint.success) {
                  //auction
                  this.auctionProgress = 4;

                  setTimeout(async () => {
                    try {
                      const nftRes = await getWalletNFT({
                        creatorAddress: this.walletAddress,
                        collectionName: this.mint.colName,
                        tokenName: this.mint.colName + " #0",
                        metadata_uri: metaUri + "0.json",
                      });

                      const nft = nftRes.data.current_token_ownerships[0];

                      const meta = await this.$axios.get(
                        nft.current_token_data.metadata_uri
                      );

                      this.$store.commit("auction/selectNft", {
                        nft: nft,
                        meta: meta.data,
                      });

                      const auction = await this.$store.dispatch(
                        "walletStore/createAuction",
                        {
                          start_date: this.mint.startDate,
                          end_date: this.mint.endDate,
                          min_bid: this.mint.minBid,
                        }
                      );

                      const auction_name = generateName(
                        this.selectedNft.meta.name
                      );

                      await publicRequest.post("/api/auction", {
                        nft: this.selectedNft,
                        startAt: this.mint.startDate,
                        endAt: this.mint.endDate,
                        min_bid: this.mint.minBid,
                        id: auction.cur_auction_id,
                        auction_name: auction_name,
                        twitter: this.mint.twitter,
                        instagram: this.mint.instagram,
                        user_id: this.$store.state.userStore.user.user_id,
                      });

                      this.$toast.showMessage({
                        message: "Auction Created Successfully",
                        error: false,
                      });
                      this.loading = false;
                      this.createAuctionModal = false;

                      this.auctionProgress = 5;

                      this.$router.push("/dashboard/auction/list");
                    } catch (error) {
                      console.log(error);
                      this.$toast.showMessage({ message: error, error: true });
                      this.loading = false;
                      this.createError = true;
                      this.showCloseAuctionModal = true;

                      this.loading = false;
                    }
                  }, 5000);
                }
              } catch (error) {
                console.log(error);
                this.$toast.showMessage({ message: error, error: true });
                this.loading = false;
                this.createError = true;
                this.showCloseAuctionModal = true;
              }
            }, 5000);
          } else {
            this.$toast.showMessage({
              message: "Provide at least one attribute",
              error: true,
              c,
            });
          }
        } else {
          this.$toast.showMessage({
            message: "Please select image",
            error: true,
          });
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.loading = false;

        this.createError = true;
        this.showCloseAuctionModal = true;
      }
    },
    changeStep(step) {
      this.formStepNumber = step;
    },
    async validateFormForNextStep() {
      switch (this.formStepNumber) {
        case 1:
          const detailValidated = await this.$refs.detailForm.validate();

          if (!detailValidated) {
            break;
          }

          this.socialError = false;

          if (!this.mint.twitter && !this.mint.instagram) {
            this.socialError = true;
            this.socialErrorMessage =
              "Please provide a twitter link or instagram link";

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

          this.formStepNumber++;
          break;
        case 3:
          const validate = await this.$refs.attributeForm.validate();

          if (!validate) {
            break;
          }
          this.formStepNumber++;
          break;
        default:
          break;
      }
      this.gotToTop();
    },
    gotToTop() {
      this.$refs.top.scrollIntoView({ behavior: "smooth" });
    },
    formatDate(date) {
      return moment(date).format("MMM DD, hh:mm A");
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
</style>
