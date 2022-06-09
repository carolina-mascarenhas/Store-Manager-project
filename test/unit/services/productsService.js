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

describe('Busca todos os produtos no BD', () => {

  describe('quando não existe nenhum produto cadastrado', () => {

    before(() => {
      const execute = [[]]
      sinon.stub(productsModel, 'getAll').resolves(execute)
    })

    after(() => {
      productsModel.getAll.restore()
    })

    it('retorna um array', async () => {
      const result = await productsService.getAll()
      expect(result).to.be.an('array')
    })

    it('o array está vazio', async () => {
      const [result] = await productsService.getAll()
      expect(result).to.be.empty
    })

  })

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
      ]]
      sinon.stub(productsModel, 'getAll').resolves(execute)
    })

    after(() => {
      productsModel.getAll.restore()
    })

    it('retorna um array', async () => {
      const [result] = await productsService.getAll()
      expect(result).to.be.an('array')
    })

    it('o array não está vazio', async () => {
      const [result] = await productsService.getAll()
      expect(result).not.to.be.empty
    })

    it('o array possui itens do tipo objeto', async () => {
      const [result] = await productsService.getAll()
      expect(result[0]).to.be.an('object')
    })
    
    it('tais itens possuem as propriedades: "id", "name" e "quantity"', async () => {
      const [result] = await productsService.getAll()
      expect(result[0]).to.include.all.keys('id', 'name', 'quantity')
    })
  })
})

describe('Busca produtos no BD por "id"', () => {
  const productId = 2

  describe('quando existem produtos cadastrados', () => {

    before(() => {
      const execute = [[{ id: 2, name: 'Traje de encolhimento', quantity: 20 }]]
      sinon.stub(productsModel, 'getById').resolves(execute)
    })

    after(() => {
      productsModel.getById.restore()
    })

    it('', async () => {
      const [result] = await productsService.getById(productId)
      expect(result).to.be.an('array')
    })
  })
})

// describe('deleta um produto', () => {

// })