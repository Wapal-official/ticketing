<template>
  <div v-if="!loading">
    <div
      class="tw-max-w-[250px] tw-max-h-[300px] tw-group tw-cursor-pointer"
      @click="displayFileDetails"
      v-if="checkFileType === 'image'"
    >
      <div class="tw-relative tw-max-h-[250px] tw-overflow-hidden">
        <img
          :src="file?.src"
          :alt="file?.name"
          class="tw-w-[250px] tw-h-[250px] tw-object-cover"
        />
        <div
          class="tw-w-full tw-h-full tw-px-4 tw-absolute tw-top-0 tw-left-0 tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-4 group-hover:tw-bg-black/25 group-hover:tw-opacity-100"
        >
          <button
            class="tw-rounded-full tw-w-8 tw-h-8 tw-mt-2 file-options"
            @click.stop="copyFileLink"
          >
            <v-icon class="!tw-text-white !tw-text-sm">mdi-code-tags</v-icon>
          </button>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <button
                class="tw-rounded-full tw-w-8 tw-h-8 tw-mt-2 file-options"
                v-on="on"
              >
                <v-icon class="!tw-text-white !tw-text-sm"
                  >mdi-dots-vertical</v-icon
                >
              </button>
            </template>
            <div
              class="tw-flex tw-flex-col tw-justify-items-start tw-items-start tw-bg-modal-gray tw-py-4"
            >
              <button
                class="tw-w-full tw-py-1 tw-px-4 tw-transition-all tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 hover:tw-bg-black/60"
                @click="downloadFile"
              >
                <v-icon class="!tw-text-white !tw-text-lg"
                  >mdi-tray-arrow-down</v-icon
                >Download
              </button>
            </div>
          </v-menu>
        </div>
      </div>
      <div
        class="tw-bg-[#F0F0F0] tw-text-[#363636] tw-uppercase tw-px-4 tw-text-center tw-py-4 tw-text-sm"
      >
        <h2>{{ file?.name }}</h2>
      </div>
    </div>
    <button
      class="tw-bg-wapal-gray tw-px-4 tw-py-2 tw-text-black tw-rounded-sm tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-gray-300"
      v-else
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
      >
        <v-icon class="!tw-text-black">mdi-file</v-icon>
        {{ file?.name }}
      </div>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <button v-on="on">
            <v-icon class="!tw-text-black">mdi-dots-vertical</v-icon>
          </button>
        </template>
        <div
          class="tw-flex tw-flex-col tw-justify-items-start tw-items-start tw-bg-modal-gray tw-py-4"
        >
          <button
            class="tw-w-full tw-py-1 tw-px-4 tw-transition-all tw-duration-200 tw-ease-linear tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-1 hover:tw-bg-black/60"
            @click="downloadFile"
          >
            <v-icon class="!tw-text-white !tw-text-lg"
              >mdi-tray-arrow-down</v-icon
            >Download
          </button>
        </div>
      </v-menu>
    </button>
    <div v-else></div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    file: { type: Object },
  },
  data() {
    return {
      fileData: null,
      loading: true,
    };
  },
  methods: {
    displayFileDetails() {
      this.$emit("displayFileDetails");
    },
    async downloadFile() {
      if (process.client) {
        const res = await this.$axios.get(this.file.src, {
          responseType: "blob",
        });
        const blob = res.data;

        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.download = this.file.name;
        a.href = blobUrl;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    },
    async copyFileLink() {
      if (process.client) {
        let textArea = document.createElement("textarea");
        textArea.value = `https://arweave.net/${this.file._id}`;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        this.$toast.showMessage({ message: "Link Copied Successfully" });
      }
    },
  },
  computed: {
    checkFileType() {
      if (this.file.type.includes("image/")) {
        return "image";
      }
      return "json";
    },
  },
  async mounted() {
    this.loading = false;
  },
};
</script>
<style>
.file-options {
  background: linear-gradient(
    180deg,
    #0e0d0d 0%,
    #010a1b 23.47%,
    #11151c 81.73%,
    #0e0d0d 100%
  );
}
</style>
