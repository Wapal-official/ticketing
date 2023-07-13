<template>
  <div class="tw-w-full">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="dashboard-data-table"
      mobile-breakpoint="0"
      :hide-default-footer="true"
      disable-pagination
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            class="tw-cursor-pointer hover:!tw-bg-black/60"
            @click.self="$emit('rowClicked', item)"
          >
            <td
              class="!tw-border-b-dark-6 !tw-py-4 tw-font-medium !tw-text-base"
              v-for="(header, index) in headers"
              :key="index"
            >
              <div
                v-if="header.showSerialNumber && header.showImage"
                class="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-4"
              >
                {{ itemIndex + 1 }}.<img
                  :src="item.image"
                  :alt="item[header.value]"
                  :onerror="imageNotFound()"
                  class="tw-w-[64px] tw-h-[64px] tw-object-cover tw-rounded"
                />{{ item[header.value] }}
              </div>
              <div
                v-else-if="header.progress"
                class="tw-w-full tw-flex tw-flex-col tw-items-end tw-justify-end tw-gap-2"
              >
                <div class="tw-text-sm tw-text-white/70">
                  {{ item[header.value]["text"] }}
                </div>
                <div
                  class="tw-relative tw-w-full tw-rounded-full tw-h-2 tw-bg-white/20"
                >
                  <div
                    class="tw-absolute tw-top-0 tw-h-2 tw-rounded-full tw-bg-primary-1"
                    :style="`width:${item[header.value]['progressPercent']}%`"
                  ></div>
                </div>
              </div>
              <div
                v-else-if="header.showAptIcon"
                class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <span>{{ item[header.value] }}</span>
                <span v-if="item[header.value] !== 'TBD'">
                  <img :src="aptIcon" alt="apt"
                /></span>
              </div>
              <div
                v-else-if="header.showSocialLink"
                class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2"
              >
                <a :href="item.twitter" target="_blank" v-if="item.twitter">
                  <i
                    class="bx bxl-twitter tw-text-xl tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:tw-text-primary-1"
                  ></i
                ></a>
                <a :href="item.discord" target="_blank" v-if="item.discord">
                  <i
                    class="bx bxl-discord-alt tw-text-xl tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:tw-text-primary-1"
                  ></i
                ></a>
                <a :href="item.instagram" target="_blank" v-if="item.instagram">
                  <i
                    class="bx bxl-instagram tw-text-xl tw-text-white tw-transition-all tw-duration-200 tw-ease-linear hover:tw-text-primary-1"
                  ></i
                ></a>
              </div>
              <div v-else>{{ item[header.value] }}</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import aptIcon from "@/assets/img/aptBlack.svg";
import imageNotFound from "@/utils/imageNotFound";
export default {
  props: { headers: { type: Array }, items: { type: Array } },
  data() {
    return {
      aptIcon,
      imageNotFound,
    };
  },
};
</script>
<style>
.dashboard-data-table {
  min-width: 100% !important;
  max-width: 100% !important;
  overflow-x: auto !important;
  background: transparent !important;
}
</style>
