export interface User {
  id?: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  createdAt?: Date;
  updatedAt?: Date;
  access_token?: string;
}
