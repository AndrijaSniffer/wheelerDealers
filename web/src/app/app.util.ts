import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {AccessToken} from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppUtil {
  static parseJsonErrorsToString(obj: any, result: string = ''): string {
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        result = AppUtil.parseJsonErrorsToString(item, result); // Recurse through array items
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          result = AppUtil.parseJsonErrorsToString(obj[key], result); // Recurse through object properties
        }
      }
    } else {
      result += `- ${obj}\n`; // Append primitive values with a newline
    }
    return result;
  }

  static toSnakeCase(input: string): string {
    if (!input || typeof input !== 'string') {
      throw new Error('Input must be a non-empty string.');
    }

    // Use a regular expression to replace uppercase letters with _<letter>
    return input.replace(/([A-Z])/g, '_$1').toLowerCase();
  }

  static toRawJSONText<T>(object: T): string {
    return JSON.stringify(object, null, 2);
  }

  static decodeJWTAccessToken(accessToken: string): AccessToken {
    return jwtDecode(accessToken) as AccessToken;
  }
}
