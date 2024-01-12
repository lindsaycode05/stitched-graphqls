import request from 'supertest';
import fetchMock from 'jest-fetch-mock';
import { app } from '../src/index'; 
import { AccessLog } from '../src/models/accessLog';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  jest
    .spyOn(AccessLog.prototype, 'save')
    .mockImplementationOnce(() => Promise.resolve({}));
});

describe('POST /login', () => {
  it('should login successfully with correct credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  }, 20000); 

  it('should fail with incorrect credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'wrong', password: 'credentials' });

    expect(response.statusCode).toBe(401);
  }, 20000); 
});
