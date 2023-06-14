const api = (req: any, res: any) => {
  const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

  const referer = req.headers.referer ? req.headers.referer : "";

  const slicedReferer = `${referer.split("/")[0]}//${referer.split("/")[2]}`;

  const origin = slicedReferer;

  const allowedOrigins = ["https://staging.wapal.io", "http://localhost:3000"];

  if (!allowedOrigins.includes(origin)) {
    res.statusCode = 403;
    res.end("Error");
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(DISCORD_CLIENT_SECRET);

  return;
};

export default api;
