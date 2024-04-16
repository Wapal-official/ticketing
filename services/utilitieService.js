import axios from "axios";

const checkImageExtension = (filename) => {
  const extensionRegex = /\.(png|jpe?g)$/i;

  return extensionRegex.test(filename);
};

export const getCachedUrlOfImage = (url) => {
  if (checkImageExtension(url)) {
    return `https://aggregator-cache.wapal.io/api/cache?l=${url}`;
  }

  return url;
};

export const checkIfImageIsFromCacheServer = (url) => {
  const cacheServerRegex = /https:\/\/aggregator-cache\.wapal\.io\/api\/cache/;

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

export var resolveUri = async (uri, key) => {
  try {
    if (uri.slice(0, 7) == "ipfs://") {
      uri = `https://ipfs.wapal.io/ipfs/${uri.slice(7)}`;
    }

    let resp;
    try {
      if (uri.match(/\.(png|jpe?g|gif|webp)$/i)) {
        return uri;
      }

      resp = await axios.get(uri, { timeout: 15000 }).catch((err) => {
        console.log(err);
        console.log(err.response);
      });

      if (
        !resp.headers["content-type"].match(/application\/json/) &&
        !resp.headers["content-type"].match(/text\/plain/)
      ) {
        return uri;
      }
    } catch (e) {
      console.log(e);
      resp = { data: { name: "", image: "", attributes: [] } };
    }
    if (resp?.data.name || resp.data.image) {
      switch (key) {
        case "all":
          let allImageUri = resp.data.image;
          if (allImageUri.slice(0, 7) == "ipfs://") {
            allImageUri = `https://ipfs.wapal.io/ipfs/${allImageUri.slice(7)}`;
          }

          resp.data.image = allImageUri;

          return resp.data;
          break;
        case "name":
          return resp.data.name;
          break;
        case "image":
          let imageUri = resp.data.image;
          if (imageUri.slice(0, 7) == "ipfs://") {
            imageUri = `https://ipfs.wapal.io/ipfs/${imageUri.slice(7)}`;
          }
          return imageUri;
          break;
        case "attributes":
          return resp.data.attributes;
          break;
        default:
          return resp.data;
      }
    } else {
      return "";
    }
  } catch (e) {
    console.log(e);
  }
};
