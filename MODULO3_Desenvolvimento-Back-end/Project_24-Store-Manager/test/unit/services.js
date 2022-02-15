const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

describe('Req 1(serv): Cria um endpoint para o cadastro de produtos', () => {
  const payloadProduct = {
    name: 'product_name',
    quantity: 20
  };

  describe('Quando o produto é inserido com sucesso', () => {
    before(async () => {
      const execute = { id: 1, name: 'product_name', quantity: 10 };
      sinon.stub(productsModel, 'getByName').resolves('name');
      sinon.stub(productsModel, 'create').resolves(execute);
    });
  
    after(async () => {
      productsModel.getByName.restore();
      productsModel.create.restore();
    });
    
    it('Retorna um objeto', async () => {
      const response = await productsService.create(payloadProduct);
      expect(response).to.be.an('object');
    });
  });
});

describe('Req 2(serv): Cria um endpoint para listar os produtos', () => {

  describe('Quando a lista de produtos é gerada com sucesso', () => {
    before(async () => {
      const execute = [
        {
          id: 1,
          name: 'produto A',
          quantity: 10
        },
        {
          id: 2,
          name: 'produto B',
          quantity: 20
        }
      ];

      sinon.stub(productsModel, 'readProducts').resolves(execute);
    });
  
    after(async () => {
      productsModel.readProducts.restore();
    });

    it('Retorna um array', async () => {
      const response = await productsService.readProducts();
      expect(response).to.be.an('array');
    });

    it('O array possui objetos com as chaves id, name e quantity', async () => {
      const [response] = await productsService.readProducts();
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });

  });

  describe('Quando um produto é listado pelo id', () => {
    const payloadId = 1;

    before(async () => {
      const execute =[{
        id: 1,
        name: 'produto A',
        quantity: 10
      }];

      sinon.stub(productsModel, 'getById').resolves(execute);
    });

    after(async () => {
      productsModel.getById.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await productsService.getById(payloadId);
      expect(response).to.be.an('object');
    });
  });
});

describe('Req 3(serv): Cria um endpoint para atualizar um produto', () => {
  const payloadProduct = {
    id: 2,
    name: 'product_name',
    quantity: 20
  };

  describe('Quando o produto é atualizado com sucesso', () => {
    before(async () => {
      const execute = { id: 1, name: 'product_name', quantity: 10 };
      sinon.stub(productsModel, 'update').resolves(execute);
    });
  
    after(async () => {
      productsModel.update.restore();
    });
    
    it('Retorna um objeto', async () => {
      const response = await productsService.update(payloadProduct);
      expect(response).to.be.an('object');
    });

    it('O objeto contém as chaves id, name e quantity', async () => {
      const response = await productsService.update(payloadProduct);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Req 4(serv): Cria um endpoint para deletar um produto', () => {
  const payloadId = 4;

  describe('Quando o produto é deletado com sucesso', () => {
    before(async () => {
      const execute = { id: 4 };
      sinon.stub(productsModel, 'getById').resolves({ id: 4 });
      sinon.stub(productsModel, 'remove').resolves(execute);
    });
  
    after(async () => {
      productsModel.getById.restore();
      productsModel.remove.restore();
    });
    
    it('Retorna um objeto', async () => {
      const response = await productsService.remove(payloadId);
      expect(response).to.be.an('object');
    });

    it('O objeto contém a chave id', async () => {
      const response = await productsService.remove(payloadId);
      expect(response).to.have.key('id');
    });
  });
});

describe('Req 5(serv): Cria um endpoint para cadastrar vendas', () => {
  const payloadSales = [{
    product_id: 1,
    quantity: 10,
  }];

  describe('Quando a venda é inserida com sucesso', () => {
    before(async () => {
      const execute = [{ saleId: 1, productId: 'product_name', quantity: 10 }];
      sinon.stub(salesModel, 'createSale').resolves(1);
      sinon.stub(salesModel, 'createSalesProducts').resolves(execute);
    });
  
    after(async () => {
      salesModel.createSale.restore();
      salesModel.createSalesProducts.restore();
    });
    
    it('Retorna um objeto', async () => {
      const response = await salesService.create(payloadSales);
      expect(response).to.be.an('object');
    });
  });
});

describe('Req 6(serv): Cria um endpoint para listar as vendas', () => {

  describe('Quando a lista de vendas é gerada com sucesso', () => {
    before(async () => {
      const execute = [
        {
          saleId: 1,
          date: '2021-09-09T04:54:29.000Z',
          product_id: 1,
          quantity: 2
        },
        {
          saleId: 2,
          date: '2021-09-09T04:54:54.000Z',
          product_id: 2,
          quantity: 2
        }
      ];

      sinon.stub(salesModel, 'getAll').resolves(execute);
    });
  
    after(async () => {
      salesModel.getAll.restore();
    });

    it('Retorna um array', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.an('array');
    });

    it('O array possui objetos com as chaves id, name e quantity', async () => {
      const [response] = await salesService.getAll();
      expect(response).to.include.all.keys('saleId', 'date', 'product_id', 'quantity');
    });
  });
});
