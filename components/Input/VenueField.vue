<template>
    <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full">
      <label v-if="label" class="tw-text-white tw-text-sm tw-font-medium" :class="required ? `after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2` : ''">
        {{ label }}
      </label>
      <div class="tw-relative tw-w-full">
        <div class="tw-absolute tw-top-0 tw-left-[9px] tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-dark-2 tw-z-20">
          <slot name="prepend-icon"></slot>
        </div>
        <v-text-field
          v-model="internalValue"
          ref="autocompleteInput"
          :readonly="readOnly"
          outlined
          single-line
          color="#fff"
          hide-details
          :clearable="!$slots['append-icon']"
          :placeholder="placeholder"
          :counter="counter"
          :type="type"
          :disabled="disabled"
          class="wapal-input no-spin-button tw-w-full px-8"
          :class="{
            'tw-cursor-not-allowed': disabled,
            '!tw-pl-6': $slots['prepend-icon'],
          }"
          @keyup.enter="$emit('enterClicked')"
        >
        </v-text-field>
        <div class="tw-absolute tw-top-0 tw-right-[9px] tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-dark-2">
          <slot name="append-icon"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defaultTheme } from "@/theme/wapaltheme.ts";
  
  export default {
    props: {
      value: {
        type: [String, Number],
      },
      placeholder: {
        type: String,
      },
      type: {
        type: String,
        default: null,
      },
      counter: {
        type: Number,
        default: null,
      },
      error_messages: {
        type: String,
        default: null,
      },
      readOnly: {
        type: Boolean,
        default: false,
      },
      background: {
        type: String,
        default: defaultTheme.dark6,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
      },
      showPercentage: {
        type: Boolean,
        default: false,
      },
      autocomplete: {
        type: Boolean,
        default: false,
      },
      autocompleteType: {
        type: String,
        default: 'geocode',
      },
      locationBias: {
        type: Object,
        default: null,
      },
      locationBounds: {
      type: Object,
      default: null,
    },
    selectedCountry: {
      type: String,
    default: null,
    }
    },
    computed: {
      internalValue: {
        get() {
          return this.value;
        },
        set(newValue) {
          this.$emit("input", newValue);
        },
      },
    },
    data() {
      return {
        defaultTheme,
        autocompleteInstance: null,
      };
    },
    watch: {
      locationBias(newValue) {
        if (this.autocompleteInstance) {
          this.updateAutocompleteOptions(newValue);
        }
      },
    },
    async mounted() {
      if (this.autocomplete) {
        this.waitForGoogleMaps().then(() => {
          this.initializeAutocomplete();
        });
      }
    },
    methods: {
      waitForGoogleMaps() {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (typeof google !== "undefined" && google.maps && google.maps.places) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
        });
      },
      async initializeAutocomplete() {
        const options = this.getAutocompleteOptions();
        this.autocompleteInstance = new google.maps.places.Autocomplete(
          this.$refs.autocompleteInput.$el.querySelector("input"),
          options
        );
  
        this.autocompleteInstance.addListener("place_changed", async () => {
          const place = this.autocompleteInstance.getPlace();
          if (place.geometry) {
          this.$emit("input", place.name);
          this.$emit("placeChanged", place);
        } else {
          this.$emit("input", this.internalValue);
        }
      });
      this.$refs.autocompleteInput.$el.querySelector("input").addEventListener("keydown", this.handleKeyDown);
    },

    handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.$emit("input", this.internalValue);
      }
    },
      
      getAutocompleteOptions() {
        const options = {
          types: ['establishment'],
        };
        
        if (this.selectedCountry) {
    options.componentRestrictions = { country: this.selectedCountry.toLowerCase() }; // Restrict to the selected country
  } else {
    options.componentRestrictions = {}; // No restrictions for other countries
  }

        if (this.locationBias) {
          options.bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(this.locationBias.south, this.locationBias.west),
            new google.maps.LatLng(this.locationBias.north, this.locationBias.east)
          );
          options.strictBounds = false;
        }
  
        return options;
      },
      updateAutocompleteOptions(newLocationBias) {
        if (this.autocompleteInstance) {
          const options = this.getAutocompleteOptions();
          this.autocompleteInstance.setOptions(options);
        }
      },
    },
    beforeDestroy() {
    if (this.$refs.autocompleteInput) {
      this.$refs.autocompleteInput.$el.querySelector("input").removeEventListener("keydown", this.handleKeyDown);
    }
  }
  };
  </script>
  