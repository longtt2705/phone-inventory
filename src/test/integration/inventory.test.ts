import request from 'supertest';
import app from '../../app';
import { StatusCodes } from 'http-status-codes';
import { Manufacturer, Model, Phone } from '@prisma/client';

describe('Inventory API', () => {
  const managerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJpYXQiOjE1MTYyMzkwMjJ9.3REqkkogvCcpiabr8yaw6nOoZqyEDqW5Fo28nf5Vuq0';
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJpYXQiOjE1MTYyMzkwMjJ9.iQPct7pywb9e9T6J3PrqQQmA4jhIcU92qg6hPr7Jqho';
  let addedPhone: Phone;
  let addedModel: Model;
  let addedManufacturer: Manufacturer;

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/inventory/phones');

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('should return 403 if user is not manager', async () => {
    const response = await request(app)
      .post('/inventory/phones')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(StatusCodes.FORBIDDEN);
  });

  it('should return 400 if manufacturer data is invalid', async () => {
    const response = await request(app)
      .post('/inventory/manufacturers')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        manufacturer: {
          notName: 'Apple',
        },
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('should add a manufacturer to inventory', async () => {
    const response = await request(app)
      .post('/inventory/manufacturers')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        manufacturer: {
          name: 'Apple',
        },
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    addedManufacturer = response.body.data;
  });

  it('should get a manufacturer by ID', async () => {
    const response = await request(app)
      .get(`/inventory/manufacturers/${addedManufacturer.id}`)
      .set('Authorization', `Bearer ${managerToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data).toEqual(addedManufacturer);
  });

  it('should return 400 if model data is invalid', async () => {
    const response = await request(app)
      .post('/inventory/models')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        model: {
          notName: 'iPhone 12',
          manufacturerId: 1,
        },
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('should add a model to inventory', async () => {
    const response = await request(app)
      .post('/inventory/models')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        model: {
          name: 'iPhone 12',
          manufacturerId: addedManufacturer.id,
        },
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    addedModel = response.body.data;
  });

  it('should get a model by ID', async () => {
    const response = await request(app)
      .get(`/inventory/models/${addedModel.id}`)
      .set('Authorization', `Bearer ${managerToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data).toEqual(addedModel);
  });

  it('shoud return 400 if phone data is invalid', async () => {
    const response = await request(app)
      .post('/inventory/phones')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        phone: {
          price: 1000,
          modelId: 1,
          bodyColor: 'black',
          dataMemory: 128,
        },
      });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('should add a phone to inventory', async () => {
    const response = await request(app)
      .post('/inventory/phones')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        phone: {
          price: 1000,
          modelId: addedModel.id,
          bodyColor: 'black',
          dataMemory: 128,
          osVersion: 'iOS 14',
          yearOfManufacture: 2020,
        },
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    addedPhone = response.body.data;
  });

  it('should get a phone by ID', async () => {
    const response = await request(app)
      .get(`/inventory/phones/${addedPhone.id}`)
      .set('Authorization', `Bearer ${managerToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data.bodyColor).toEqual(addedPhone.bodyColor);
  });

  it('should get all phones', async () => {
    const response = await request(app)
      .get('/inventory/phones')
      .set('Authorization', `Bearer ${managerToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should get all models', async () => {
    const response = await request(app)
      .get('/inventory/models')
      .set('Authorization', `Bearer ${managerToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should get all manufacturers', async () => {
    const response = await request(app)
      .get('/inventory/manufacturers')
      .set('Authorization', `Bearer ${managerToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});
