const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

describe('Insere um novo produto no BD', () => {
  const payloadProduct = {
    name: "Tênis",
    quantity: "2",
  };

  describe('quando o produto ainda não existe no BD', () => {

    before(() => {
      const execute = [[]];
      const execute2 = {
        "id": 4,
        "name": "Tênis",
        "quantity": 2
      };
      sinon.stub(productsModel, 'checkProductByName').resolves(execute);
      sinon.stub(productsModel, 'add').resolves(execute2);
    });

    after(() => {
      productsModel.checkProductByName.restore();
      productsModel.add.restore();
    });

    it('a função checkProductByName retona um array vazio', async () => {
      const [checkArr] = await productsModel.checkProductByName(payloadProduct.name);
      expect(checkArr).to.be.an('array');
      expect(checkArr).to.have.lengthOf(0);
    });

    it('adiciona o produto no BD', async () => {
      const result = await productsService.add(payloadProduct.name, payloadProduct.quantity);
      expect(result).to.be.an('object');
    });

  });

  describe('quando o produto já existe no BD', () => {

    before(() => {
      const execute = [[{ id: 4, name: 'Tênis', quantity: 2 }]];
      sinon.stub(productsModel, 'checkProductByName').resolves(execute);
    });

    after(() => {
      productsModel.checkProductByName.restore();
    });

    it('a função checkProductByName retorna um array com o objeto que já está no BD', async () => {
      const checkArr = await productsModel.checkProductByName(payloadProduct.name);
      expect(checkArr).to.be.an('array');
      expect(checkArr).not.to.be.empty;
    });

    it('lança um erro', async () => {
      try {
        await productsService.add(payloadProduct.name, payloadProduct.quantity);
      } catch (e) {
        expect(e).to.has.property('message');
        expect(e.message).to.be.equal('Product already exists');
      }
    });
    
  });

});