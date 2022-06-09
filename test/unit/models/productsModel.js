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

describe('Busca todos os produtos no BD', () => {

  describe('quando não existe nenhum produto cadastrado', () => {

    before(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.be.empty;
    });

  });

  describe('quando existem produtos cadastrados', () => {

    before(() => {
      const execute = [[
        {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10
        },
        {
          id: 2,
          name: "Traje de encolhimento",
          quantity: 20
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
          quantity: 30
        }
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const [result] = await productsModel.getAll();
      expect(result).not.to.be.empty;
    });

    it('o array possui itens do tipo objeto', async () => {
      const [result] = await productsModel.getAll();
      expect(result[0]).to.be.an('object');
      expect(result[1]).to.be.an('object');
      expect(result[2]).to.be.an('object');
    });

    it('tais itens possuem as propriedades: "id", "name" e "quantity"', async () => {
      const [result] = await productsModel.getAll();
      expect(result[0]).to.include.all.keys('id', 'name', 'quantity');
      expect(result[1]).to.include.all.keys('id', 'name', 'quantity');
      expect(result[2]).to.include.all.keys('id', 'name', 'quantity');
    });

  });
});