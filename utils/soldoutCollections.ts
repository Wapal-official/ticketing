export const checkIfCollectionIsSoldOut = (collection: any) => {
  switch (collection.username) {
    case "jewelry-animals":
      return {
        supply: 18,
      };
    case "boomers":
      return {
        supply: 6,
      };
    case "pixel-punks-dao":
      return {
        supply: 4,
      };
    case "homage-to-heritage-":
      return {
        supply: 24,
      };
    case "blue-bones":
      return {
        supply: 7,
      };
    case "mysterious-stroll-in-the-mist-hell":
      return {
        supply: 0,
      };
    case "mysterious-stroll-in-the-mist-hell5":
      return {
        supply: 0,
      };
    case "worldview-box":
      return {
        supply: 10,
      };
    case "for-world-peace!":
      return {
        supply: 1,
      };
    case "ghost-rider":
      return {
        supply: 12,
      };
    case "pixel-cat-walord":
      return {
        supply: 20,
      };

    default:
      return null;
  }
};
