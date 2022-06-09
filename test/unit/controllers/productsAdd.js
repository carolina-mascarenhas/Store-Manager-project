const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/products');
const productsService = require('../../../services/products');

describe('', () => {
  const req = {}
  const res = {}
  req.body = {name: "Tênis", quantity: 4};

  describe('em caso de sucesso', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      const execute = {
        id: 4,
        name: "Tênis",
        quantity: 4,
      };
      sinon.stub(productsService, 'add').resolves(execute);
    })
  
    after(() => {
      productsService.add.restore();
    })

    it('é chamado o status com o código 201', async () => {
      await productsController.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    })

  });
})