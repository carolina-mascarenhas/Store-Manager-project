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

module.exports = {
  getAll,
  getById,
};