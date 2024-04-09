<template>
  <v-data-table
    :headers="headers"
    :items="allFiles"
    :items-per-page="5"
    class="assets-data-table"
    mobile-breakpoint="0"
    :hide-default-footer="true"
    disable-pagination
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
            <div v-if="$route.params.type === 'assets'">
              <!-- <video-player-listed
                v-if="item.image && isVideo(item.image ? item.image : item.src)"
                :source="item.image ? item.image : item.src"
                style="max-width: 50px; height: 50px"
              />
              <utility-image
                v-else
                :source="item.image ? item.image : item.src"
                :alt="item.name"
                class="tw-w-[45px] tw-h-[45px] tw-object-cover"
              /> -->
              <video-player-listed
                v-if="isVideo(item.image ? item.image : item.src)"
                :source="item.image ? item.image : item.src"
                style="max-width: 50px; height: 50px"
              />
              <audio-player-list
                v-else-if="isAudio(item.src)"
                class="audio-list-bg-2"
                :audioSrc="item.src"
                iconSize="34"
                @click.prevent.stop="checkit()"
              ></audio-player-list>
              <utility-image
                v-else
                :source="item.image ? item.image : item.src"
                :alt="item.name"
                class="tw-w-[45px] tw-h-[45px] tw-object-cover"
              />
            </div>
            <div v-if="$route.params.type === 'images'">
              <utility-image
                :source="item.image ? item.image : item.src"
                :alt="item.name"
                class="tw-w-[45px] tw-h-[45px] tw-object-cover"
              />
            </div>

            {{ item.name }}
          </td>
          <td class="!tw-border-none">{{ item.createdDate }}</td>
          <td class="!tw-border-none">{{ getFileSize(item.size) }}</td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>
<script lang="ts">
export default {
  props: {
    paginatedFiles: { type: Array },
  },
  data() {
    return {
      allFiles: [],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
          width: "700px",
          class: "!tw-text-white !tw-border-b-primary-1",
        },
        {
          text: "Date Created",
          align: "start",
          sortable: true,
          value: "createdDate",
          width: "200px",
          class: "!tw-text-white !tw-border-b-primary-1",
        },
        {
          text: "Size",
          align: "start",
          sortable: true,
          value: "size",
          width: "200px",
          class: "!tw-text-white !tw-border-b-primary-1",
        },
      ],
    };
  },
  methods: {
    checkit() {},
    getFileSize(size: number) {
      if (size / 1048576 > 1) {
        return (size / 1048576).toFixed(2) + " MB";
      }
      return (size / 1024).toFixed(2) + " KB";
    },
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
    isVideo(source: string) {
      const extension = source.split(".").pop()?.toLowerCase();
      return extension
        ? [
            "mp4",
            "mkv",
            "m4v",
            "webm",
            "avi",
            "mov",
            "wmv",
            "flv",
            "3gp",
            "ogv",
            "mpeg",
            "mpg",
            "divx",
            "rm",
            "asf",
            "vob",
            "ts",
            "m2ts",
          ].includes(extension)
        : false;
    },
  },
  watch: {
    paginatedFiles(paginatedFiles: any) {
      console.log("check gr", paginatedFiles);
      this.allFiles.push(...paginatedFiles);
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
