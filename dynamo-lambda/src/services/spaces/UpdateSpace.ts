import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

  const id = event?.queryStringParameters?.id;
  const body = event.body ? JSON.parse(event.body) : null;

  if (id && body) {
    const bodyKey = Object.keys(body)[0];
    const bodyValue = String(body[bodyKey as keyof typeof body]);

    const updateResult = await ddbClient.send(new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { 'id': { S: id } },
      UpdateExpression: 'set #key = :value',
      ExpressionAttributeValues: {
        ':value': { S: bodyValue }
      },
      ExpressionAttributeNames: {
        '#key': bodyKey
      },
      ReturnValues: 'UPDATED_NEW'
    }));

    return {
      statusCode: 204,
      body: JSON.stringify(updateResult.Attributes)
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid request' })
  }
}