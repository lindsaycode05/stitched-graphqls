import request from 'supertest';
import { app } from '../src/index';
import jwt from 'jsonwebtoken';

describe('Authentication Middleware', () => {
  it('allows access with valid token', async () => {
    const token = jwt.sign({ userId: 'testUser' }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    const response = await request(app)
      .get('/graphql')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).not.toBe(401);
  });

  it('denies access without token', async () => {
    const response = await request(app).get('/graphql');

    expect(response.statusCode).toBe(401);
  });

  it('denies access with invalid token', async () => {
    const response = await request(app)
      .get('/graphql')
      .set('Authorization', 'Bearer invalidtoken');

    expect(response.statusCode).toBe(401);
  });
});
