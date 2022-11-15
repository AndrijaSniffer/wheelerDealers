export class User {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  isSuperuser?: boolean;
  isStaff?: boolean;
  isActive?: boolean;
  dateJoined?: string;
}
