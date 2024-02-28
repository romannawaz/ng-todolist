export interface User {
  id: number;
  [UserFields.NAME]: string;
  [UserFields.AGE]: number;
}

export enum UserFields {
  NAME = 'name',
  AGE = 'age',
}
