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
      <span class="tw-text-sm" v-if="!filesPrepared"
        >Preparing {{ preparingFiles }} files</span
      >
      <span class="tw-text-sm" v-else
        >Deploying {{ deployingFiles }} files</span
      >
      <span class="tw-text-sm">{{ progressPercent }}%</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      minimizeClicked: true,
      progressClass: "tw-h-[75px]",
      uploadComplete: false,
      preparingFiles: 0,
      deployingFiles: 0,
      totalFiles: 10000,
      filesPrepared: false,
      progressPercent: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.startUploading();
    }, 2000);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    startUploading() {
      const progressBar: any = document.querySelector("#progress-bar");

      for (let i = 0; i < this.totalFiles; i++) {
        this.preparingFiles++;
        this.progressPercent = Math.ceil(
          ((this.preparingFiles / this.totalFiles) * 100) / 2
        );

        progressBar.style.width = this.progressPercent + "%";
      }

      this.filesPrepared = true;

      let prevPercent = 0;

      for (let i = 0; i < this.totalFiles; i++) {
        this.deployingFiles++;

        const percent = Math.ceil(
          ((this.deployingFiles / this.totalFiles) * 100) / 2
        );

        if (prevPercent === percent) {
          continue;
        }

        prevPercent = percent;

        this.progressPercent++;

        progressBar.style.width = this.progressPercent + "%";
      }

      this.uploadComplete = true;
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
  },
};
</script>
