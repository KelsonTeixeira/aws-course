import { Stack, StackProps } from "aws-cdk-lib";
import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration, MethodOptions, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  spacesLambdaIntegrations: LambdaIntegration;
  userPool: IUserPool;
}

export class ApiStack extends Stack {
  constructor(scode: Construct, id: string, props?: ApiStackProps) {
    super(scode, id, props);

    const api = new RestApi(this, 'SpaceFinderApi');

    const authorizer = new CognitoUserPoolsAuthorizer(this, 'SpacesApiAuthorizer', {
      cognitoUserPools: [props!.userPool],
      identitySource: 'method.request.header.Authorization'
    });

    authorizer._attachToApi(api);

    const optionsWithAuth: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.authorizerId
      }
    };

    const spaceResources = api.root.addResource('spaces');
    spaceResources.addMethod('GET', props?.spacesLambdaIntegrations, optionsWithAuth);
    spaceResources.addMethod('POST', props?.spacesLambdaIntegrations, optionsWithAuth);
    spaceResources.addMethod('PUT', props?.spacesLambdaIntegrations, optionsWithAuth);
    spaceResources.addMethod('DELETE', props?.spacesLambdaIntegrations, optionsWithAuth);
  }
}