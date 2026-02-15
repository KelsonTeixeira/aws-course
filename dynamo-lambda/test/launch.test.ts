import { handler } from '../src/services/spaces/handler';


handler({
  httpMethod: 'DELETE',
  queryStringParameters: {
    id: '31d28d48-5bb5-4fef-aaae-372ddc643bde'
  },
  // body: JSON.stringify({
  //   //location: 'Brasília',
  //   country: 'Brasil'
  // })
} as any, {} as any );