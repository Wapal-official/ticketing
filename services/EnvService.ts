import envInterceptor from "@/services/EnvInterceptor";

export const getDiscordSecret = async () => {
  const res = await envInterceptor.get("/api/discord-secret");

  return res.data;
};
