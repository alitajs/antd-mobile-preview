import { request } from 'alita';

const MOCK_HTTP_PREFIX = 'https://alitahaha';

export async function mockQuery(data: any): Promise<any> {
  return request(`${MOCK_HTTP_PREFIX}/api/hello`, { method: 'post', data });
}
