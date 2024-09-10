import Vue from "vue";
// import * as VueGoogleMaps from "~/node_modules/vue2-google-maps";
import * as VueGoogleMaps from "vue2-google-maps";
const MAP_KEY = process.env.MAP_KEY;

Vue.use(VueGoogleMaps, {
  load: {
    key: MAP_KEY,
    libraries: "places",
  },
  installComponents: true,
});
