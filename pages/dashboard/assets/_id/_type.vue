<template>
  <div>
    <div
      class="tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-4 md:tw-flex-row md:tw-items-center"
      v-if="
        type === 'metadata' &&
        folderInfo.metadata.files.length === 0 &&
        !loading &&
        checkImageUploaded
      "
    >
      <button-primary
        @click="showCSVUploadModal = true"
        title="Import CSV"
        :bordered="true"
      />

      <a
        href="https://drive.google.com/uc?export=download&id=1W_wClJhifo6l_FyzfjaJMZNb1IV1Ptu_"
        download="Self_generative_metadata_sample_Sample_Metadata_Generation"
        class="tw-rounded-md !tw-text-white tw-px-6 tw-py-2.5 tw-box-border tw-font-normal tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-2 tw-text-sm '!tw-border-solid tw-border tw-border-dark-4 tw-bg-transparent tw-py-2' disabled:tw-cursor-not-allowed"
      >
        <span> Sample CSV</span>
        <i class="bx bxs-download"></i>
      </a>
    </div>
    <div
      class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-w-full tw-relative"
      v-if="!loading"
    >
      <div
        class="tw-flex tw-flex-col-reverse tw-items-start tw-justify-start tw-gap-4 tw-rounded tw-px-4 tw-py-4 md:tw-flex-row md:tw-items-center md:tw-justify-between tw-w-full lg:tw-px-0"
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
          <!-- <button-primary
            title="Set Metadata"
            @click="showSetMetadataDialog = true"
            :bordered="true"
            v-if="showSetMetadataButton || showSetMetadataButtonFromStore"
          /> -->
          <button>
            <v-icon class="!tw-text-white" @click="showListView"
              >mdi-view-list</v-icon
            >
            <v-icon class="!tw-text-white tw-ml-2" @click="showGridView"
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
          <dashboard-assets-image-gallery
            v-if="!listView"
            :paginatedFiles="paginatedFiles"
            :type="$route.params.type"
            :extension="fileExtension"
            :folderName="folderInfo.folder_name"
            @displayFileDetails="displayFileDetails"
          />
          <dashboard-assets-table :paginatedFiles="paginatedFiles" v-else />
        </div>
      </div>
      <v-dialog
        v-model="showFileDetails"
        content-class="!tw-w-full !tw-mx-2 !tw-rounded-none md:!tw-mx-auto md:!tw-w-1/2 md:!tw-border-t-primary-1 md:!tw-border-b-primary-1 lg:!tw-w-[40%]"
      >
        <assets-image-details
          :file="currentFile"
          :extension="this.fileExtension"
          @close="showFileDetails = false"
        />
      </v-dialog>
      <dashboard-assets-file-uploader
        v-if="!fileLoading && !folderInfo.files[0] && checkImageUploaded"
        :folderInfo="folderInfo"
        :type="type"
      />
      <div
        class="tw-text-dark-0 tw-text-center tw-text-lg tw-w-full"
        v-if="!checkImageUploaded"
      >
        Please Upload Images in image folder first
      </div>
    </div>
    <div
      class="tw-py-16 tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center"
      v-if="!loading"
    >
      <v-card
        color="transparent"
        v-intersect="{
          handler: mapFiles,
          options: {
            threshold: [0, 0.5, 1],
          },
        }"
        class="!tw-shadow-none"
        v-if="!end"
      >
      </v-card>
      <reusable-loading v-if="mappingFiles" />
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
    <v-dialog
      v-model="showCSVUploadModal"
      content-class="!tw-w-full tw-relative tw-mx-4 tw-px-8 tw-py-4 tw-bg-dark-7 tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:!tw-w-1/2 lg:!tw-w-[30%]"
    >
      <dashboard-assets-import-CSV-modal
        :assetLength="folderInfo.assets.files.length"
        :folderName="folderInfo.folder_name"
        @csvUploaded="completeTransactionForMetadataUpload"
        @closeImportCSVModal="showCSVUploadModal = false"
      />
    </v-dialog>
    <v-dialog
      v-model="showSetMetadataDialog"
      content-class="!tw-w-full tw-relative tw-mx-4 tw-px-8 tw-py-4 tw-bg-dark-7 tw-border-none tw-text-white tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 md:!tw-w-1/2 lg:!tw-w-[30%]"
      :persistent="generatingMetadata"
    >
      <div
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
      >
        <div>Are you sure you want to set Metadata?</div>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-4"
        >
          <button-primary
            title="Yes"
            @click="sendFolderNameToGenerateMetadata"
            :loading="generatingMetadata"
          />
          <button-primary
            title="No"
            :bordered="true"
            @click="showSetMetadataDialog = false"
          />
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import AssetsBreadCrumbs from "@/components/Dashboard/Assets/AssetsBreadCrumbs.vue";
import AssetsImageDetails from "@/components/Dashboard/Assets/AssetsImageDetails.vue";
import UploadIcon from "@/assets/img/upload-icon.svg";
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
import {
  folderUpload,
  getFolderById,
  deleteFolderOnServer,
  generateMetadataFolderInServer,
} from "@/services/AssetsService";
import { defaultTheme } from "@/theme/wapaltheme";
import moment from "moment";
import { socket, uploadSocketState } from "@/sockets/socket";
export default {
  layout: "dashboard",
  components: {
    AssetsBreadCrumbs,
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
        metadata: { files: [] },
        assets: { files: [] },
      },
      paginatedFiles: [
        { createdDate: null, type: "", name: "", src: "", _id: null },
      ],
      showFileDetails: false,
      listView: false,
      image: false,
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
      assetLimit: 0,
      showCSVUploadModal: false,
      CSVLength: 0,
      end: false,
      page: 0,
      debounce: null,
      fileExtension: "",
      showSetMetadataDialog: false,
      generatingMetadata: false,
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
    getFileType(item: any) {
      if (item.type.includes("image/")) {
        return true;
      }
      return false;
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
      this.folderInfo.traits = res.data.folderInfo.traits;

      this.loading = false;

      const fileCheck =
        this.type === "assets"
          ? !res.data.folderInfo.assets.files[0]
          : !res.data.folderInfo.metadata.files[0];

      if (fileCheck) {
        this.fileLoading = false;
      }

      if (
        this.type === "assets" &&
        res.data.folderInfo.assets.files.length > 0
      ) {
        this.fileExtension = res.data.folderInfo.assets.ext;
      } else if (this.type === "metadata") {
        this.fileExtension = ".json";
      }

      this.checkIfUserGeneratedMetadataIsAlreadyUploaded();
    },
    async mapFiles() {
      this.mappingFiles = true;
      clearTimeout(this.debounce);

      this.debounce = setTimeout(async () => {
        this.page++;
        const scrollNumber = this.page * this.assetLimit;
        this.paginatedFiles = [];

        if (scrollNumber > this.folderInfo.files.length) {
          this.end = true;
        }

        let tempFiles = [];
        tempFiles = this.folderInfo.files.slice(
          scrollNumber - this.assetLimit,
          scrollNumber
        );
        const mappedFiles = await Promise.all(
          tempFiles.map(async (file: any, index: number) => {
            try {
              let src = null;

              const fileIndex = scrollNumber
                ? scrollNumber - this.assetLimit + index
                : index;

              if (this.folderInfo.metadata.baseURI) {
                src = `${this.folderInfo.metadata.baseURI}${fileIndex}.json`;
              } else {
                src = `${this.folderInfo.assets.baseURI}${fileIndex}${this.folderInfo.assets.ext}`;
              }

              const res = await this.$axios.get(src);

              const tempFile = res.data;

              let fileType = "image";
              let generatedFile = null;

              if (
                res.headers["content-type"] ===
                "application/json; charset=utf-8"
              ) {
                fileType = "json";
              }

              if (fileType === "json" && this.type === "assets") {
                const createdDate = this.folderInfo.createdDate
                  ? this.folderInfo.createdDate
                  : moment().format("DD/MM/YYYY");

                generatedFile = {
                  _id: fileIndex,
                  name: tempFile.name,
                  src: src,
                  type: res.headers["content-type"],
                  createdDate: createdDate,
                  size: res.headers["content-length"],
                  image: tempFile.image,
                };
              } else {
                const createdDate = moment().format("DD/MM/YYYY");

                if (
                  this.folderInfo.metadata.files.length === 0 &&
                  this.folderInfo.traits &&
                  this.folderInfo.traits[index] &&
                  this.folderInfo.traits[index].metadata
                ) {
                  const metadata = this.folderInfo.traits[index].metadata;
                  generatedFile = {
                    _id: fileIndex,
                    name: metadata.name,
                    src: src,
                    type: res.headers["content-type"],
                    createdDate: createdDate,
                    size: res.headers["content-length"],
                    metadata: metadata,
                  };
                } else {
                  generatedFile = {
                    _id: fileIndex,
                    name: fileIndex.toString(),
                    src: src,
                    type: res.headers["content-type"],
                    createdDate: createdDate,
                    size: res.headers["content-length"],
                  };
                }
              }

              return generatedFile;
            } catch (error) {
              console.log(error);
            }
          })
        );

        mappedFiles.sort((a: any, b: any) => {
          return a._id - b._id;
        });
        this.paginatedFiles.push(...mappedFiles);

        this.mappingFiles = false;
      }, 1000);
    },
    async transferFund(newFolder: any, isMetadata: boolean) {
      try {
        this.uploadComplete = true;

        this.balanceNotEnoughError = await this.$store.dispatch(
          "walletStore/checkBalanceForFolderUpload"
        );

        const transaction = await this.$store.dispatch(
          "walletStore/signTransactionForUploadingFolder",
          this.balanceNotEnoughError.requiredBalance
        );

        if (transaction.success || transaction.hash) {
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
            isMetadata ? "metadata" : this.type
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
        this.generatingMetadata = false;
        const res = await deleteFolderOnServer(
          this.$store.state.userStore.user.user_id
        );
      }
    },
    completeTransactionForMetadataUpload(csvLength: number) {
      this.showCSVUploadModal = false;

      this.CSVLength = csvLength;

      this.transferFund(`uploads/${this.$store.state.userStore.user.user_id}`);
    },
    showListView() {
      this.listView = true;

      this.fileIndex = 0;
      this.scrolledNumber = 1;
      this.page = 0;
      this.mapFiles();
    },
    showGridView() {
      this.listView = false;

      this.fileIndex = 0;
      this.scrolledNumber = 1;
      this.page = 0;
      this.mapFiles();
    },
    async sendFolderNameToGenerateMetadata() {
      try {
        this.generatingMetadata = true;
        await generateMetadataFolderInServer({
          folder_name: this.folderInfo.folder_name,
        });
        this.generatingMetadata = true;
        this.showSetMetadataDialog = false;

        this.transferFund(
          `uploads/${this.$store.state.userStore.user.user_id}`,
          true
        );
      } catch (error) {
        this.generatingMetadata = false;
        this.$toast.showMessage({ message: error, error: true });
      }
    },
    checkIfUserGeneratedMetadataIsAlreadyUploaded() {
      if (
        this.folderInfo.traits &&
        this.folderInfo.assets.files.length === this.folderInfo.traits.length &&
        this.folderInfo.assets.files.length !==
          this.folderInfo.metadata.files.length
      ) {
        this.$store.commit("asset/setShowMetadataButton", true);
      } else {
        this.$store.commit("asset/setShowMetadataButton", false);
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
            { text: this.type },
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
    showSetMetadataButton() {
      return (
        this.folderInfo.metadata.files.length === 0 &&
        this.folderInfo.assets.files.length > 0 &&
        this.folderInfo.traits.length === this.folderInfo.assets.files.length
      );
    },
    showSetMetadataButtonFromStore() {
      return this.$store.state.asset.showSetMetadataButton;
    },
  },
  async mounted() {
    socket.connect();
    this.type = this.$route.params.type;

    if (this.type !== "assets" && this.type !== "metadata") {
      throw { statusCode: 404, message: "Page not found" };
    }

    this.assetLimit = this.type === "assets" ? 12 : 48;

    await this.fetchFiles();

    await this.mapFiles();

    setTimeout(() => {
      if (this.type === "metadata") {
        this.mapFiles();
      }
    }, 5000);
  },
  watch: {
    checkUploadingStatus: async function (newValue: string) {
      if (newValue) {
        setTimeout(async () => {
          this.page = 0;
          await this.fetchFiles();
          await this.mapFiles();
        }, 1000);
      }
    },
  },
  cache: false,
};
</script>
