import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';

import { RequestWithBody } from "../../../controllers";
import CarController from "../../../controllers/CarController";
import CarService from "../../../services/CarService";
import { Car as ICar } from "../../../interfaces/CarInterface";
import { mockCar, mockCarsList, mockCarUpdated } from "../mockCar";

const { expect } = chai;

describe('CarController para casos de sucesso', () => {
  const carService = new CarService();
  const carController = new CarController(carService);

  describe('Create', () => {
    const req = {} as RequestWithBody<ICar>;
    const res = {} as Response;

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);
      sinon.stub(carController.carService, 'create').resolves(mockCar);
    });
    after(()=>{
      sinon.restore();
    });
    
    it('Deve retornar status 201 ao criar um novo carro', async () => {
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201));
    });
    
  });

  describe('Read', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);
      sinon.stub(carController.carService, 'read').resolves(mockCarsList);
    });
    after(()=>{
      sinon.restore();
    });
    
    it('Deve retornar status 200 ao listar os carros', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200));
    });
  });

  describe('ReadOne', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);
      sinon.stub(carController.carService, 'readOne').resolves(mockCar);
    });
    after(()=>{
      sinon.restore();
    });
    
    it('Deve retornar status 200 ao buscar as informações do carro pelo seu id', async () => {
      req.params = { id: "6255b8e8535d78344eb627dd" };
      await carController.readOne(req as any, res);
      expect((res.status as sinon.SinonStub).calledWith(200));
    });
  });

  describe('Update', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);
      sinon.stub(carController.carService, 'update').resolves(mockCarUpdated);
    });
    after(()=>{
      sinon.restore();
    });
    
    it('Deve retornar status 200 ao atualizar as informações do carro pelo seu id', async () => {
      req.params = { id: "6255b8e8535d78344eb627dd" };
      await carController.update(req as any, res);
      expect((res.status as sinon.SinonStub).calledWith(200));
    });
  });

  describe('Delete', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);
      sinon.stub(carController.carService, 'delete').resolves(mockCar);
    });
    after(()=>{
      sinon.restore();
    });
    
    it('Deve retornar status 204 ao deleter um carro', async () => {
      req.params = { id: "6255b8e8535d78344eb627dd" };
      await carController.update(req as any, res);
      expect((res.status as sinon.SinonStub).calledWith(204));
    });
  });

});

describe('CarController para casos de erro', () => {
  const carService = new CarService();
  const carController = new CarController(carService);

  describe('Deve retornar status 500 ao lançar um erro interno', () => {
    const res = {} as Response;
    
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null);
    });
    after(()=>{
      sinon.restore();
    });
    
    it('Create', async () => {
      const req = {} as RequestWithBody<ICar>;
      sinon.stub(carController.carService, 'create').throws()
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(500));
    });

    it('Read', async () => {
      const req = {} as Request;
      sinon.stub(carController.carService, 'read').throws()
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(500));
    });

    it('ReadOne', async () => {
      const req = {} as Request;
      req.params = { id: "6255b8e8535d78344eb627dd" };
      sinon.stub(carController.carService, 'readOne').throws()
      await carController.readOne(req as any, res);
      expect((res.status as sinon.SinonStub).calledWith(500));
    });

    it('Update', async () => {
      const req = {} as Request;
      req.params = { id: "6255b8e8535d78344eb627dd" };
      sinon.stub(carController.carService, 'update').throws()
      await carController.update(req as any, res);
      expect((res.status as sinon.SinonStub).calledWith(500));
    });

    it('Delete', async () => {
      const req = {} as Request;
      req.params = { id: "6255b8e8535d78344eb627dd" };
      sinon.stub(carController.carService, 'delete').throws()
      await carController.delete(req as any, res);
      expect((res.status as sinon.SinonStub).calledWith(500));
    });
  });
});