import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Drivetrain} from '@classes/drivetrain';
import {AppConstants} from '../app.constants';
import {mapToDrivetrain} from '../app.mappers';
import {AppUtil} from '../app.util';

@Injectable({
  providedIn: 'root'
})
export class DrivetrainService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<Drivetrain[]> {
    return this._http.get<any[]>(AppConstants.DRIVETRAINS_URL).pipe(
      map((response: any[]) => response.map(mapToDrivetrain))
    );
  }

  create(fuel: Drivetrain): Observable<Drivetrain> {
    return this._http.post<Drivetrain>(AppConstants.DRIVETRAINS_URL, AppUtil.fromClassToFormData(fuel));
  }

  update(fuel: Drivetrain): Observable<Drivetrain> {
    return this._http.put<Drivetrain>(`${AppConstants.DRIVETRAINS_URL}/${fuel.id}`, AppUtil.fromClassToFormData(fuel));
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${AppConstants.DRIVETRAINS_URL}/${id}`);
  }
}
