import colors from "vuetify/es5/util/colors";

const API_URL = process.env.API_URL;
const CANDY_MACHINE_ID = process.env.CANDY_MACHINE_ID;
const NETWORK = process.env.NETWORK;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const APTOS_API_KEY = process.env.APTOS_API_KEY;
const GRAPHQL_URL = process.env.GRAPHQL_URL;
const MARKETPLACE_API_URL = process.env.MARKETPLACE_API_URL;
let PROOF_API_URL = process.env.PROOF_API_URL;

const CANDY_MACHINE_V2 =
  "0x6547d9f1d481fdc21cd38c730c07974f2f61adb7063e76f9d9522ab91f090dac";
const CANDY_MACHINE_V1 =
  "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0";

const SEEDZ_CANDY_MACHINE =
  "0x2a0a53ec605a88e7eb7ad46b47bebbf5708cd6ae4bdd4812c8b9ed5779d4babd";

const GUI_CANDY_MACHINE =
  "0xf5be2c27aba7c90943ba5ca5d15571b756a564337e8ae78f6a64264123a02ebb";
const CELESTIAL_CANDY_MACHINE =
  "0xe5968b1c8966a2d2eaf10db480fc65d69a0f16935ec9810bc52ec14d893a62c";
const XENON_CANDY_MACHINE =
  "0x39445a0667ee9952535a956b60dee240d9184f9b336ccdf73db4228c63cd0c78";

const PID =
  "0xe743f11e73711a90bc76d5ed3df5a6d979a06b2fce194d8b0ca8faf697f4f5f4";

let MARKETPLACE_URL = "https://wapal.io";

let discordRedirectURI = "http://staging.wapal.io/discord/token";

if (API_URL.includes("staging")) {
  discordRedirectURI = "https://staging.wapal.io/discord/token";
  MARKETPLACE_URL = "https://staging-marketplace.wapal.io";
  PROOF_API_URL = API_URL;
} else {
  discordRedirectURI = "https://launchpad.wapal.io/discord/token";
  MARKETPLACE_URL = "https://wapal.io";
}

let NODE_URL = `https://aptos-${NETWORK}.nodereal.io/v1/${APTOS_API_KEY}/v1`;

if (NETWORK === "mainnet") {
  // NODE_URL = "https://fullnode.mainnet.wapal.io/v1";
  NODE_URL = `https://fullnode.mainnet.aptoslabs.com/v1`;
}

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: process.env.PORT,
    host: "0.0.0.0",
  },
  head: {
    title: "Leading NFT Launchpad on Aptos - Wapal",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Wapal is a No Code NFT Creator Studio on Aptos",
      },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "keywords",
        content: "Wapal, NFT, Creator Studio, Aptos, NFT Launchpad, No Code",
      },
      {
        name: "google-site-verification",
        content: "-gtqMmWvm6PvKy22HLrJtoQhJkE9_npEXhoOvbQGFU0",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/index.css",
    "@/assets/css/style.css",
    "boxicons/css/boxicons.min.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/shepherd.js", mode: "client" },
    "~/plugins/toast.ts",
    "~/plugins/directive.client.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxt/postcss8",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "cookie-universal-nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/moment",
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/css/vuetify-variable.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#8759FF",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    treeShake: true,
    defaultAssets: {
      font: {
        family: "Inter",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate"],
    babel: {
      plugins: ["@babel/plugin-proposal-optional-chaining"],
    },
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-optional-chaining"],
        },
      });
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  axios: { baseURL: API_URL },
  env: {
    baseURL: API_URL,
    CANDY_MACHINE_ID: CANDY_MACHINE_ID,
    NETWORK: NETWORK,
    DISCORD_CLIENT_ID: DISCORD_CLIENT_ID,
    PID: PID,
    GRAPHQL_URL: GRAPHQL_URL,
    CANDY_MACHINE_V2: CANDY_MACHINE_V2,
    NODE_URL: NODE_URL,
    CANDY_MACHINE_V1: CANDY_MACHINE_V1,
    MARKETPLACE_URL: MARKETPLACE_URL,
    SEEDZ_CANDY_MACHINE: SEEDZ_CANDY_MACHINE,
    MARKETPLACE_API_URL: MARKETPLACE_API_URL,
    GUI_CANDY_MACHINE: GUI_CANDY_MACHINE,
    CELESTIAL_CANDY_MACHINE: CELESTIAL_CANDY_MACHINE,
    PROOF_API_URL: PROOF_API_URL,
    DISCORD_CLIENT_SECRET: DISCORD_CLIENT_SECRET,
    XENON_CANDY_MACHINE: XENON_CANDY_MACHINE,
  },
  auth: {
    strategies: {
      discord: {
        scheme: "oauth2",
        clientId: DISCORD_CLIENT_ID,
        scope: ["identify", "email", "guilds", "guilds.members.read"],
        endpoints: {
          authorization: "https://discord.com/oauth2/authorize",
          token: "https://discord.com/api/oauth2/token",
          userInfo: "https://discord.com/api/users/@me",
        },
        redirect_uri: discordRedirectURI,
        redirectUri: discordRedirectURI,
        fetchUser: false,
      },
    },
  },
};
