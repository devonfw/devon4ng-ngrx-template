// import * as faker from 'faker';

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
    id: 0, // faker.random.number(),
    name: 'a', // faker.name.firstName(),
    surname: 'b', // faker.name.lastName(),
    mail: 'cap@captureEvents.com', //faker.internet.email(),
    age: 21, //faker.random.number(),
  };
};
