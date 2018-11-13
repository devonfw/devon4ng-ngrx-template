export class Login {
   
    username?: string;
    password?: string;
    name ?: string;
    surname ?: string;
    age ?: number;
    email ?: string;
    id ?:number;
    pageSize ?: number = 8;
    pageSizes ?: number[] = [8, 16, 24];
    selectedRow ?: any;
   
  }