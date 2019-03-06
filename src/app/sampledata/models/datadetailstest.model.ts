import * as faker from 'faker';

/* @export
 * @class TestDataDetails
 */
export class TestDataDetails {
  name?: string;
  surname?: string;
  age?: number;
  mail?: string;
  id?: number;
  pageSize?: number = 8;
  pageSizes?: number[] = [8, 16, 24];
  selectedRow?: any;
  size?: number;
  page?: number;
  searchTerms?: any;
  sort?: any[];
}
export const generateUser: any = (): TestDataDetails => {
  return {
    id: faker.random.number(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    mail: faker.internet.email(),
    age: faker.random.number(),
  };
};
