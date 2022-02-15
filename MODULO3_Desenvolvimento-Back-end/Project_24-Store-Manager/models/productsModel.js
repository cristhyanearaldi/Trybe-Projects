const connection = require('./connection');

const readProducts = async () => {
  const query = 'SELECT * FROM products';
  const [rows] = await connection.execute(query);
  return rows;
};

const getByName = async (name) => {
  const query = 'SELECT name FROM products WHERE name = ?';
  const [[rows]] = await connection.execute(
    query, 
    [name],
  );

  return rows;
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  const [rows] = await connection.execute(
    query,
    [name, quantity],
  );

  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[rows]] = await connection.execute(
    query,
    [id],
  );
  return rows;
};

const update = async ({ id, name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  const [rows] = await connection.execute(
    query,
    [name, quantity, id],
  );

  return rows.changedRows;
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [rows] = await connection.execute(
    query,
    [id],
  );
  return rows.affectedRows;
};

module.exports = {
  readProducts,
  getByName,
  create,
  getById,
  update,
  remove,
};