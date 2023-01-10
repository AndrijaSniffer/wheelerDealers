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
    return this.http.get(`${AppConstants.GET_DRIVE_BY_ID}${id}`);
  }

  createDrive(drive: Drive) {
    let formData: FormData = new FormData();

    for (const [key, value] of Object.entries(drive)) {
      formData.append(key, value);
    }

    return this.http.post(AppConstants.CREATE_DRIVE, formData, {withCredentials: true});
  }

  updateDrive(id: number, driveType: string){
    let formData: FormData = new FormData();

    formData.append('drive_type', driveType);

    return this.http.put(`${AppConstants.UPDATE_DRIVE_BY_ID}${id}/`, formData, {withCredentials: true});
  }

  deleteDriveById(id: number){
    return this.http.delete(`${AppConstants.DELETE_DRIVE_BY_ID}${id}`, {withCredentials: true});
  }
}
