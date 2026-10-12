import sharp from 'sharp';
import path from 'node:path';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);
  try {
    const thumbnailPath = path.join(
      'uploads',
      `${path.parse(req.file.filename || path.basename(req.file.path)).name}_thumb.png`
    );
    await sharp(req.file.path).resize(160, 160).png().toFile(thumbnailPath);
    next();
  } catch (error) {
    next(error);
  }
};
export {createThumbnail};
