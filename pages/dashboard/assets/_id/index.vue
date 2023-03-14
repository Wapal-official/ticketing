<template>
  <div
    class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4"
  >
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumb !tw-text-base">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="tw-flex tw-flex-row tw-flex-wrap tw-gap-4">
      <NuxtLink
        class="tw-bg-wapal-gray tw-px-4 tw-py-2 !tw-text-black tw-rounded-sm tw-flex tw-flex-row tw-items-center tw-gap-8 tw-transition-all tw-duration-150 tw-ease-linear hover:tw-bg-gray-300"
        v-for="folder in folders"
        :key="folder"
        :to="`${$route.params.id}/${folder}`"
      >
        <div
          class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
        >
          <v-icon class="!tw-text-black">mdi-folder</v-icon>
          {{ folder }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts">
import { getFolderById } from "@/services/AssetsService";

export default {
  layout: "dashboard",
  data() {
    return {
      folders: ["assets", "metadata"],
      vault: null,
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
  async mounted() {
    const folderId = this.$route.params.id;
    const res = await getFolderById(folderId);

    this.vault = res.data;
  },
};
</script>
