<template>
  <div
    class="tw-text-white tw-bg-dark-9 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8 tw-py-2 md:tw-py-4"
  >
    <div
      class="tw-w-full tw-px-2 md:tw-px-8 tw-flex tw-flex-col tw-items-center tw-justify-center"
    >
      <img
        :src="image"
        alt="asset"
        width="300px"
        height="300px"
        class="tw-max-w-[300px] tw-max-h-[300px]"
      />
    </div>
    <form
      class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-h-[285px] tw-max-h-[285px] tw-overflow-y-auto tw-px-2 no-scrollbar md:tw-px-8"
      @submit.prevent=""
    >
      <h3>Token Details</h3>
      <input-text-field
        label="Token Name"
        :value="metadata.name"
        :required="true"
      />
      <input-text-area
        label="Description"
        :value="metadata.description"
        :required="true"
      />
      <h3>Attributes</h3>
      <div
        class="tw-w-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-gap-4"
        v-for="(attribute, index) in metadata.attributes"
        :key="index"
      >
        <div
          class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4"
        >
          <input-text-field
            label="Attribute Type"
            v-model="attribute.trait_type"
            :required="true"
          />
          <input-text-field
            label="Value"
            v-model="attribute.value"
            :required="true"
          />
        </div>
        <button aria-label="Delete Attribute" @click="deleteAttribute(index)">
          <i class="bx bxs-trash tw-text-dark-3 tw-text-lg tw-mt-9"></i>
        </button>
      </div>
      <button-primary
        title="Add Attribute"
        :bordered="true"
        @click="addAttribute"
      >
        <template #prepend-icon>
          <i class="bx bx-plus"></i>
        </template>
      </button-primary>
      <button-primary
        title="Save Changes"
        @click="saveMetadata"
        :loading="saving"
      />
    </form>
  </div>
</template>
<script>
export default {
  props: {
    image: { type: String },
  },
  data() {
    return {
      metadata: {
        name: "",
        description: "",
        attributes: [{ trait_type: "", value: "" }],
      },
      saving: false,
    };
  },
  methods: {
    addAttribute() {
      this.metadata.attributes.push({ trait_type: "", value: "" });
    },
    deleteAttribute(index) {
      this.metadata.attributes.splice(index, 1);
    },
    saveMetadata() {
      try {
        this.saving = true;
      } catch (error) {
        this.saving = false;
      }
    },
  },
};
</script>
