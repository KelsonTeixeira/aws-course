import { SpaceEntry } from "../model/Model";


export class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`);
  }
}

export class JsonError extends Error {};

export function validateSpaceEntry(arg: any) {
 if((arg as SpaceEntry).location == undefined) throw new MissingFieldError('location');
 if((arg as SpaceEntry).country == undefined) throw new MissingFieldError('country');
 if((arg as SpaceEntry).name == undefined) throw new MissingFieldError('name');
 if((arg as SpaceEntry).photoUrl == undefined) throw new MissingFieldError('photoUrl');
}