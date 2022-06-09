const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/products');
const productsService = require('../../../services/products');

describe('Ao chamar o controller de getAll', () => {
  const req = {};
  const res = {};

  describe('quando não há produtos cadastrados', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const execute = [[]];
      sinon.stub(productsService, 'getAll').resolves(execute);
    })
  
    after(() => {
      productsService.getAll.restore();
    })

    it('é chamado o status com o código 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('é chamado o json com o array vazio', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith([])).to.be.equal(true);
    })

  });

  describe('quando existem produtos cadastrados', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const execute = [[{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }]];
      sinon.stub(productsService, 'getAll').resolves(execute);
    })
  
    after(() => {
      productsService.getAll.restore();
    })

    it('é chamado o status com o código 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('é chamado o json com o array com objeto do BD', async () => {
      const expected = [{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }]
      await productsController.getAll(req, res);
      expect(res.json.calledWith(expected)).to.be.equal(true);
    });
  });
  
});