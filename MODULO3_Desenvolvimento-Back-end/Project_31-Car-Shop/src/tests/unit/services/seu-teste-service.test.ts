import { expect } from 'chai';
import Sinon from 'sinon';
import CarService from '../../../services/CarService';
import { mockCar, mockCarsList, mockCarUpdated } from '../mockCar';

describe('CarService', () => {
  let carService = new CarService();

  describe('Create', () => {
    before(() => {
      Sinon.stub(carService.carModel, 'create').resolves(mockCar);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados do carro criado', async () => {
      const newCar = await carService.create(mockCar);
      expect(newCar).to.be.deep.equal(mockCar);
      expect(newCar).to.be.an('object');
    });
  });

  describe('Read', () => {
    before(() => {
      Sinon.stub(carService.carModel, 'read').resolves(mockCarsList);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar uma lista de objetos com os dados dos carros cadastrados', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal(mockCarsList);
    });
  });

  describe('ReadOne', () => {
    before(() => {
      Sinon.stub(carService.carModel, 'readOne').resolves(mockCar);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados de um único carro pelo seu id', async () => {
      const car = await carService.readOne(mockCar._id);
      expect(car).to.be.deep.equal(mockCar);
    });
  });

  describe('Update', () => {
    before(() => {
      Sinon.stub(carService.carModel, 'update').resolves(mockCarUpdated);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados atualizados de um único carro pelo seu id', async () => {
      const car = await carService.update(mockCarUpdated._id, mockCarUpdated);
      expect(car).to.be.deep.equal(mockCarUpdated);
    });
  });

  describe('Delete', () => {
    before(() => {
      Sinon.stub(carService.carModel, 'delete').resolves(mockCar);
    });
    after(() => {
      Sinon.restore();
    });

    it('Deve retornar um objeto com os dados do carro removido', async () => {
      const car = await carService.delete(mockCar._id);
      expect(car).to.be.deep.equal(mockCar);
    });
  });

});