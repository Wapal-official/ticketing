import colors from "vuetify/es5/util/colors";

const API_URL = process.env.API_URL;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const CANDY_MACHINE_ID = process.env.CANDY_MACHINE_ID;
const NETWORK = process.env.NETWORK;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const APTOS_API_KEY = process.env.APTOS_API_KEY;

let discordRedirectURI = "http://localhost:3000/discord/token";

// if (API_URL.includes("staging")) {
//   discordRedirectURI = "https://staging.wapal.io/discord/token";
// } else {
//   discordRedirectURI = "https://wapal.io/discord/token";
// }

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
  css: ["@/assets/css/index.css", "@/assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/toast.ts"],

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
  modules: ["cookie-universal-nuxt", "@nuxtjs/axios", "@nuxtjs/auth-next"],

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
        family: "Poppins",
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
    AWS_ACCESS_KEY: AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
    CANDY_MACHINE_ID: CANDY_MACHINE_ID,
    NETWORK: NETWORK,
    DISCORD_CLIENT_ID: DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: DISCORD_CLIENT_SECRET,
    APTOS_API_KEY: APTOS_API_KEY,
  },
  auth: {
    strategies: {
      discord: {
        scheme: "oauth2",
        clientId: DISCORD_CLIENT_ID,
        clientSecret: DISCORD_CLIENT_SECRET,
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
