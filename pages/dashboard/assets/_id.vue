<template>
  <div
    class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full tw-relative"
    v-if="!loading"
    @dragover.prevent="showDropZone = true"
  >
    <form
      class="tw-w-full tw-h-full tw-absolute tw-rounded tw-z-50 tw-top-0 tw-left-0 tw-bg-white/80"
      submit.prevent=""
      id="drop-zone"
      v-if="showDropZone && folderInfo.files[0]"
    >
      <label
        class="tw-w-full tw-h-full tw-flex tw-flex-row tw-gap-4 tw-cursor-pointer tw-rounded tw-items-center tw-justify-center"
        :class="dropZoneClass"
        id="drop-zone"
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
      >
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
        />
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-text-green-800 tw-font-medium tw-text-xl"
        >
          Drop your files here to upload
        </div>
      </label>
    </form>
    <div
      class="tw-flex tw-flex-col-reverse tw-items-start tw-justify-start tw-gap-4 tw-rounded tw-px-4 tw-py-4 md:tw-flex-row md:tw-items-center md:tw-justify-between tw-w-full"
    >
      <assets-bread-crumbs :folderName="folderInfo.folder_name" />
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-4 tw-w-full md:tw-w-fit md:tw-justify-end"
      >
        <gradient-border-button
          class="tw-bg-wapal-gray tw-text-white tw-px-8 tw-py-2 tw-rounded tw-cursor-pointer"
          v-if="folderInfo.files[0]"
          @click.native="showFileUploadDialog = true"
        >
          Upload
        </gradient-border-button>
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
      <div class="tw-w-fit tw-max-w-full">
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4 tw-flex-wrap tw-flex-shrink md:tw-justify-start"
          v-if="!listView"
        >
          <assets-file-card
            @displayFileDetails="displayFileDetails(file)"
            v-for="file in folderInfo.files"
            :key="file.createdDate"
            :file="file"
          />
        </div>
        <v-data-table
          :headers="headers"
          :items="folderInfo.files"
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
                :key="item.createdDate"
                class="tw-cursor-pointer hover:!tw-bg-black/60"
              >
                <td
                  class="!tw-border-none tw-uppercase tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4 !tw-py-8"
                >
                  <img
                    :src="item.src"
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
        :file="currentFile"
        @close="showFileDetails = false"
        class="tw-hidden md:tw-flex"
      />
    </div>
    <div
      class="tw-fixed tw-w-screen tw-h-screen tw-top-0 tw-left-0 tw-bg-black/50 tw-flex tw-flex-row tw-justify-center md:tw-hidden"
      v-if="showFileDetails"
    >
      <assets-image-details
        :file="currentFile"
        @close="showFileDetails = false"
      />
    </div>
    <form
      class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-8"
      v-if="!fileLoading && !folderInfo.files[0]"
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

    <v-dialog
      v-model="showFileUploadDialog"
      content-class="!tw-w-full tw-mx-4 tw-px-8 tw-py-4 tw-bg-modal-gray tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-6 md:!tw-w-1/2"
    >
      <form
        class="tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-8"
      >
        <label
          class="tw-w-full tw-h-full tw-px-8 tw-py-8 tw-border-2 tw-border-dashed tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-cursor-pointer"
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
    </v-dialog>
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
        {{ !uploadComplete ? "Uploading Files" : "Files Uploaded" }}
      </h2>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
        v-if="uploading"
      >
        <v-progress-circular
          indeterminate
          :color="defaultTheme.wapalPink"
        ></v-progress-circular>
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
      <div
        class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full tw-overflow-hidden"
        :class="uploadStatusClass"
      >
        <div
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full tw-h-32 tw-max-h-32 tw-overflow-y-auto"
          ref="uploadStatus"
        >
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full tw-px-4"
            v-for="file in uploadedFiles.files"
            :key="file.id"
          >
            {{ file.message }}
            <v-icon class="!tw-text-green-600">mdi-check-circle</v-icon>
          </div>
        </div>
        <div v-if="uploadComplete">{{ uploadSummary }}</div>
        <!-- <div class="tw-w-full">
          <div
            class="tw-w-full tw-rounded-full tw-relative tw-bg-[#263D68] tw-h-[10px]"
          >
            <div
              class="tw-absolute tw-h-[10px] tw-top-0 tw-bg-wapal-pink tw-rounded-full tw-transition-all tw-duration-200 tw-ease-linear"
              ref="uploadProgressBar"
            ></div>
          </div>
          <div
            class="tw-flex tw-flex-row tw-justify-end tw-items-center tw-pt-1"
          >
            {{ uploadedFiles.uploadedFiles }}/{{ uploadedFiles.totalFiles }}
          </div>
        </div> -->
      </div>
    </v-dialog>
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
  singleFileUpload,
} from "@/services/AssetsService";
import { defaultTheme } from "@/theme/wapaltheme";
import io from "socket.io-client";

