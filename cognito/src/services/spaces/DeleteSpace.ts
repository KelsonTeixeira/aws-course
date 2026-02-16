import { DeleteItemCommand, DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { hasAdminGroup } from "../shared/Utils";

export async function deleteSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  const isAuthorized = hasAdminGroup(event);

  if(!isAuthorized) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Only admins can delete spaces!' })
    }
  }

  const id = event?.queryStringParameters?.id;

  if (id) {
    const deleteResult = await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { 'id': { S: id } }
    }));

    return {
      statusCode: 200,
      body: JSON.stringify('Item deleted:'+ id)
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid request' })
  }
}