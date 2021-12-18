import { HttpStatusCode } from '../../../src/common/utils/httpStatusCodes';
import { clearDatabase, dbClose, dbConnection, saveUserInDB } from '../../utils/db-handler.util';
import { get } from '../../utils/petition';

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
