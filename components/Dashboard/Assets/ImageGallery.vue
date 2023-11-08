<template>
  <div class="tw-w-full">
    <div
      class="tw-grid tw-mx-auto tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3 2xl:tw-grid-cols-4"
      v-if="type === 'assets'"
    >
      <div class="tw-flex tw-flex-col tw-gap-4">
        <dashboard-assets-file-card
          @displayFileDetails="displayFileDetails"
          v-for="file in firstColumnFiles"
          :key="file._id"
          :file="file"
          :type="type"
          :extension="extension"
        />
      </div>
      <div class="tw-flex tw-flex-col tw-gap-4">
        <dashboard-assets-file-card
          @displayFileDetails="displayFileDetails"
          v-for="file in secondColumnFiles"
          :key="file._id"
          :file="file"
          :type="type"
          :extension="extension"
        />
      </div>
      <div class="tw-flex tw-flex-col tw-gap-4">
        <dashboard-assets-file-card
          @displayFileDetails="displayFileDetails"
          v-for="file in thirdColumnFiles"
          :key="file._id"
          :file="file"
          :type="type"
          :extension="extension"
        />
      </div>
      <div class="tw-flex tw-flex-col tw-gap-4">
        <dashboard-assets-file-card
          @displayFileDetails="displayFileDetails"
          v-for="file in fourthColumnFiles"
          :key="file._id"
          :file="file"
          :type="type"
          :extension="extension"
        />
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 md:tw-grid-cols-5 xl:tw-grid-cols-7 1xl:tw-grid-cols-8 3xl:tw-grid-cols-11 tw-gap-4"
      v-else
    >
      <dashboard-assets-file-card
        v-for="file in allMetadata"
        :key="file._id"
        :file="file"
        :type="type"
        :extension="extension"
      />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    paginatedFiles: { type: Array },
    type: { type: String },
    extension: { type: String },
  },
  data() {
    return {
      firstColumnFiles: [{ _id: "" }],
      secondColumnFiles: [{ _id: "" }],
      thirdColumnFiles: [{ _id: "" }],
      fourthColumnFiles: [{ _id: "" }],
      allMetadata: [{ _id: "" }],
    };
  },
  methods: {
    displayFileDetails(file: any) {
      this.$emit("displayFileDetails", file);
    },
  },
  computed: {
    getScreenSize() {
      return screen.width;
    },
    getColumnDivider() {
      if (this.getScreenSize < 768) {
        return 1;
      } else if (this.getScreenSize < 1536) {
        return 3;
      } else {
        return 4;
      }
    },
  },
  watch: {
    paginatedFiles(paginatedFiles: any) {
      if (this.type === "assets") {
        paginatedFiles.map((file: any) => {
          const columnIndex = file._id % this.getColumnDivider;
          if (columnIndex === 0) {
            this.firstColumnFiles.push(file);
          } else if (columnIndex === 1) {
            this.secondColumnFiles.push(file);
          } else if (columnIndex === 2) {
            this.thirdColumnFiles.push(file);
          } else {
            this.fourthColumnFiles.push(file);
          }
        });
      } else {
        this.allMetadata.push(...paginatedFiles);
      }
    },
  },
  mounted() {
    this.firstColumnFiles = [];
    this.secondColumnFiles = [];
    this.thirdColumnFiles = [];
    this.fourthColumnFiles = [];
    this.allMetadata = [];
  },
};
</script>
