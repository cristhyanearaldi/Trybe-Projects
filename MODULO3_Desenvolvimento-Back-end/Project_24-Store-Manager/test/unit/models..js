const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

describe('Req 1(model): Cria um endpoint para o cadastro de produtos', () => {
  const payloadProduct = {
    name: 'product_name',
    quantity: 10
  }

  before(async () => {
    const execute = [{ id: 1, name: 'product_name', quantity: 10 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Quando o produto é inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await productsModel.create(payloadProduct);
      expect(response).to.be.an('object');
    });

    it('O atributo "name" está presente no body da requisição', async () => {
      const response = await productsModel.create(payloadProduct);
      expect(response).to.have.a.property('name');
    });

    it('O atributo "quantity" está presente no body da requisição', async () => {
      const response = await productsModel.create(payloadProduct);
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('Req 2(model): Cria um endpoint para listar os produtos', () => {

  describe('Quando a lista de produtos é gerada com sucesso', () => {
    before(async () => {
      const execute = [[
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
      ]];

      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const response = await productsModel.readProducts();
      expect(response).to.be.an('array');
    });

    it('O array possui objetos com as chaves id, name e quantity', async () => {
      const [response] = await productsModel.readProducts();
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });

  });

  describe('Quando um produto é listado pelo id', () => {
    const payloadId = 1;

    before(async () => {
      const execute =[[{
        id: 1,
        name: 'produto A',
        quantity: 10
      }]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await productsModel.getById(payloadId);
      expect(response).to.be.an('object');
    });

    it('O objeto possui as chaves id, name e quantity', async () => {
      const response = await productsModel.getById(payloadId);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Req 3(model): Cria um endpoint para atualizar um produto', () => {
  describe('Quando o produto é atualizado com sucesso', () => {
    const payloadProduct = {
      id: 2,
      name: 'product_name',
      quantity: 5
    }

    const changedRows = 1;

    before(async () => {
      const execute = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      changedRows: 1
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna a chave changedRows com valor 1', async () => {
      const response = await productsModel.update(payloadProduct);
      expect(response).to.be.eq(changedRows);
    });
  });
});

describe('Req 4(model): Cria um endpoint para deletar um produto', () => {
  describe('Quando o produto é deletado com sucesso', () => {
    const payloadId = 4;

    const affectedRows = 1;

    before(async () => {
      const execute = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      changedRows: 1
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna a chave affectedRows com valor 1', async () => {
      const response = await productsModel.remove(payloadId);
      expect(response).to.be.eq(affectedRows);
    });
  });
});

describe('Req 5(model): Cria um endpoint para cadastrar vendas', () => {
  const payloadSales = [{
    product_id: 'product_id',
    quantity: 'product_quantity',
  }];

  before(async () => {
    const execute = [{ saleId: 1, productId: 'product_name', quantity: 10 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Quando a venda é cadastrada com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await salesModel.createSalesProducts(payloadSales);
      expect(response).to.be.an('object');
    });

    it('O atributo "quantity" está presente no body da requisição', async () => {
      const response = await salesModel.createSalesProducts(payloadSales);
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('Req 6(model): Cria um endpoint para listar as vendas', () => {

  describe('Quando a lista de vendas é gerada com sucesso', () => {
    before(async () => {
      const execute = [[
        {
          saleId: 1,
          date: '2021-09-09T04:54:29.000Z',
          product_id: 1,
          quantity: 2
        },
        {
          saleId: 1,
          date: '2021-09-09T04:54:54.000Z',
          product_id: 2,
          quantity: 2
        }
      ]];

      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });

    it('O array possui objetos com as chaves saleId, date, product_id e quantity', async () => {
      const [response] = await salesModel.getAll();
      expect(response).to.include.all.keys('saleId', 'date', 'product_id', 'quantity');
    });

  });

  describe('Quando uma venda é listada pelo id', () => {
    const payloadId = 1;

    before(async () => {
      const execute = [{
        saleId: 1,
        date: '2021-09-09T04:54:54.000Z',
        product_id: 2,
        quantity: 2
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async () => {
      const response = await salesModel.getById(payloadId);
      expect(response).to.be.an('object');
    });

    it('O objeto possui as chaves saleId, date, product_id e quantity', async () => {
      const response = await salesModel.getById(payloadId);
      expect(response).to.include.all.keys('saleId', 'date', 'product_id', 'quantity');
    });
  });
});

describe('Req 7(model): Cria um endpoint para atualizar uma venda', () => {
  describe('Quando a venda é atualizada com sucesso', () => {
    const payloadSale = {
      id: 2,
      productId: 2,
      quantity: 5
    }

    const changedRows = 1;

    before(async () => {
      const execute = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      changedRows: 1
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna a chave changedRows com valor 1', async () => {
      const response = await salesModel.update(payloadSale);
      expect(response).to.be.eq(changedRows);
    });
  });
});
