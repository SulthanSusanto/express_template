import sharp from 'sharp';

const urlGenerator = (file) => {
  return `./images/${Date.now()}.${file.mimetype.split('/')[1]}`;
};
const resizeImage = async (inputFilePath, outputFilePath, size) => {
  await sharp(inputFilePath).resize(size).toFile(outputFilePath);
};

export default { urlGenerator, resizeImage };
