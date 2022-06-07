const connection = require('./connection');

const getAll = () => {
  const query = `SELECT id AS saleId, date, product_id AS productId, quantity
  FROM StoreManager.sales AS sa
  INNER JOIN StoreManager.sales_products AS sp
  ON sa.id = sp.sale_id;`;

  return connection.execute(query);
};

const getById = async (id) => {
  const query = `SELECT id AS saleId, date, product_id AS productId, quantity
  FROM StoreManager.sales AS sa
  INNER JOIN StoreManager.sales_products AS sp
  ON sa.id = sp.sale_id
  WHERE id = ?;`;

  const [saleById] = await connection.execute(query, [id]);
  
  return saleById.map((obj) => ({
    date: obj.date,
    productId: obj.productId,
    quantity: obj.quantity,
  }));
};

const addSale = async () => {
  const [newSale] = await connection.execute('INSERT INTO sales(date) VALUES (NOW())');

  return {
    id: newSale.insertId,
  };
};

const addSalesProducts = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?)';
  await connection.execute(query, [saleId, productId, quantity]);

  return {
    productId,
    quantity,
  };
};

const update = (id, productId, quantity) => {
  const query = 'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?;';
  return connection.execute(query, [productId, quantity, id]);
};

module.exports = {
  getAll,
  getById,
  addSale,
  addSalesProducts,
  update,
};