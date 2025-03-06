import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { CompanyFactory } from './company.factory';
import { Company } from '../classes/company';

@Injectable({
  providedIn: 'root'
})
export class UserFactory {
  static create(jsonString: any): User {
    // Parse the input if it’s a string; otherwise, use it as-is
    const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;

    // Normalize company (PIB)
    const pib = parsed.PIB ?? parsed.pib; // Check both Angular and server styles
    const company: Company | null = pib ? CompanyFactory.create(pib) : null;

    // Normalize other fields, supporting both naming conventions
    const id = parsed.id ?? parsed.user_id;
    const lastLogin = parsed.lastLogin ?? parsed.last_login;
    const isSuperuser = parsed.isSuperuser ?? parsed.is_superuser;
    const username = parsed.username ?? parsed.user_name;
    const email = parsed.email;
    const isStaff = parsed.isStaff ?? parsed.is_staff;
    const isActive = parsed.isActive ?? parsed.is_active;
    const dateJoined = parsed.dateJoined ?? parsed.date_joined;
    const phone = parsed.phone ?? parsed.user_phone;
    const address = parsed.address ?? parsed.user_address;
    const isReseller = parsed.isReseller ?? parsed.is_reseller;

    // Create and return the User object
    return new User(
      id,
      company,
      lastLogin,
      isSuperuser,
      username,
      email,
      isStaff,
      isActive,
      dateJoined,
      phone,
      address,
      isReseller
    );
  }
}
