<template>
  <div class="scrollable-row">
    <v-row
      v-for="(item, i) in row"
      :key="i"
      class="scrollable-content tw-my-2 tw-pl-2"
      no-gutters
    >
      <div v-if="name" class="d-flex align-center" :class="nameClass">
        <loader-skeleton
          v-if="checkbox"
          dynamicClass="rounded"
          class="tw-pl-4 tw-pr-2"
          :height="18"
          :width="18"
        />
        <loader-skeleton
          v-if="action"
          :height="15"
          :width="dynNameWidth(155)"
        />
        <loader-skeleton
          v-if="activity"
          class="tw-pl-4"
          :height="15"
          :width="60"
        />

        <loader-skeleton
          :dynamicClass="imageShape"
          :class="imageClass"
          class="tw-pr-2 tw-pl-2"
          :height="imageSize"
          :width="imageSize"
        />
        <loader-skeleton
          v-if="nameTitle"
          :height="nameHeight"
          :width="dynNameWidth(nameWidth)"
        />
      </div>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <loader-skeleton
        v-for="(item, j) in cols"
        :key="j"
        class="tw-ml-3 tw-mt-2"
        :class="rowClass"
        :height="height"
        :width="dynWidth(width)"
      />
    </v-row>
  </div>
</template>

<script>
import loaderSkeleton from "~/components/Landing/NftTransfer/loader/skeleton.vue";

export default {
  components: {
    loaderSkeleton,
  },
  props: {
    name: {
      type: Boolean,
      default: true,
    },
    nameTitle: {
      type: Boolean,
      default: true,
    },
    nameClass: {
      type: String,
      default: "",
    },
    dynamicClass: {
      type: String,
      default: "rounded-pill",
    },
    height: {
      type: Number,
      default: 15,
    },
    width: {
      type: Number,
      default: 80,
    },
    nameHeight: {
      type: Number,
      default: 15,
    },
    imageSize: {
      type: Number,
      default: 15,
    },
    cols: {
      type: Number,
      default: null,
    },
    row: {
      type: Number,
      default: 0,
    },
    nameWidth: {
      type: Number,
      default: 100,
    },
    imageClass: {
      type: String,
      default: "",
    },
    checkbox: {
      type: String,
      default: "",
    },
    imageShape: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      default: "",
    },
    activity: {
      type: String,
      default: "",
    },
    rowClass: {
      type: String,
      default: "",
    },
    collectionActivity: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    dynWidth() {
      if (
        this.$vuetify.breakpoint.name == "lg" ||
        this.$vuetify.breakpoint.name == "xl"
      ) {
        return this.width;
      } else if (this.collectionActivity == true) {
        return this.nameWidth;
      } else if (this.$vuetify.breakpoint.name == "md") {
        return this.width;
      } else {
        return this.width / 1.9;
      }
    },
    dynNameWidth() {
      if (
        this.$vuetify.breakpoint.name == "lg" ||
        this.$vuetify.breakpoint.name == "xl"
      ) {
        return this.nameWidth;
      } else if (this.collectionActivity == true) {
        return this.nameWidth;
      } else if (this.$vuetify.breakpoint.name == "md") {
        return this.nameWidth;
      } else {
        return this.nameWidth / 1.6;
      }
    },
  },
};
</script>

<style>
.scrollable-row {
  overflow-x: auto;
}

.scrollable-content {
  display: flex;
  flex-wrap: nowrap;
}
</style>
