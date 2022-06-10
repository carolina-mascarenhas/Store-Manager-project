const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

describe('Busca todas as vendas no BD', () => {

  describe('caso nenhuma venda esteja cadastrada', () => {

    before(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  });

});