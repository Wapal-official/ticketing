import { checkImageExtension } from "@/utils/extensionChecker";

export const getCachedUrlOfImage = (url: any) => {
  if (checkImageExtension(url)) {
    return `https://media.wapal.io/api/cache?l=${url}`;
  }

  return url;
};

export const checkIfImageIsFromCacheServer = (url: any) => {
  const cacheServerRegex = /https:\/\/media\.wapal\.io\/api\/cache/;

  return cacheServerRegex.test(url);
};

export const extractImageLinkFromCacheServerUrl = (url: any | URL) => {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  const link = params.get("l");

  return link;
};

export const getUncachedImageLink = (url: any | URL) => {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  const link = params.get("l");

  if (!link) {
    return url;
  }

  const uncachedLink: string = getUncachedImageLink(link);

  return uncachedLink;
};
