<template>
  <div>
    <v-dialog
      v-model="whatsNewDialog"
      :fullscreen="isMobileSize"
      :scrim="false"
      width="1000"
      scrollable
      persistent
      overlay-color="icon"
      :overlay-opacity="0.6"
    >
      <v-card class=" " style="overflow: hidden; background-color: #101113">
        <v-row
          class="tw-px-3 tw-py-3"
          align="center"
          justify="center"
          no-gutters
          style="max-height: 60px !important"
        >
          <v-col cols="6">
            <div class=" ">
              <p class="tw-mb-0" style="margin-bottom: 0 !important">
                What’s New!
              </p>
            </div>
          </v-col>
          <v-col cols="6" class="d-flex align-center justify-end">
            <v-icon
              class="mdi mdi-close"
              color="white"
              @click="$store.commit('dialog/setWhatsNew', false)"
            >
            </v-icon>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row no-gutters>
          <v-col cols="3" class=" ">
            <v-navigation-drawer
              v-model="whatsNewDrawer"
              :key="whatsNewDrawer"
              permanent
              color="#101113"
              height="600"
            >
              <v-list class="side-list" dense nav>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="activateItem(item, index)"
                  :class="{ 'active-item': activeIndex === index }"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col
            cols="9"
            align="center"
            style="max-height: 85vh; overflow: auto"
          >
            <div v-if="inscriptions == true">
              <new-inscriptions />
            </div>
            <div v-if="yoyo == true">
              <LandingWhatsNewSectionsYoloBuy />
            </div>
            <div v-if="trait == true">
              <LandingWhatsNewSectionsTraiteBids />
            </div>
            <div v-if="offer == true">
              <LandingWhatsNewSectionsOfferSystem />
            </div>
            <div v-if="alert == true">
              <LandingWhatsNewSectionsAlertTypes />
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { get } from "aptos";
import NewInscriptions from "@/components/Landing/WhatsNew/sections/inscriptions.vue";

export default {
  components: { NewInscriptions },
  data: () => ({
    activeIndex: 0,
    whatsNewDrawer: false,
    items: [
      "Inscriptions",
      "YOLO Buy",
      "Trait Bids",
      "New Offer System",
      "New Alert Types",
    ],
    inscriptions: true,
    yoyo: false,
    trait: false,
    offer: false,
    alert: false,
  }),
  watch: {
    whatsNewDialog(newVal) {
      if (newVal == true) {
        this.whatsNewDrawer = true;
        this.activeIndex = 0;
      }
    },
  },
  computed: {
    isMobileSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return true;
      } else {
        return false;
      }
    },
    whatsNewDialog: {
      get() {
        return this.$store.state.dialog.isWhatsNew;
      },
      set(value) {
        return this.$store.commit("dialog/setWhatsNew", value);
      },
    },
  },

  methods: {
    closeDialogAndForceUpdate() {
      this.whatsNewDrawer = false;
      this.$forceUpdate();
    },
    activateItem(item, index) {
      this.activeIndex = index;
      if (item == "Inscriptions") {
        this.inscriptions = true;
        this.yoyo = false;
        this.trait = false;
        this.offer = false;
        this.alert = false;
      } else if (item == "YOLO Buy") {
        this.inscriptions = false;
        this.yoyo = true;
        this.trait = false;
        this.offer = false;
        this.alert = false;
      } else if (item == "Trait Bids") {
        this.inscriptions = false;
        this.yoyo = false;
        this.trait = true;
        this.offer = false;
        this.alert = false;
      } else if (item == "New Offer System") {
        this.inscriptions = false;
        this.yoyo = false;
        this.trait = false;
        this.offer = true;
        this.alert = false;
      } else if (item == "New Alert Types") {
        this.inscriptions = false;
        this.yoyo = false;
        this.trait = false;
        this.offer = false;
        this.alert = true;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.side-list div {
  cursor: pointer;
}

.active-item {
  background-color: #8759ff;
  color: #ffffff;
}
</style>
