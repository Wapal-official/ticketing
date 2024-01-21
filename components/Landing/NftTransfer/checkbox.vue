<template>
  <div>
    <div
      style="cursor: pointer"
      @click="$emit('click')"
      @change="$emit('change')"
    >
      <v-icon size="20" :color="color" :class="iconClass()">{{ icon }}</v-icon>
      <!-- <box-icon class="check-box" :color="color" :class="iconClass()" :type='type' :name='icon'></box-icon> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
  methods: {
    iconClass() {
      if (this.icon !== "") {
        return "";
      } else {
        return "checkbox-style";
      }
    },
  },
};
</script>

<style>
.checkbox-style {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #383a3f;
  background: #25262b;
}
</style>
