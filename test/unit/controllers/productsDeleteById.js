const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/products');
const productsService = require('../../../services/products');

describe('Ao chamar o controller de deleteById', () => {
  const req = {}
  const res = {}
  req.params = { id: 1 };

  describe('em caso de sucesso', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
  
      const execute = '';
      sinon.stub(productsService, 'deleteById').resolves(execute);
    })
  
    after(() => {
      productsService.deleteById.restore();
    })
  
    it('é chamado o status com o código 204', async () => {
      await productsController.deleteById(req, res);
      expect(res.status.calledWith(204)).to.be.equal(true);
    })

  })

  describe('em caso de erro', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
  
      const execute = 'throw new Error("Product not found")';
      sinon.stub(productsService, 'deleteById').resolves(execute);
    })
  
    after(() => {
      productsService.deleteById.restore();
    })
  
    it('é chamado o status com o código 404', async () => {
      try {
        await productsController.deleteById(req, res);
      } catch (e) {
        expect(res.status.calledWith(404)).to.be.equal(true);
      }
    })

    it('é chamado o json com o erro', async () => {
      try {
        await productsController.deleteById(req, res);
      } catch (e) {
        console.log(e.message);
        const expected = { message: e.message }
        expect(res.json.calledWith(expected)).to.be.equal(true);
        expect(e).to.has.property('message');
        expect(e.message).to.be.equal('Product not found');
      }
    });

  })
  
})