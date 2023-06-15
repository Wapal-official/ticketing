<template>
  <div class="tw-w-screen tw-h-screen">
    <loading />
  </div>
</template>
<script lang="ts">
import Loading from "@/components/Reusable/Loading.vue";
import axios from "axios";
export default {
  components: { Loading },
  async asyncData({
    $config,
    query,
    $auth,
  }: {
    $config: any;
    query: any;
    $auth: any;
  }) {
    let close = false;
    try {
      const discordOptions = $auth.strategies.discord.options;

      const DISCORD_CLIENT_SECRET = $config.DISCORD_CLIENT_SECRET;

      const data = {
        client_id: process.env.DISCORD_CLIENT_ID
          ? process.env.DISCORD_CLIENT_ID
          : "",
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: query.code,
        redirect_uri: discordOptions.redirectUri,
        scope: discordOptions.scope.join(" "),
      };

      const postData = new URLSearchParams(data);

      const res = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        postData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const resData = res.data;
      if (res.data.access_token) {
        close = true;

        return { close, resData };
      }

      return { close };
    } catch (error) {
      console.log(error);
      close = true;
      return { close };
    }
  },
  async mounted() {
    if (this.resData) {
      this.$store.dispatch(
        "discordStore/setDiscordToken",
        `${this.resData.token_type} ${this.resData.access_token}`
      );
    }
    if (this.close) {
      window.close();
    }
  },
};
</script>
