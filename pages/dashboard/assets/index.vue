<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
  >
    <button class="dashboard-gradient-button" @click="newFolderDialog = true">
      Create New Folder +
    </button>
    <assets-bread-crumbs />
    <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-4">
      <button
        class="tw-bg-wapal-gray tw-px-4 tw-py-2 tw-text-black tw-rounded-sm tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-gray-300"
        v-if="folders[0].name"
        v-for="folder in folders"
        :key="folder.name"
        @click="folderClicked(folder.name)"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <v-icon class="!tw-text-black">mdi-folder</v-icon>
          {{ folder.name }}
        </div>
        <button>
          <v-icon class="!tw-text-black">mdi-dots-vertical</v-icon>
        </button>
      </button>
    </div>
    <form
      class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-8"
      @dragover.prevent="dragover"
      @dragleave.prevent="dragleave"
      @drop.prevent="drop"
    >
      <label
        class="tw-w-full tw-h-full tw-px-8 tw-py-8 tw-border-2 tw-border-dashed tw-border-wapal-gray tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-cursor-pointer md:tw-w-1/2"
        id="drop-zone"
      >
        <div id="drop-zone">Drag and Drop Your Folders Here</div>
        <div id="drop-zone">OR</div>
        <div id="drop-zone">Click Here</div>
        <input
          type="file"
          class="folder-upload"
          webkitdirectory
          mozdirectory
          msdirectory
          odirectory
          directory
          @change="fileChanged"
      /></label>
    </form>
    <v-dialog
      v-model="newFolderDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <h2 class="tw-text-xl tw-font-semibold">New Folder</h2>
      <input
        v-model="newFolderName"
        class="tw-w-full tw-px-4 tw-py-2 tw-text-white tw-bg-transparent tw-rounded tw-border-solid tw-border-2 tw-border-wapal-gray focus:tw-outline-none"
        placeholder="Folder Name"
      />
      <div
        class="tw-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4"
      >
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink"
          @click="newFolderDialog = false"
        >
          Cancel
        </button>
        <button
          class="tw-px-4 tw-py-2 tw-rounded-sm tw-transition-all tw-duration-150 tw-ease-linear tw-bg-wapal-pink disabled:tw-bg-wapal-pink/80"
          :disabled="!newFolderName"
          @click="createNewFolder"
        >
          Create
        </button>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import AssetsBreadCrumbs from "@/components/Dashboard/Assets/AssetsBreadCrumbs.vue";
export default {
  layout: "dashboard",
  components: { GradientBorderButton, AssetsBreadCrumbs },
  data() {
    return {
      folders: [{ name: "" }],
      uploadedFolder: null,
      newFolderDialog: false,
      newFolderName: null,
    };
  },
  methods: {
    dragover(e: any) {
      e.dataTransfer!.dropEffect = "copy";
    },
    dragleave(e: any) {
      e.dataTransfer!.dropEffect = "copy";
    },
    async drop(event: any) {
      const items = event.dataTransfer.items;

      const item = items[0].webkitGetAsEntry();

      this.uploadedFolder = item;

      if (this.checkDuplicateFolder(item)) {
        this.$toast.showMessage({
          message: "Please do not upload duplicate Folders",
          error: true,
        });
        return;
      }

      if (item.isDirectory) {
        this.pushFolder(this.uploadedFolder);
      } else {
        this.$toast.showMessage({
          message: "Please Upload a Folder",
          error: true,
        });
      }
    },
    fileChanged(event: any) {
      const files = event.target.files;

      const relativePath = files[0].webkitRelativePath;

      const folderName = relativePath.split("/")[0];

      if (this.checkDuplicateFolder({ name: folderName })) {
        this.$toast.showMessage({
          message: "Please do not upload duplicate Folders",
          error: true,
        });
        return;
      }

      this.pushFolder({ name: folderName });
    },

    pushFolder(folder: any) {
      if (!this.folders[0].name) {
        this.folders = [];
      }
      this.folders.push(folder);
    },
    checkDuplicateFolder(item: any) {
      const duplicate = this.folders.find((folder: any) => {
        if (folder.name.toLowerCase() === item.name.toLowerCase()) {
          return folder;
        }
      });

      return duplicate;
    },
    createNewFolder() {
      if (this.checkDuplicateFolder({ name: this.newFolderName })) {
        this.$toast.showMessage({
          message: "Please do not create duplicate Folder",
          error: true,
        });
        return;
      }

      this.pushFolder({ name: this.newFolderName });

      this.newFolderDialog = false;
    },
    folderClicked(folderName: string) {
      this.$router.push(`/dashboard/assets/${folderName}`);
    },
  },
  watch: {
    newFolderDialog(showNewFolderDialog: any) {
      if (!showNewFolderDialog) {
        this.newFolderName = "";
      }
    },
  },
};
</script>
<style>
.folder-upload {
  display: none;
}
</style>
