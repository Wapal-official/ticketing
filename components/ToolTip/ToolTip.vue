<template>
  <v-tooltip :color="defaultTheme.dark9" top>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot name="text"> </slot>
      </div>
    </template>
    <slot name="tip"> </slot>
  </v-tooltip>
</template>
<script lang="ts">
import { defaultTheme } from "@/theme/wapaltheme";
export default {
  data() {
    return {
      defaultTheme,
    };
  },
};
</script>
