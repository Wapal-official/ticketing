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
      class="tw-text-center tw-px-5 tw-border tw-border-dashed tw-border-dark-4 tw-py-20 tw-rounded tw-cursor-pointer tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
      @click="dropZoneClicked"
      @dragover.prevent="dragover"
      @dragleave.prevent="dragleave"
      @drop.prevent="drop"
      :class="dropZoneClass"
      id="drop-zone"
      v-if="!imageSelected"
    >
      <label class="tw-text-sm tw-font-medium tw-cursor-pointer" id="drop-zone"
        >Drop your assets here, or
        <span class="tw-text-primary-1" id="drop-zone"
          >click to browse</span
        ></label
      >
      <label
        v-if="selectedType == 'Image'"
        class="tw-text-xs tw-font-medium tw-text-dark-2"
        >Size: 400x400px</label
      >
      <label
        v-else-if="selectedType == 'Video'"
        class="tw-text-xs tw-font-medium tw-text-dark-2 tw-mx-2"
        >Video types: .mp4, .webm, .mkv, .m4v, .avi, .mov, .wmv, .flv, .3gp,
        .ogv, .mpeg, .mpg, .divx, .rm, .asf, .vob, .ts, .m2ts</label
      >
      <label
        v-else-if="selectedType == 'Audio'"
        class="tw-text-xs tw-font-medium tw-text-dark-2"
        >Audio types: .mp3, .wav, .ogg, .aac, .flac, .wma, .alac, .aiff,
        .opus</label
      >

      <label class="tw-text-xs tw-font-medium tw-text-dark-2" v-if="fileSize"
        >File Size: {{ fileSize }}</label
      >
      <label class="tw-text-xs tw-font-medium tw-text-dark-2 tw-mt-6"
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
    <div v-else class="d-flex tw-gap-4" style="background-color: #000">
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
          @click="reClick()"
          ref="imagePreview"
          class="tw-w-full tw-h-full tw-rounded"
        ></div>
        <audio-player
          v-if="this.audioUrl"
          class="audio-position"
          :audioSrc="this.audioUrl"
        ></audio-player>
        <v-dialog
          flat
          v-model="checkFeaturedFile"
          content-class="!tw-w-full md:!tw-w-1/2 1xl:!tw-w-1/3"
          style="height: auto; background-color: #000"
        >
          <v-card flat class=" " style="height: auto; background-color: #000">
            <div
              class="video-width tw-w-[400px] tw-h-[400px] tw-pt-5 tw-relative tw-mx-auto tw-rounded tw-group"
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

              <audio-player
                v-if="this.audioUrl"
                class="audio-position"
                :audioSrc="this.audioUrl"
                style="width: 100% !important"
              ></audio-player>
              <video-player
                v-else-if="videoLink"
                :source="file"
                style="position: absolute; transform: translate(0%, 45%)"
              ></video-player>
              <div
                v-else
                ref="imagePreviewDialog"
                class="tw-w-full tw-h-full tw-rounded tw-bg-black mx-auto"
              ></div>

              <!-- <div v-if="audioCheck == false" class="text-center">
                <v-menu v-model="menu" :close-on-content-click="false" offset-x>
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      class="resize-icon-holder"
                      v-bind="attrs"
                      v-on="on"
                      @click="resizeVideo()"
                    >
                      <img src="~/assets/img/resize.svg" alt="as" />
                    </div>
                  </template>

                  <v-list style="width: 132px">
                    <v-list-item @click="resizeVideoToOriginal()" link>
                      <v-list-item-title class="d-flex"
                        >Original
                        <img
                          class="tw-ml-3"
                          src="~/assets/img/img-icon.svg"
                          alt="img"
                        />
                      </v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="resizeVideoToSquare()" link>
                      <v-list-item-title class="d-flex"
                        >1:1
                        <img
                          class="tw-ml-3"
                          src="~/assets/img/square.svg"
                          alt="square"
                        />
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div> -->
            </div>
            <div>
              <div class="d-flex tw-justify-between">
                <label for="" class="d-block tw-p-3"> Choose Thumbnail </label>
                <div
                  v-if="!imageSelectedThumnail"
                  class="tw-p-3 tw-rounded tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
                  @click="dropZoneClickedThumnail"
                  @dragover.prevent="dragover"
                  @dragleave.prevent="dragleave"
                  @drop.prevent="dropThumnail"
                  :class="dropZoneClass"
                  id="drop-zone"
                >
                  <input
                    type="file"
                    :accept="acceptFileThumnail"
                    name="file"
                    @change="fileSelectedThumbnail"
                    class="tw-hidden tw-w-full tw-h-full"
                    ref="inputThumnail"
                    id="drop-zone"
                  />
                </div>
                <div v-else-if="imageSelectedThumnail" class="d-flex tw-gap-4">
                  <div class="change-btn">
                    <span
                      @click="dropZoneClickedThumnail"
                      class="d-block tw-p-2"
                    >
                      Change</span
                    >
                    <i class="bx bxs-edit-alt tw-text-xl"></i>
                  </div>

                  <input
                    type="file"
                    :accept="acceptFileThumnail"
                    name="file"
                    @change="fileSelectedThumbnail"
                    class="tw-hidden tw-w-full tw-h-full"
                    ref="inputThumnail"
                  />
                  <!-- </div>
                <div
                  v-else
                  class="tw-p-3 tw-rounded tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
                  @click="dropZoneClickedThumnail"
                  @dragover.prevent="dragover"
                  @dragleave.prevent="dragleave"
                  @drop.prevent="dropThumnail"
                  :class="dropZoneClass"
                  id="drop-zone"
                >
                  <input
                    type="file"
                    :accept="acceptFileThumnail"
                    name="file"
                    @change="fileSelectedThumbnail"
                    class="tw-hidden tw-w-full tw-h-full"
                    ref="inputThumnail"
                    id="drop-zone"
                  /> -->
                </div>
              </div>
              <div
                class="tw-w-[92%] tw-h-auto tw-mx-auto tw-p-3 tw-border tw-border-dashed tw-border-dark-4 tw-rounded tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
              >
                <div
                  v-if="!imageSelectedThumnail"
                  class="tw-w-[300px] tw-h-[200px] tw-p-3 tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
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
                  <label
                    class="tw-text-xs tw-font-medium tw-text-dark-2"
                    v-if="fileSize"
                    >File Size: {{ fileSize }}</label
                  >

                  <input
                    type="file"
                    :accept="acceptFileThumnail"
                    name="thumbnail"
                    @change="fileSelectedThumbnail"
                    class="tw-hidden tw-w-full tw-h-full"
                    ref="inputThumnail"
                    id="drop-zone"
                  />
                </div>
                <div v-else-if="imageSelectedThumnail" class="d-flex tw-gap-4">
                  <div
                    class="tw-w-[200px] tw-h-[200px] tw-relative tw-rounded tw-group"
                    ref="dropZone"
                  >
                    <input
                      type="file"
                      :accept="acceptFileThumnail"
                      name="file"
                      @change="fileSelectedThumbnail"
                      class="tw-hidden tw-w-full tw-h-full"
                      ref="inputThumnail"
                    />
                    <div v-if="thumbnail">
                      <img class="tw-ml-3" :src="thumbnail" alt="thumbnail" />
                    </div>
                    <div
                      v-else
                      ref="imagePreviewThumnail"
                      class="tw-w-full tw-h-full tw-rounded tw-bg-black"
                    ></div>
                    <!-- <button
                      class="tw-w-full tw-absolute tw-bottom-[-2px] tw-left-0 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-1 tw-py-2 tw-bg-dark-7 tw-text-white tw-rounded tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
                      @click="dropZoneClickedThumnail"
                    >
                      <span class="tw-text-sm tw-font-medium"
                        >Change Thumbnail</span
                      >
                      <i class="bx bxs-edit-alt tw-text-xl"></i>
                    </button> -->
                  </div>
                </div>
              </div>
              <div class="d-flex tw-justify-end tw-my-8 tw-mr-6">
                <button-secondary
                  class="tw-mr-4"
                  :bordered="true"
                  :paddingTwoHalf="false"
                  @click="cancelSelection()"
                  title="Cancel"
                  style="color: #fff !important"
                />
                <button-primary @click="saveSelection()" title="Save" />
              </div>
            </div>
          </v-card>
        </v-dialog>
        <button
          class="tw-w-full tw-absolute tw-bottom-[-2px] tw-left-0 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-1 tw-py-2 tw-bg-dark-7 tw-text-white tw-rounded tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
          @click="dropZoneClicked"
        >
          <span class="tw-text-sm tw-font-medium">Change</span>
          <i class="bx bxs-edit-alt tw-text-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { isValidHardenedPath } from "@aptos-labs/ts-sdk";

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
    thumbnail: {
      type: [String],
    },
    selectedType: {
      type: String,
    },
  },
  data() {
    return {
      preFile: "",
      audioUrl: "",
      audioCheck: false,
      menu: false,
      checkFeaturedFile: false,
      imageSelected: false,
      imageSelectedThumnail: false,
      isResize: false,
      isImage: false,
      dropZoneClass: "tw-border-dark-4",
      videoFile: "",
      acceptFile:
        ".png, .jpg, .jpeg, .gif, .webp, .mp4, .webm, .mkv, .m4v, .bmp, .svg, .ico, .tiff, .avi, .mov, .wmv, .flv, .3gp, .ogv, .mpeg, .mpg, .divx, .rm, .asf, .vob, .ts, .m2ts, video, .audio, .mp3, .wav, .ogg, .aac, .flac, .wma, .alac, .aiff, .opus/*",
      resizeAcive: false,
      isVideo: false,
      acceptFileThumnail:
        ".png, .jpg, .jpeg, .gif, .webp, .bmp, .svg,, .ico, .tiff",
      videoLink: false,
    };
  },
  computed: {},
  methods: {
    cancelSelection() {
      this.$emit("cancel");
      this.file = "";
      this.videoLink = false;
      this.audioUrl = "";
      this.isVideo = false;
      this.thumbnail = "";
      this.imageSelected = false;
      this.imageSelectedThumnail = false;
      this.checkFeaturedFile = false;
    },
    saveSelection() {
      this.checkFeaturedFile = false;
    },
    reClick() {
      if (!this.isImage) {
        this.checkFeaturedFile = true;
        this.generatePreviewVideoDialog(this.file);
      } else {
        this.checkFeaturedFile = false;
      }
    },
    checkFileType() {
      if (this.extension === ".json") {
        return "json";
      }

      const imageRegex = /\.((jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?))$/i;

      const videoRegex =
        /\.((mp4|avi|mov|mkv|wmv|flv|webm|3gp|ogv|mpeg|mpg|m4v|divx|rm|asf|vob|ts|m2ts?))$/i;
      const audioExtensions = /\.((mp3|wav|ogg|aac|flac|wma|alac?))$/i;
      if (imageRegex.test(this.extension)) {
        return "image";
      } else if (videoRegex.test(this.extension)) {
        return "video";
      } else if (audioExtensions.test(this.extension)) {
        return "audio";
      }
      return "json";
    },
    fileSelected(event: any) {
      const file = event.target.files[0];
      this.preFile = file;
      if (file) {
        if (file.type.includes("image")) {
          this.audioUrl = "";
          this.$emit("fileSelected", file);
          this.imageSelected = true;
          this.isImage = true;
          console.log("img sl");
          console.log("img sl", file);
          this.generatePreviewImage(file);
        } else if (file.type.includes("video")) {
          this.audioUrl = "";
          this.$emit("fileSelected", file);
          this.isImage = false;
          this.imageSelected = true;
          console.log("img sl", file);
          this.generatePreviewVideo(file);
          this.generatePreviewVideoDialog(file);
          this.checkFeaturedFile = true;
        } else if (file.type.includes("audio")) {
          this.file = "";
          this.$emit("fileSelected", file);
          this.isImage = false;
          this.imageSelected = true;
          console.log("img sl", file);
          this.generatePreviewAudio(file);

          this.checkFeaturedFile = true;
        } else {
          this.$toast.showMessage({
            message: "File error",
            error: true,
          });
        }
      }
    },
    fileSelectedThumbnail(event: any) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.includes("image")) {
          this.$emit("fileSelectedThumbnail", file);
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
      // this.$emit("cancel");
      // this.thumbnail = "";
      // this.isVideo = false;
      // this.imageSelectedThumnail = false;
      // console.log(this.file);
      // if (this.file) {
      //   this.checkFeaturedFile == false;
      //   this.isImage == true;

      //   this.generatePreviewImage(this.file);
      // }
      this.$refs.input.click();
    },
    dropZoneClickedThumnail() {
      this.$refs.inputThumnail.click();
      this.thumbnail = "";
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
        // const fileName = file.name;
        const previewElement = this.$refs.imagePreviewThumnail;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }

        previewElement.prepend(imgElement);

        // previewElement.textContent = "";

        // const fileNameNode = document.createTextNode(fileName);

        // previewElement.appendChild(fileNameNode);
      }, 200);
    },
    generatePreviewVideo(file: any) {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);
      console.log("fa", videoElement.src);
      videoElement.autoplay = false;
      videoElement.controls = true;
      videoElement.muted = false;
      videoElement.loop = true;
      videoElement.playsInline = true;
      videoElement.preload = "metadata";
      videoElement.classList.add("tw-w-full");
      videoElement.classList.add("tw-h-full");
      videoElement.classList.add("transition");
      // videoElement.classList.add("tw-object-fill");

      setTimeout(() => {
        const previewElement = this.$refs.imagePreview;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }

        previewElement.prepend(videoElement);
      }, 300);
    },
    generatePreviewVideoDialog(file: any) {
      console.log("File:", file);
      if (file instanceof File) {
        const videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);

        videoElement.autoplay = false;
        videoElement.controls = true;
        videoElement.muted = false;
        videoElement.loop = true;
        videoElement.playsInline = true;
        videoElement.preload = "metadata";
        videoElement.classList.add("tw-w-full");
        videoElement.classList.add("tw-h-full");
        videoElement.classList.add("transition");
        // videoElement.classList.add("tw-object-fill");

        setTimeout(() => {
          const previewElement = this.$refs.imagePreviewDialog;

          if (previewElement.firstChild) {
            previewElement.removeChild(previewElement.firstChild);
          }

          previewElement.prepend(videoElement);
        }, 300);
      } else {
        console.error("Invalid file:", file); // Log an error if "file" is not a valid File object
      }
    },

    generatePreviewAudio(file: any) {
      const audioElement = document.createElement("audio");
      audioElement.src = URL.createObjectURL(file);

      // audioElement.src = this.audioUrl;

      audioElement.autoplay = false;
      audioElement.controls = true;
      audioElement.muted = true;
      audioElement.preload = "metadata";
      audioElement.classList.add("tw-w-full");
      audioElement.classList.add("tw-h-full");
      audioElement.classList.add("transition");
      audioElement.classList.add("tw-pb-8");

      setTimeout(() => {
        const previewElement = this.$refs.imagePreview;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }
        console.log("audio ele", audioElement.src);
        console.log("afterrr", this.audioUrl);
        // previewElement.prepend(audioElement);
      }, 300);
      this.audioUrl = audioElement.src;
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

      if (item.type.includes("image")) {
        this.$emit("fileSelected", item);
        this.imageSelected = true;
        this.audioCheck = false;
        this.checkFeaturedFile = false;
        this.generatePreviewImage(item);
      } else if (item.type.includes("video")) {
        this.$emit("fileSelected", item);
        this.imageSelected = true;
        this.checkFeaturedFile = true;
        this.audioCheck = false;
        this.generatePreviewVideo(item);
        this.generatePreviewVideoDialog(item);
      } else if (item.type.includes("audio")) {
        this.$emit("fileSelected", item);
        this.imageSelected = true;
        this.checkFeaturedFile = true;
        this.audioCheck = false;
        this.generatePreviewAudio(item);
      } else {
        this.$toast.showMessage({
          message: "Please Drop an Image File",
          error: true,
        });
        return;
      }

      // this.$emit("fileSelected", item);
      // this.imageSelected = true;

      // this.generatePreviewImage(item);
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

      this.$emit("fileSelectedThumbnail", item);
      this.imageSelectedThumnail = true;

      this.generatePreviewImageThumnail(item);
    },
  },
  mounted() {
    console.log("this thumbnail", this.thumbnail);
    if (this.file) {
      this.extension = this.file.slice(this.file.lastIndexOf("."));
      // this.checkFileType();
      const fileType = this.checkFileType();
      console.log("fileT", fileType);
      if (fileType == "image") {
        this.checkFeaturedFile = false;
        this.isImage = true;
        this.imageSelected = true;
        const imgElement = document.createElement("img");
        // const imgElement = document.createElement("video");

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
        }, 500);
      } else if (fileType == "video") {
        this.checkFeaturedFile = false;
        this.isImage = false;
        this.videoLink = true;
        isValidHardenedPath;
        this.imageSelected = true;
        const imgElement = document.createElement("video");

        imgElement.src = this.file;
        imgElement.classList.add("tw-w-full");
        imgElement.classList.add("tw-h-full");

        setTimeout(() => {
          const previewElement = this.$refs.imagePreview;
          if (previewElement.firstChild) {
            previewElement.removeChild(previewElement.firstChild);
          }
          previewElement.prepend(imgElement);
        }, 500);
      } else if (fileType == "audio") {
        this.checkFeaturedFile = false;
        this.isImage = false;
        isValidHardenedPath;
        this.imageSelected = true;
        console.log("this audi", this.file);
        // const imgElement = document.createElement("img");
        const imgElement = document.createElement("audio");
        // imgElement.src = URL.createObjectURL(this.file);
        imgElement.src = this.file;
        imgElement.classList.add("tw-w-full");
        imgElement.classList.add("tw-h-full");
        imgElement.classList.add("tw-pb-8");
        // imgElement.classList.add("tw-object-fill");
        // imgElement.classList.add("tw-rounded");

        setTimeout(() => {
          const previewElement = this.$refs.imagePreview;
          if (previewElement.firstChild) {
            previewElement.removeChild(previewElement.firstChild);
          }
          // previewElement.prepend(imgElement);
        }, 500);
        this.audioUrl = imgElement.src;
      }
    }
    if (this.thumbnail) {
      this.imageSelectedThumnail = true;
      const imgElement = document.createElement("img");

      imgElement.src = this.thumbnail;
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
    }
  },
};
</script>
<style lang="css" scoped>
.v-dialog {
  max-width: 600px !important;
}
.transition {
  transition: 3s ease-in-out !important;
}

.btn-border {
  color: rgb(135 89 255) !important;
  border: 1px solid rgb(135 89 255) !important;
}
/* .resize-icon-holder {
  background-color: #8759ff;
  border-radius: 50%;
  height: 26px;
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  left: -30px !important;
  bottom: 20px !important;
} */
.audio-position {
  position: absolute;
  bottom: 30px;
}
.change-btn {
  display: flex;
  align-items: center;
  color: #8759ff;
  padding: 0 12px;
  cursor: pointer;
}
@media (max-width: 555px) {
  .video-width {
    max-width: 220px !important;
  }
}
</style>
