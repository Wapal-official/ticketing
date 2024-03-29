<template>
  <div class="tw-w-full">
    <div
      class="tw-border tw-border-dashed tw-border-dark-4 tw-py-40 tw-rounded tw-cursor-pointer tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
      @click="dropZoneClicked"
      @dragover.prevent="dragover"
      @dragleave.prevent="dragleave"
      @drop.prevent="drop"
      :class="dropZoneClass"
      id="drop-zone"
    >
      <label class="tw-text-sm tw-font-medium tw-cursor-pointer" id="drop-zone"
        >Drop your files here, or
        <span class="tw-text-primary-1" id="drop-zone"
          >click to browse</span
        ></label
      >
      <input
        type="file"
        @change="fileChanged"
        webkitdirectory
        mozdirectory
        msdirectory
        odirectory
        directory
        multiple
        name="file"
        class="tw-hidden tw-w-full tw-h-full"
        ref="input"
        id="drop-zone"
      />
    </div>
    <v-dialog
      v-model="showUploadingDialog"
      content-class="!tw-w-full tw-relative tw-mx-4 tw-px-8 tw-py-4 tw-bg-dark-7 tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:!tw-w-1/2 lg:!tw-w-[30%]"
      :persistent="!uploadComplete"
    >
      <div
        class="tw-flex tw-flex-row tw-items-center tw-justify-end"
        v-if="uploadComplete || balanceNotEnoughError.error"
      >
        <v-icon class="!tw-text-dark-0" @click="showUploadingDialog = false"
          >mdi-close</v-icon
        >
      </div>
      <h2 class="tw-text-lg tw-font-semibold tw-text-dark-0">
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
              class="tw-absolute tw-h-2 tw-top-0 tw-left-0 tw-bg-primary-1 tw-rounded-full tw-transition-all tw-duration-200 tw-ease-linear"
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
  </div>
</template>
<script lang="ts">
import { deleteFolderOnServer, folderUpload } from "@/services/AssetsService";
import { socket, uploadSocketState } from "@/sockets/socket";
export default {
  props: {
    folderInfo: { type: Object },
    type: { type: String },
  },
  data() {
    return {
      dropZoneClass: "tw-border-dark-4",
      showDropZone: false,
      uploadedFiles: [],

      showUploadingDialog: false,
      uploadComplete: false,
      uploading: false,
      balanceNotEnoughError: {
        error: false,
        message: "",
        requiredBalance: 0,
        yourBalance: 0,
      },
      serverUploadPercent: 0,
    };
  },
  methods: {
    dropZoneClicked() {
      this.$refs.input.click();
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
    async sendDataToUploadFolder() {
      this.serverUploadPercent = 0;
      let files = [];
      // console.log("asdad", this.uploadedFile);
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

      let batchLength = 20;

      const fileSize = files[0].size;

      const fileSizeInMB = Math.floor(fileSize / (1000 * 1000));

      if (fileSizeInMB > 15) {
        batchLength = 1;
      } else if (fileSizeInMB > 10) {
        batchLength = 5;
      } else if (fileSizeInMB > 5) {
        batchLength = 10;
      }

      try {
        this.uploadComplete = false;
        this.uploadStatusClass = "tw-h-0";
        this.uploading = true;
        this.showUploadingDialog = true;
        console.log("type", this.type);
        if (
          this.type === "metadata" &&
          !this.folderInfo.assets.baseURI &&
          !this.folderInfo.images.baseURI
        ) {
          throw new Error("Please upload Images in Asset Folder first");
        }

        if (
          this.type === "metadata" &&
          this.folderInfo.assets.files.length !== files.length &&
          this.folderInfo.images.files.length !== files.length
        ) {
          throw new Error(
            "Your metadata folder does not have same file length as Image Folder"
          );
        }

        const batchLoop = Math.ceil(files.length / batchLength);

        let responseCount = 0;
        let response = null;

        this.serverUploadPercent = 0;

        for (let i = 1; i <= batchLoop; i++) {
          const endIndex = i * batchLength;
          const startIndex = endIndex - batchLength;

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
            if (this.type === "images") {
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
            console.log("filee", file);
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
          console.log("form data", formData);
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

          uploadSocketState.totalFiles = this.uploadedFile
            ? this.uploadedFile.length
            : this.CSVLength;

          uploadSocketState.uploading = true;

          this.showUploadingDialog = false;
        } else {
          throw new Error("Transaction Not Successful");
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
};
</script>
