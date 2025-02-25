import {Injectable} from '@angular/core';
import {User} from '../classes/user';
import {CompanyFactory} from './company.factory';
import {Company} from '../classes/company';

@Injectable({
  providedIn: 'root'
})
export class UserFactory {
  static create(jsonData: any): User {
    let company: Company | null;

    if (jsonData.PIB !== null) {
      company = CompanyFactory.create(jsonData.PIB);
    } else {
      company = null;
    }

    return new User(
      jsonData.id,
      company,
      jsonData.last_login,
      jsonData.is_superuser,
      jsonData.username,
      jsonData.email,
      jsonData.is_staff,
      jsonData.is_active,
      jsonData.date_joined,
      jsonData.phone,
      jsonData.address,
      jsonData.is_reseller
    );
  }
}
