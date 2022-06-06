const salesModels = require('../models/sales');

const getAll = () => {
  const allSales = salesModels.getAll();
  return allSales;
};

const getById = (id) => {
  const saleById = salesModels.getById(id);
  return saleById;
};

const add = async (body) => {
  const { id } = await salesModels.addSale();
  // console.log('console do id:', id);

  const arr = [];
  body.map(({ productId, quantity }) => arr.push(salesModels.addSalesProducts(
    id,
    productId,
    quantity,
  )));

  const promissesResolved = await Promise.all(arr);
  console.log('console do test:', promissesResolved);
  
  return {
    id,
    itemsSold: promissesResolved,
  };
};

module.exports = {
  getAll,
  getById,
  add,
};