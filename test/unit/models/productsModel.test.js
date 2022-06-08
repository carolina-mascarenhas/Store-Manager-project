const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

describe('Insere um novo produto no BD', () => {
  const payloadProduct = {
    name: "Tênis",
    quantity: "2",
  };

  before(() => {
    const execute = [{
      insertId: 4
    }]
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const newProduct = await productsModel.add(payloadProduct.name, payloadProduct.quantity);

      expect(newProduct).to.be.an('object');
    });

    it('objeto possui chaves "id", "name" e "quantity"', async () => {
      const newProduct = await productsModel.add(payloadProduct.name, payloadProduct.quantity);

      expect(newProduct).to.have.property('id');
      expect(newProduct).to.have.property('name');
      expect(newProduct).to.have.property('quantity');
    });

  });
});