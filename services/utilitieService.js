
const checkImageExtension = (filename) => {
    const extensionRegex = /\.(png|jpe?g)$/i;
  
    return extensionRegex.test(filename);
  };

export const getCachedUrlOfImage = (url) => {
  if (checkImageExtension(url)) {
    return `https://cache.wapal.io/api/cache?l=${url}`;
  }

  return url;
};

export const checkIfImageIsFromCacheServer = (url) => {
  const cacheServerRegex = /https:\/\/cache\.wapal\.io\/api\/cache/;

  return cacheServerRegex.test(url);
};

export const extractImageLinkFromCacheServerUrl = (url) => {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  const link = params.get("l");

  return link;
};
