<template>
  <div>
    <v-row
      align="center"
      justify="space-between"
      no-gutters
      class="mt-4"
      style="border-bottom: 1px solid #383a3f"
    >
      <v-col cols="3" align="end">
        <!-- <v-img
          :src="require('@/assets/img/dialogs/nft1.svg')"
          width="100"
          height="100"
        ></v-img> -->
      </v-col>
      <v-col cols="6">
        <div>
          <label
            class="text-uppercase font-bold"
            for="amountInput"
            style="color: #c1c2c5"
            >Destination Address</label
          >
          <v-text-field
            placeholder="Enter wallet address"
            type="string"
            dense
            outlined
            class="custom-text-field mt-2"
          >
          </v-text-field>
        </div>
      </v-col>
      <v-col cols="3" class="d-flex align-center justify-center">
        <button-primary
          title="Send"
          :small="false"
          class="instance-sell"
          min-width="110px"
          style="width: 80%; max-width: 180px"
        >
        </button-primary>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
