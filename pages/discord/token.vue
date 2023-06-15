<template>
  <div class="tw-w-screen tw-h-screen">
    <loading />
  </div>
</template>
<script lang="ts">
import Loading from "@/components/Reusable/Loading.vue";
export default {
  components: { Loading },
  async mounted() {
    try {
      const discordOptions = this.$auth.strategies.discord.options;

      const data = {
        client_id: process.env.DISCORD_CLIENT_ID
          ? process.env.DISCORD_CLIENT_ID
          : "",
        client_secret: process.env.DISCORD_CLIENT_SECRET
          ? process.env.DISCORD_CLIENT_SECRET
          : "",
        grant_type: "authorization_code",
        code: this.$route.query.code,
        redirect_uri: discordOptions.redirectUri,
        scope: discordOptions.scope.join(" "),
      };

      const postData = new URLSearchParams(data);

      const res = await this.$axios.post(
        "https://discord.com/api/v10/oauth2/token",
        postData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.data.access_token) {
        this.$store.dispatch(
          "discordStore/setDiscordToken",
          `${res.data.token_type} ${res.data.access_token}`
        );

        window.close();
      }
    } catch (error) {
      window.close();
    }
  },
};
</script>
