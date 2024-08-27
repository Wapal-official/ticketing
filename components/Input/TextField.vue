<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
  >
    <label
      v-if="label"
      class="tw-text-white tw-text-sm tw-font-medium"
      :class="
        required
          ? `after:tw-content-['*'] after:tw-text-red-600 after:tw-pl-2`
          : ''
      "
      >{{ label }}</label
    >

    <div class="tw-relative tw-w-full">
      <div
        class="tw-absolute tw-top-0 tw-left-[9px] tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-dark-2 tw-z-20"
      >
        <slot name="prepend-icon"> </slot>
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
      <div
        class="tw-absolute tw-top-0 tw-right-[9px] tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-dark-2"
      >
        <slot name="append-icon"> </slot>
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
    };
  },
  mounted() {
    if (this.autocomplete) {
      this.initializeAutocomplete();
    }
  },
  methods: {
    initializeAutocomplete() {
      const options = {
        types: ['geocode'], // Customize the types as needed
      };
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocompleteInput.$el.querySelector('input'),
        options
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.$emit('input', place.formatted_address);
        this.$emit('placeChanged', place);
      });
    },
  },
};
</script>
<style scoped></style>
