<template>
  <div v-if="!loading">
    <div
      class="tw-w-[90%] tw-container tw-mx-auto tw-pt-16 tw-pb-8 tw-transition-all tw-duration-200 tw-ease-linear md:tw-px-0 md:tw-w-4/5 lg:tw-w-[90%] lg:tw-pt-[5.5em] lg:tw-pb-[7.5em] 1xl:tw-w-[4/5] 1xl:!tw-max-w-[1100px] lg:tw-flex"
      v-if="!loading"
    >
      <div
        class="tw-w-full sm:tw-flex sm:tw-flex-col sm:tw-items-center sm:tw-justify-center tw-mb-10 tw-gap-6 tw-place-items-center lg:tw-mb-0 lg:tw-flex-row lg:tw-items-start lg:tw-justify-center xl:tw-gap-[4.5em]"
      >
        <div class="card-min-width" style="position: relative">
          <div
            class="tw-w-full tw-max-h-[338px] md:tw-w-[440px] md:tw-h-[440px] md:tw-max-h-[440px] lg:tw-w-[440px] lg:tw-min-w-[440px] lg:tw-h-[440px] xl:tw-w-[550px] xl:tw-h-[550px] xl:tw-max-h-[550px] tw-object-cover tw-rounded-xl"
            v-if="collection.video"
          >
            <video-player-featured :source="collection.video" />
          </div>
          <video-player-detailed
            class="video-detailed"
            v-else-if="isVideo(collection.media2)"
            :source="collection.media2"
          />

          <utility-image
            v-else
            :source="collection.image"
            :onerror="imageNotFound()"
            :alt="collection.name"
            class="tw-w-full tw-max-h-[338px] md:tw-w-[440px] md:tw-h-[440px] md:tw-max-h-[440px] lg:tw-w-[440px] lg:tw-min-w-[440px] lg:tw-h-[440px] tw-object-cover tw-rounded-xl"
          />
          <audio-player
            v-if="isAudio(collection.media2)"
            class="audio-bg"
            :audioSrc="collection.media2"
          ></audio-player>
          <div class="tw-w-[100%] tw-max-w-[440px]">
            <!-- Hosted by  -->
            <div
              class="tw-my-6 tw-py-2 tw-border-b-2 tw-border-dark-6 tw-w-full"
            >
              <h2 class="tw-text-white tw-font-semibold">Hosted By</h2>
            </div>
            <div>
              <div class="tw-flex tw-items-center">
                <img
                  src="~/assets/img/logo/new-logo.svg"
                  alt="Wapal logo"
                  width="28px"
                  height="28px"
                />
                <span class="w-text-sm tw-items-center tw-ml-2">Wapal</span>
              </div>
              <div
                id="email"
                class="tw-flex tw-items-center tw-mt-4 tw-text-white/70"
              >
              <a 
                :href="`mailto:${recipient}`"  
                  class="tw-flex !tw-text-white/70">
                <img
                  src="~/assets/img/mail-logo-3.svg"
                  alt="Mail logo"
                  width="24px"
                  height="24px"
                />
                <span class="tw-items-center tw-ml-3">{{ recipient || 'host email' }}</span> <!-- Dynamic text -->
              </a>
              </div>
              <!-- Popup box -->
              <!-- <div
                id="email"
                class="tw-flex tw-items-center tw-mt-4 tw-text-white/70"
                @click="showPopup = true"
              >
                <a href="#" class="!tw-text-white/70">
                  <i class="bx bx-envelope tw-h-[20px] tw-w-[24px]"></i>
                  <span class="tw-items-center tw-ml-3">Contact the host</span>
                </a>
              </div> -->

              <!-- Popup box -->
                <v-dialog v-model="showPopup" persistent max-width="400px" @click:outside="closePopup">
                  <v-card class="!tw-bg-dark-5 tw-mt-4 !tw-rounded-xl tw-w-[400px]">
                    <v-card-title class="tw-text-white tw-font-bold">Contact the Host</v-card-title>
                    <v-card-text class="tw-flex tw-flex-col">
                      <p class="!tw-mb-3">Have a question about the event? You can send a message to the host.</p>
                      <textarea
                        v-model="userMessage"
                        placeholder="Write Message"
                        class="tw-bg-dark-7 tw-text-white tw-p-3 tw-rounded-md tw-mb-4 tw-h-32"
                      ></textarea>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        id="pop-up-btn"
                        class="tw-w-full !tw-text-black tw-font-bold !tw-mb-6"
                        @click="sendMessage"
                      >
                        Send Message  
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              <div>
                <div
                  class="tw-my-4 tw-py-2 tw-border-b-2 tw-border-dark-6 tw-w-full"
                >
                  <h2 class="tw-text-white tw-font-semibold">Location</h2>
                </div>
                <div class="tw-flex tw-items-center tw-mb-4">
                      <i class="bx bx-map tw-text-white tw-text-2xl tw-mr-3"></i>
                    <!-- alt="Location-Icon" class="tw-w-[30px] tw-h-[30px] tw-mr-2"/> -->
                  <div class="tw-text-white/70">
                    <span>{{ capitalizeLocation(location) }}</span>
                    <br v-if="location && venue">
                    <span>{{ venue }}</span>
                  </div>
                </div>
                  <!-- gmap  -->
                <div
                  style="
                    width: 100%;
                    height: 195px;
                    border-radius: 8px;
                    overflow: hidden;
                  "
                >
                  <GmapMap
                    v-bind:center="mapCenter"
                    :zoom="14"
                    map-type-id="roadmap"
                    style="width: 100%; height: 100%"
                    :options="{ streetViewControl: false, fullscreenControl: true, zoomControl: true, }"
                  >
                    <!-- Only one marker should be rendered here -->
                    <GmapMarker
                      v-for="(m, index) in markers"
                      v-bind:key="index"
                      v-bind:position="m.position"
                      v-bind:clickable="true"
                      :draggable="true"
                      @click="center = m.position"
                    />
                  </GmapMap>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3"
          v-if="!live"
        >
          <div class="tw-w-3 tw-h-3 tw-rounded-full tw-bg-primary-1"></div>
          <div
            class="tw-text-white tw-flex tw-flex-row tw-items-start tw-justify-center tw-gap-1"
          >
            <div class="tw-text-white tw-font-bold">Live in</div>
            <count-down-plain
              :startTime="phases[0].mint_time"
              class="tw-font-bold"
              @countdownComplete="setCollectionToLive"
            />
          </div>
        </div>
        <div>
          <h1 class="tw-text-white tw-font-bold tw-text-2xl sm:tw-text-3xl md:tw-text-4xl lg:tw-text-[2.5rem]">
            {{ collection.name }}
          </h1>
        </div>
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <a
            :href="collection.discord"
            target="_blank"
            v-if="collection.discord"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-discord-alt tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
            ></i>
          </a>
          <a
            :href="collection.twitter"
            target="_blank"
            v-if="collection.twitter"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-twitter tw-text-lg tw-transition tw-duration-200 tw-ease-linear tw-ml-0.5"
            ></i>
          </a>
          <a
            :href="collection.instagram"
            target="_blank"
            v-if="collection.instagram"
            class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
          >
            <i
              class="bx bxl-instagram tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
            ></i>
          </a>
          <!-- <a
              :href="collection.website"
              target="_blank"
              v-if="collection.website"
              class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6 !tw-text-white hover:!tw-text-primary-1"
            >
              <i
                class="bx bx-globe tw-text-lg tw-transition tw-duration-200 tw-ease-linear"
              ></i>
            </a> -->
          <div class="tw-relative">
            <button
              class="tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-dark-6"
              @click="showShareBox = !showShareBox"
            >
              <i
                class="bx bxs-share-alt tw-text-lg tw-transition tw-duration-200 tw-ease-linear !tw-text-white"
              ></i>
            </button>
            <div
              class="tw-absolute tw-z-20 tw-overflow-hidden tw-bg-dark-6 tw-top-[110%] tw-w-[200px] tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-py-4"
              v-if="showShareBox"
              v-click-outside="hideShareBox"
            >
              <button
                class="tw-w-full tw-px-4 tw-py-4 tw-relative tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 before:tw-w-full before:tw-h-full before:tw-left-0 before:tw-bg-white/20 before:tw-opacity-0 before:tw-absolute hover:before:tw-opacity-[0.08]"
                @click="copyLink"
              >
                <i class="bx bx-copy tw-text-lg"></i>
                <span>Copy Link</span>
              </button>
              <button
                class="tw-w-full tw-px-4 tw-py-4 tw-relative tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 before:tw-w-full before:tw-h-full before:tw-left-0 before:tw-bg-white/20 before:tw-opacity-0 before:tw-absolute hover:before:tw-opacity-[0.08]"
                @click="shareOnTwitter"
              >
                <i class="bx bxl-twitter tw-text-lg"></i>
                <span>Share on Twitter</span>
              </button>
            </div>
          </div>
        </div>
        <!-- <div>
          <h2 class="tw-text-white tw-text-[1.5rem] tw-font-bold">
            {{ collection.name }}
          </h2>
        </div> -->
        <!-- <div>
          <p class="tw-text-dark-0 tw-text-4">
            {{ collection.description }}
          </p>
        </div> -->
        <!-- detail description  -->
        <div class="tw-text-dark-0 description" id="detailed-markup-desc">
          <p> {{ collectionDescription }}</p>
        </div>

        <div id="ticket-details">
          <!-- Calendar  -->
          <div class="date box">
            <div class="icon-box calendar">
              <img src="~/assets/img/Calendar.svg" alt="Calendar Icon" />
            </div>
            <div class="texts">
              <p class="tw-pb-2">{{ formattedDate }}</p>
              <p>{{ formattedTime }}</p>
            </div>
          </div>

          <!-- Location/Venue  -->
          <div class="location box" v-if="location">
            <div class="icon-box venue">
              <img src="~/assets/img/Location.svg" alt="Location Icon" />
            </div>
            <div class="texts">
              <p class="tw-pb-2">{{ venue }}</p>
              <p>{{ location }}</p>
            </div>
          </div>
        </div>
        <!-- Ticket owner overlapping photos -->
        <div class="ticket-owner tw-mb-5">
          <div class="owner-box">
            <img src="~/assets/img/avatar3.png" alt="Location Icon" />
          </div>
          <div class="owner-box">
            <img src="~/assets/img/avatar2.png" alt="Location Icon" />
          </div>
          <div class="owner-box">
            <img src="~/assets/img/avatar1.png" alt="Location Icon" />
          </div>
          <!-- Going ticket Numbers -->
          <span> +{{ resource.minted }} Going</span>
        </div>

        <a
          class="tw-w-full tw-rounded-md tw-bg-primary-1 !tw-text-white tw-px-6 tw-py-2.5 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
          :href="collection.mintDetails.link"
          target="_blank"
          v-if="collection.mintDetails && collection.mintDetails.link"
        >
          {{
            collection.username === "wapal-santa"
              ? "Reveal Your Present 🎁"
              : "Mint"
          }}
        </a>
        <NuxtLink
          class="tw-w-full tw-mt-4 tw-rounded-md tw-bg-primary-1 !tw-text-black tw-px-6 tw-py-2.5 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
          :to="`/nft/${collection.username}`"
          v-else-if="collection.mintDetails"
        >
          {{ collection.status.sold_out ? "Get Ticket" : "Mint" }}
        </NuxtLink>
        <button-primary
          class="!tw-text-black !tw-font-semibold"
          :title="!collection.status.sold_out ? 'Buy Ticket' : 'Get Ticket'"
          :fullWidth="true"
          @click="mintBulkCollection"
          v-else-if="checkLiveStatus()"
        />
        <!-- <NuxtLink
              class="tw-w-full tw-rounded-md tw-bg-primary-1 !tw-text-black tw-px-6 tw-py-2.5 tw-box-border tw-font-semibold tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
              :to="`/nft/${collection.username}`"
              v-else-if="collection.mintDetails"
            >
              {{ collection.status.sold_out ? "Get Ticket" : "Mint" }}

        </NuxtLink>
        <button-primary
          class="!tw-text-black !tw-font-semibold"
          :title="!collection.status.sold_out ? 'Get Ticket' : 'Get Ticket'"
          :fullWidth="true"
          @click="redirectCollection"
          v-else
        /> -->

        <div class="tw-mt-10 tw-pb-2 tw-border-b-2 tw-border-dark-6 tw-w-full">
          <h2 class="tw-text-white tw-font-semibold">About Event</h2>
        </div>

        <div
          class=""
          v-html="collection.description"
          id="first-markup-desc"
        ></div>
        <!-- <div
          v-if="collection.description !== 'looniess'"
          class="tw-pb-2 tw-text-dark-0 description"

          v-html = "collection.description"
          id="markup-desc"
        >
        </div>
        <div
          v-else
          class="tw-pb-2 tw-text-dark-0 description"
          style="opacity: 0; visibility: hidden"
        >
          {{ collection.description }}
        </div> -->

        <div
          v-if="collection._id === '65803e82022bc90954ea3ea4'"
          class="tw-pb-2 tw-text-dark-0"
        >
          1 NFT Per Wallet
        </div>

        <div v-if="externalWhitelisted">
          Your Whitelist Mint Tokens:
          {{ externalWhitelistMintNumber }} Remaining
        </div>
        <div
          class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-py-5 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-col"
          v-if="resource.paused"
        >
          <h2
            class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3 tw-text-dark-0"
          >
            <i class="bx bx-stop-circle tw-text-2xl"></i>
            <span class="tw-font-semibold">Ended</span>
          </h2>
          <div class="tw-text-dark-0">Creator has ended the mint.</div>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-rounded-lg"
          v-if="endedPhases && endedPhases[0]"
        >
          <nft-mint-phase-box
            v-for="(phase, index) in endedPhases"
            :key="index"
            :phase="phase"
            :coinType="collection.seed ? collection.seed.coin_type : 'APT'"
            :showEnded="true"
          />
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
          v-if="live"
        >

        <!-- Comment starts here  -->
          <!-- <div
            class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-py-3 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 md:tw-flex-col md:tw-items-start md:tw-justify-start"
          >
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
            >
              <h2
                class="tw-text-base tw-text-white tw-font-semibold tw-capitalize"
              >
                {{ currentSale.name }}
              </h2>
              <div
                class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-1.5"
                v-if="currentSale.id !== 'public-sale'"
              >
                <div
                  class="tw-uppercase tw-text-dark-2 tw-text-xs tw-tracking-[3%] tw-font-semibold"
                >
                  Ends In
                </div>
                <count-down
                  :small="true"
                  :startTime="nextSale.mint_time"
                  @countdownComplete="setEndedPhases"
                />
              </div>
            </div>
            <div class="tw-flex tw-justify-between tw-w-[100%]">
                <div>
                  <div class="tw-text-dark-2">Mint Date</div>
                  <div>Jun 30, 04:45 AM</div>
                </div>
                <div>
                  <div class="tw-text-dark-2 tw-text-right">Price</div>
                  <div>1.30APT</div>
                </div>
            </div>
            <div
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-w-full"
            >
              <div
                class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 tw-bg-dark-8 tw-border tw-border-solid tw-border-dark-6 tw-rounded tw-pt-2 tw-pr-3 tw-pb-3 tw-pl-3"
              >
                <div
                  class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 md:tw-flex-col md:tw-items-start md:tw-justify-start tw-w-full"
                  v-if="collection.username !== 'wapal-santa'"
                >
                  <div
                    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
                  >
                    <div
                      class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between 3xl:tw-text-lg"
                      v-if="
                        collection.edition &&
                        collection.edition === 'open-edition'
                      "
                    >
                      <div class="tw-text-white/70">
                        Total Minted: {{ resource.minted }}
                      </div>
                      <div v-if="currentSale.mint_price == 0">Free Mint</div>
                      <div
                        v-if="
                          currentSale.mint_price && currentSale.mint_price != 0
                        "
                      >
                        Price {{ currentSale.mint_price }}
                        {{
                          collection.seed && collection.seed.coin_type
                            ? collection.seed.coin_type
                            : "APT"
                        }}
                      </div>
                    </div>
                    <div
                      class="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between 3xl:tw-text-lg"
                      v-else
                    >
                      <div class="tw-text-white/70">
                        {{ resource.minted }}/{{ resource.total_supply }} Minted
                      </div>
                      <div v-if="currentSale.mint_price == 0">Free Mint</div>
                      <div
                        v-if="
                          currentSale.mint_price && currentSale.mint_price != 0
                        "
                      >
                        Price {{ currentSale.mint_price }}
                        {{
                          collection.seed && collection.seed.coin_type
                            ? collection.seed.coin_type
                            : "APT"
                        }}
                      </div>
                    </div>
                    <div
                      class="tw-w-full tw-relative tw-rounded-full tw-h-2.5 tw-bg-white/10"
                      v-if="collection.edition !== 'open-edition'"
                    >
                      <div
                        class="tw-absolute tw-top-0 tw-h-2.5 tw-bg-primary-1 tw-rounded-full"
                        id="resourceMintedPercent"
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  class="tw-w-full tw-rounded-lg tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:tw-flex-row md:tw-items-center md:tw-justify-between"
                >
                  <div
                    class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-0.5 tw-text-white tw-rounded tw-border tw-border-solid tw-w-full md:tw-w-fit tw-border-dark-4 tw-bg-dark-6"
                  >
                    <button
                      class="tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold tw-text-lg disabled:tw-cursor-not-allowed"
                      @click="decreaseNumberOfNft"
                      :disabled="externalWhitelisted || this.gettingProof"
                      @mouseup="stopDecrement"
                      @mousedown="startDecrement"
                      @touchstart="startDecrement"
                      @touchend="stopDecrement"
                    >
                      -
                    </button>
                    <input
                      class="no-spin-button tw-rounded tw-text-center tw-px-6 tw-py-2 tw-font-semibold tw-w-full md:tw-w-20 disabled:tw-cursor-not-allowed"
                      v-model="numberOfNft"
                      @input="checkNumberOfNft"
                      v-if="!externalWhitelisted || this.gettingProof"
                      type="number"
                    />
                    <div
                      class="tw-rounded tw-text-center tw-px-6 tw-py-2 tw-font-semibold tw-w-20 disabled:tw-cursor-not-allowed"
                      v-else
                    >
                      {{ externalWhitelistMintNumber }}
                    </div>
                    <button
                      class="tw-rounded tw-text-center tw-px-4 tw-py-2 tw-font-semibold tw-text-lg disabled:tw-cursor-not-allowed"
                      @click="increaseNumberOfNft"
                      :disabled="externalWhitelisted || this.gettingProof"
                      @mouseup="stopIncrement"
                      @mousedown="startIncrement"
                      @touchstart="startIncrement"
                      @touchend="stopIncrement"
                    >
                      +
                    </button>
                  </div>
                  <a
                    class="tw-w-full tw-rounded-md tw-bg-primary-1 !tw-text-white tw-px-6 tw-py-2.5 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm disabled:tw-cursor-not-allowed"
                    :href="collection.mintDetails.link"
                    target="_blank"
                    v-if="collection.mintDetails && collection.mintDetails.link"
                  >
                    {{
                      collection.username === "wapal-santa"
                        ? "Reveal Your Present 🎁"
                        : "Mint"
                    }}
                  </a>
                  <button-primary
                    :title="!collection.status.sold_out ? 'Mint' : 'Soldout'"
                    :disabled="getMintButtonDisabledStatus"
                    @click="mintBulkCollection"
                    :fullWidth="true"
                    :loading="minting"
                    v-else
                  />
                </div>
              </div>
              <div
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-text-dark-0 tw-w-full"
                v-if="checkPublicSaleTimer() && getWalletAddress"
              >
                <i class="bx bx-info-circle tw-text-xl" v-if="!whitelisted"></i>
                <div class="tw-text-sm tw-w-full">
                  <div v-if="gettingProof">
                    Getting Proof for {{ currentSale.name }}
                  </div>
                  <div v-if="notWhitelisted">
                    You are not whitelisted for this phase
                  </div>
                  <div
                    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
                    v-if="whitelisted"
                  >
                    <div
                      class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
                    >
                      <i class="bx bx-info-circle tw-text-xl"></i>
                      <div class="tw-text-sm tw-text-dark-0 tw-font-semibold">
                        You are eligible to mint.
                      </div>
                    </div>
                    <div
                      class="tw-text-sm tw-text-white tw-font-semibold"
                      v-if="collection.username === 'the-loonies'"
                    >
                      You Decide Your Own Limit!
                    </div>
                    <div
                      class="tw-text-sm tw-text-white tw-font-semibold"
                      v-else
                    >
                      Limit {{ currentSale?.mintLimit }} per wallet
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tw-w-full tw-text-sm tw-text-dark-0"
                v-if="showPhaseChangeMessage"
              >
                {{ phaseChangeMessage }}
              </div>
              <div
                v-if="!checkPublicSaleTimer()"
                class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
              >
                <div
                  class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
                >
                  <i class="bx bx-info-circle tw-text-xl"></i>
                  <div class="tw-text-sm tw-text-dark-0 tw-font-semibold">
                    You are eligible to mint.
                  </div>
                </div>
                <div
                  class="tw-text-sm"
                  v-if="collection.username === 'the-loonies'"
                >
                  You Decide Your Own Limit!
                </div>
                <div class="tw-text-sm" v-else>
                  Limit {{ publicSaleMintLimit }} per wallet
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div
            class="tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-dark-6 tw-py-3 tw-px-4 tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 md:tw-flex-col md:tw-items-start md:tw-justify-start"
          >
            <div
              class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:tw-flex-row md:tw-items-center md:tw-justify-between"
            >
              <h2
                class="tw-text-base tw-text-white tw-font-semibold tw-capitalize"
              >
                {{ currentSale.name }}
              </h2>
              <div
                class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-1.5"
                v-if="currentSale.id !== 'public-sale'"
              >
                <div
                  class="tw-uppercase tw-text-dark-2 tw-text-xs tw-tracking-[3%] tw-font-semibold"
                >
                  Ends In
                </div>
                <count-down
                  :small="true"
                  :startTime="nextSale.mint_time"
                  @countdownComplete="setEndedPhases"
                />
              </div>
            </div>
            <div class="tw-flex tw-justify-between tw-w-[100%]">
                <div>
                  <div class="tw-text-dark-2">Mint Date</div>
                  <div>Jun 30, 04:45 AM</div>
                </div>
                <div>
                  <div class="tw-text-dark-2 tw-text-right">Price</div>
                  <div>1.30APT</div>
                </div>
            </div>
          </div> -->
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-relative tw-rounded-lg"
          v-if="phaseCounter !== phases.length"
        >
          <div
            v-if="collection.id == 'loonies'"
            class="tw-w-full tw-overflow-auto no-scrollbar tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-rounded-lg"
            :style="`height:${
              phases.length - phaseCounter >= 3
                ? 439
                : (phases.length === 2 ? 190 : 180) *
                  (phases.length - phaseCounter)
            }px`"
          >
            <nft-mint-phase-box-loonies
              v-for="(phase, index) in phases"
              :key="index"
              :phase="phase"
              v-if="!checkIfPhaseStarted(phase.mint_time)"
              :coinType="collection.seed ? collection.seed.coin_type : 'APT'"
              :showWhitelistText="true"
              :publicSaleMintLimit="Number(publicSaleMintLimit)"
            />
          </div>
          <div
            v-else
            class="tw-w-full tw-overflow-auto no-scrollbar tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-3 tw-rounded-lg"
            :style="`height:${
              phases.length - phaseCounter >= 3
                ? 439
                : (phases.length === 2 ? 190 : 180) *
                  (phases.length - phaseCounter)
            }px`"
          >
            <nft-mint-phase-box
              v-for="(phase, index) in phases"
              :key="index"
              :phase="phase"
              v-if="!checkIfPhaseStarted(phase.mint_time)"
              :coinType="collection.seed ? collection.seed.coin_type : 'APT'"
              :showWhitelistText="true"
              :publicSaleMintLimit="Number(publicSaleMintLimit)"
            />
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="showConnectWalletModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <connect-wallet-modal
        message="Please Connect your wallet to Mint"
        @closeModal="showConnectWalletModal = false"
        @walletConnected="displayWalletConnectedMessage"
      />
    </v-dialog>
    <v-dialog
      v-model="showErrorPopup"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <div
        class="tw-w-full tw-bg-modal-gray tw-text-white tw-px-4 tw-py-4 tw-rounded"
      >
        {{ errorMessage }}
      </div>
    </v-dialog>

    <v-dialog
      v-model="showShareModal"
      content-class="!tw-w-full md:!tw-w-1/2 lg:!tw-w-[30%]"
      :persistent="true"
    >
      <div
        class="tw-w-full tw-bg-dark-9 tw-text-white tw-px-4 tw-py-4 tw-rounded tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6"
      >
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end"
        >
          <button @click="showShareModal = false">
            <i class="bx bx-x tw-text-xl"></i>
          </button>
        </div>
        <div class="tw-w-full tw-text-base">
          <h3 class="tw-text-center">{{ collection.name }} Minted</h3>
        </div>
        <div class="tw-w-full h-full tw-rounded">
          <utility-image
            :source="collection.image"
            :onerror="imageNotFound()"
            :alt="collection.name"
            class="tw-w-full tw-h-full tw-rounded"
          />
        </div>
        <button-primary
          :fullWidth="true"
          title="Share on Twitter"
          :bordered="true"
          @click="shareOnTwitterAfterMinting"
        >
          <template #prepend-icon>
            <img
              :src="xLogo"
              alt="X"
              width="32px"
              height="32px"
              class="tw-pr-4"
            /> </template
        ></button-primary>
      </div>
    </v-dialog>
    <loonies-congratulations-popup
      v-if="showLooniesTweet"
      @closeCongratulationsPopup="showLooniesTweet = false"
    />
    <nft-after-mint-dialog
      :showModal="showAfterMintModal"
      :collectionUserName="collectionUserName"
      :collectionType="collection.isEdition ? 'editions' : 'nft'"
      :collectionTweet="collectionTweet"
      :tokenDataIds="mintedTokens"
      @close="showAfterMintModal = false"
      v-if="showAfterMintModal"
    />
  </div>
  <loading-collection v-else />
</template>
<script>
// import { setSoldOut } from "@/services/CollectionService";
import { getProof, getMintLimit } from "@/services/WhitelistService";
import { getWhitelistEntryById } from "@/services/WhitelistService";
// import emailjs from 'emailjs-com';
import {
  mintCollection,
  anotherCoinMintCollection,
} from "@/services/AptosCollectionService";
import imageNotFound from "@/utils/imageNotFound";
import santa from "@/assets/video/wapal-santa.MP4";
import xLogo from "@/assets/img/x-logo.svg";
import { checkIfCollectionIsSoldOut } from "@/utils/soldoutCollections";
import {
  normalMintTransaction,
  sponsorMintTransaction,
} from "@/services/SponsoredTransactionService";
import { ticketCollectionUri } from "@/services/CollectionService";
import { getMintedTokenDataIdsFromTransaction } from "@/services/TokenDetailService";
export default {
  props: { collection: { type: Object } },
  data() {
    return {
      recipient: this.collection.email || "",
      subject: "Dynamic Subject",  
      body: "This is a dynamically generated email.", 
      mapCenter: { lat: 27.7172, lng: 85.324 }, // Default center (Kathmandu)
      markers: [
        { position: { lat: 27.7172, lng: 85.324 } }, // Example marker
      ],
      zoomLevel: 10,
      venueBounds: null, // Initialize bounds if needed
      loading: true,
      whitelistSaleDate: null,
      publicSaleDate: null,
      showWhitelistSaleTimer: false,
      showPublicSaleTimer: false,
      showEndInTimer: false,
      minting: false,
      showConnectWalletModal: false,
      resource: {
        total_supply: 0,
        minted: 0,
        mintedPercent: 0,
      },
      progressInterval: null,
      whitelistNumber: 0,
      numberOfNft: 1,
      showErrorPopup: false,
      errorMessage: null,
      proof: [],
      mintLimit: 1,
      totalMintLimit: 0,
      currentlyOwned: 0,
      gettingProof: true,
      notWhitelisted: false,
      whitelisted: false,
      currentSale: null,
      phases: [],
      phaseCounter: 0,
      phaseEndInTime: null,
      nextSale: null,
      v2: false,
      live: false,
      showShareBox: false,
      phaseInterval: null,
      externalWhitelisted: false,
      externalWhitelistMintNumber: 0,
      MARKETPLACE_URL: process.env.MARKETPLACE_URL,
      holdingIncreaseButtonInterval: null,
      holdingDecreaseButtonInterval: null,
      showShareModal: false,
      maxNumberOfNft: 10,
      showLooniesTweet: false,
      mintButtonClicked: 0,
      endedPhases: [],
      publicSaleMintLimit: 0,
      merkleMintRetries: 0,
      simulatedMerkleMint: false,
      phaseChangeMessage:
        "If you don't see your WL eligibility, please refresh the page as the server scales",
      showPhaseChangeMessage: false,
      location: '',
      venue: '',
      publicSaleTime: '',
      formattedDate: '',
      formattedTime: '',
      showPopup: false,
      userMessage: '', // Stores the user's message
      collectionDescription: '',
      // fromName: 'Madhu',
      // toName: 'Nidiv', 
      // mintedTokens: [
      //   "0x2492723897521532f79ca5021acddc30a22f6f1bce2151a21744239016fde0d",
      //   "0x2492723897521532f79ca5021acddc30a22f6f1bce2151a21744239016fde0d",
      //   "0x2492723897521532f79ca5021acddc30a22f6f1bce2151a21744239016fde0d",
      //   "0xc0ec856e8432d3954112303be181d3506ab49c14f9ee44a5b7d9d9ae6478e00a",
      //   "0xf8db0bb39dad529a9d389e60bba62e61a73a14c4a52e9ad5f26c8ce5862c853b",
      //   "0x17aae9b2c4b2c58b642f11b35897a5cbac1d0f6b32a29cea740ff78dc966ef69",
      // "0xc0ec856e8432d3954112303be181d3506ab49c14f9ee44a5b7d9d9ae6478e00a",
      // "0xf8db0bb39dad529a9d389e60bba62e61a73a14c4a52e9ad5f26c8ce5862c853b",
      // "0x17aae9b2c4b2c58b642f11b35897a5cbac1d0f6b32a29cea740ff78dc966ef69",
      // ],
      mintedTokens: [],
      showAfterMintModal: false,
      // showAfterMintModal: true,

      collectionTweet: "",
      collectionUserName: "",
      imageNotFound,
      xLogo,
      showPopup: false,
      isExpanded: false,
    };
  },
  methods: {
    async fetchLocationCoordinates(placeName) {
      if (!this.googleReady) {
        console.error("Google Maps API is not ready yet.");
        return;
      }

      try {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: placeName }, (results, status) => {
          if (status === "OK") {
            const location = results[0].geometry.location;
            this.updateLocationOnMap(location);
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      } catch (error) {
        console.error("Error fetching location coordinates: ", error);
      }
    },
    capitalizeLocation(location) {
      if (!location) return '';
      return location.charAt(0).toUpperCase() + location.slice(1);
    },
    updateLocationOnMap(location) {
      this.mapCenter = { lat: location.lat(), lng: location.lng() };
      this.markers = [
        { position: { lat: location.lat(), lng: location.lng() } },
      ];
      this.zoomLevel = 15; // Zoom into the location
    },
    formatDateTime(dateString) {
      const date = new Date(dateString);

      // Extract components for date
      const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
      const month = date.toLocaleDateString("en-GB", { month: "short" });
      const year = date.toLocaleDateString("en-GB", { year: "numeric" });
      const formattedDate = `${day} ${month} ${year}`; // Custom format without comma

      // Extract components for time
      const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensure 12-hour format with AM/PM
      };
      const time = date.toLocaleTimeString("en-GB", optionsTime); // e.g., "01:30 PM"
      const weekday = date.toLocaleDateString("en-GB", { weekday: "long" }); // e.g., "Thursday"
      const formattedTime = `${weekday}, ${time}`; // Combine weekday and time with a comma

      return {
        date: formattedDate,
        time: formattedTime,
      };
    },
    isImage(source) {
      if (!source) {
        return false;
      }
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
    // emails 
    // sendMessage() {
    //   console.log('sendMessage method called');

    //   if (this.userMessage === '') {
    //     alert('Please write a message before sending.');
    //     return;
    //   }

    //   const serviceID = 'service_76wa09a'; // Replace with your EmailJS service ID
    //   const templateID = 'template_tzub29v'; // Replace with your EmailJS template ID
    //   const publicKey = 'Tw3_bgKE0BSsz1Jl5'; // Replace with your EmailJS public key

    //   const templateParams = {
    //     from_name: this.fromName,
    //     to_name: this.toName,
    //     message: this.userMessage
    //   };

    //   emailjs.send(serviceID, templateID, templateParams, publicKey)
    //     .then((response) => {
    //       console.log('Email sent successfully!', response.status, response.text);
    //       alert('Your message has been sent successfully.');
    //       this.closePopup();
    //     })
    //     .catch((error) => {
    //       console.error('Error sending email:', error);
    //       alert('Failed to send message. Please try again later.');
    //     });
    // },
    // closePopup() {
    //   this.showPopup = false;
    //   this.userMessage = ''; // Clear the message after sending
    // },
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
            "mpeg",
          ].includes(extension)
        : false;
    },
    countdownComplete() {
      this.showCountdown = false;
    },
    whitelistCountdownComplete() {
      this.showWhitelistSaleTimer = false;
      this.changeEndInTimer();
    },
    publicSaleCountdownComplete() {
      this.showPublicSaleTimer = false;
      this.changeEndInTimer();
      this.currentSale = {
        name: this.collection.public_sale_name
          ? this.collection.public_sale_name
          : "public sale",
        id: "public-sale",
        mint_price: this.collection.candyMachine.public_sale_price,
        mint_time: this.collection.candyMachine.public_sale_time,
      };
    },

    checkWhitelistSaleTimer() {
      if (this.phases.length === 1) {
        return false;
      } else {
        if (new Date(this.phases[0].mint_time).getTime() > Date.now()) {
          return true;
        }
      }
      return false;
    },
    checkPublicSaleTimer() {
      const date = new Date();
      if (this.publicSaleDate < date) {
        return false;
      }
      return true;
    },
    async hideEndInTimer() {
      this.phaseCounter = 0;
      this.currentSale = this.getCurrentSale();
      this.showEndInTimer = false;

      if (this.phaseCounter !== this.phases.length) {
        this.changeEndInTimer();

        await this.setProof();
      }
    },
    changeEndInTimer() {
      this.showEndInTimer = false;
      setTimeout(() => {
        this.showEndInTimer = true;
      }, 1);
    },
    displayWalletConnectedMessage() {
      this.showConnectWalletModal = false;

      this.$toast.showMessage({
        message: `${this.$store.state.walletStore.wallet.wallet} Wallet Connected Successfully`,
      });
    },
    showMintedProgress() {
      this.progressInterval = setInterval(async () => {
        if (this.collection.mintDetails) {
          if (
            this.collection.candyMachine.candy_id ===
            "0x39673a89d85549ad0d7bef3f53510fe70be2d5abaac0d079330ade5548319b62"
          ) {
            this.resource = await this.$store.dispatch(
              "walletStore/getSupplyAndMintedOfExternalCollection",
              {
                collectionId:
                  "0x9a6f1b16323c428756b439553ab2a6a4cbdd46ade55d0da17f3a7c7d3e4c6ac8",
              }
            );
          } else if (
            this.collection.candyMachine.candy_id ===
            "0xd2434b9d9fc38c6816d55a76a7df6806a0c0bc3599b7bbaabf713e6680f7c8df"
          ) {
            this.resource = await this.$store.dispatch(
              "walletStore/getSupplyAndMintedOfExternalCollection",
              {
                collectionId:
                  "0x185f604afb67f9bbcbaa2e3c84a7210c537528ed24ffd9778edc981486385885",
              }
            );
          } else {
            this.resource = await this.$store.dispatch(
              "walletStore/getSupplyAndMintedOfExternalCollection",
              {
                collectionId: this.collection.candyMachine.resource_account,
              }
            );
          }

          if (this.resource.total_supply === 0) {
            this.resource = await this.$store.dispatch(
              "walletStore/getSupplyAndMintedOfCollection",
              {
                resourceAccountAddress:
                  this.collection.candyMachine.resource_account,
                candyMachineId: this.collection.candyMachine.candy_id,
              }
            );
          }
        } else {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfCollection",
            {
              resourceAccountAddress:
                this.collection.candyMachine.resource_account,
              candyMachineId: this.collection.candyMachine.candy_id,
            }
          );
        }

        if (this.collection.status.sold_out) {
          clearInterval(this.progressInterval);
        }

        if (this.collection._id === "642bf277c10560ca41e179fa") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 239,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 222,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "64686db77db14461740bab0f") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 355,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "64625d957c7212d927559962") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 2333,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "6466a09b6fee90eea757521c") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 343,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "654c9afff8961c791c804cf1") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 1350,
            paused: this.resource.paused,
          };
        } else if (this.collection._id === "654e26260a58324d3465b4cb") {
          this.resource = {
            minted: this.resource.minted,
            total_supply: 955,
            paused: this.resource.paused,
          };
        }

        const soldOutCollectionSupply = checkIfCollectionIsSoldOut(
          this.collection
        );

        if (soldOutCollectionSupply) {
          this.resource.total_supply = soldOutCollectionSupply.supply;
        }

        if (
          this.resource.minted == this.resource.total_supply &&
          !this.collection.status.sold_out
        ) {
          this.collection.status.sold_out = true;
        }

        this.resource.mintedPercent = Math.floor(
          (this.resource.minted / this.resource.total_supply) * 100
        );

        if (
          this.collection.isEdition &&
          this.collection.edition === "ticket-open-edition"
        ) {
          return;
        } else {
          const resourceMintedPercent = document.querySelector(
            "#resourceMintedPercent"
          );

          resourceMintedPercent.style.width = this.resource.mintedPercent + "%";
        }
      }, 5000);
    },
    increaseNumberOfNft() {
      if (
        this.numberOfNft >=
        this.resource.total_supply - this.resource.minted
      ) {
        return;
      } else {
        if (this.numberOfNft >= this.maxNumberOfNft) {
          this.numberOfNft = this.maxNumberOfNft;
          return;
        }
        this.numberOfNft++;
      }
    },
    decreaseNumberOfNft() {
      if (this.numberOfNft <= 1) {
        return;
      } else {
        this.numberOfNft--;
      }
    },
    startDecrement() {
      this.holdingDecreaseButtonInterval = setInterval(() => {
        this.decreaseNumberOfNft();
      }, 100);
    },
    stopDecrement() {
      clearInterval(this.holdingDecreaseButtonInterval);
    },
    startIncrement() {
      this.holdingIncreaseButtonInterval = setInterval(() => {
        this.increaseNumberOfNft();
      }, 100);
    },
    stopIncrement() {
      clearInterval(this.holdingIncreaseButtonInterval);
    },
    checkNumberOfNft() {
      if (isNaN(this.numberOfNft)) {
        this.$toast.showMessage({
          message: "Please Enter a number",
          error: true,
        });
        this.numberOfNft = 1;
        return;
      }

      if (this.numberOfNft < 1 && this.numberOfNft !== "") {
        this.numberOfNft = 1;
        return;
      }

      if (
        this.numberOfNft > this.maxNumberOfNft ||
        this.numberOfNft >= this.resource.total_supply - this.resource.minted
      ) {
        if (
          this.resource.total_supply - this.resource.minted >=
          this.maxNumberOfNft
        ) {
          this.numberOfNft = this.maxNumberOfNft;
        } else {
          this.numberOfNft = this.resource.total_supply - this.resource.minted;
        }
        return;
      }
    },
    async mintBulkCollection() {
      try {
        if (!this.$store.state.walletStore.wallet.wallet) {
          this.showConnectWalletModal = true;
          return;
        }

        if (!this.numberOfNft) {
          throw new Error("Please Enter Number of Nft to mint");
        }

        this.minting = true;

        if (this.mintButtonClicked >= 2) {
          this.removePhasesFromLocalStorage();
          this.removeProofFromLocalStorage();

          this.whitelisted = false;
          this.notWhitelisted = false;
          this.gettingProof = true;
          await this.checkWhitelistForPhases();
          await this.setProof();
        }

        this.mintButtonClicked++;

        if (this.collection.mintDetails) {
          this.mintCollectionExternally();
          return;
        }

        // if (this.checkPublicSaleTimer()) {
        //   if (this.mintLimit <= this.currentlyOwned) {
        //     throw new Error("Mint Limit for this phase Exceeded");
        //   }
        // }
        let mintRes = null;
        if (!this.v2) {
          mintRes = await this.$store.dispatch("walletStore/mintBulk", {
            resourceAccount: this.collection.candyMachine.resource_account,
            publicMint: !this.checkPublicSaleTimer(),
            candyMachineId: this.collection.candyMachine.candy_id,
            mintNumber: this.numberOfNft,
            proof: this.proof,
            mintLimit: this.totalMintLimit,
            sender: this.getSender,
          });
        } else {
          if (
            this.collection.seed &&
            this.collection.seed.coin_type !== "APT"
          ) {
            mintRes = await anotherCoinMintCollection({
              candy_machine_id: this.collection.candyMachine.candy_id,
              candy_object: this.collection.candyMachine.resource_account,
              amount: this.numberOfNft,
              publicMint: !this.checkPublicSaleTimer(),
              proof: this.proof,
              mint_limit: this.totalMintLimit,
              coinType: this.collection.seed.coin_type,
              sender: this.getSender,
              mint_price: this.currentSale.mint_price,
            });
          } else {
            mintRes = await mintCollection({
              candy_machine_id: this.collection.candyMachine.candy_id,
              candy_object: this.collection.candyMachine.resource_account,
              amount: this.numberOfNft,
              publicMint: !this.checkPublicSaleTimer(),
              proof: this.proof,
              mint_limit: this.totalMintLimit,
              sender: this.getSender,
              mint_price: this.currentSale.mint_price,
              simulatedMerkleMint: this.simulatedMerkleMint,
            });
          }
        }

        if (mintRes.success) {
          this.mintButtonClicked = 0;
          this.simulatedMerkleMint = true;

          this.$toast.showMessage({
            message: `${this.collection.name} Minted Successfully`,
          });

          this.mintedTokens = getMintedTokenDataIdsFromTransaction(mintRes);

          // if (this.collection.tweet) {
          // this.showShareModal = true;
          this.showAfterMintModal = true;
          // }

          let res = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfCollection",
            {
              resourceAccountAddress:
                this.collection.candyMachine.resource_account,
              candyMachineId: this.collection.candyMachine.candy_id,
            }
          );

          if (this.collection._id === "642bf277c10560ca41e179fa") {
            res = {
              minted: res.minted,
              total_supply: 239,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
            res = {
              minted: res.minted,
              total_supply: 222,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "64686db77db14461740bab0f") {
            res = {
              minted: res.minted,
              total_supply: 355,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "6466a09b6fee90eea757521c") {
            res = {
              minted: this.resource.minted,
              total_supply: 343,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "654c9afff8961c791c804cf1") {
            res = {
              minted: this.resource.minted,
              total_supply: 1350,
              paused: this.resource.paused,
            };
          } else if (this.collection._id === "654e26260a58324d3465b4cb") {
            res = {
              minted: this.resource.minted,
              total_supply: 955,
              paused: this.resource.paused,
            };
          }

          this.numberOfNft = 1;

          await this.getOwnedCollectionOfUser();
        } else {
          this.$toast.showMessage({
            message: "Collection Not Minted",
            error: true,
          });
        }

        this.minting = false;
      } catch (error) {
        console.log(error);

        if (error.message && error.message === "Invalid Proof") {
          this.mintButtonClicked = 0;
          this.merkleMintRetries++;

          if (this.merkleMintRetries < 6) {
            this.removePhasesFromLocalStorage();
            this.removeProofFromLocalStorage();

            await this.checkWhitelistForPhases();

            await this.setProof();

            setTimeout(() => {
              this.mintBulkCollection();
            }, 3000);
          } else {
            this.$toast.showMessage({ message: error, error: true });
            this.minting = false;
          }

          return;
        }

        if (
          error.response &&
          error.response.data.msg &&
          error.response.data.msg ===
            "Whitelist entry associated with this wallet address not found."
        ) {
          this.$toast.showMessage({
            message: "You are not listed in Whitelist for this Collection",
            error: true,
          });
        } else {
          this.$toast.showMessage({ message: error, error: true });
        }
        this.minting = false;
        this.simulatedMerkleMint = true;
      }
    },
    async setProof() {
      if (!this.getWalletAddress) {
        this.gettingProof = false;
        this.whitelisted = false;
        this.removeProofFromLocalStorage();

        return;
      }

      const currentPhase = this.phases.find(
        (phase) => phase.id === this.currentSale.id
      );
      this.currentSale.mintLimit = currentPhase.mintLimit;

      this.mintLimit = currentPhase.mintLimit;

      this.setMaxNumberOfNfts();

      if (!currentPhase.whitelisted) {
        this.notWhitelisted = true;
        this.gettingProof = false;
        this.whitelisted = false;
        return;
      }

      try {
        this.whitelisted = false;

        this.gettingProof = true;

        this.proof = [];
        const localStorageProof = this.getProofFromLocalStorage();

        if (
          localStorageProof &&
          localStorageProof.collectionId === this.collection._id &&
          localStorageProof.phase === this.currentSale.id &&
          this.collection.updated_at &&
          this.getWalletAddress === localStorageProof.walletAddress &&
          new Date(this.collection.updated_at).getTime() ===
            new Date(localStorageProof.updatedAt).getTime() &&
          localStorageProof.proof.length > 0
        ) {
          this.proof = localStorageProof.proof;
          this.totalMintLimit = localStorageProof.mintLimit;
          this.gettingProof = false;
          this.notWhitelisted = false;
          this.whitelisted = true;
          return;
        }

        const proofParams = {
          walletAddress: this.getWalletAddress,
          collectionId: this.collection._id,
          phase: this.currentSale.id,
        };

        const res = await getProof(proofParams);

        const proofs = JSON.parse(res.data.data);

        this.totalMintLimit = 0;

        this.phases.forEach((phase) => {
          if (new Date(phase.mint_time).getTime() < Date.now()) {
            this.totalMintLimit += phase.mintLimit ? phase.mintLimit : 0;
          }
        });

        proofs.map((proof) => {
          this.proof.push(proof.data);
        });

        await this.getMintLimitOfPreviousPhases();

        if (this.collection.updated_at) {
          this.setProofInLocalStorage({
            proof: this.proof,
            mintLimit: this.totalMintLimit,
            collectionId: this.collection._id,
            phase: this.currentSale.id,
            updatedAt: this.collection.updated_at,
            walletAddress: this.getWalletAddress,
          });
        }

        await this.getOwnedCollectionOfUser();

        this.gettingProof = false;
        this.notWhitelisted = false;
        this.whitelisted = true;
      } catch (error) {
        console.log(error);

        if (error.response && error.response.status === 400) {
          this.notWhitelisted = true;
          this.whitelisted = false;
        }

        this.notWhitelisted = true;
        this.whitelisted = false;

        this.numberOfNft = 1;

        this.gettingProof = false;
      }
    },
    async getOwnedCollectionOfUser() {
      // const res = await getOwnedCollectionOfUser(
      //   this.getWalletAddress,
      //   this.collection.name
      // );

      // this.currentlyOwned = res;

      this.setMaxNumberOfNfts();
    },
    getCurrentSale() {
      this.phases.map((phase) => {
        if (new Date(phase.mint_time).getTime() < Date.now()) {
          this.phaseCounter++;
        }
      });

      if (this.phaseCounter === this.phases.length) {
        this.nextSale = this.phases[this.phases.length - 1];
        return this.phases[this.phases.length - 1];
      }

      this.nextSale = this.phases[this.phaseCounter];

      return this.phaseCounter > 0
        ? this.phases[this.phaseCounter - 1]
        : this.phases[0];
    },
    setPhases() {
      this.phases = [];

      this.phases = this.collection.phases ? this.collection.phases : [];

      if (!this.collection.phases) {
        if (
          this.collection.mintDetails &&
          this.collection.mintDetails.all_mint_at_same_time
        ) {
          if (
            new Date(this.collection.candyMachine.whitelist_sale_time) >
            new Date()
          ) {
            this.phases.push({
              name: "whitelist sale",
              id: "whitelist",
              mint_price: this.collection.candyMachine.whitelist_price,
              mint_time: this.collection.candyMachine.whitelist_sale_time,
            });
          }
        } else {
          if (
            new Date(this.collection.candyMachine.public_sale_time).getTime() -
              new Date(
                this.collection.candyMachine.whitelist_sale_time
              ).getTime() >
            1000
          ) {
            this.phases.push({
              name: "whitelist sale",
              id: "whitelist",
              mint_price: this.collection.candyMachine.whitelist_price,
              mint_time: this.collection.candyMachine.whitelist_sale_time,
            });
          }
        }
      }

      const publicSale = {
        name: "Ticket Price",
        id: "public-sale",
        mint_price: this.collection.candyMachine.public_sale_price,
        mint_time: this.collection.candyMachine.public_sale_time,
      };

      this.phases.push(publicSale);

      // Set Ended phases
      this.setEndedPhases();
    },
    checkLiveStatus() {
      const mintTime = new Date(this.currentSale.mint_time);
      if (mintTime < new Date()) {
        return true;
      }

      return false;
    },
    checkIfPhaseStarted(mint_time) {
      const mintTime = new Date(mint_time);
      if (mintTime < new Date()) {
        return true;
      }

      return false;
    },
    async copyLink(event) {
      const clipboardData =
        event.clipboardData ||
        window.clipboardData ||
        event.originalEvent?.clipboardData ||
        navigator.clipboard;

      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      clipboardData.writeText(`${baseURL}/nft/${this.collection.username}`);

      this.$toast.showMessage({ message: "Link Copied" });

      this.showShareBox = false;
    },
    shareOnTwitter() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      const twitterURL = "https://twitter.com";

      const text = "Check out this collection on Wapal";

      const link = `${baseURL}/${
        this.collection.isEdition ? "editions" : "nft"
      }/${this.collection.username}`;

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}&via=wapal_official`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },
    hideShareBox() {
      this.showShareBox = false;
    },
    async setCollectionToLive() {
      setTimeout(() => {
        this.live = true;
      }, 100);
      if (this.phases.length === 1) {
        this.phaseCounter = 1;
      }
    },
    startPhaseInterval() {
      const currentSaleTime = new Date(this.currentSale.mint_time).getTime();
      const threeMinutes = 1000 * 60 * 3;

      if (
        Date.now() - currentSaleTime <= threeMinutes &&
        Date.now() - currentSaleTime > 0
      ) {
        this.showPhaseChangeMessage = true;

        setTimeout(() => {
          this.showPhaseChangeMessage = false;
        }, threeMinutes - (Date.now() - currentSaleTime));
      }

      this.phaseInterval = setInterval(async () => {
        const date = new Date(this.nextSale.mint_time);

        const now = new Date().getTime();

        const interval = date.getTime() - now;

        if (interval <= 0) {
          clearInterval(this.phaseInterval);
          this.phaseCounter = 0;
          this.currentSale = this.getCurrentSale();

          if (this.phaseCounter === this.phases.length) {
            this.notWhitelisted = false;
            this.gettingProof = false;

            return;
          }
          await this.setProof();
          this.startPhaseInterval();
        }
      }, 1000);
    },
    async mintCollectionExternally() {
      try {
        if (
          this.collection.candyMachine.candy_id ===
          "0x39673a89d85549ad0d7bef3f53510fe70be2d5abaac0d079330ade5548319b62"
        ) {
          await sponsorMintTransaction();

          this.minting = false;
          this.numberOfNft = 1;

          this.$toast.showMessage({
            message: `${this.collection.name} Minted Successfully`,
          });

          this.mintButtonClicked = 0;

          if (this.collection.tweet) {
            this.showShareModal = true;
          }

          return;
        }

        if (
          this.collection.candyMachine.candy_id ===
          "0xd2434b9d9fc38c6816d55a76a7df6806a0c0bc3599b7bbaabf713e6680f7c8df"
        ) {
          await normalMintTransaction();
          this.minting = false;
          this.numberOfNft = 1;
          this.mintCounter;
          return;
        }

        if (this.externalWhitelisted) {
          const res = await this.$store.dispatch("walletStore/externalMint", {
            mintFunction: this.collection.mintDetails.whitelist_mint_function,
            programId: this.collection.candyMachine.candy_id,
            moduleName: this.collection.mintDetails.module_name,
            numberOfNfts: this.numberOfNft,
          });
          this.minting = false;

          const whitelistRes = await this.$store.dispatch(
            "walletStore/checkIfWalletAddressIsWhitelisted",
            {
              walletAddress: this.getWalletAddress,
              programId: this.collection.candyMachine.candy_id,
              moduleName: this.collection.mintDetails.module_name,
              viewFunction:
                this.collection.mintDetails.check_whitelist_function,
            }
          );
        } else {
          this.publicMintCollectionExternally();
        }
      } catch (error) {
        this.minting = false;
        if (error.message === "Error getting whitelist proof") {
          this.externalWhitelisted = false;
          this.currentSale.mint_price =
            this.collection.candyMachine.public_sale_price;
        } else {
          this.minting = false;
          this.$toast.showMessage({ message: error, error: true });
        }
      }
    },
    async publicMintCollectionExternally() {
      try {
        this.currentSale.mint_price =
          this.collection.candyMachine.public_sale_price;

        if (!this.collection.mintDetails.many && this.numberOfNft > 1) {
          throw new Error("Please Mint One NFT at a time");
        }

        if (this.numberOfNft > 1) {
          const res = await this.$store.dispatch(
            "walletStore/bulkExternalMint",
            {
              mintFunction:
                this.collection.mintDetails.public_mint_many_function,
              programId: this.collection.candyMachine.candy_id,
              moduleName: this.collection.mintDetails.module_name,
              numberOfNfts: this.numberOfNft,
            }
          );
        } else {
          const res = await this.$store.dispatch("walletStore/externalMint", {
            mintFunction: this.collection.mintDetails.public_mint_function,
            programId: this.collection.candyMachine.candy_id,
            moduleName: this.collection.mintDetails.module_name,
          });
        }
        this.minting = false;
        this.numberOfNft = 1;
      } catch (error) {
        console.log(error);
        this.minting = false;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    async checkWhitelistForExternalMint() {
      try {
        const whitelistRes = await this.$store.dispatch(
          "walletStore/checkIfWalletAddressIsWhitelisted",
          {
            walletAddress: this.getWalletAddress,
            programId: this.collection.candyMachine.candy_id,
            moduleName: this.collection.mintDetails.module_name,
            viewFunction: this.collection.mintDetails.check_whitelist_function,
          }
        );

        if (whitelistRes) {
          this.currentSale.mint_price =
            this.collection.candyMachine.whitelist_price;

          this.externalWhitelistMintNumber = whitelistRes[0];
        }

        this.externalWhitelisted = true;
      } catch (error) {
        this.currentSale.mint_price =
          this.collection.candyMachine.public_sale_price;
        this.externalWhitelisted = false;
      }
    },
    shareOnTwitterAfterMinting() {
      const baseURL = process.env.baseURL?.includes("staging")
        ? "https://staging.wapal.io"
        : "https://launchpad.wapal.io";

      const twitterURL = "https://twitter.com";

      const link = `${baseURL}/${
        this.collection.isEdition ? "editions" : "nft"
      }/${this.collection.username}`;

      const text = encodeURIComponent(this.collection.tweet);

      const twitterShareLink = `${twitterURL}/intent/tweet?text=${text}&url=${link}`;

      window.open(twitterShareLink, "_blank");

      this.showShareBox = false;
    },

    async getMintLimitOfPreviousPhases() {
      let mintLimit = 0;
      await Promise.all(
        this.collection.phases.map(async (phase) => {
          const date = new Date();

          const phaseStartDate = new Date(phase.mint_time);

          if (date > phaseStartDate) {
            const mintLimitRes = await getMintLimit({
              walletAddress: this.getWalletAddress,
              collectionId: this.collection._id,
              phase: phase.id,
            });

            const data = mintLimitRes.data.data;

            if (data) {
              mintLimit += data.mint_limit;
            }
          }
        })
      );
    },
    setMaxNumberOfNfts() {
      if (
        this.collection.candyMachine.candy_id ===
          "0xd2434b9d9fc38c6816d55a76a7df6806a0c0bc3599b7bbaabf713e6680f7c8df" ||
        this.collection.candyMachine.candy_id ===
          "0x39673a89d85549ad0d7bef3f53510fe70be2d5abaac0d079330ade5548319b62"
      ) {
        this.maxNumberOfNft = 1;

        return;
      }

      if (this.collection.isEdition) {
        this.maxNumberOfNft = 200;
        return;
      }

      if (!this.checkPublicSaleTimer()) {
        if (Number(this.publicSaleMintLimit)) {
          this.maxNumberOfNft = this.publicSaleMintLimit;
          return;
        }

        this.maxNumberOfNft = 10;
        return;
      }

      this.maxNumberOfNft = this.mintLimit;

      if (this.maxNumberOfNft <= 0) {
        this.maxNumberOfNft = 1;
      }

      if (this.maxNumberOfNft >= 10) {
        this.maxNumberOfNft = 10;
      }

      this.numberOfNft = 1;
    },
    async checkWhitelistForPhases() {
      if (!this.getWalletAddress) {
        this.phases = this.phases.map((phase) => {
          let tempPhase = structuredClone(phase);
          tempPhase.whitelisted = false;

          return tempPhase;
        });

        this.removePhasesFromLocalStorage();
        this.removeProofFromLocalStorage();
        return;
      }

      const localStoragePhases = this.getPhaseFromLocalStorage();

      if (
        localStoragePhases &&
        localStoragePhases.collectionId === this.collection._id &&
        this.collection.updated_at &&
        this.getWalletAddress === localStoragePhases.walletAddress &&
        new Date(this.collection.updated_at).getTime() ===
          new Date(localStoragePhases.updatedAt).getTime()
      ) {
        this.phases = localStoragePhases.phases;
      } else {
        this.phases = await Promise.all(
          this.phases.map(async (phase) => {
            let tempPhase = structuredClone(phase);
            try {
              if (tempPhase.id !== "public-sale") {
                const res = await getMintLimit({
                  walletAddress: this.getWalletAddress,
                  collectionId: this.collection._id,
                  phase: tempPhase.id,
                });

                if (res.data.data) {
                  tempPhase.whitelisted = true;
                  tempPhase.mintLimit = res.data.data.mint_limit;
                } else {
                  tempPhase.whitelisted = false;
                  tempPhase.mintLimit = 0;
                }
              }

              return tempPhase;
            } catch (error) {
              console.log(error);
              tempPhase.whitelisted = false;

              return tempPhase;
            }
          })
        );
        this.setPhasesInLocalStorage({
          phases: this.phases,
          collectionId: this.collection._id,
          updatedAt: this.collection.updated_at,
          walletAddress: this.getWalletAddress,
        });
      }
    },
    getProofFromLocalStorage() {
      const proof = JSON.parse(localStorage.getItem("proof"));

      return proof;
    },
    setProofInLocalStorage({
      proof,
      mintLimit,
      collectionId,
      phase,
      updatedAt,
      walletAddress,
    }) {
      localStorage.setItem(
        "proof",
        JSON.stringify({
          proof: proof,
          mintLimit: mintLimit,
          collectionId: collectionId,
          phase: phase,
          updatedAt: updatedAt,
          walletAddress: walletAddress,
        })
      );
    },
    removeProofFromLocalStorage() {
      localStorage.removeItem("proof");
    },
    getPhaseFromLocalStorage() {
      const proof = JSON.parse(localStorage.getItem("phases"));

      return proof;
    },
    setPhasesInLocalStorage({
      phases,
      collectionId,
      updatedAt,
      walletAddress,
    }) {
      localStorage.setItem(
        "phases",
        JSON.stringify({
          phases: phases,
          collectionId: collectionId,
          updatedAt: updatedAt,
          walletAddress: walletAddress,
        })
      );
    },
    removePhasesFromLocalStorage() {
      localStorage.removeItem("phases");
    },
    setEndedPhases() {
      this.endedPhases = [];
      this.phases.forEach((phase, index) => {
        const nextPhase = this.phases[index + 1];

        if (!nextPhase) {
          return;
        }

        if (Date.now() > new Date(nextPhase.mint_time).getTime()) {
          this.endedPhases.push(phase);
        }

        return;
      });
    },
    // popup method
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    closePopup() {
      this.showPopup = false;
    },
    sendMessage() {
      this.showPopup = false;
    },
  },
  computed: {
    // composeGmailLink() {
    //   // Return the mailto link
    //   return `mailto:${this.recipient}`;
    // },
    getCurrentPrice() {
      if (
        this.collection.candyMachine.public_sale_price ==
        this.collection.candyMachine.whitelist_price
      ) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (!this.showPublicSaleTimer) {
        return this.collection.candyMachine.public_sale_price;
      }

      if (this.whitelistSaleDate && this.showPublicSaleTimer) {
        return this.collection.candyMachine.whitelist_price;
      } else {
        return this.collection.candyMachine.public_sale_price;
      }
    },
    showMintBox() {
      if (this.phases.length < 2) {
        return !this.showPublicSaleTimer;
      }
      return !this.showWhitelistSaleTimer || !this.showPublicSaleTimer;
    },
    showLiveInTimer() {
      if (this.phases.length > 1) {
        return this.showWhitelistSaleTimer && this.showPublicSaleTimer;
      }
      return this.showPublicSaleTimer;
    },
    getWalletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
    getSender() {
      return {
        walletAddress: this.$store.state.walletStore.wallet.walletAddress,
        publicKey: this.$store.state.walletStore.wallet.publicKey,
      };
    },
    generatedProof() {
      if (!this.checkPublicSaleTimer()) {
        return true;
      }

      if (!this.gettingProof) {
        return true;
      }

      return false;
    },
    getMintButtonDisabledStatus() {
      return (
        this.minting ||
        this.collection.status.sold_out ||
        this.gettingProof ||
        this.notWhitelisted ||
        this.resource.paused
      );
    },
  },
  async mounted() {
    if (this.collection) {
      // console.log("check clect", this.collection);
      this.collectionTweet = this.collection.tweet;
      this.collectionUserName = this.collection.username;
      const collection_name = await ticketCollectionUri(this.collection.name);
      const res = await this.$axios.get(collection_name);
      // console.log(res)

      // Assign only the description to the data property
      this.collectionDescription = res.data.description;

      // console.log("Collection_name", collection_name)
      
      // location and venue
      if (this.collection.location.location) {
        this.location = this.collection.location.location; // "nepal"
        this.venue = this.collection.location.venue; // "Thamel, Kathmandu 44600, Nepal"
      }
      this.$gmapApiPromiseLazy().then(() => {
        this.googleReady = true;
        this.fetchLocationCoordinates(this.venue || this.location);
      });

      // Assign and format public_sale_time
      this.publicSaleTime = this.collection.candyMachine.public_sale_time;
      const { date, time } = this.formatDateTime(this.publicSaleTime);
      this.formattedDate = date;
      this.formattedTime = time;

      // this.collection.tweet = this.collectionTweet;
      // this.collection.username = this.collectionUserName;
      if (this.collection.username === "proudlionsclub") {
        this.collection.username = "proud-lions-club";
      } else if (this.collection.username === "squids-|-aptos") {
        this.collection.username = "squid-aptos";
      }

      if (this.collection.username === "wapal-santa") {
        this.collection.video = santa;
      }

      this.setPhases();
      this.setMaxNumberOfNfts();

      this.currentSale = this.getCurrentSale();

      this.live = this.checkLiveStatus();

      this.publicSaleDate = new Date(
        this.phases[this.phases.length - 1].mint_time
      );

      this.collection.candyMachine.public_sale_price =
        this.phases[this.phases.length - 1].mint_price;

      this.showWhitelistSaleTimer = this.checkWhitelistSaleTimer();
      this.showPublicSaleTimer = this.checkPublicSaleTimer();

      this.showEndInTimer = true;

      if (this.collection.mintDetails) {
        if (
          this.collection.candyMachine.candy_id ===
          "0x39673a89d85549ad0d7bef3f53510fe70be2d5abaac0d079330ade5548319b62"
        ) {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfExternalCollection",
            {
              collectionId:
                "0x9a6f1b16323c428756b439553ab2a6a4cbdd46ade55d0da17f3a7c7d3e4c6ac8",
            }
          );
        } else if (
          this.collection.candyMachine.candy_id ===
          "0xd2434b9d9fc38c6816d55a76a7df6806a0c0bc3599b7bbaabf713e6680f7c8df"
        ) {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfExternalCollection",
            {
              collectionId:
                "0x185f604afb67f9bbcbaa2e3c84a7210c537528ed24ffd9778edc981486385885",
            }
          );
        } else {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfExternalCollection",
            {
              collectionId: this.collection.candyMachine.resource_account,
            }
          );
        }

        if (this.resource.total_supply === 0) {
          this.resource = await this.$store.dispatch(
            "walletStore/getSupplyAndMintedOfCollection",
            {
              resourceAccountAddress:
                this.collection.candyMachine.resource_account,
              candyMachineId: this.collection.candyMachine.candy_id,
            }
          );
        }
      } else {
        this.resource = await this.$store.dispatch(
          "walletStore/getSupplyAndMintedOfCollection",
          {
            resourceAccountAddress:
              this.collection.candyMachine.resource_account,
            candyMachineId: this.collection.candyMachine.candy_id,
          }
        );
      }

      this.v2 = this.resource.v2;
      this.publicSaleMintLimit = this.resource.publicSaleMintLimit;

      if (this.collection._id === "642bf277c10560ca41e179fa") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 239,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "644fd55dafc9fe9c6277aad7") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 222,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "64686db77db14461740bab0f") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 355,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "64625d957c7212d927559962") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 2333,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "6466a09b6fee90eea757521c") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 343,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "654c9afff8961c791c804cf1") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 1350,
          paused: this.resource.paused,
        };
      } else if (this.collection._id === "654e26260a58324d3465b4cb") {
        this.resource = {
          minted: this.resource.minted,
          total_supply: 955,
          paused: this.resource.paused,
        };
      }

      const soldOutCollectionSupply = checkIfCollectionIsSoldOut(
        this.collection
      );

      if (soldOutCollectionSupply) {
        this.resource.total_supply = soldOutCollectionSupply.supply;
      }

      this.resource.mintedPercent = Math.floor(
        (this.resource.minted / this.resource.total_supply) * 100
      );

      if (this.checkWhitelistSale) {
        const whitelistRes = await getWhitelistEntryById(
          this.collection._id,
          1,
          1,
          "whitelist"
        );

        this.whitelistNumber = whitelistRes.data.spotsCount;
      }

      this.loading = false;

      await this.checkWhitelistForPhases();

      if (
        this.phases.length > 1 &&
        this.showPublicSaleTimer &&
        !this.showWhitelistSaleTimer
      ) {
        await this.setProof();
      } else {
        this.gettingProof = false;
      }

      if (this.phases.length > 1) {
        this.startPhaseInterval();
      }

      if (
        this.collection.mintDetails &&
        this.collection.mintDetails.check_whitelist_function &&
        this.collection.mintDetails.all_mint_at_same_time
      ) {
        await this.checkWhitelistForExternalMint();
      }

      setTimeout(() => {
        if (!this.collection.status.sold_out && this.live) {
          this.showMintedProgress();
        } else {
          if (
            this.collection.isEdition &&
            this.collection.edition === "ticket-open-edition"
          ) {
            return;
          } else {
            const resourceMintedPercent = document.querySelector(
              "#resourceMintedPercent"
            );

            resourceMintedPercent.style.width =
              this.resource.mintedPercent + "%";
          }
        }
      }, 200);
    }
  },
  beforeDestroy() {
    clearInterval(this.progressInterval);
  },
  watch: {
    async getWalletAddress() {
      if (this.phases.length > 1 && this.showPublicSaleTimer) {
        this.whitelisted = false;
        this.notWhitelisted = false;
        this.gettingProof = true;
        await this.checkWhitelistForPhases();
        await this.setProof();
        await this.getOwnedCollectionOfUser();
      } else {
        await this.checkWhitelistForPhases();
      }

      if (
        this.collection.mintDetails &&
        this.collection.mintDetails.check_whitelist_function &&
        this.collection.mintDetails.all_mint_at_same_time
      ) {
        await this.checkWhitelistForExternalMint();
      }

      await this.checkWhitelistForPhases();
    },
  },
};
</script>
<style lang="css">
.video-detailed {
  max-width: 550px;
  height: 450px;
  border-radius: 0.25rem !important;
}
@media (max-width: 600px) {
  .video-detailed {
    height: 350px;
  }
}
@media (min-width: 1024px) and (max-width: 1200px) {
  .video-detailed {
    height: 450px;
  }
}
.audio-bg {
  position: absolute;
  left: 0;
  bottom: 0px;
  right: 0;
  padding: 0 16px 16px;
  background-image: linear-gradient(transparent, #000) !important;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
@media (max-width: 768px) {
  .card-min-width {
    min-width: 50%;
  }
}
</style>
