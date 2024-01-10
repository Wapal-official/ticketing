
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


export const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return price;
    }
  
    let formattedPrice = price / Math.pow(10, 8);
  
    if (formattedPrice - Math.floor(formattedPrice) !== 0) {
      formattedPrice = parseFloat(formattedPrice.toFixed(4));
    }
    return formattedPrice;
  };
