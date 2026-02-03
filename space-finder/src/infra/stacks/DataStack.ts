import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class DataStack extends Stack {
  constructor(scode: Construct, id: string, props?: StackProps) {
    super(scode, id, props);
  }
}