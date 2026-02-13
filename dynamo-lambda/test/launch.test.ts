import { handler } from '../src/services/spaces/handler';


handler({
  httpMethod: 'GET',
  queryStringParameters: {
    id: 'eb7ddf61-0896-4263-bb47-da11a3d7c41e'
  }
  // body: JSON.stringify({
  //   location: 'New York',
  //   country: 'USA'
  // })
} as any, {} as any );