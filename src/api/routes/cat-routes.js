import express from 'express';
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
} from '../controller/cat-controller.js';
const router = express.Router();
router.get('/', getAllCats);
router.get('/:id', getCatById);
router.post('/', createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);
export default router;
