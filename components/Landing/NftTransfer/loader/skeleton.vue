<template>
  <div>
    <v-card
      class="skeleton"
      :class="dynamicClass"
      :height="height"
      :width="width"
      :color="color"
      :elevation="elevation"
    >
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    dynamicClass: {
      type: String,
      default: "rounded-pill",
    },
    height: {
      type: Number,
      default: 15,
    },
    width: {
      type: Number,
      default: 100,
    },
    elevation: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "#383A3F",
      // default: "#C1C2C5",
    },
  },
};
</script>

<style>
:root {
  --loading-grey: #ededed;
}

.skeleton {
  background-color: var(--loading-grey);
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(123, 122, 122, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    var(--loading-grey);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
