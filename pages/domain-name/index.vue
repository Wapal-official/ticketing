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
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
      >
        <a target="_blank">
          <v-icon
            class="!tw-text-2xl tw-transition tw-duration-200 tw-ease-linear hover:!tw-text-wapal-pink"
            >mdi-twitter</v-icon
          > </a
        ><a target="_blank" class="nft-discord-icon">
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
          Phontem Space Pirates
        </h1>
        <p class="tw-font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a
          rhoncus augue. Phasellus egestas varius ex, vitae egestas velit
          aliquet sed.
        </p>
      </div>
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8"
      >
        <div class="tw-relative tw-w-full">
          <input
            class="tw-w-full tw-rounded-md !tw-border-solid !tw-border !tw-border-wapal-gray tw-py-2 tw-px-8 tw-text-wapal-gray placeholder:tw-text-wapal-gray focus:tw-outline-none focus:!tw-border-wapal-gray"
            placeholder="Search Domain Names"
            v-model="domainName"
            @focusout="showDomainName = true"
            @focus="showDomainName = false"
            @keyup.enter="showDomainName = true"
          />
          <button
            class="tw-absolute tw-right-3 tw-top-[15%]"
            @click="showDomainName = true"
            v-if="!showDomainName || !domainName"
          >
            <v-icon class="!tw-text-wapal-gray !tw-text-2xl"
              >mdi-magnify</v-icon
            >
          </button>
          <button
            class="tw-absolute tw-right-3 tw-top-[15%]"
            @click="domainName = null"
            v-else
          >
            <v-icon class="!tw-text-wapal-gray !tw-text-2xl">mdi-close</v-icon>
          </button>
        </div>
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-8 tw-text-black md:tw-flex-row md:tw-items-center"
          v-if="showDomainName && domainName"
        >
          <div
            class="tw-w-full md:tw-w-[90%] tw-bg-wapal-gray tw-flex tw-flex-row tw-items-center tw-justify-between tw-py-4 tw-px-4 tw-rounded-md"
          >
            <div>
              <div class="tw-text-lg">{{ domainName }}.Apt</div>
              <div class="tw-text-green-800 tw-text-sm">Available</div>
            </div>
            <div>
              <div class="tw-text-lg">5 APT</div>
              <div class="tw-text-sm">Domain Cost</div>
            </div>
          </div>
          <button
            class="tw-full tw-rounded tw-text-white tw-bg-wapal-pink tw-py-4 tw-px-6"
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import domain from "@/assets/img/domain-name.png";
export default {
  data() {
    return {
      domainName: null,
      showDomainName: false,
      domain,
    };
  },
};
</script>
