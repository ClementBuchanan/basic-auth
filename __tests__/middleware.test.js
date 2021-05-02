'use strict';

require('@code-fellows/supergoose');
const basic = require('../src/auth/middleware/basic.js');
const user = require('../src/auth/models/users.js');
const base64 = require('base-64');



describe('testing middleware', () => {
  it('should fail if user does not exist', async () => {
    const req = { headers: { authorization: `Basic ${base64.encode('test:test')}` } };
    const res = { status: jest.fn(() => res), send: jest.fn(() => res) }
    const next = jest.fn()

    return basic(req, res, next).then(() => {
      expect(next).toHaveBeenCalledWith('User not found');
    })
  });

  it('should successfully authenticate user', async () => {
    await new user({ username: 'test', password: 'test' }).save();

    const req = { headers: { authorization: `Basic ${base64.encode('test:test')}` } };
    const res = { status: jest.fn(() => res), send: jest.fn(() => res) }
    const next = jest.fn()

    return basic(req, res, next).then(() => {
      expect(next).toHaveBeenCalledWith();
      expect(req.user.username).toBe('test')
    })
  });

  it('should fail if password is incorrect', async () => {
    const req = { headers: { authorization: `Basic ${base64.encode('test:test2')}` } };
    const res = { status: jest.fn(() => res), send: jest.fn(() => res) }
    const next = jest.fn()

    return basic(req, res, next).then(() => {
      expect(next).toHaveBeenCalledWith('Invalid user');
    })
  });

  it('should fail if there is no authorization header', async () => {
    const req = { headers: {} };
    const res = { status: jest.fn(() => res), send: jest.fn(() => res) }
    const next = jest.fn()

    return basic(req, res, next).then(() => {
      expect(next).toHaveBeenCalledWith('no headers found');
    })
  });
});

