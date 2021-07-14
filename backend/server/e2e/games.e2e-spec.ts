import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { GamesDTO } from '../src/service/dto/games.dto';
import { GamesService } from '../src/service/games.service';

describe('Games Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(GamesService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all games ', async () => {
    const getEntities: GamesDTO[] = (
      await request(app.getHttpServer())
        .get('/api/games')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET games by id', async () => {
    const getEntity: GamesDTO = (
      await request(app.getHttpServer())
        .get('/api/games/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create games', async () => {
    const createdEntity: GamesDTO = (
      await request(app.getHttpServer())
        .post('/api/games')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update games', async () => {
    const updatedEntity: GamesDTO = (
      await request(app.getHttpServer())
        .put('/api/games')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE games', async () => {
    const deletedEntity: GamesDTO = (
      await request(app.getHttpServer())
        .delete('/api/games/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
