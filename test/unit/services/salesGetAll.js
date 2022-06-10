const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/sales');
const salesService = require('../../../services/sales');

describe('Busca todas as vendas no BD', () => {

  describe('caso não tenha nenhuma venda cadastrada', () => {

    before(() => {
      const execute = [[]];
      sinon.stub(salesModel, 'getAll').resolves(execute);
    })

    after(() => {
      salesModel.getAll.restore();
    })

    it('retorna um array vazio', async () => {
      const [result] = await salesService.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });

  });
});