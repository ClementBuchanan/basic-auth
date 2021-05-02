'use strict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);


describe('testing authRoutes', () => {
  it('should test signup route', async () => {
    const response = await mockRequest.post('/signup').send({ username: 'test', password: 'test' });
    console.log(response);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe('test');
  });

  it('should test sigin route', async () => {
    const response = await mockRequest.post('/signin').auth('test', 'test');
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('test');
  });
});