const socket = io("https://staging-api.wapal.io");

export default {
  layout: "dashboard",
  components: {
    AssetsBreadCrumbs,
    AssetsFileCard,
    AssetsImageDetails,
    GradientBorderButton,
  },
  data() {
    return {
      folderInfo: {
        _id: null,
        user_id: null,
        folder_name: "",
        files: [{ createdDate: null, type: "", name: "", src: "", _id: null }],
      },
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
      uploadedFiles: {
        files: [{ id: "", message: "", type: "" }],
        totalFiles: 333,
        uploadedFiles: 0,
      },
      uploadId: 0,
      fileDetailsStart: false,
      uploadStatusClass: "tw-h-0",
      uploadSummary: "",
      showDropZone: false,
      UploadIcon,
      defaultTheme,
    };
  },
  methods: {
    displayFileDetails(file: any) {
      this.currentFile = file;
      this.showFileDetails = true;
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
          this.uploadedFile = items[0].getAsFile();

          this.sendDataToCreateFile();
        }
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

    pushFile() {
      this.folderInfo.files.push(this.uploadedFile);
    },
    checkDuplicateFile(item: any) {
      const duplicate = this.folderInfo.files.find((file: any) => {
        if (file.name.toLowerCase() === item.name.toLowerCase()) {
          return file;
        }
      });

      return duplicate;
    },
    getFileType(item: any) {
      if (item.type.includes("image")) {
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
    async sendDataToCreateFile() {
      try {
        this.uploadComplete = false;
        this.uploadStatusClass = "tw-h-0";
        this.uploading = true;
        this.showUploadingDialog = true;
        this.balanceNotEnoughError = await this.$store.dispatch(
          "walletStore/checkBalanceForFolderUpload"
        );
        if (this.balanceNotEnoughError.error) {
          this.balanceNotEnoughError.message =
            "Your Account Does Not Have Enough Balance";
          this.uploading = false;
          return;
        }

        const transaction = await this.$store.dispatch(
          "walletStore/signTransactionForUploadingFolder",
          this.balanceNotEnoughError.requiredBalance
        );

        if (transaction) {
          const formData = new FormData();

          formData.append("user_id", "63a2c4031fd037c1629eb63d");
          formData.append("folder_name", this.folderInfo.folder_name);
          formData.append("image", this.uploadedFile);

          await singleFileUpload(formData);

          this.showUploadingDialog = false;

          this.showFileUploadDialog = false;

          await this.mapFiles();

          this.$toast.showMessage({
            message: "File Uploaded Successfully",
          });
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.showUploadingDialog = false;
        this.showFileUploadDialog = false;
      }
    },
    async mapFiles() {
      this.loading = true;
      this.fileLoading = true;

      const folderId = this.$route.params.id;

      const res = await getFolderById(folderId);

      let i = 0;
      this.folderInfo.files = [];
      res.data.folderInfo.files.map(async (file: string) => {
        try {
          const tempFile = await this.$axios.get(`https://arweave.net/${file}`);
          this.folderInfo.files.push({
            _id: file,
            name: i.toString(),
            src: `https://arweave.net/${file}`,
            type: tempFile.headers["content-type"],
            createdDate: new Date().toISOString(),
            size: tempFile.headers["content-length"],
          });

          i++;
        } catch (error) {
          console.log(error);
        }
      });

      this.folderInfo.folder_name = res.data.folderInfo.folder_name;
      this.folderInfo._id = res.data.folderInfo._id;
      this.folderInfo.user_id = res.data.folderInfo.user_id;

      this.loading = false;
      if (!res.data.folderInfo.files[0]) {
        this.fileLoading = false;
      }
    },
    async sendDataToUploadFolder() {
      try {
        this.uploadComplete = false;
        this.uploadStatusClass = "tw-h-0";
        this.uploading = true;
        this.showUploadingDialog = true;

        const formData = new FormData();

        formData.append("user_id", this.folderInfo.user_id);
        formData.append("folder_name", this.folderInfo.folder_name);

        [...this.uploadedFile].forEach((file) => {
          formData.append("images", file);
        });

        const res = await folderUpload(formData);

        if (res.data.newFolder) {
          this.transferFund(res.data.newFolder);
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.showUploadingDialog = false;
      }
    },
    async transferFund(newFolder: any) {
      try {
        this.balanceNotEnoughError = await this.$store.dispatch(
          "walletStore/checkBalanceForFolderUpload"
        );
        if (this.balanceNotEnoughError.error) {
          this.balanceNotEnoughError.message =
            "Your Account Does Not Have Enough Balance";
          this.uploading = false;
          return;
        }

        const transaction = await this.$store.dispatch(
          "walletStore/signTransactionForUploadingFolder",
          this.balanceNotEnoughError.requiredBalance
        );

        if (transaction.success) {
          this.uploading = false;
          this.uploadStatusClass = "tw-h-full";

          this.uploadedFiles.files = [];

          this.uploadComplete = false;
          socket.emit(
            "upload",
            this.folderInfo.user_id,
            this.folderInfo.folder_name,
            newFolder
          );
        }
      } catch (error) {
        console.log(error);
        this.$toast.showMessage({ message: error, error: true });
        this.showUploadingDialog = false;
      }
    },
    uploadingFiles(output: any) {
      this.uploading = false;

      const lines = output.split("\n");

      if (lines[0].includes("Preparing")) {
        const startIndex = lines[0].indexOf("Preparing");

        const endIndex = lines[0].indexOf("files") + "files".length;

        const result = lines[0].substring(startIndex, endIndex);

        this.uploadedFiles.files.push({
          message: result,
          type: "preparing",
          id: this.uploadId,
        });

        this.uploadId++;
      }

      if (lines[0].includes("Deploying")) {
        const startIndex = lines[0].indexOf("Deploying");

        const endIndex = lines[0].indexOf("files") + "files".length;

        const result = lines[0].substring(startIndex, endIndex);

        this.uploadedFiles.files.push({
          message: result,
          type: "preparing",
          id: this.uploadId,
        });

        this.uploadId++;
      }

      if (lines[0] === "\u001b[36mSummary\u001b[39m") {
        this.fileDetailsStart = false;
      }

      if (
        lines[0] ===
        "\u001b[36mID\u001b[39m                                           \u001b[36mSize\u001b[39m           \u001b[36mFee\u001b[39m              \u001b[36mType\u001b[39m                          \u001b[36mPath\u001b[39m                "
      ) {
        this.fileDetailsStart = true;
        return;
      }

      if (this.fileDetailsStart) {
        lines.map((line: any) => {
          if (line !== "") {
            const trimmedString = line.trim();

            let spaceIndex = 0;
            let space = 0;
            for (let i = trimmedString.length - 1; i >= 0; i--) {
              if (trimmedString[i] === " ") {
                space++;
              }

              if (space > 4) {
                spaceIndex = i;
                break;
              }
            }

            const fileName = trimmedString
              .substring(spaceIndex, trimmedString.length)
              .trim();

            if (fileName !== "-" && fileName !== "") {
              this.uploadedFiles.files.push({
                message: `${fileName} Prepared`,
                type: "details",
                id: this.uploadId,
              });
            }
            this.uploadId++;
          }
        });
      }

      if (!this.uploadComplete) {
        this.$refs.uploadStatus.scrollTop =
          this.$refs.uploadStatus.scrollHeight;
      }

      // this.uploadedFiles.files.push(output);

      // this.uploadedFiles.uploadedFiles++;

      // const uploadPercent =
      //   (this.uploadedFiles.uploadedFiles / this.uploadedFiles.totalFiles) *
      //   100;

      // this.$refs.uploadProgressBar.style.width = `${uploadPercent}%`;

      // if (this.uploadedFiles.uploadedFiles >= this.uploadedFiles.totalFiles) {
      //   this.$toast.showMessage({ message: "Files Uploaded Successfully" });
      // }
    },
  },
  async mounted() {
    await this.mapFiles();

    socket.on("output", (output) => {
      this.uploadingFiles(output);
    });

    socket.on("post-deployment", (response) => {
      let stringRes = response;
      stringRes = stringRes.slice(10);

      const res = JSON.parse(stringRes);

      this.uploadComplete = true;

      this.uploadSummary = res.msg;

      this.$toast.showMessage({ message: "Files Uploaded Successfully" });
    });
  },
  unmounted() {
    socket.disconnect();
  },
  watch: {
    showUploadingDialog: async function (newValue: boolean) {
      if (!newValue) {
        if (this.uploadComplete) {
          await this.mapFiles();

          this.uploadedFiles.uploadedFiles = 0;
          this.uploadedFiles.files = [];
        }
      }
    },
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
