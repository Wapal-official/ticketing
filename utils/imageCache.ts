import { checkImageExtension } from "@/utils/extensionChecker";

export const getCachedUrlOfImage = (url: any) => {
  if (checkImageExtension(url)) {
    return `https://aggregator-cache.wapal.io/api/cache?l=${url}`;
  }

  return url;
};

export const checkIfImageIsFromCacheServer = (url: any) => {
  const cacheServerRegex = /https:\/\/aggregator-cache\.wapal\.io\/api\/cache/;

  return cacheServerRegex.test(url);
};

export const extractImageLinkFromCacheServerUrl = (url: any | URL) => {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  const link = params.get("l");

  return link;
};
