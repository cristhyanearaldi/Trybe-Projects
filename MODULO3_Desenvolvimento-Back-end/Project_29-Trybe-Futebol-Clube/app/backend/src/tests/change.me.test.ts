import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';
import Club from '../database/models/clubs';
import Match from '../database/models/matchs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '012345'
};

const mockClubs = [
  {
    id: 8,
    club_name: 'Grêmio',
  },
  {
    id: 9,
    club_name: 'Internacional',
  },
]

const mockMatchs = [
  {
    id: 1,
    homeTeam: 6,
    homeTeamGoals: 0,
    awayTeam: 4,
    awayTeamGoals: 1,
    inProgress: 1,
  },
  {
    id: 2,
    homeTeam: 12,
    homeTeamGoals: 4,
    awayTeam: 6,
    awayTeamGoals: 1,
    inProgress: 1,
  },

];

describe('Rota /login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockUser as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('A rota deve receber o campo email', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(mockUser.email);

    expect(chaiHttpResponse).to.have.status(401);
  });

  it('A rota deve receber o campo password', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(mockUser.password);

    expect(chaiHttpResponse).to.have.status(401);
  });

  it('O login é feito com sucesso', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(mockUser);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('object');
  });
});

describe('Rota /clubs', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Club, "findAll")
      .resolves(mockClubs as unknown as Club[]);
  });

  after(()=>{
    (User.findAll as sinon.SinonStub).restore();
  })

  it('Retorna a lista de clubes', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/clubs')
        .send(mockClubs);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});

describe('Rota /matchs', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(mockMatchs as Match[]);
  });

  after(()=>{
    (User.findAll as sinon.SinonStub).restore();
  })

  it('Retorna a lista de partidas', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(mockMatchs);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.be.equal(mockMatchs);
    expect(chaiHttpResponse.body).to.have.length(2);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});
