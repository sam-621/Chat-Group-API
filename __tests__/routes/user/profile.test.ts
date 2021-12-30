import { HttpStatusCode } from '../../../src/common/utils/httpStatusCodes';
import { clearDatabase, dbClose, dbConnection, saveUserInDB } from '../../utils/db-handler.util';
import { get, put } from '../../utils/petition';

beforeAll(dbConnection);
afterEach(clearDatabase);
afterAll(dbClose);

describe('Profile route', () => {
  test('Invalid token', async () => {
    const res = await get('/user/profile/information', 'invalid token');

    expect(res.status).toBe(HttpStatusCode.UNAUTHORIZED);
  });

  test('Everything ok', async () => {
    const token = await saveUserInDB();
    const res = await get('/user/profile/information', token);

    expect(res.status).toBe(HttpStatusCode.OK);
  });
});

describe('Update profile endpoint', () => {
  test('Wrong data structure', async () => {
    const token = await saveUserInDB();
    const mockUser = {
      email: 'hi@.d',
      username: '',
      profilePic: 'https://image.com',
    };

    const res = await put('/user/profile/edit', mockUser, token);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test('Email already exists', async () => {
    const sameEmail = 'admin2@gmail.com';
    const token = await saveUserInDB();
    await saveUserInDB(sameEmail);

    const mockUser = {
      email: sameEmail,
      username: 'test username',
      profilePic: 'https://image.com',
    };

    const res = await put('/user/profile/edit', mockUser, token);

    expect(res.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(res.body.message).toBe('user with that email already exists');
  });

  test('Everything OK', async () => {
    const token = await saveUserInDB();
    const mockUser = {
      email: 'hi@gmail.com',
      username: 'test username',
      profilePic: 'https://image.com',
    };

    const res = await put('/user/profile/edit', mockUser, token);

    expect(res.status).toBe(HttpStatusCode.OK);
    expect(res.body.data.email).toBe(mockUser.email);
    expect(res.body.data.username).toBe(mockUser.username);
    expect(res.body.data.profilePic).toBe(mockUser.profilePic);
  });
});
