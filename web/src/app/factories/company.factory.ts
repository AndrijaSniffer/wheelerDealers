import {Injectable} from '@angular/core';
import {Company} from '../classes/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyFactory {
  static create(jsonData: any): Company {
    return new Company(
      jsonData.PIB,
      jsonData.address,
      jsonData.phone,
      jsonData.logo_url,
      jsonData.website_url
    )
  }
}
