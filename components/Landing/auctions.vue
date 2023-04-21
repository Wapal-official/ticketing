<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col v-for="(item, i) in auctions" :key="i" cols="12" lg="3" md="6">
          <AuctionCard :auction="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    auctions: {
      Type: Array,
      required: true,
    },
  },
};
</script>
