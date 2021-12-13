import req from 'supertest';
import { dbClose, dbConnection } from '../../utils/db-handler.util';
import { MockUser } from '../../utils/fake-data.util';

import { App } from '../../../src/modules/app';
import { API_KEY } from '../../../src/common/config/env.config';
const app = new App().app;

describe('Register route', () => {
  beforeAll(dbConnection);
  afterAll(dbClose);

  test('Should response 400 Wrong data schema', async (done) => {
    const mockUser = new MockUser('', 'admim@gmail.c', '123');
    const res = await req(app)
      .post('/user/auth/register')
      .set('authorization', API_KEY)
      .send(mockUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Wrong data schema');
    done();
  });
});
