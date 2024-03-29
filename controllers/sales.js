const salesService = require('../services/sales');

const getAll = async (_req, res) => {
  const [getAllSales] = await salesService.getAll();

  res.status(200).json(getAllSales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const getSalesById = await salesService.getById(id);

    if (getSalesById.length === 0) throw new Error('Sale not found');

    res.status(200).json(getSalesById);
  } catch (e) {
    next({ status: 404, message: e.message });
  }
};

const add = async (req, res) => {
  // const { productId, quantity, arr } = req.body;

  const newSale = await salesService.add(req.body);

  res.status(201).json(newSale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;

  const updateSale = await salesService.update(id, productId, quantity);
  res.status(200).json(updateSale);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
};