import {Role} from './role';

export class User {
  idUser: number;
  username: string;
  email: string;
  hash: string;
  salt: string;
  jwtToken: string;
  firstName: string;
  lastName: string;
  isActive: number;
  roleId: Role;
  idModem1: number;
  token?: string;
}

