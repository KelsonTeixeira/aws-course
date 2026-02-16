import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';


export async function postSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

  const ID = uuidv4();
  const body = JSON.parse(event.body || '{}');

  body.id = ID;

  const result = await ddbDocClient.send(new PutItemCommand({ // other option in the PostDocSpaces file
    TableName: process.env.TABLE_NAME,
    Item: body
  }));

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({
      ID
    })
  }
}