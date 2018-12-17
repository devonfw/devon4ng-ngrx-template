
import * as faker from 'faker';
export class Login {
  username?: string;
  password?: string;
  name ?: string;
  surname ?: string;
  age ?: number;
  email ?: string;
  id ?: number;
  pageSize ?: number = 8;
  pageSizes ?: number[] = [8, 16, 24];
  selectedRow ?: any;
  }
export const generateUser: any = ():
  Login => {
    return {
      id: faker.random.number(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      email: faker.internet.email(),
      age: faker.random.number(),
    };
  };
