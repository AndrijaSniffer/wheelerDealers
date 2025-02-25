import {Company} from './company';

export class User {
  id: number;
  PIB: Company | null;
  lastLogin: Date;
  isSuperuser: boolean;
  username: string;
  password: string;
  email: string;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: Date;
  phone: string;
  address: string;
  isReseller: boolean;

  constructor(id: number, PIB: Company | null, lastLogin: Date, isSuperuser: boolean, username: string, email: string,
              isStaff: boolean, isActive: boolean, dateJoined: Date, phone: string, address: string, isReseller: boolean) {
    this.id = id;
    this.PIB = PIB;
    this.lastLogin = lastLogin;
    this.isSuperuser = isSuperuser;
    this.username = username;
    this.email = email;
    this.isStaff = isStaff;
    this.isActive = isActive;
    this.dateJoined = dateJoined;
    this.phone = phone;
    this.address = address;
    this.isReseller = isReseller;
  }
}
