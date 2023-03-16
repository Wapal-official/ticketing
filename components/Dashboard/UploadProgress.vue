<template>
  <div
    class="tw-bg-modal-gray tw-rounded tw-px-4 tw-py-4 tw-fixed tw-bottom-2 tw-right-1 tw-w-screen tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-transition-all tw-duration-200 tw-ease-linear tw-overflow-hidden tw-z-20 md:tw-w-96"
    :class="progressClass"
    id="upload-progress"
  >
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
    >
      <span>Uploading</span>
      <div class="tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2">
        <button v-if="minimizeClicked" @click="minimizeClicked = false">
          <v-icon class="!tw-text-white !tw-text-sm"
            >mdi-checkbox-blank-outline</v-icon
          >
        </button>
        <button @click="minimizeClicked = true" v-else>
          <v-icon class="!tw-text-white !tw-text-sm"
            >mdi-window-minimize</v-icon
          >
        </button>
        <button @click="close" v-if="uploadComplete">
          <v-icon class="!tw-text-white !tw-text-sm">mdi-close</v-icon>
        </button>
      </div>
    </div>
    <div class="tw-relative tw-w-full tw-rounded-lg tw-py-1 tw-bg-wapal-gray">
      <div
        class="tw-absolute tw-h-2 tw-top-0 tw-left-0 tw-bg-wapal-pink tw-rounded-full tw-transition-all tw-duration-200 tw-ease-linear"
        id="progress-bar"
      ></div>
    </div>
    <div
      class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
    >
      <span class="tw-text-sm" v-if="!filesPrepared && getUploading"
        >Preparing {{ preparingFiles }} files</span
      >
      <span class="tw-text-sm" v-if="filesPrepared && getUploading"
        >Deploying {{ deployingFiles }} files</span
      >
      <span class="tw-text-sm" v-if="!getUploading">{{
        getUploadSummary
      }}</span>
      <span class="tw-text-sm">{{ progressPercent }}%</span>
    </div>
  </div>
</template>
<script lang="ts">
import { uploadSocketState } from "@/sockets/socket";
export default {
  data() {
    return {
      minimizeClicked: true,
      progressClass: "tw-h-[75px]",
      uploadComplete: false,
      filesPrepared: false,
      progressPercent: 0,
      preparingFiles: 0,
      deployingFiles: 0,
    };
  },
  computed: {
    getOutput() {
      return uploadSocketState.progress;
    },
    getUploading() {
      if (!uploadSocketState.uploading) {
        const progressBar: any = document.querySelector("#progress-bar");
        this.progressPercent = 100;
        progressBar.style.width = 100 + "%";

        this.uploadComplete = true;

        this.$toast.showMessage({ message: this.getUploadSummary });
      }
      return uploadSocketState.uploading;
    },
    getUploadSummary() {
      return uploadSocketState.uploadSummary;
    },
    getTotalFile() {
      return uploadSocketState.totalFiles;
    },
  },
  methods: {
    close() {
      this.$emit("close");
      uploadSocketState.uploading = false;
      uploadSocketState.previousResult = "";
      uploadSocketState.progress = 0;
      uploadSocketState.uploadSummary = "";
      uploadSocketState.showUploadBar = false;
    },
  },
  watch: {
    minimizeClicked(newVal: boolean) {
      if (newVal) {
        this.progressClass = "tw-h-[75px]";
      } else {
        this.progressClass = "tw-h-[105px]";
      }
    },
    getOutput(output: number) {
      const progressBar: any = document.querySelector("#progress-bar");

      this.progressPercent = Math.ceil(
        ((output / this.getTotalFile) * 100) / 2
      );

      progressBar.style.width = this.progressPercent + "%";

      if (Math.ceil(output / this.getTotalFile) > 1 && !this.filesPrepared) {
        this.filesPrepared = true;
      }

      this.preparingFiles++;

      if (this.filesPrepared) {
        let prevPercent = 0;

        const percent = Math.ceil(((output / this.getTotalFile) * 100) / 2);

        if (prevPercent === percent) {
          return;
        }

        prevPercent = percent;

        this.progressPercent++;

        this.deployingFiles++;

        progressBar.style.width = this.progressPercent + "%";
      }
    },
  },
};
</script>
