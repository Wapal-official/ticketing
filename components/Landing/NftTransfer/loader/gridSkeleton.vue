<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col
        v-for="(item, i) in cols"
        :key="i"
        class="grid-col-styling"
        align="center"
      >
        <div
          style="
            border: 1px solid #5d5f65;
            max-width: 178px;
            max-height: 278px;
            border-radius: 4px;
          "
        >
          <v-col class="ma-0 pa-0">
            <CustomLoaderSkeleton
              class="mb-2"
              dynamicClass="rounde-lg"
              :height="178"
              :width="178"
            />
            <CustomLoaderSkeleton
              class="my-2"
              dynamicClass="rounde-lg"
              :height="15"
              :width="140"
            />
            <v-row no-gutters>
              <CustomLoaderSkeleton
                class="mb-2 ml-1"
                dynamicClass="rounde-lg"
                :height="15"
                :width="70"
              />
              <v-spacer></v-spacer>
              <CustomLoaderSkeleton
                class="mb-2 mr-1"
                dynamicClass="rounde-lg"
                :height="15"
                :width="70"
              />
            </v-row>
            <v-row no-gutters>
              <CustomLoaderSkeleton
                class="mb-2 ml-1"
                dynamicClass="rounde-lg"
                :height="15"
                :width="70"
              />
              <v-spacer></v-spacer>
              <CustomLoaderSkeleton
                class="mb-2 mr-1"
                dynamicClass="rounde-lg"
                :height="15"
                :width="70"
              />
            </v-row>
          </v-col>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      default: 4,
    },
  },
};
</script>

<style>
.grid-col-styling {
  max-width: 178px !important;
  margin: 12px !important;
}
</style>
