<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumb">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="css">
.v-application a {
  color: #fff;
}

.theme--dark.v-breadcrumbs .v-breadcrumbs__divider,
.theme--dark.v-breadcrumbs .v-breadcrumbs__item--disabled {
  @apply !tw-text-primary-1;
}

.v-breadcrumbs {
  padding-left: 0 !important;
}
</style>
