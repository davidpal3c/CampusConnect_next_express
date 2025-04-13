import request from 'supertest';
import { app } from '../server';

describe('Server', () => {
  it('should return 200 for the root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from the server!');
  });
});