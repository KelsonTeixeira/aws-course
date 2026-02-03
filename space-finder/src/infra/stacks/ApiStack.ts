import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  helloLambdaIntegrations: LambdaIntegration;
}

export class ApiStack extends Stack {
  constructor(scode: Construct, id: string, props?: ApiStackProps) {
    super(scode, id, props);

    const api = new RestApi(this, 'SpaceFinderApi');
    const spaceResources = api.root.addResource('spaces');
    spaceResources.addMethod('GET', props?.helloLambdaIntegrations);
  }
}