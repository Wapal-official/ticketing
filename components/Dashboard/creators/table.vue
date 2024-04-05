<template>
  <v-app class="table-container" style="height: auto; min-height: 0 !important">
    <table class="mx-lg-5 mx-md-5">
      <thead class="airdrop-head">
        <th class="py-2 px-2" v-for="(header, index) in headers" :key="index">
          <div
            class="text-center name-width"
            :class="headerAlign(header, index)"
          >
            {{ header.text }}
          </div>
        </th>
        <v-divider></v-divider>
      </thead>
      <tbody class="airdrop-body">
        <tr
          class="tr nthChild"
          v-for="(item, index2) in items"
          :key="index2"
          :class="checkBorder(index2, item)"
          @mouseenter="(hovered = item), checkBorder(item)"
          @mouseleave="(hovered = ''), checkBorder(item)"
          :id="
            observerIndex(index2)
              ? 'intersectionObserver'
              : index2 === items.length - 1
              ? 'lastIntersectionObserver'
              : null
          "
        >
          <td
            v-for="(column, columnIndex) in headers"
            :key="columnIndex"
            class="td px-0 py-3"
          >
            <div
              v-if="column.value === 'rank'"
              class="position"
              style="text-align: center !important"
            >
              {{ item.rank }}
            </div>
            <template v-else>
              <div
                v-if="column.nameCheck"
                class="text-center name-width"
                :class="nameClass(column, item, columnIndex)"
              >
                {{ getFormattedWalletAddress(item) }}
              </div>
              <div
                class="text-center name-width"
                :class="nameClass(column, item, columnIndex)"
                v-else
              >
                <span>
                  {{
                    getValue(column, item) !== null
                      ? getValue(column, item)
                      : "-"
                  }}
                </span>
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </v-app>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      intersectDebounce: null,
      observer: null,
      lastObserver: null,
    };
  },
  methods: {
    checkBorder(index, item) {
      if (item == this.hovered) {
        //   return "hovered";
      }
      if (index == 0) {
        return "ownTr";
      }
    },
    getValue(column, item) {
      let keys = Object.keys(item);
      let key = keys.find((keyItem) => keyItem == column.value);

      return item[key];
    },
    nameClass(column, item, columnIndex) {
      if (columnIndex == 1) {
        return "header-align-left text-start";
      }
    },
    headerAlign(header, index) {
      if (index == 1) {
        return "header-align-left text-start";
      }
    },
    observerIndex(index) {
      let indexerLimit = 11;

      if (this.items.length > 250) {
        indexerLimit = 250;
      }

      return index === this.items.length - indexerLimit;
    },
    createObserver() {
      if (this.observer) {
        this.observer.disconnect();
      }

      if (this.lastObserver) {
        this.lastObserver.disconnect();
      }

      const options = {
        threshold: [],
      };

      const intersectionObserver = document.querySelector(
        "#intersectionObserver"
      );

      const lastIntersectionObserver = document.querySelector(
        "#lastIntersectionObserver"
      );

      this.observer = new IntersectionObserver(this.handleIntersect, options);
      this.observer.observe(intersectionObserver);

      const lastIntersectionObserverOptions = {
        threshold: [],
      };

      this.lastObserver = new IntersectionObserver(
        this.handleIntersect,
        lastIntersectionObserverOptions
      );

      this.lastObserver.observe(lastIntersectionObserver);
    },
    handleIntersect(entries) {
      clearTimeout(this.intersectDebounce);
      this.intersectDebounce = setTimeout(() => {
        if (this.loaded) {
          this.observer.unobserve(entries[0].target);
          this.lastObserver.unobserve(entries[0].target);
          return;
        }
        if (entries[0].isIntersecting) {
          this.$emit("intersecting");
        }
      }, 300);
    },
    getFormattedWalletAddress(item) {
      if (item.dropName == this.walletAddress) {
        return "You";
      }

      if (!item.displayAddress) {
        return item.dropName.slice(0, 8);
      }

      if (item.is_wallet_address) {
        return item.displayAddress.slice(0, 8);
      } else {
        return item.displayAddress.length < 25
          ? item.displayAddress
          : item.displayAddress.slice(0, 25) + "...";
      }
    },
  },
  watch: {
    items(newVal) {
      setTimeout(() => {
        const intersectionObserver = document.querySelector(
          "#intersectionObserver"
        );
        if (intersectionObserver) {
          this.createObserver();
        }
      }, 800);
    },
  },
  computed: {
    walletAddress() {
      return this.$store.state.walletStore.wallet.walletAddress;
    },
  },
};
</script>

<style>
.airdrop-head th div {
  padding-top: 20px;
  padding-bottom: 12px;
  color: #909296;
  text-transform: uppercase;
  border-bottom: 1px solid #383a3f;
}

.airdrop-body tr td {
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #383a3f;
  font-family: "Inter-Regular", sans-serif !important;
}

.airdrop-body tr:last-child td {
  border-bottom: 1px solid transparent; /* No need for !important */
}

.airdrop-heading {
  font-size: 28px;
  color: #9d80ff;
}

.airdrop-heading-mobile {
  font-size: 24px;
  color: #9d80ff;
}

/* .ownTr {
  background: #383a3f !important;
} */

/* tr:nth-child(odd) {
  background-color: #141517;
}

tr:nth-child(even) {
  background-color: #1a1b1e;
} */

.tr {
  position: relative;
  padding: 0rem 0.75rem;
}

.name-width {
  min-width: 100px;
}

.table-container {
  overflow-x: auto;
}
.table-container .v-application--wrap {
  min-height: 0 !important;
}
.table-container table {
  background-color: #1a1b1e !important;
  border-radius: 8px !important;
}
</style>
