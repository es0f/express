import promisePool from '../../utils/database.js';

const getAll = async () => {
  const [rows] = await promisePool.query(`
    SELECT wsk_cats.*, wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
  `);

  return rows;
};

const getById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT wsk_cats.*, wsk_users.name AS owner_name
     FROM wsk_cats
     JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
     WHERE cat_id = ?`,
    [id]
  );

  return rows.length > 0 ? rows[0] : false;
};

const getByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [userId]
  );

  return rows;
};

const add = async (catData, filename) => {
  const {cat_name, weight, owner, birthdate} = catData;

  const [result] = await promisePool.execute(
    `INSERT INTO wsk_cats
    (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)`,
    [cat_name, weight, owner, filename, birthdate]
  );

  return getById(result.insertId);
};

const remove = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );

  return result.affectedRows > 0;
};

const modify = async (cat, id) => {
  const {cat_name, weight, owner, birthdate} = cat;
  const [result] = await promisePool.execute(
    `UPDATE wsk_cats
     SET cat_name = ?, weight = ?, owner = ?, birthdate = ?
     WHERE cat_id = ?`,
    [cat_name, weight, owner, birthdate, id]
  );
  return result.affectedRows > 0;
};

export {getAll, getById, getByUserId, add, remove, modify};
