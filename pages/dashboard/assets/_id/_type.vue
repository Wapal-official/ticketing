<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full tw-relative"
    v-if="!loading"
  >
    <div
      class="tw-flex tw-flex-col-reverse tw-items-start tw-justify-start tw-gap-4 tw-rounded tw-px-4 tw-py-4 md:tw-flex-row md:tw-items-center md:tw-justify-between tw-w-full"
    >
      <v-breadcrumbs :items="breadcrumbs" class="breadcrumb !tw-text-base">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :disabled="item.disabled">
            <NuxtLink
              class="!tw-text-white"
              :to="item.href ? item.href : $route.fullPath"
            >
              {{ item.text }}
            </NuxtLink>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-4 tw-w-full md:tw-w-fit md:tw-justify-end"
      >
        <button>
          <v-icon
            class="!tw-text-white"
            v-if="!listView"
            @click="listView = true"
            >mdi-view-list</v-icon
          >
          <v-icon class="!tw-text-white" v-else @click="listView = false"
            >mdi-view-grid</v-icon
          >
        </button>
      </div>
    </div>
    <div
      class="tw-flex tw-flex-row tw-w-full tw-gap-4"
      v-if="folderInfo.files[0]"
    >
      <div class="tw-w-full">
        <div
          class="tw-grid tw-container tw-mx-auto tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3 2xl:tw-grid-cols-4"
          v-if="!listView"
        >
          <assets-file-card
            @displayFileDetails="displayFileDetails"
            v-for="file in paginatedFiles"
            :key="file._id"
            :file="file"
            :type="type"
          />
        </div>
        <v-data-table
          :headers="headers"
          :items="paginatedFiles"
          :items-per-page="5"
          class="assets-data-table"
          mobile-breakpoint="0"
          :hide-default-footer="true"
          disable-pagination
          v-else
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.name"
                class="tw-cursor-pointer hover:!tw-bg-black/60"
              >
                <td
                  class="!tw-border-none tw-uppercase tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 !tw-py-8"
                >
                  <img
                    :src="item.image ? item.image : item.src"
                    :alt="item.name"
                    class="tw-w-[45px] tw-h-[45px] tw-object-cover"
                  />{{ item.name }}
                </td>
                <td class="!tw-border-none">{{ item.createdDate }}</td>
                <td class="!tw-border-none">{{ getFileSize(item.size) }}</td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog
      v-model="showFileDetails"
      content-class="!tw-w-full !tw-mx-2 !tw-rounded-none md:!tw-mx-auto md:!tw-w-1/2 md:!tw-border-t-wapal-dashboard-active md:!tw-border-b-wapal-dashboard-active lg:!tw-w-[40%]"
    >
      <assets-image-details
        :file="currentFile"
        @close="showFileDetails = false"
      />
    </v-dialog>

    <form
      class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-8"
      v-if="!fileLoading && !folderInfo.files[0] && checkImageUploaded"
    >
      <label
        class="tw-w-full tw-h-full tw-px-8 tw-py-8 tw-border-2 tw-border-dashed tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-cursor-pointer md:tw-w-1/2"
        :class="dropZoneClass"
        id="drop-zone"
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
      >
        <img :src="UploadIcon" alt="upload" id="drop-zone" />
        <div id="drop-zone">Drag and Drop Your Files Here</div>
        <div id="drop-zone">OR</div>
        <div
          id="drop-zone"
          class="tw-bg-wapal-gray tw-text-white tw-px-8 tw-py-2 tw-rounded tw-cursor-pointer"
        >
          Browse
        </div>
        <input
          type="file"
          class="!tw-hidden"
          @change="fileChanged"
          webkitdirectory
          mozdirectory
          msdirectory
          odirectory
          directory
          multiple
          name="file"
      /></label>
    </form>
    <div
      class="tw-text-white tw-text-center tw-text-lg tw-w-full"
      v-if="!checkImageUploaded"
    >
      Please Upload Images in image folder first
    </div>
    <v-dialog
      v-model="showUploadingDialog"
      content-class="!tw-w-full tw-relative tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:!tw-w-1/2 lg:!tw-w-[30%]"
      :persistent="!uploadComplete"
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-end"
        v-if="uploadComplete || balanceNotEnoughError.error"
      >
        <v-icon class="!tw-text-white" @click="showUploadingDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h2 class="tw-text-lg tw-font-semibold">
        {{
          !uploadComplete ? "Sending Files To Server" : "Files Sent To Server"
        }}
      </h2>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
        v-if="uploading"
      >
        <div
          class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-2 tw-w-full"
        >
          <div
            class="tw-relative tw-w-full tw-rounded-lg tw-py-1 tw-bg-wapal-gray"
          >
            <div
              class="tw-absolute tw-h-2 tw-top-0 tw-left-0 tw-bg-wapal-pink tw-rounded-full tw-transition-all tw-duration-200 tw-ease-linear"
              :style="`width:${serverUploadPercent}%`"
            ></div>
          </div>
          <span class="tw-text-sm">{{ this.serverUploadPercent }}%</span>
        </div>
      </div>
      <div
        class="tw-text-red-600 tw-flex tw-flex-col tw-gap-2 tw-w-full"
        v-if="balanceNotEnoughError.error"
      >
        {{ balanceNotEnoughError.message }}
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-between"
        >
          <div>
            Required Balance: {{ balanceNotEnoughError.requiredBalance }}
          </div>
          <div>Your Balance: {{ balanceNotEnoughError.yourBalance }}</div>
        </div>
      </div>
    </v-dialog>
    <div
      class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
      v-if="mappingFiles"
    >
      <v-progress-circular
        indeterminate
        :color="defaultTheme.wapalPink"
      ></v-progress-circular>
    </div>
  </div>
  <div
    class="tw-py-16 tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
    v-else
  >
    <v-progress-circular
      indeterminate
      :color="defaultTheme.wapalPink"
    ></v-progress-circular>
  </div>
