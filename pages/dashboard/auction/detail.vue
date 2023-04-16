<template>
    <div>
      <v-container>
        <v-row>
          <v-col cols="5">
            <v-img
              :src="require('~/assets/img/6195.png')"
              max-width="400"
              height="400"
              class="theme-border"
            ></v-img>
            <p class="text-h6 theme-text">Auction end in 12H 5M 36S</p>
          </v-col>
          <v-col cols="7">
            <v-card color="#001233">
              <v-col>
                <v-row no-gutters>
                  <v-btn outlined x-small color="#EA59BE" tile>Doxxed</v-btn>
                </v-row>
                <p class="text-h4 mt-2">PONTEM SPACE PIRATES</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum a rhoncus augue. Phasellus egestas varius ex, vitae
                  egestas velit aliquet sed.
                </p>
                <v-card color="#0C224B" class="mb-2">
                  <v-list-item>
                    <v-list-item-content>
                      <V-list-item-subtitle
                        ><small>Current Bid</small></V-list-item-subtitle
                      >
                      <v-list-item-title>2.50 APT</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn color="#FF36AB" class="text-capitalized"
                        >Place your bid</v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </v-card>
                <p class="mb-0 mt-5 theme-text">Last Bid</p>
                <v-list dense style="background-color: transparent">
                  <v-list-item v-for="(item, i) in bids" :key="i">
                    <v-list-item-content>
                      <v-list-item-subtitle
                        >{{ item.address }} bid for
                        {{ item.amount }} APT</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        ><small>25 mins ago</small></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        bids: [
          { address: "0xf87....ft", amount: "2.50" },
          { address: "0xf4r....f5", amount: "1.50" },
          { address: "0xf44....jn", amount: "1.50" },
          { address: "0xuf7....e4", amount: "1.25" },
          { address: "0xir8....mn", amount: "2.0" },
        ],
      };
    },
  };
  </script>
  <style>
  .theme-border {
    border: 2px solid rgb(250, 8, 222);
  }
  .theme-text {
    color: #ff36ab;
  }
  </style>