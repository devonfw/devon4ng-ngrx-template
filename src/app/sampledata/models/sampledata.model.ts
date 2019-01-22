import * as faker from 'faker';
export class Sampledata {
  username?: string;
  password?: string;
  name?: string;
  surname?: string;
  age?: number;
  mail?: string;
  id?: number;
  pageSize?: number = 8;
  pageSizes?: number[] = [8, 16, 24];
  selectedRow?: any;
}
export const generateUser: any = (): Sampledata => {
  return {
    id: faker.random.number(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    mail: faker.internet.email(),
    age: faker.random.number(),
  };
};
