import * as Cat from '../model/cat-model.js';

export const getAllCats = async (req, res) => {
  try {
    res.json(await Cat.getAll());
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const getCatById = async (req, res) => {
  try {
    const cat = await Cat.getById(Number(req.params.id));

    if (!cat) {
      return res.status(404).json({message: 'Cat not found.'});
    }

    res.json(cat);
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const getCatsByUserId = async (req, res) => {
  try {
    const cats = await Cat.getByUserId(Number(req.params.userId));
    res.json(cats);
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const createCat = async (req, res) => {
  try {
    if (!req.body?.cat_name || !req.body?.owner || !req.body?.weight) {
      return res.status(400).json({message: 'Missing required fields.'});
    }
    if (!req.file) {
      return res.status(400).json({message: 'A cat image is required.'});
    }
    const newCat = await Cat.add(req.body, req.file.filename);
    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const updateCat = async (req, res) => {
  try {
    const updated = await Cat.modify(req.body, Number(req.params.id));

    if (!updated) {
      return res.status(404).json({message: 'Cat not found.'});
    }

    res.json({message: 'Cat updated successfully.'});
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const deleteCat = async (req, res) => {
  try {
    const deleted = await Cat.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({message: 'Cat not found.'});
    }
    res.json({message: 'Cat deleted successfully.'});
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};
