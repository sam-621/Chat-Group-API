import { dbClose, dbConnection } from '../../utils/db-handler.util';
import { MockUser } from '../../utils/fake-data.util';
import { post } from '../../utils/petition';
import { HttpStatusCode } from '../../../src/common/utils/httpStatusCodes';

describe('Register route', () => {
  beforeAll(dbConnection);
  afterAll(dbClose);

  test('Should response 400 Wrong data schema', async (done) => {
    const mockUser = new MockUser('', 'admim@gmail.c', '123');
    const res = await post('/user/auth/register', mockUser);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.body.message).toBe('Wrong data schema');
    done();
  });
});
