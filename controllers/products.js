const productsService = require('../services/products');

const getAll = async (_req, res) => {
  const [getProducts] = await productsService.getAll();

  res.status(200).json(getProducts);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;

  try {
    const [getProductsById] = await productsService.getById(id);

    res.status(200).json(getProductsById[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
    // next({ status: 404, message: e.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    await productsService.deleteById(id);

    res.status(204).end();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}; 

const add = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const addNewProduct = await productsService.add(name, quantity);

    res.status(201).json(addNewProduct);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updateProductById = await productsService.updateById(name, id, quantity);
    
    res.status(200).json(updateProductById);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

module.exports = {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
};