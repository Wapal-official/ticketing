<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-5 tw-w-full"
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

    <div
      class="tw-border tw-border-dashed tw-border-dark-4 tw-py-20 tw-rounded tw-cursor-pointer tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
      @click="dropZoneClicked"
      @dragover.prevent="dragover"
      @dragleave.prevent="dragleave"
      @drop.prevent="drop"
      :class="dropZoneClass"
      id="drop-zone"
      v-if="!imageSelected"
    >
      <label class="tw-text-sm tw-font-medium tw-cursor-pointer" id="drop-zone"
        >Drop your images here, or
        <span class="tw-text-primary-1" id="drop-zone"
          >click to browse</span
        ></label
      >
      <label class="tw-text-xs tw-font-medium tw-text-dark-2"
        >Size: 400x400px</label
      >
      <label class="tw-text-xs tw-font-medium tw-text-dark-2" v-if="fileSize"
        >File Size: {{ fileSize }}</label
      >
      <label class="tw-text-xs tw-font-medium tw-text-dark-2"
        >These are feature requirements. Rest assured, it won't compromise the
        quality of your NFT.</label
      >
      <input
        type="file"
        :accept="acceptFile"
        name="file"
        @change="fileSelected"
        class="tw-hidden tw-w-full tw-h-full"
        ref="input"
        id="drop-zone"
      />
    </div>
    <div v-else class="d-flex tw-gap-4 tw-mb-16">
      <div
        class="tw-w-[200px] tw-h-[200px] tw-relative tw-rounded tw-group"
        ref="dropZone"
      >
        <input
          type="file"
          :accept="acceptFile"
          name="file"
          @change="fileSelected"
          class="tw-hidden tw-w-full tw-h-full"
          ref="input"
        />
        <div
          ref="imagePreview"
          class="tw-w-full tw-h-full tw-rounded tw-bg-black"
        ></div>
        <div class="d-flex align-center tw-gap-3 tw-mt-3">
          <label for="">Resize:</label>
          <button
            :class="resizeAcive ? '' : 'btn-border'"
            class="!tw-border-solid tw-border tw-border-dark-4 tw-bg-transparent tw-rounded-md tw-bg-transparent tw-text-white tw-px-6 tw-py-2 tw-box-border tw-transition-all tw-duration-200 tw-ease-linear tw-font-medium disabled:tw-cursor-not-allowed 3xl:tw-text-lg hover:tw-bg-dark-6"
            @click="videoResize()"
          >
            16:9
          </button>
          <button
            :class="resizeAcive ? 'btn-border' : ''"
            class="!tw-border-solid tw-border tw-border-dark-4 tw-bg-transparent tw-rounded-md tw-bg-transparent tw-text-white tw-px-6 tw-py-2 tw-box-border tw-transition-all tw-duration-200 tw-ease-linear tw-font-medium disabled:tw-cursor-not-allowed 3xl:tw-text-lg hover:tw-bg-dark-6"
            @click="videoResize1()"
          >
            1:1
          </button>
        </div>
        <button
          class="tw-w-full tw-absolute tw-bottom-[-2px] tw-left-0 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-1 tw-py-2 tw-bg-dark-7 tw-text-white tw-rounded tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
          @click="dropZoneClicked"
        >
          <span class="tw-text-sm tw-font-medium">Change</span>
          <i class="bx bxs-edit-alt tw-text-xl"></i>
        </button>
      </div>
      <div
        v-if="!imageSelectedThumnail && isVideo"
        class="tw-w-[200px] tw-h-[200px] tw-p-3 tw-border tw-border-dashed tw-border-dark-4 tw-rounded tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
        @click="dropZoneClickedThumnail"
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="dropThumnail"
        :class="dropZoneClass"
        id="drop-zone"
      >
        <label
          class="tw-text-center tw-font-medium tw-cursor-pointer"
          id="drop-zone"
          >Drop your thumbnail images here, or
          <span class="tw-text-primary-1" id="drop-zone"
            >click to browse</span
          ></label
        >
        <label class="tw-text-xs tw-font-medium tw-text-dark-2"
          >Size: 400x400px</label
        >
        <label class="tw-text-xs tw-font-medium tw-text-dark-2" v-if="fileSize"
          >File Size: {{ fileSize }}</label
        >
        <input
          type="file"
          :accept="acceptFileThumnail"
          name="file"
          @change="fileSelectedThumnail"
          class="tw-hidden tw-w-full tw-h-full"
          ref="inputThumnail"
          id="drop-zone"
        />
      </div>
      <div v-else class="d-flex tw-gap-4">
        <div
          class="tw-w-[200px] tw-h-[200px] tw-relative tw-rounded tw-group"
          ref="dropZone"
        >
          <input
            type="file"
            :accept="acceptFileThumnail"
            name="file"
            @change="fileSelectedThumnail"
            class="tw-hidden tw-w-full tw-h-full"
            ref="inputThumnail"
          />
          <div
            ref="imagePreviewThumnail"
            class="tw-w-full tw-h-full tw-rounded tw-bg-black"
          ></div>
          <button
            class="tw-w-full tw-absolute tw-bottom-[-2px] tw-left-0 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-1 tw-py-2 tw-bg-dark-7 tw-text-white tw-rounded tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
            @click="dropZoneClickedThumnail"
          >
            <span class="tw-text-sm tw-font-medium">Change Thumbnail</span>
            <i class="bx bxs-edit-alt tw-text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    file: {
      type: [String],
    },
    fileSize: { type: String },
  },
  data() {
    return {
      imageSelected: false,
      imageSelectedThumnail: false,
      dropZoneClass: "tw-border-dark-4",
      videoFile: "",
      acceptFile:
        ".png, .jpg, .jpeg, .gif, .webp, .mp4, .mkv, .m4v, .bmp, .svg, .ico, .tiff, .avi, .mov, .wmv, .flv, .3gp, .ogv, .mpeg, .mpg, .divx, .rm, .asf, .vob, .ts, .m2ts, video/*",
      resizeAcive: false,
      isVideo: false,
      acceptFileThumnail:
        ".png, .jpg, .jpeg, .gif, .webp, .mp4, .mkv, .m4v, .bmp, .svg,, .ico, .tiff",
    };
  },
  computed: {},
  methods: {
    checkFileType() {
      if (this.extension === ".json") {
        return "json";
      }

      const imageRegex = /\.((jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?))$/i;

      const videoRegex =
        /\.((mp4|avi|mov|mkv|wmv|flv|webm|3gp|ogv|mpeg|mpg|m4v|divx|rm|asf|vob|ts|m2ts?))$/i;

      if (imageRegex.test(this.extension)) {
        return "image";
      } else if (videoRegex.test(this.extension)) {
        return "video";
      }

      return "json";
    },

    fileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.includes("image")) {
          this.$emit("fileSelected", file);
          this.imageSelected = true;
          this.generatePreviewImage(file);
        } else if (file.type.includes("video")) {
          this.$emit("fileSelected", file);
          this.imageSelected = true;
          this.generatePreviewVideo(file);
        }
      }
    },
    fileSelectedThumnail(event: any) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.includes("image")) {
          this.$emit("fileSelectedThumnail", file);
          this.imageSelectedThumnail = true;
          this.generatePreviewImageThumnail(file);
        } else {
          this.$toast.showMessage({
            message: "Please Drop an Image File for thumbnail",
            error: true,
          });
        }
      }
    },
    dropZoneClicked() {
      this.$refs.input.click();
    },
    dropZoneClickedThumnail() {
      this.$refs.inputThumnail.click();
    },
    generatePreviewImage(file: any) {
      const imgElement = document.createElement("img");

      imgElement.src = URL.createObjectURL(file);
      imgElement.classList.add("tw-w-full");
      imgElement.classList.add("tw-h-full");
      imgElement.classList.add("tw-object-fill");
      imgElement.classList.add("tw-rounded");

      setTimeout(() => {
        const previewElement = this.$refs.imagePreview;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }

        previewElement.prepend(imgElement);
      }, 200);
    },
    generatePreviewImageThumnail(file: any) {
      const imgElement = document.createElement("img");

      imgElement.src = URL.createObjectURL(file);
      imgElement.classList.add("tw-w-full");
      imgElement.classList.add("tw-h-full");
      imgElement.classList.add("tw-object-fill");
      imgElement.classList.add("tw-rounded");

      setTimeout(() => {
        const previewElement = this.$refs.imagePreviewThumnail;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }

        previewElement.prepend(imgElement);
      }, 200);
    },
    generatePreviewVideo(file: any) {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);

      videoElement.autoplay = true;
      videoElement.controls = true;
      videoElement.muted = false;
      videoElement.loop = true;
      videoElement.playsInline = true;
      videoElement.preload = "metadata";
      videoElement.classList.add("tw-w-full");
      videoElement.classList.add("tw-h-full");
      videoElement.classList.add("transition");
      this.isVideo = true;
      // videoElement.classList.add("tw-object-fill");

      setTimeout(() => {
        const previewElement = this.$refs.imagePreview;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }

        previewElement.prepend(videoElement);
      }, 200);
    },
    videoResize() {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.classList.remove("tw-object-cover");
        this.resizeAcive = false;
      }
    },
    videoResize1() {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.classList.add("tw-object-cover");
        this.resizeAcive = true;
      }
    },
    dragover(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-green-600";
      this.showDropZone = true;
    },
    dragleave(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-dark-4";
      this.showDropZone = false;
    },
    async drop(event: any) {
      this.showDropZone = false;
      const item = event.dataTransfer.files[0];

      this.dropZoneClass = "tw-border-dark-4";

      if (!item.type.includes("image")) {
        this.$toast.showMessage({
          message: "Please Drop an Image File",
          error: true,
        });
        return;
      }

      this.$emit("fileSelected", item);
      this.imageSelected = true;

      this.generatePreviewImage(item);
    },
    async dropThumnail(event: any) {
      this.showDropZone = false;
      const item = event.dataTransfer.files[0];

      this.dropZoneClass = "tw-border-dark-4";

      if (!item.type.includes("image")) {
        this.$toast.showMessage({
          message: "Please Drop an Image File",
          error: true,
        });
        return;
      }

      this.$emit("fileSelectedThumnail", item);
      this.imageSelectedThumnail = true;

      this.generatePreviewImageThumnail(item);
    },
  },
  mounted() {
    if (this.file) {
      this.imageSelected = true;

      const imgElement = document.createElement("img");

      imgElement.src = this.file;
      imgElement.classList.add("tw-w-full");
      imgElement.classList.add("tw-h-full");
      imgElement.classList.add("tw-object-fill");
      imgElement.classList.add("tw-rounded");

      setTimeout(() => {
        const previewElement = this.$refs.imagePreview;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }

        previewElement.prepend(imgElement);
      }, 200);
    }
  },
};
</script>
<style>
.transition {
  transition: 3s ease-in-out !important;
}

.btn-border {
  color: rgb(135 89 255) !important;
  border: 1px solid rgb(135 89 255) !important;
}
</style>
