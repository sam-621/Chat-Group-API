import { clearDatabase, dbClose, dbConnection } from '../../utils/db-handler.util';
import { MockUser } from '../../utils/fake-data.util';
import { post } from '../../utils/petition';
import { HttpStatusCode } from '../../../src/common/utils/httpStatusCodes';
import { UserModel } from '../../../src/modules/user/user.schema';

describe('Register route', () => {
  beforeAll(dbConnection);
  afterEach(clearDatabase);
  afterAll(dbClose);

  test('Should response 400 Wrong data schema', async (done) => {
    const mockUser = new MockUser('admim@gmail.c', '123', '');
    const res = await post('/user/auth/register', mockUser);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.body.message).toBe('Wrong data schema');
    done();
  });

  test('Should response 400 Email already taken', async (done) => {
    const mockUser = new MockUser('test@gmail.com', '123456', 'test');
    await UserModel.create(mockUser);

    const res = await post('/user/auth/register', mockUser);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.body.message).toBe('user with that email already exists');
    done();
  });

  test('Should response 200 user registered', async (done) => {
    const mockUser = new MockUser('test@gmail.com', '123456', 'test');

    const res = await post('/user/auth/register', mockUser);

    expect(res.status).toBe(HttpStatusCode.CREATED);
    expect(res.body.message).toBe('user registered');
    done();
  });
});
