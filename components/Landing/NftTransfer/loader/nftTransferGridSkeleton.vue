<template>
  <div>
    <v-row justify="center" no-gutters>
      <v-col
        v-for="(item, i) in cols"
        :key="i"
        class="nftTransfetGrid-col-styling tw-p-0"
        align="center"
      >
        <div
          style="
            border: 1px solid #5d5f65;
            max-width: 154px;
            max-height: 164px;
            border-radius: 4px;
          "
        >
          <v-col class="m-0 p-0">
            <skeleton-loader
              class="tw-mb-2"
              dynamicClass="rounde-lg"
              :height="120"
              :width="154"
            />
            <v-row no-gutters>
              <skeleton-loader
                class="tw-mb-2 ml-1"
                dynamicClass="rounde-lg"
                :height="15"
                :width="60"
              />
              <v-spacer></v-spacer>
              <skeleton-loader
                class="tw-mb-2 mr-1"
                dynamicClass="rounde-lg"
                :height="15"
                :width="60"
              />
            </v-row>
          </v-col>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import skeletonLoader from "~/components/Landing/NftTransfer/loader/skeleton.vue";

export default {
  components: {
    skeletonLoader,
  },

  props: {
    cols: {
      type: Number,
      default: 4,
    },
  },
};
</script>

<style scoped>
.nftTransfetGrid-col-styling {
  min-width: 156px !important;
  max-width: 156px !important;
  margin: 8px !important;
}
</style>
