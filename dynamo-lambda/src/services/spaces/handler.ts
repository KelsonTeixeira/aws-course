import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { postSpace } from './PostSpaces';
import { getSpace } from './GetSpaces';
import { updateSpace } from './UpdateSpace';
import { deleteSpace } from './DeleteSpace';
import { JsonError, MissingFieldError } from '../shared/Validator';

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
        console.log(postResponse);
        return postResponse;

      case 'PUT':
        const putResponse = await updateSpace(event, ddbClient);
        console.log(putResponse);
        return putResponse;

      case 'DELETE':
        const deleteResponse = await deleteSpace(event, ddbClient);
        console.log(deleteResponse);
        return deleteResponse;
      
      default:
        message = "Hello from unknown method!";
        break;
    }
  } catch (error) {
    if(error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message })
      }
    }
    if(error instanceof JsonError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message })
      }
    }
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