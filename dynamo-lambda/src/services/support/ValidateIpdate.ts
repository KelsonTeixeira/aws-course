

export function validateUpdateEvent(event: any): boolean {
  const isValid = event.queryStringParameters
    && ('id' in event.queryStringParameters)
    && event.body;
  return isValid;
}