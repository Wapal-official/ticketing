<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full"
  >
    <div
      class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full"
    >
      <assets-bread-crumbs :folderName="folderName" />
      <button>
        <v-icon class="!tw-text-white" v-if="!listView" @click="listView = true"
          >mdi-view-list</v-icon
        >
        <v-icon class="!tw-text-white" v-else @click="listView = false"
          >mdi-view-grid</v-icon
        >
      </button>
    </div>
    <div class="tw-flex tw-flex-row tw-w-full tw-gap-4" v-if="files[0].name">
      <div class="tw-w-fit">
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 tw-flex-wrap tw-flex-shrink md:tw-justify-start"
          v-if="!listView"
        >
          <assets-file-card
            @displayFileDetails="displayFileDetails"
            v-for="file in files"
            :key="file.createdDate"
            :type="file.type"
            :name="file.name"
          />
        </div>
        <v-data-table
          :headers="headers"
          :items="files"
          :items-per-page="5"
          class="assets-data-table"
          mobile-breakpoint="0"
          :hide-default-footer="true"
          v-else
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.createdDate"
                class="tw-cursor-pointer hover:!tw-bg-black/60"
              >
                <td
                  class="!tw-border-none tw-uppercase tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 !tw-py-8"
                >
                  <img
                    :src="pirate"
                    :alt="item.name"
                    class="tw-w-[45px] tw-h-[45px] tw-object-cover"
                    v-if="getFileType(item)"
                  />{{ item.name }}
                </td>
                <td class="!tw-border-none">{{ item.createdDate }}</td>
                <td class="!tw-border-none">{{ getFileSize(item.size) }}</td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </div>
      <assets-image-details
        v-if="showFileDetails"
        @close="showFileDetails = false"
        class="tw-hidden md:tw-flex"
      />
    </div>
    <div
      class="tw-fixed tw-w-screen tw-h-screen tw-top-0 tw-left-0 tw-bg-black/50 tw-flex tw-flex-row tw-justify-center md:tw-hidden"
      v-if="showFileDetails"
    >
      <assets-image-details @close="showFileDetails = false" />
    </div>
    <form
      class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-8"
    >
      <label
        class="tw-w-full tw-h-full tw-px-8 tw-py-8 tw-border-2 tw-border-dashed tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-cursor-pointer md:tw-w-1/2"
        :class="dropZoneClass"
        id="drop-zone"
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
      >
        <img :src="UploadIcon" alt="upload" />
        <div id="drop-zone">Drag and Drop Your Files Here</div>
        <div id="drop-zone">OR</div>
        <div
          id="drop-zone"
          class="tw-bg-wapal-gray tw-text-white tw-px-8 tw-py-2 tw-rounded tw-cursor-pointer"
        >
          Browse
        </div>
        <input type="file" class="!tw-hidden" @change="fileChanged"
      /></label>
    </form>
  </div>
</template>
<script lang="ts">
import AssetsBreadCrumbs from "@/components/Dashboard/Assets/AssetsBreadCrumbs.vue";
import AssetsFileCard from "@/components/Dashboard/Assets/AssetsFileCard.vue";
import AssetsImageDetails from "@/components/Dashboard/Assets/AssetsImageDetails.vue";
import UploadIcon from "@/assets/img/upload-icon.svg";
import pirate from "@/assets/img/6195.png";
export default {
  layout: "dashboard",
  components: { AssetsBreadCrumbs, AssetsFileCard, AssetsImageDetails },
  data() {
    return {
      folderName: "Assets",
      showFileDetails: false,
      listView: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "700px",
          class: "!tw-text-white !tw-border-b-wapal-dashboard-active",
        },
        {
          text: "Date Created",
          align: "start",
          sortable: true,
          value: "createdDate",
          width: "200px",
          class: "!tw-text-white !tw-border-b-wapal-dashboard-active",
        },
        {
          text: "Size",
          align: "start",
          sortable: true,
          value: "size",
          width: "200px",
          class: "!tw-text-white !tw-border-b-wapal-dashboard-active",
        },
      ],
      image: false,
      dropZoneClass: "tw-border-wapal-gray",
      uploadedFile: null,
      files: [{ name: "", createdDate: "", size: "", type: "" }],
      pirate,
      UploadIcon,
    };
  },
  methods: {
    displayFileDetails() {
      this.showFileDetails = true;
    },
    dragover(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-green-600";
    },
    dragleave(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-wapal-gray";
    },
    async drop(event: any) {
      const items = event.dataTransfer.items;

      const file = items[0].getAsFile();
      this.uploadedFile = file;

      if (this.checkDuplicateFile(this.uploadedFile)) {
        this.$toast.showMessage({
          message: "Please do not upload duplicate Folders",
          error: true,
        });
        return;
      }

      this.uploadedFile.createdDate = new Date().toISOString();
      this.pushFile(this.uploadedFile);

      this.dropZoneClass = "tw-border-wapal-gray";
    },
    fileChanged(event: any) {
      const files = event.target.files;

      const file = files[0];

      if (this.checkDuplicateFile({ name: file.name })) {
        this.$toast.showMessage({
          message: "Please do not upload duplicate Files",
          error: true,
        });
        return;
      }

      file.createdDate = new Date().toISOString();

      this.pushFile(file);
    },

    pushFile(file: any) {
      if (!this.files[0].name) {
        this.files = [];
      }
      console.log(file);
      this.files.push(file);
    },
    checkDuplicateFile(item: any) {
      const duplicate = this.files.find((file: any) => {
        if (file.name.toLowerCase() === item.name.toLowerCase()) {
          return file;
        }
      });

      return duplicate;
    },
    getFileType(item: any) {
      if (item.type.includes("image/")) {
        return true;
      }
      return false;
    },
    getFileSize(size: number) {
      if (size / 1048576 > 1) {
        return (size / 1048576).toFixed(2) + " MB";
      }
      return (size / 1024).toFixed(2) + " KB";
    },
  },
  mounted() {
    const param = this.$route.params.id;
  },
};
</script>
<style>
.assets-data-table {
  min-width: 100% !important;
  max-width: 100% !important;
  overflow-x: auto !important;
  background: transparent !important;
}
</style>
