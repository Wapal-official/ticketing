<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col v-for="(item, i) in auctions" :key="i" cols="12" lg="3" md="6">
          <AuctionCard :auction="item" />
        </v-col>
      </v-row>
      <v-row justify="end">
        <div @click="$router.push('auctions')">
          <gradient-border-button class="tw-mt-2 tw-self-end">
            View All
          </gradient-border-button>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GradientBorderButton from "@/components/Button/GradientBorderButton.vue";
export default {
  components: { GradientBorderButton },
  props: {
    auctions: {
      Type: Array,
      required: true,
    },
  },
};
</script>
