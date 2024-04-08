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
        >Drop your assets here, or
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
    <div v-else class="d-flex tw-gap-4">
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
          v-if="checkFeaturedFile == false && isImage == true"
          @click="reClick()"
          ref="imagePreview"
          class="tw-w-full tw-h-full tw-rounded tw-bg-black"
        ></div>
        <div
          v-else
          @click="reClick()"
          ref="imagePreview2"
          class="tw-w-full tw-h-full tw-rounded tw-bg-black"
        ></div>
        <audio-player-test
          v-if="audioCheck"
          class="audio-position"
          :audioSrc="this.audioUrl"
        ></audio-player-test>

        <v-dialog
          v-model="checkFeaturedFile"
          max-width="500  "
          style="height: auto; width: 500px !important; background-color: #000"
        >
          <v-card
            flat
            class=" "
            style="height: auto; width: 500px; background-color: #000"
          >
            <div
              class="tw-w-[400px] tw-h-[400px] tw-pt-5 tw-relative tw-mx-auto tw-rounded tw-group"
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
              <!-- <div
                ref="imagePreview"
                class="tw-w-full tw-h-full tw-rounded tw-bg-black mx-auto"
              ></div> -->
              <audio-player-test
                v-if="audioCheck"
                class="audio-position"
                :audioSrc="this.audioUrl"
                style="width: 100% !important"
              ></audio-player-test>
              <div
                v-else
                ref="imagePreview"
                class="tw-w-full tw-h-full tw-rounded tw-bg-black mx-auto"
              ></div>
              <div v-if="audioCheck == false" class="text-center">
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
              </div>
            </div>
            <div>
              <div class="d-flex tw-justify-between">
                <label for="" class="d-block tw-p-3"> Choose Thumbnail </label>
                <div
                  v-if="!imageSelectedThumnail && isVideo"
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
                <div
                  v-else-if="isVideo && imageSelectedThumnail"
                  class="d-flex tw-gap-4"
                >
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

                  <!-- <button
                      class="tw-w-full tw-absolute tw-bottom-[-2px] tw-left-0 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-1 tw-py-2 tw-bg-dark-7 tw-text-white tw-rounded tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
                      @click="dropZoneClickedThumnail"
                    >
                      <span class="tw-text-sm tw-font-medium">Change </span>
                      <i class="bx bxs-edit-alt tw-text-xl"></i>
                    </button>  -->
                </div>
              </div>
              <div
                class="tw-w-[94%] tw-h-auto tw-mx-auto tw-p-3 tw-border tw-border-dashed tw-border-dark-4 tw-rounded tw-cursor-pointer tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
              >
                <div
                  v-if="!imageSelectedThumnail && isVideo"
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
                <div
                  v-else-if="isVideo && imageSelectedThumnail"
                  class="d-flex tw-gap-4"
                >
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
                    <div
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
        <!-- <div class="resize-icon-holder" @click="resizeVideo()">
          <img src="~/assets/img/resize.svg" alt="resize" />
        </div> -->

        <!-- <div v-if="isResize" class="d-flex align-center tw-gap-3 tw-mt-3">
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
        </div> -->
        <button
          class="tw-w-full tw-absolute tw-bottom-[-2px] tw-left-0 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-1 tw-py-2 tw-bg-dark-7 tw-text-white tw-rounded tw-opacity-0 tw-transition-all tw-duration-200 tw-ease-linear group-hover:tw-opacity-100"
          @click="dropZoneClicked"
        >
          <span class="tw-text-sm tw-font-medium">Change</span>
          <i class="bx bxs-edit-alt tw-text-xl"></i>
        </button>
      </div>
      <!-- <div
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
          name="thumbnail"
          @change="fileSelectedThumbnail"
          class="tw-hidden tw-w-full tw-h-full"
          ref="inputThumnail"
          id="drop-zone"
        />
      </div>
      <div v-else-if="isVideo && imageSelectedThumnail" class="d-flex tw-gap-4">
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
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import CustomAudioPlayer from "@/components/AudioPlayer/AudioPlayer.vue";

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
  },
  data() {
    return {
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
    };
  },
  computed: {},

  methods: {
    cancelSelection() {
      this.videoFile = "";
      this.isVideo = false;
      this.imageSelected = false;
      this.checkFeaturedFile = false;
    },
    saveSelection() {
      this.checkFeaturedFile = false;
    },
    isAudio(source: string) {
      if (typeof source !== "string") {
        return false;
      }
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp3",
            "wav",
            "ogg",
            "aac",
            "flac",
            "wma",
            "alac",
            "aiff",
            "opus",
          ].includes(extension)
        : false;
    },
    resizeVideo() {},
    reClick() {
      this.checkFeaturedFile = true;
    },
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
          this.audioCheck = false;
          this.generatePreviewImage(file);
        } else if (file.type.includes("video")) {
          this.$emit("fileSelected", file);
          this.imageSelected = true;
          this.checkFeaturedFile = true;
          this.audioCheck = false;
          this.generatePreviewVideo(file);
          this.generatePreviewVideo2(file);
        } else if (file.type.includes("audio")) {
          this.$emit("fileSelected", file);
          this.imageSelected = true;
          this.checkFeaturedFile = true;
          this.audioCheck = true;

          this.generatePreviewAudio(file);
          this.generatePreviewAudio2(file);
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
      this.$refs.input.click();
    },
    dropZoneClickedThumnail() {
      this.$refs.inputThumnail.click();
    },
    generatePreviewImage(file: any) {
      this.isImage = true;
      this.isVideo = false;
      this.isResize = false;
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
      this.isVideo = true;
      this.isImage = false;
      this.isResize = true;
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
    generatePreviewVideo2(file: any) {
      this.isVideo = true;
      this.isImage = false;
      this.isResize = true;
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
      this.isVideo = true;
      // videoElement.classList.add("tw-object-fill");

      setTimeout(() => {
        const previewElement = this.$refs.imagePreview2;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }

        previewElement.prepend(videoElement);
      }, 200);
    },
    generatePreviewAudio(file: any) {
      this.isVideo = true;
      this.isResize = false;
      this.isImage = false;
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
      }, 200);
      this.audioUrl = audioElement.src;
    },
    generatePreviewAudio2(file: any) {
      this.isVideo = true;
      this.isResize = false;
      this.isImage = false;
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
        const previewElement = this.$refs.imagePreview2;

        if (previewElement.firstChild) {
          previewElement.removeChild(previewElement.firstChild);
        }
        console.log("audio ele", audioElement.src);
        console.log("afterrr", this.audioUrl);
        // previewElement.prepend(audioElement);
      }, 200);
      this.audioUrl = audioElement.src;
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
    resizeVideoToOriginal() {
      const videoElement = this.$refs.imagePreview.querySelector("video");
      if (videoElement) {
        videoElement.classList.remove("tw-object-cover");
        this.resizeActive = false;
      }
    },

    resizeVideoToSquare() {
      const videoElement = this.$refs.imagePreview.querySelector("video");
      if (videoElement) {
        videoElement.classList.add("tw-object-cover");
        this.resizeActive = true;
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
      console.log("item", item);
      this.dropZoneClass = "tw-border-dark-4";

      // Check the type of the dropped file
      if (item.type.includes("image")) {
        this.$emit("fileSelected", item);
        this.imageSelected = true;
        this.audioCheck = false;
        this.generatePreviewImage(item);
      } else if (item.type.includes("video")) {
        this.$emit("fileSelected", item);
        this.imageSelected = true;
        this.checkFeaturedFile = true;
        this.audioCheck = false;
        this.generatePreviewVideo(item);
        this.generatePreviewVideo2(item);
      } else if (item.type.includes("audio")) {
        this.$emit("fileSelected", item);
        this.imageSelected = true;
        this.checkFeaturedFile = true;
        this.audioCheck = false;
        this.generatePreviewAudio(item);
        this.generatePreviewAudio2(item);
      } else {
        this.$toast.showMessage({
          message:
            "Unsupported file type. Please drop an image, video, or audio file.",
          error: true,
        });
        return;
      }
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
<style>
.transition {
  transition: 3s ease-in-out !important;
}

.btn-border {
  color: rgb(135 89 255) !important;
  border: 1px solid rgb(135 89 255) !important;
}
.resize-icon-holder {
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
}
.audio-position {
  position: absolute;
  bottom: 40px;
}
.change-btn {
  display: flex;
  align-items: center;
  color: #8759ff;
  padding: 0 12px;
  cursor: pointer;
}
</style>
