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
    <form @submit.prevent="" class="tw-w-full">
      <ValidationObserver
        class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-4 tw-h-[285px] tw-max-h-[285px] tw-overflow-y-auto tw-px-2 no-scrollbar md:tw-px-8"
        ref="metadataForm"
      >
        <h3>Token Details</h3>
        <ValidationProvider
          rules="required"
          name="name"
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
          v-slot="{ errors }"
        >
          <input-text-field
            label="Token Name"
            v-model="metadata.name"
            :required="true"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <ValidationProvider
          rules="required"
          name="description"
          class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
          v-slot="{ errors }"
        >
          <input-text-area
            label="Description"
            v-model="metadata.description"
            :required="true"
          />
          <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
        </ValidationProvider>
        <h3>Attributes</h3>
        <div
          class="tw-w-full tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-4"
          v-for="(attribute, index) in metadata.attributes"
          :key="index"
        >
          <div
            class="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-start md:tw-flex-row md:tw-justify-between tw-gap-4"
          >
            <ValidationProvider
              rules="required"
              name="traitType"
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
              v-slot="{ errors }"
            >
              <input-text-field
                label="Attribute Type"
                v-model="attribute.trait_type"
                :required="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              name="value"
              class="tw-flex tw-flex-col tw-items-start tw-justify-start tw-gap-2 tw-w-full"
              v-slot="{ errors }"
            >
              <input-text-field
                label="Value"
                v-model="attribute.value"
                :required="true"
              />
              <div class="tw-text-red-600 tw-text-sm">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <button aria-label="Delete Attribute" @click="deleteAttribute(index)">
            <i class="bx bxs-trash tw-text-dark-3 tw-text-lg tw-mt-10"></i>
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
      </ValidationObserver>
    </form>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";

export default {
  props: {
    image: { type: String },
  },
  components: { ValidationObserver, ValidationProvider },
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
    async saveMetadata() {
      try {
        const validated = await this.$refs.metadataForm.validate();

        if (!validated) {
          return;
        }

        this.saving = true;
      } catch (error) {
        this.saving = false;
      }
    },
  },
};
</script>
