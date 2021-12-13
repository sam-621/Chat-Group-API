import req from 'supertest';
import { API_KEY } from '../../src/common/config/env.config';
import { App } from '../../src/modules/app';
const app = new App().app;

export const post = async (url: string, data: object): Promise<req.Test> => {
  return await req(app).post(url).set('authorization', API_KEY).send(data);
};
