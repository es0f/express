import express from 'express';
import multer from 'multer';
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
} from '../controller/cat-controller.js';
import {createThumbnail} from '../../middlewares/upload.js';
const upload = multer({dest: 'uploads/'});
const router = express.Router();
router.get('/', getAllCats);
router.get('/:id', getCatById);
router.post('/', upload.single('cat'), createThumbnail, createCat);
router.post('/', upload.single('cat'), createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);
export default router;
