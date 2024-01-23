export const checkImageExtension = (filename: any) => {
  const extensionRegex = /\.(png|jpe?g)$/i;

  return extensionRegex.test(filename);
};
