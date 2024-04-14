<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
    v-if="!loading"
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
    <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-4">
      <NuxtLink
        class="tw-bg-dark-4 tw-px-4 tw-py-3 !tw-text-white tw-rounded tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-dark-5"
        v-for="folder in folders"
        :key="folder.name"
        :to="`${$route.params.id}/${folder.type}`"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <i class="bx bxs-folder tw-text-xl"></i>
          {{ folder.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
  <reusable-loading v-else />
</template>
<script lang="ts">
import { getFolderById } from "@/services/AssetsService";
export default {
  layout: "dashboard",
  data() {
    return {
      folders: [
        { name: "assets", type: "assets" },
        { name: "metadata", type: "metadata" },
      ],
      vault: null,
      loading: true,
    };
  },
  computed: {
    breadcrumbs() {
      return this.vault
        ? [
            { text: "Vaults", href: "/dashboard/assets" },
            { text: this.vault.folderInfo.folder_name },
          ]
        : [];
    },
  },
  methods: {
    isImage(source: string) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp",
            "svg",
            "ico",
            "tiff",
          ].includes(extension)
        : false;
    },
  },
  async mounted() {
    try {
      const folderId = this.$route.params.id;
      const res = await getFolderById(folderId);
      console.log("asdd", res);
      this.vault = res.data;

      const assetsType = res.data.folderInfo.assets.ext;

      const isImageType = this.isImage(assetsType);

      if (isImageType) {
        this.folders = [
          { name: "assets", type: "assets" },
          { name: "metadata", type: "metadata" },
        ];
      } else {
        this.folders = [
          { name: "assets", type: "assets" },
          { name: "images", type: "images" },
          { name: "metadata", type: "metadata" },
        ];
      }

      this.loading = false;
    } catch (error) {
      console.error("Error fetching folder data:", error);
      this.loading = false;
    }
  },
};
</script>
