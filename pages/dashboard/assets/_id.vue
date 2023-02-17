<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4">
    <assets-bread-crumbs :folderName="folderName" />
  </div>
</template>
<script lang="ts">
import AssetsBreadCrumbs from "@/components/Dashboard/Assets/AssetsBreadCrumbs.vue";
export default {
  layout: "dashboard",
  components: { AssetsBreadCrumbs },
  data() {
    return { folderName: "Assets" };
  },
  mounted() {},
};
</script>
