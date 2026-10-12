import * as Cat from '../model/cat-model.js';
export const getAllCats = (req, res) => {
  res.json(Cat.getAll());
};
export const getCatById = (req, res) => {
  const cat = Cat.getById(Number(req.params.id));
  if (!cat) {
    return res.status(404).json({message: 'Cat not found.'});
  }
  res.json(cat);
};
export const createCat = (req, res) => {
  if (!req.body?.cat_name) {
    return res.status(400).json({message: 'cat_name is required.'});
  }
  if (!req.file) {
    return res.status(400).json({message: 'A cat image is required.'});
  }

  const newCat = Cat.add(
    {...req.body, name: req.body.cat_name},
    req.file.filename
  );
  res.status(201).json(newCat);
};
export const updateCat = (req, res) => {
  res.json({message: 'Cat item updated.'});
};
export const deleteCat = (req, res) => {
  res.json({message: 'Cat item deleted.'});
};
