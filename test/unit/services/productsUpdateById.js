const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

describe('', () => {
  const payloadProduct = {
    id: 4,
    name: "Bolsa",
    quantity: 3
  }

  describe('em caso de sucesso', () => {

    before(() => {
      const execute = [[{
        "id": 4,
        "name": "Tênis",
        "quantity": 2
      }]]
      const execute2 = {
        id: 4,
        name: "Bolsa",
        quantity: 3
      }
      sinon.stub(productsModel, 'getById').resolves(execute);
      sinon.stub(productsModel, 'updateById').resolves(execute2);
    })
  
    after(() => {
      productsModel.getById.restore();
    })

    it('', async () => {
      const result = await productsService.updateById(payloadProduct.name, payloadProduct.id, payloadProduct.quantity);
      expect(result).to.be.an('object');
    })

  })
});