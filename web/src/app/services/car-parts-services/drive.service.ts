import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConstants} from "../../../AppConstants";
import {Observable} from "rxjs";
import {Drive} from "../../classes/drive";

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(private http: HttpClient) {
  }

  getAllDrive(): Observable<any> {
    return this.http.get(AppConstants.GET_ALL_DRIVE);
  }

  getDriveById(id: number): Observable<any> {
    return this.http.get(`${AppConstants.GET_DRIVE_BY_ID}/${id}`);
  }

  createDrive(drive: Drive) {
    let object: any = {};

    for (const [key, value] of Object.entries(drive)) {
      object[key] = value;
    }

    return this.http.post(AppConstants.CREATE_DRIVE, JSON.stringify(object), {withCredentials: true});
  }

  updateDrive(id: number, driveType: string){
    let object = {id: id, driveType: driveType}

    return this.http.put(`${AppConstants.UPDATE_DRIVE_BY_ID}`, JSON.stringify(object), {withCredentials: true});
  }

  deleteDriveById(id: number){
    return this.http.delete(`${AppConstants.DELETE_DRIVE_BY_ID}/${id}`, {withCredentials: true});
  }
}
