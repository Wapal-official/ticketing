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
      class="tw-border tw-border-dashed tw-border-dark-4 tw-py-20 tw-rounded tw-cursor-pointer tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center"
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
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .gif, .webp"
        name="file"
        @change="fileSelected"
        class="tw-hidden tw-w-full tw-h-full"
        ref="input"
        id="drop-zone"
      />
    </div>
    <div
      class="tw-w-[200px] tw-h-[200px] tw-relative tw-rounded"
      ref="dropZone"
      v-else
    >
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .gif, .webp"
        name="file"
        @change="fileSelected"
        class="tw-hidden tw-w-full tw-h-full"
        ref="input"
      />
      <div ref="imagePreview" class="tw-w-full tw-h-full tw-rounded"></div>
      <button
        class="tw-w-full tw-absolute tw-bottom-[-2px] tw-left-0 tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-1 tw-py-2 tw-bg-dark-7 tw-text-white tw-rounded"
        @click="dropZoneClicked"
      >
        <span class="tw-text-sm tw-font-medium">Change</span>
        <i class="bx bxs-edit-alt tw-text-xl"></i>
      </button>
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
  },
  data() {
    return {
      imageSelected: false,
      dropZoneClass: "tw-border-dark-4",
    };
  },
  computed: {},
  methods: {
    fileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.$emit("fileSelected", file);
        this.imageSelected = true;

        this.generatePreviewImage(file);
      }
    },
    dropZoneClicked() {
      this.$refs.input.click();
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
