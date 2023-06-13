import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants, Search} from "../../AppConstants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  defaultSearch(): Observable<any>{
    return this.http.get(AppConstants.DEFAULT_SEARCH)
  }

  normalSearch(filter: Search): Observable<any>{
    return this.http.post(AppConstants.NORMAL_SEARCH, JSON.stringify(filter), {withCredentials: true});
  }
}
