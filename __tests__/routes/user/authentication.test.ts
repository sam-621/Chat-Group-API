import { clearDatabase, dbClose, dbConnection, saveUserInDB } from '../../utils/db-handler.util';
import { MockUser } from '../../utils/fake-data.util';
import { post } from '../../utils/petition';
import { HttpStatusCode } from '../../../src/common/utils/httpStatusCodes';
import { UserModel } from '../../../src/modules/user/user.schema';
beforeAll(dbConnection);
afterEach(clearDatabase);
afterAll(dbClose);
describe('Register route', () => {
  test('Should response 400 Wrong data schema', async (done) => {
    const mockUser = new MockUser('admim@gmail.c', '123', '');
    const res = await post('/user/auth/register', mockUser);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.body.message).toBe('Wrong data schema');
    done();
  });

  test('Should response 400 Email already taken', async (done) => {
    const mockUser = new MockUser('admin@gmail.com', '123456', 'admin');
    await saveUserInDB();

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

describe('Login endpoint', () => {
  test('Should response 400 Wrong data schema', async (done) => {
    const mockUser = new MockUser('test.com', '123', '');
    const res = await post('/user/auth/login', mockUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Wrong data schema');
    done();
  });

  test('Should response 401 wrong email', async (done) => {
    await saveUserInDB();
    const incorrectMockUser = new MockUser('wrongAdmin@gmail.com', '123456', 'admin');

    const res = await post('/user/auth/login', incorrectMockUser);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Wrong credentials');
    done();
  });

  test('Should response 401 wrong password', async (done) => {
    await saveUserInDB();
    const incorrectMockUser = new MockUser('admin@gmail.com', '1234567', 'admin');

    const res = await post('/user/auth/login', incorrectMockUser);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Wrong credentials');
    done();
  });

  test('Should response 200 OK', async (done) => {
    await saveUserInDB();
    const mockUser = new MockUser('admin@gmail.com', '123456', 'admin');

    const res = await post('/user/auth/login', mockUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('OK');
    done();
  });
});
