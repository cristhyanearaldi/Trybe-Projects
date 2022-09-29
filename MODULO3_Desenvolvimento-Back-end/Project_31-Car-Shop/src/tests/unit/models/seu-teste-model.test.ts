import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { mockCar, mockCarsList, mockCarUpdated } from '../mockCar';

describe('CarModel', () => {
  let carModel = new CarModel();

  describe('Create', () => {
    before(() => {
      Sinon.stub(carModel.model, 'create').resolves(mockCar);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados do carro criado', async () => {
      const newCar = await carModel.create(mockCar);
      expect(newCar).to.deep.equal(mockCar);
      expect(newCar).to.be.an('object');
    });
  });

  describe('Read', () => {
    before(() => {
      Sinon.stub(carModel.model, 'find').resolves(mockCarsList as any[]);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar uma lista de objetos com os dados dos carros cadastrados', async () => {
      const cars = await carModel.read();
      expect(cars).to.deep.equal(mockCarsList);
    });
  });

  describe('ReadOne', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findById').resolves(mockCar as any);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados de um único carro pelo seu id', async () => {
      const car = await carModel.readOne(mockCar._id);
      expect(car).to.deep.equal(mockCar);
    });
  });

  describe('Update', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(mockCarUpdated as any);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados atualizados de um único carro pelo seu id', async () => {
      const car = await carModel.update(mockCarUpdated._id, mockCarUpdated);
      expect(car).to.deep.equal(mockCarUpdated);
    });
  });

  describe('Delete', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(mockCar as any);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados do carro removido', async () => {
      const car = await carModel.delete(mockCar._id);
      expect(car).to.deep.equal(mockCar);
    });
  });

});