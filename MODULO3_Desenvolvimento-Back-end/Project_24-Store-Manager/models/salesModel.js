const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO sales (date) VALUES (CURRENT_DATE())';
  const [rows] = await connection.execute(query);

  return rows.insertId;
};

const createSalesProducts = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [rows] = await connection.execute(
    query,
    [saleId, productId, quantity],
  );

  return {
    saleId: rows.insertId,
    productId,
    quantity,
  };
};

const getAll = async () => {
  const queryPart1 = 'SELECT a.sale_id AS saleId, a.product_id, a.quantity, b.date';
  const queryPart2 = ' FROM sales_products AS a INNER JOIN sales AS b ON a.sale_id = b.id';
  const query = queryPart1.concat(queryPart2);

  const [rows] = await connection.execute(query);
  return rows;
};

const getById = async (id) => {
  const queryPart1 = 'SELECT a.product_id, a.quantity, b.date FROM sales_products AS a';
  const queryPart2 = ' INNER JOIN sales AS b ON a.sale_id = b.id WHERE b.id = ?';
  const query = queryPart1.concat(queryPart2);
  
  const [rows] = await connection.execute(
    query,
    [id],
  );
  return rows;
};

const update = async (id, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  const [rows] = await connection.execute(
    query,
    [quantity, id, productId],
  );

  return rows.changedRows;
};

module.exports = {
  createSale,
  createSalesProducts,
  getAll,
  getById,
  update,
};