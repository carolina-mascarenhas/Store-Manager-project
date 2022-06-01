const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM products;');

const getById = (id) => connection.execute('SELECT * FROM products WHERE id = ?;', [id]);

const add = async (name, quantity) => {
  const query = 'INSERT INTO products(name, quantity) VALUES (?, ?);';

  const [newProduct] = await connection.execute(query, [name, quantity]);
  
  return {
    id: newProduct.insertId,
    name,
    quantity,
  };
};

const checkProductByName = (name) => connection.execute(
  'SELECT * FROM products WHERE name = ?;', [name],
);

module.exports = {
  getAll,
  getById,
  add,
  checkProductByName,
};