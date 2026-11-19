import * as User from '../model/user-model.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  try {
    res.json(await User.getAll());
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.getById(Number(req.params.id));

    if (!user) {
      return res.status(404).json({message: 'User not found.'});
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const postUser = async (req, res) => {
  try {
    const {name, username, email, password} = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({message: 'Missing required fields.'});
    }

    const newUser = await User.add(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({message: 'Username already exists.'});
    }

    res.status(500).json({message: 'Database error.'});
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.modify(req.body, Number(req.params.id));

    if (!updated) {
      return res.status(404).json({message: 'User not found.'});
    }

    res.json({message: 'User updated successfully.'});
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.remove(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({message: 'User not found.'});
    }
    res.json({message: 'User and their cats deleted successfully.'});
  } catch (error) {
    res.status(500).json({message: 'Database error.'});
  }
};
