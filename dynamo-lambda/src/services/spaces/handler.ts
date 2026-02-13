import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { postSpace } from './PostSpaces';
import { getSpace } from './GetSpaces';

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

  let message: string;

  try {
    switch (event.httpMethod) {  
      case 'GET':
        const getResponse = await getSpace(event, ddbClient);
        console.log(getResponse);
        return getResponse;

      case 'POST':
        const postResponse = await postSpace(event, ddbClient);
        return postResponse;
      
      default:
        message = "Hello from unknown method!";
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    }
  }


  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({ message })
  };
  console.log(event);
  return response;
}

export { handler };