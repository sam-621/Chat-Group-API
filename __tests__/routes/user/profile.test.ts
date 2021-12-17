import { clearDatabase, dbClose, dbConnection } from '../../utils/db-handler.util';

beforeAll(dbConnection);
afterEach(clearDatabase);
afterAll(dbClose);

describe('Profile route', () => {
  test('Invalid token', async());
});
