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
            <img
              :src="item.image ? item.image : item.src"
              :alt="item.name"
              class="tw-w-[45px] tw-h-[45px] tw-object-cover"
              v-if="$route.params.type === 'assets'"
            />{{ item.name }}
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
          class: "!tw-text-white !tw-border-b-wapal-pink",
        },
        {
          text: "Date Created",
          align: "start",
          sortable: true,
          value: "createdDate",
          width: "200px",
          class: "!tw-text-white !tw-border-b-wapal-pink",
        },
        {
          text: "Size",
          align: "start",
          sortable: true,
          value: "size",
          width: "200px",
          class: "!tw-text-white !tw-border-b-wapal-pink",
        },
      ],
    };
  },
  methods: {
    getFileSize(size: number) {
      if (size / 1048576 > 1) {
        return (size / 1048576).toFixed(2) + " MB";
      }
      return (size / 1024).toFixed(2) + " KB";
    },
  },
  watch: {
    paginatedFiles(paginatedFiles: any) {
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
