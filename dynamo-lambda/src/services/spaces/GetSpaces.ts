import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function getSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  if (event.queryStringParameters) {
    const id = event?.queryStringParameters?.id;

    if(id) {
      const getItemResponse = await ddbClient.send(new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          'id': { S: id}
        }
      }));

      if(getItemResponse.Item) {
        const unmarshalledItem = unmarshall(getItemResponse.Item);
        return {
          statusCode: 200,
          body: JSON.stringify(unmarshalledItem)
        }
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Item not found' })
        }
      }

    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'id required' })
      }
    }
  };

  const result = await ddbClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME
  }));

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify(result.Items)
  }
}