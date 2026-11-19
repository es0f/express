import promisePool from '../../utils/database.js';

const getAll = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, name, username, email, role FROM wsk_users'
  );

  return rows;
};

const getById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
    [id]
  );

  return rows.length > 0 ? rows[0] : false;
};

const add = async (user) => {
  const {name, username, email, password, role} = user;

  const [result] = await promisePool.execute(
    `INSERT INTO wsk_users (name, username, email, password, role)
     VALUES (?, ?, ?, ?, ?)`,
    [name, username, email, password, role || 'user']
  );

  return {user_id: result.insertId};
};

const modify = async (user, id) => {
  const {name, username, email, role} = user;

  const [result] = await promisePool.execute(
    `UPDATE wsk_users
     SET name = ?, username = ?, email = ?, role = ?
     WHERE user_id = ?`,
    [name, username, email, role, id]
  );

  return result.affectedRows > 0;
};

const remove = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );
    await connection.commit();
    return result.affectedRows > 0;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {getAll, getById, add, modify, remove};
