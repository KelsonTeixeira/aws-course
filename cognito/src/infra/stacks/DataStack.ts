import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, Table as DynamoTable, ITable } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";

export class DataStack extends Stack {
  public readonly spacesTable: ITable;

  constructor(scode: Construct, id: string, props?: StackProps) {
    super(scode, id, props);

    const suffix = getSuffixFromStack(this);

    this.spacesTable = new DynamoTable(this, 'SpacesTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: `SpaceTable-${suffix}`
    })
  }
}