import { APIGatewayProxyEvent } from "aws-lambda";
import { JsonError } from "./Validator";

export function parseJSON(arg: string) {
  try {
    return JSON.parse(arg);
  } catch (error) {
    throw new JsonError('Invalid JSON string!');
  }
}

export function hasAdminGroup(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims['cognito:groups'];
  if(groups) {
    return (groups as string).includes('admins');
  }
  return false;
}