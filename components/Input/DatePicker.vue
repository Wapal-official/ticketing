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
      <date-picker
        v-model="internalValue"
        type="datetime"
        :placeholder="placeholder"
        :disabled="disabled"
        class="wapal-input"
        format="YYYY:MM:DD hh:mm"
      >
        <template v-slot:footer>
          <div class="tw-w-full tw-text-xs tw-text-center">
            <span>Time Zone: </span
            ><span class="tw-text-primary-1">{{ getTimeZone }}</span>
          </div>
        </template>
      </date-picker>
      <div class="tw-absolute tw-top-[12px] tw-left-[6px]">
        <i class="bx bx-calendar tw-text-xl tw-text-white"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  components: { DatePicker },
  props: {
    value: {
      type: [Date, String],
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
  },
  computed: {
    internalValue: {
      get() {
        if (this.value) {
          return new Date(this.value);
        }

        return this.value;
      },
      set(newValue: any) {
        this.$emit("input", newValue);
      },
    },
    getTimeZone() {
      const gmtTime = new Date().toTimeString().slice(9, 17);

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const cityName = timeZone.split("/")[1] || "Unknown";

      return `${cityName} (${gmtTime})`;
    },
  },
  data() {
    return {
      defaultTheme,
    };
  },
};
</script>
<style scoped>
::v-deep .mx-input {
  @apply !tw-h-[40px] !tw-bg-dark-6;
  padding: 6px 30px !important;
  padding-right: 10px !important;
}

::v-deep .mx-icon-calendar {
  display: none;
}

.mx-datepicker-main,
.mx-time {
  @apply !tw-bg-dark-6 tw-rounded tw-border-solid !tw-border-dark-4 !tw-text-base;
}

.mx-calendar-content .cell:hover,
.mx-time-column .mx-time-item:hover,
.mx-time-item.active {
  @apply tw-bg-dark-7 !tw-text-white;
}

.cell.active {
  @apply !tw-bg-primary-1 !tw-text-white;
}

.mx-btn {
  @apply !tw-text-white;
}

.mx-btn:hover {
  @apply !tw-text-primary-1 !tw-border-primary-1;
}

.mx-time-header,
.mx-time-column,
.mx-datepicker-footer {
  border: none;
}

.mx-time-column .mx-time-item.active {
  @apply !tw-bg-dark-7 !tw-text-white;
}

.mx-time-column .mx-time-item {
  @apply !tw-text-sm tw-flex tw-flex-col tw-items-center tw-justify-center;
}
</style>
