const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/products');
const productsService = require('../../../services/products');

describe('Ao chamar o controller de getById', () => {
  const req = {}
  const res = {}
  const next = {}
  req.params = { id: 1 };

  describe('em caso de sucesso', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      const execute = [[{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }]];
      sinon.stub(productsService, 'getById').resolves(execute);
    })
  
    after(() => {
      productsService.getById.restore();
    })
  
    it('é chamado o status com o código 200', async () => {
      await productsController.getById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o objeto do BD', async () => {
      const expected = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }
      await productsController.getById(req, res, next);
      expect(res.json.calledWith(expected)).to.be.equal(true);
    })
  
  });

  describe('em caso de erro', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      const execute = 'throw new Error("Product not found")';
      sinon.stub(productsService, 'getById').resolves(execute);
    })
  
    after(() => {
      productsService.getById.restore();
    })
  
    it('é chamado o status com o código 404', async () => {
      try {
        await productsController.getById(req, res, next);
      } catch (e) {
        expect(res.status.calledWith(404)).to.be.equal(true);
      }
    });

    it('é chamado o json com o erro', async () => {
      try {
        await productsController.getById(req, res, next);
      } catch (e) {
        console.log(e.message);
        const expected = { message: e.message }
        expect(res.json.calledWith(expected)).to.be.equal(true);
        expect(e).to.has.property('message');
        expect(e.message).to.be.equal('Product not found');
      }
    });

  });

});