</template>
<script lang="ts">
import AssetsBreadCrumbs from "@/components/Dashboard/Assets/AssetsBreadCrumbs.vue";
import AssetsFileCard from "@/components/Dashboard/Assets/AssetsFileCard.vue";
import AssetsImageDetails from "@/components/Dashboard/Assets/AssetsImageDetails.vue";
import UploadIcon from "@/assets/img/upload-icon.svg";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import {
  folderUpload,
  getFolderById,
  deleteFolderOnServer,
} from "@/services/AssetsService";
import { defaultTheme } from "@/theme/wapaltheme";
import moment from "moment";
import { socket, uploadSocketState } from "@/sockets/socket";

export default {
  layout: "dashboard",
  components: {
    AssetsBreadCrumbs,
    AssetsFileCard,
    AssetsImageDetails,
    GradientBorderButton,
  },
  ssr: false,
  data() {
    return {
      folderInfo: {
        _id: null,
        user_id: null,
        folder_name: "",
        files: [{ createdDate: null, type: "", name: "", src: "", _id: null }],
      },
      paginatedFiles: [
        { createdDate: null, type: "", name: "", src: "", _id: null },
      ],
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
      showFileUploadDialog: false,
      showUploadingDialog: false,
      uploading: true,
      uploadComplete: false,
      balanceNotEnoughError: {
        error: false,
        message: "",
        requiredBalance: 0,
        yourBalance: 0,
      },
      currentFile: { _id: "" },
      loading: true,
      fileLoading: true,
      uploadId: 0,
      fileDetailsStart: false,
      uploadStatusClass: "tw-h-0",
      uploadSummary: "",
      showDropZone: false,
      scrolledNumber: 1,
      fileIndex: 0,
      mappingFiles: false,
      type: "",
      serverUploadPercent: 0,
      UploadIcon,
      defaultTheme,
    };
  },
  methods: {
    displayFileDetails(file: any) {
      this.currentFile = file;
      if (file.image) {
        this.showFileDetails = true;
      }
    },
    dragover(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-green-600";
      this.showDropZone = true;
    },
    dragleave(e: any) {
      e.dataTransfer!.dropEffect = "copy";
      this.dropZoneClass = "tw-border-wapal-gray";
      this.showDropZone = false;
    },
    async drop(event: any) {
      this.showDropZone = false;
      const items = event.dataTransfer.items;

      try {
        if (items.length > 1) {
          const tempFiles = [];
          for (let i = 0; i < items.length; i++) {
            const tempFile = items[i].webkitGetAsEntry();
            if (tempFile.isFile) {
              const file = items[i].getAsFile();
              tempFiles.push(file);
            } else {
              this.$toast.showMessage({
                message:
                  "If you are uploading multiple items please upload files and not directories",
                error: true,
              });
              break;
            }
          }

          if (tempFiles.length > 0) {
            this.uploadedFile = tempFiles;
            this.sendDataToUploadFolder(this.uploadedFile);
          }
        } else {
          const file = items[0].webkitGetAsEntry();
          if (file.isDirectory) {
            const files: any[] = [];
            let queue = [];

            for (let i = 0; i < items.length; i++) {
              queue.push(items[i].webkitGetAsEntry());
            }

            while (queue.length > 0) {
              let entry = queue.shift();
              if (entry.isFile) {
                const file = entry;
                files.push(file);
              } else if (entry.isDirectory) {
                let reader = entry.createReader();
                queue.push(...(await this.readAllDirectoryEntries(reader)));
              }
            }
            const tempFiles: any = await Promise.all(
              files.map(async (file) => {
                const tempFile = await this.getFileFromFileEntry(file);

                return tempFile;
              })
            );
            this.uploadedFile = tempFiles;

            this.sendDataToUploadFolder();
          } else {
            throw new Error(
              "If you are uploading Single file please upload it through a directory"
            );
          }
        }
      } catch (error) {
        this.$toast.showMessage({ message: error, error: true });
      }

      this.showFileUploadDialog = false;

      this.dropZoneClass = "tw-border-wapal-gray";
    },
    async readAllDirectoryEntries(directoryReader: any) {
      let entries = [];
      let readEntries = await this.readEntriesPromise(directoryReader);
      while (readEntries.length > 0) {
        entries.push(...readEntries);
        readEntries = await this.readEntriesPromise(directoryReader);
      }
      return entries;
    },

    async readEntriesPromise(directoryReader: any) {
      try {
        return await new Promise((resolve, reject) => {
          directoryReader.readEntries(resolve, reject);
        });
      } catch (err) {
        console.log(err);
      }
    },
    getFileFromFileEntry(fileEntry: any) {
      return new Promise((resolve, reject) => {
        fileEntry.file(resolve, reject);
      });
    },
    fileChanged(event: any) {
      this.showFileUploadDialog = false;

      const files = event.target.files;

      this.uploadedFile = files;

      this.sendDataToUploadFolder();
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
    async fetchFiles() {
      this.fileIndex = 0;
      this.loading = true;
      this.fileLoading = true;

      const folderId = this.$route.params.id;

      this.paginatedFiles = [];

      const res = await getFolderById(folderId);

      this.folderInfo.files =
        this.type === "assets" && !res.data.folderInfo.metadata.baseURI
          ? res.data.folderInfo.assets.files
          : res.data.folderInfo.metadata.files;

      this.folderInfo.folder_name = res.data.folderInfo.folder_name;
      this.folderInfo._id = res.data.folderInfo._id;
      this.folderInfo.user_id = res.data.folderInfo.user_id;
      this.folderInfo.assets = res.data.folderInfo.assets;
      this.folderInfo.metadata = res.data.folderInfo.metadata;

      this.loading = false;

      const fileCheck =
        this.type === "assets"
          ? !res.data.folderInfo.assets.files[0]
          : !res.data.folderInfo.metadata.files[0];

      if (fileCheck) {
        this.fileLoading = false;
      }
    },
    async mapFiles(scrollNumber: number) {
      let tempFiles = [];
      if (!scrollNumber) {
        tempFiles = this.folderInfo.files.slice(0, 20);
      } else {
        tempFiles = this.folderInfo.files.slice(
          scrollNumber - 20,
          scrollNumber
        );
      }

      tempFiles.map(async (file: string) => {
        try {
          const res = await this.$axios.get(`https://arweave.net/${file}`);

          const tempFile = res.data;

          let fileType = "image";

          if (
            res.headers["content-type"] === "application/json; charset=utf-8"
          ) {
            fileType = "json";
          }

          if (fileType === "json" && this.type === "assets") {
            const createdDate = moment(
              tempFile.date ? tempFile.date : ""
            ).format("DD/MM/YYYY");

            this.paginatedFiles.push({
              _id: file,
              name: tempFile.name,
              src: `https://arweave.net/${file}`,
              type: res.headers["content-type"],
              createdDate: createdDate,
              size: res.headers["content-length"],
              image: tempFile.image,
            });
          } else {
            const createdDate = moment().format("DD/MM/YYYY");

            this.paginatedFiles.push({
              _id: file,
              name: this.fileIndex.toString(),
              src: `https://arweave.net/${file}`,
              type: res.headers["content-type"],
              createdDate: createdDate,
              size: res.headers["content-length"],
            });
          }

          this.fileIndex++;
        } catch (error) {
          console.log(error);
        }
      });

      this.mappingFiles = false;
    },
    async sendDataToUploadFolder() {
      this.serverUploadPercent = 0;
      let files = [];
      if (Array.isArray(this.uploadedFile)) {
        files = this.uploadedFile;
      } else {
        files = [...this.uploadedFile];
      }

      files = files.filter((file: any) => {
        return (
          !/\.DS_Store$/i.test(file.webkitRelativePath) &&
          !/\.DS_Store$/i.test(file.name)
        );
      });

      files.sort((a: any, b: any) => {
        const firstFileName = a.name;
        const firstExtensionIndex = firstFileName.lastIndexOf(".");
        const firstNameWithoutExtension = firstFileName.substring(
          0,
          firstExtensionIndex
        );

        const secondFileName = b.name;
        const secondExtensionIndex = secondFileName.lastIndexOf(".");
        const secondNameWithoutExtension = secondFileName.substring(
          0,
          secondExtensionIndex
        );

        return firstNameWithoutExtension - secondNameWithoutExtension;
      });

      try {
        this.uploadComplete = false;
        this.uploadStatusClass = "tw-h-0";
        this.uploading = true;
        this.showUploadingDialog = true;

        if (this.type === "metadata" && !this.folderInfo.assets.baseURI) {
          throw new Error("Please upload Images in Asset Folder first");
        }

        if (
          this.type === "metadata" &&
          this.folderInfo.assets.files.length !== files.length
        ) {
          throw new Error(
            "Your metadata folder does not have same file length as Image Folder"
          );
        }

        const batchLoop = Math.ceil(files.length / 50);

        let responseCount = 0;
        let response = null;

        this.serverUploadPercent = 0;

        for (let i = 1; i <= batchLoop; i++) {
          const endIndex = i * 50;
          const startIndex = endIndex - 50;

          const formData = new FormData();

          formData.append("user_id", this.folderInfo.user_id);
          formData.append("folder_name", this.folderInfo.folder_name);
          formData.append("type", this.type);

          const tempFiles = files.slice(startIndex, endIndex);

          let fileNumber = startIndex;

          tempFiles.forEach((file: any) => {
            if (this.type === "assets") {
              if (file.type === "application/json") {
                throw new Error("Please Only Upload Images on Asset Folder");
              }
            }

            if (this.type === "metadata") {
              if (file.type !== "application/json") {
                throw new Error(
                  "Please Only Upload JSON Files on Metadata Folder"
                );
              }
            }

            if (file.name !== file.name.trim()) {
              throw new Error("Please Name your files without white spaces");
            }

            const filename = file.name;
            const extensionIndex = filename.lastIndexOf(".");
            const nameWithoutExtension = filename.substring(0, extensionIndex);

            if (nameWithoutExtension != fileNumber) {
              throw new Error(
                "Please Name you files in a Sequence Eg: 0,1,2,3..."
              );
            }

            fileNumber++;

            formData.append("images", file);
          });

          const res = await folderUpload(formData);

          if (res.data.newFolder) {
            responseCount++;
          }

          if (responseCount === batchLoop) {
            response = res.data.newFolder;
          }

          this.serverUploadPercent = Math.floor((i / batchLoop) * 100);
        }

        if (responseCount === batchLoop) {
          this.transferFund(response);
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.showUploadingDialog = false;

        await deleteFolderOnServer(this.$store.state.userStore.user.user_id);
      }
    },
    async transferFund(newFolder: any) {
      try {
        this.uploadComplete = true;

        this.balanceNotEnoughError = await this.$store.dispatch(
          "walletStore/checkBalanceForFolderUpload"
        );

        const transaction = await this.$store.dispatch(
          "walletStore/signTransactionForUploadingFolder",
          this.balanceNotEnoughError.requiredBalance
        );

        if (transaction.success) {
          this.uploading = false;
          this.uploadStatusClass = "tw-h-full";

          uploadSocketState.uploading = false;
          uploadSocketState.previousResult = "";
          uploadSocketState.progress = 0;
          uploadSocketState.uploadSummary = "";
          uploadSocketState.totalFiles = 0;
          uploadSocketState.showUploadBar = true;

          socket.emit(
            "upload",
            this.folderInfo.user_id,
            this.folderInfo.folder_name,
            newFolder,
            this.type
          );

          uploadSocketState.totalFiles = this.uploadedFile.length;

          uploadSocketState.uploading = true;

          this.showUploadingDialog = false;
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.showUploadingDialog = false;
        const res = await deleteFolderOnServer(
          this.$store.state.userStore.user.user_id
        );
      }
    },
  },
  computed: {
    breadcrumbs() {
      return this.loading
        ? []
        : [
            { text: "Vault", href: "/dashboard/assets" },
            {
              text: this.folderInfo.folder_name,
              href: `/dashboard/assets/${this.folderInfo._id}`,
            },
            { text: this.type === "assets" ? "images" : this.type },
          ];
    },
    checkImageUploaded() {
      if (this.type === "assets") {
        return true;
      }

      if (!this.folderInfo.assets.baseURI) {
        return false;
      }

      return true;
    },
    checkUploadingStatus() {
      return uploadSocketState.uploadSummary;
    },
  },
  async mounted() {
    this.type = this.$route.params.type;

    if (this.type !== "assets" && this.type !== "metadata") {
      throw { statusCode: 404, message: "Page not found" };
    }

    await this.fetchFiles();
    await this.mapFiles();

    if (process.client) {
      window.addEventListener("scroll", async () => {
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight
        ) {
          this.scrolledNumber++;

          this.mappingFiles = true;
          await this.mapFiles(20 * this.scrolledNumber);
        }
      });
    }
  },
  watch: {
    checkUploadingStatus: async function (newValue: string) {
      if (newValue) {
        setTimeout(async () => {
          await this.fetchFiles();
          await this.mapFiles();

          this.uploadedFiles.uploadedFiles = 0;
          this.uploadedFiles.files = [];
        }, 2000);
      }
    },
  },
  cache: false,
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
