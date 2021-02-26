/* @export
 * @class TestDataDetails
 */
export class TestDataDetails {
  name?: string;
  surname?: string;
  age?: number;
  email?: string;
  id?: number;
  pageSize = 8;
  pageSizes?: number[] = [8, 16, 24];
  selectedRow?: any;
  size?: number;
  page?: number;
  searchTerms?: any;
  sort?: any[];
}

export const generateUser = () => ({
  id: 0,
  name: 'name',
  surname: 'surname',
  email: 'mail@mail.com',
  age: 20,
});

export const generateUserUpdate = () => ({
  id: 0,
  changes: {
    name: 'name',
    surname: 'surname',
    email: 'mail@mail.com',
    age: 20,
  },
});
