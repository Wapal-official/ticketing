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
            <v-card color="#001233" class="pa-5">
                <v-container>
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
                <v-card color="#0C224B" class="mb-2 pa-4">
                    <h3 class="theme-text ml-3">Create Auction</h3>

                  <v-container>
                    <v-row>
                        <v-col cols="12" lg="6" md="6">
                            <label for="startTime">Start Time</label>
                            <v-text-field outlined placeholder="MM/DD/YYYY" dense></v-text-field>
                            <label for="startTime">Min Bid Amount</label>
                            <v-text-field outlined placeholder="eg: 1.5 APT" dense></v-text-field>
                            <v-btn color="#FF36AB" class="text-capitalized"
                        >Add to Auction</v-btn
                      >
                        </v-col>
                        <v-col cols="12" lg="6" md="6">
                            <label for="startTime">End Time</label>
                            <v-text-field outlined placeholder="MM/DD/YYYY" dense></v-text-field>
                        </v-col>
                    </v-row>
                  </v-container>
                </v-card>
                
              </v-col>
                </v-container>
              
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