import { Fn, Stack } from "aws-cdk-lib";

export function getSuffixFromStack(stack: Stack) {
  const shorStackID = Fn.select(2, Fn.split('/', stack.stackId));
  const stackSuffix = Fn.select(4, Fn.split('-', shorStackID));
  return stackSuffix;
}