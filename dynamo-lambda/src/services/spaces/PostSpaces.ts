import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';


export async function postSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
 const ID = uuidv4();
 const body = JSON.parse(event.body || '{}');

 body.id = ID;

 const result = await ddbClient.send(new PutItemCommand({ // other option in the PostDocSpaces file
  TableName: process.env.TABLE_NAME,
  Item: marshall(body)
  // Item: {
  //   id: {
  //     S: ID
  //   },
  //   location: {
  //     S: body.location
  //   }
  // }
 }));

 console.log(result);

 return {
  statusCode: 201,
  body: JSON.stringify({
    ID
  })
 }
}