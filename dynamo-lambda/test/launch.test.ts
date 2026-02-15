import { handler } from '../src/services/spaces/handler';


handler({
  httpMethod: 'POST',
  // queryStringParameters: {
  //   id: '31d28d48-5bb5-4fef-aaae-372ddc643bde'
  // },
  body: JSON.stringify({
    location: 'Brasília',
    country: 'Brasil',
    name: 'Café do Museu',
    photoUrl: 'https://www.brasil247.com/_next/image?url=https%3A%2F%2Fcdn.brasil247.com%2Fpb-b247gcp%2Fswp%2Fjtjeq9%2Fmedia%2F20241111081132_3c96f5d8921888a026eb342d9cfd0e2f28d0a903a628bc515a7406621706f0c2.webp&w=1200&q=75'
  })
} as any, {} as any ).then(response => console.log(response));