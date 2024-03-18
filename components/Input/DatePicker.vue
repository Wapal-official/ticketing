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
    <div class="tw-relative tw-w-full" @click="showDatePickerTimePanel = false">
      <date-picker
        v-model="internalValue"
        type="datetime"
        :show-time-panel="showDatePickerTimePanel"
        @update:show-time-panel="updateShowTimePanel"
        :daysCustomDisplay="['S', 'M', 'T', 'W', 'T', 'F', 'S']"
        :placeholder="placeholder"
        :use12h="true"
        @change="handleChange"
        :disabled="disabled"
        class="wapal-input"
        format="YYYY:MM:DD hh:mm"
      >
        <template v-slot:footer>
          <div
            class="tw-flex tw-align-center tw-justify-between tw-pb-2 tw-px-3"
          >
            <p style="align-self: center; margin-bottom: 0 !important">Time</p>
            <div class="tw-flex tw-align-center">
              <button
                class="mx-btn mx-btn-text pull-left hour12-time"
                @click.stop="showTimePanel"
                style="
                  background: #2c2e33 !important;
                  margin-right: 8px !important;
                  padding: 0 8px !important;
                "
              >
                {{ hour ? hour : "00" }}:{{ minute ? minute : "00 " }}
              </button>
              <div class="hour12-tab">
                <button
                  class="hour12-tabs"
                  @click.stop="toggleAM()"
                  :class="{ active: amActive }"
                >
                  AM
                </button>
                <button
                  class="hour12-tabs"
                  @click.stop="togglePM()"
                  :class="{ active: pmActive }"
                >
                  PM
                </button>
              </div>
            </div>
          </div>
          <div class="tw-w-full tw-text-xs tw-text-center tw-pb-2">
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
import "~/assets/css/datePicker.css";
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
  data() {
    return {
      defaultTheme,
      hour: "",
      minute: "",
      showDatePickerTimePanel: false,
      amPm: "",
      amActive: true,
      pmActive: false,
      open: false,
    };
  },
  watch: {
    internalValue(newValue: any) {
      if (newValue) {
        const time = newValue.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const [hours, minutes, amPm] = time.split(/:| /);
        this.hour = hours;
        this.minute = minutes;
        this.amPm = amPm;

        if (amPm === "AM") {
          this.amActive = true;
          this.pmActive = false;
        } else {
          this.amActive = false;
          this.pmActive = true;
        }
      } else {
        this.showDatePickerTimePanel = false;
      }
    },
  },
  mounted() {
    this.showDatePickerTimePanel = false;
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
  methods: {
    handleChange(value: any, type: string) {
      if (type === "date") {
        this.showDatePickerTimePanel = false;
      }
    },
    toggleAM() {
      this.amPm = "AM";
      this.updateInternalValue();
    },

    togglePM() {
      this.amPm = "PM";
      this.updateInternalValue();
    },
    updateInternalValue() {
      if (!this.internalValue) {
        return;
      }
      let hours = parseInt(this.hour || 0, 10);
      if (this.amPm === "PM" && hours !== 12) {
        hours += 12;
      } else if (this.amPm === "AM" && hours === 12) {
        hours = 0;
      }
      const minutes = parseInt(this.minute || 0, 10);
      const newDate = new Date(this.internalValue);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.internalValue = newDate;
    },
    updateShowTimePanel(value: any) {
      this.showDatePickerTimePanel = value;

      if (this.internalValue) {
        const time = this.internalValue.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const [hours, minutes, amPm] = time.split(/:| /);
        this.hour = hours;
        this.minute = minutes;
        this.amPm = amPm;
      }
    },

    showTimePanel() {
      this.showDatePickerTimePanel = !this.showDatePickerTimePanel;
    },
  },
};
</script>
<style>
.mx-table-date thead {
  background: #1a1b1e !important;
  border-radius: 4px !important;
}
.mx-time {
  padding-top: 12px;
}
.mx-time .mx-time-header {
  display: none;
}
.mx-datepicker-footer {
  border-top: 1px solid #383a3f !important;
}
.hour12-time {
  border-radius: 4px;
  background: #2c2e33 !important;
  padding: 4px;
}
.hour12-tab {
  border-radius: 4px;
  background: #2c2e33;
  display: flex;
  padding: 4px;
  cursor: pointer;
  position: relative;
  z-index: 4;
}

.hour12-tabs {
  color: #fff;
  border-radius: 4px;
  padding: 0 4px;
  font-size: 14px;
}

.hour12-tabs.active {
  background-color: #8759ff;
}
::v-deep .mx-input {
  @apply !tw-h-[40px] !tw-bg-dark-6;
  padding: 6px 30px !important;
  padding-right: 10px !important;
}

::v-deep .mx-icon-calendar {
  display: none;
}
.mx-time-columns > div:first-child {
  /* display: none; */
}

.mx-time-columns > div:last-child {
  display: none;
}

.mx-calendar-time {
  background: #2c2e33 !important;
  background-color: #2c2e33 !important;
  max-width: 120px;
}
.mx-time-column {
  border-left: 1px solid transparent !important;
}
.mx-datepicker-main,
.mx-time {
  @apply !tw-bg-dark-6 tw-rounded
    tw-border-solid !tw-border-dark-4 !tw-text-base;
}

.mx-calendar-content .cell:hover,
.mx-time-column .mx-time-item:hover,
.mx-time-item.active {
  @apply active-color !tw-text-white;
}

.active-color {
  background: #8759ff;
  border-radius: 4px;
  max-width: 40px;
  margin: 0 auto;
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
  @apply active-color !tw-text-white;
}

.mx-time-column .mx-time-item {
  @apply !tw-text-sm tw-flex tw-flex-col tw-items-center tw-justify-center;
}
</style>
