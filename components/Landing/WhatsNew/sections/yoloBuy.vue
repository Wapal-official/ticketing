<template>
  <div>
    <v-row class="tw-p-3" no-gutters>
      <v-col cols="12" align="center ">
        <h2
          class="tw-text-white tw-font-semibold tw-text-[1.375em] tw-pb-4 text-start"
        >
          Multiple Token Mint
        </h2>
      </v-col>
      <v-col cols="12" align="start" class="tw-ml-1">
        <p class="p">
          Wapal is the first launchpad on Aptos to enable multiple token mint.
          We currently have integrated the following:
        </p>
        <ol
          :start="startIndex"
          class="tw-pb-4"
          style="padding-left: 0 !important"
        >
          <li>1. $GUI</li>
          <li>2. $CLST</li>
          <li>3. $SEEDZ</li>
        </ol>
      </v-col>
      <v-col cols="12" align="start" class="tw-ml-1">
        <img
          class="whats-new-img"
          src="~/assets/img/whatsNew/multi-token.png"
          alt="multie coins"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startIndex: 1, // Set the start index here dynamically
    };
  },
};
</script>
<style>
.whats-new-img {
  max-width: 700px;
  width: 100%;
}
</style>
