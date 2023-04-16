<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="(item, i) in 4" :key="i" cols="12" lg="3" md="6">
          <v-card
            tile
            style="border: 1px solid rgba(255, 54, 171, 0.5)"
            @click="$router.push('/dashboard/auction/detail')"
          >
            <v-img :src="require('~/assets/img/921.png')"></v-img>
            <h4 class="ma-2">Name of Nft</h4>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>