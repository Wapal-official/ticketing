import colors from "vuetify/es5/util/colors";

const API_URL = process.env.API_URL;
const CANDY_MACHINE_ID = process.env.CANDY_MACHINE_ID;
const NETWORK = process.env.NETWORK;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const APTOS_API_KEY = process.env.APTOS_API_KEY;
const PID = process.env.PID;
const GRAPHQL_URL = process.env.GRAPHQL_URL;
const CANDY_MACHINE_V2 = process.env.CANDY_MACHINE_V2;
const CANDY_MACHINE_V1 = "0x25d440284ca6c13afadb0e83ff1bccacbaa75175551111d8b7cb5d2854e708f0";

let discordRedirectURI = "http://staging.wapal.io/discord/token";

if (API_URL.includes("staging")) {
  discordRedirectURI = "https://staging.wapal.io/discord/token";
} else {
  discordRedirectURI = "https://wapal.io/discord/token";
}

let NODE_URL = `https://aptos-${NETWORK}.nodereal.io/v1/${APTOS_API_KEY}/v1`;

if (NETWORK === "mainnet") {
  NODE_URL = "https://fullnode.mainnet.wapal.io/v1";
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: process.env.PORT,
    host: "0.0.0.0",
  },
  head: {
    title: "Wapal | No Code NFT Creator Studio on Aptos",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
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
  css: ["@/assets/css/index.css", "@/assets/css/style.css", 'boxicons/css/boxicons.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [  { src: '~/plugins/shepherd.js', mode: 'client' },
    "~/plugins/toast.ts"],

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
          primary: colors.blue.darken2,
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
    CANDY_MACHINE_V2:CANDY_MACHINE_V2,
    NODE_URL:NODE_URL,
    CANDY_MACHINE_V1:CANDY_MACHINE_V1,
  },
  privateRuntimeConfig:{
    DISCORD_CLIENT_SECRET:DISCORD_CLIENT_SECRET,
  },
  auth: {
    strategies: {
      discord: {
        scheme: "oauth2",
        clientId: DISCORD_CLIENT_ID,
        scope: [
          "identify",
          "email",
          "connections",
          "guilds",
          "guilds.members.read",
        ],
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
