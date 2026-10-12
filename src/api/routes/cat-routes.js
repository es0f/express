import express from 'express';
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
} from '../controller/cat-controller.js';
import {createThumbnail} from '../../middlewares/upload.js';
const router = express.Router();
router.get('/', getAllCats);
router.get('/:id', getCatById);
router.post('/', existingUpload, createThumbnail, createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);
export default router;
