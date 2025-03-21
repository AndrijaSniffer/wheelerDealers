import {Component, inject} from '@angular/core';
import {MatMiniFabButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatList, MatListItem} from '@angular/material/list';
import {NotificationService} from '../../../services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {AppUtil} from '../../../app.util';
import {YesNoDialogComponent} from '../../dialogs/dialogs.component';
import {CarService} from '../../../services/car.service';
import {Car} from '../../../classes/car';
import {EngineDialog} from '../../dialogs/engine/engine-dialog';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-car',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatList,
    MatListItem,
    MatMiniFabButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    DatePipe
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _carService = inject(CarService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'user', 'model', 'transmission', 'fuel', 'interior', 'drivetrain', 'price', 'color',
    'chassisNumber', 'isPreowned', 'createdAt', 'options'];
  dataSource: MatTableDataSource<Car>;
  private cars: Car[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._carService.getAll().subscribe({
      next: data => {
        this.cars = data;
        this.dataSource = new MatTableDataSource(this.cars);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  // new() {
  //   this._dialog.open(EngineDialog, {
  //     data: {object: null, isView: false}
  //   }).afterClosed().subscribe({
  //     next: (engine) => {
  //       if (engine) {
  //         this._notification.showTimedNotification('Engine was successfully created!');
  //         this.getAll();
  //       }
  //     }
  //   });
  // }

  view(id: number) {
    const selectedCar = this.cars.find(c => c.id === id);

    this._dialog.open(EngineDialog, {
      data: {object: selectedCar, isView: true}
    }).afterClosed().subscribe(() => {
    });
  }

  // edit(id: number) {
  //   const selectedCar = this.cars.find(c => c.id === id);
  //
  //   this._dialog.open(EngineDialog, {
  //     data: {object: selectedCar, isView: false}
  //   }).afterClosed().subscribe({
  //     next: (engine) => {
  //       if (engine) {
  //         this._notification.showTimedNotification('Engine was successfully updated!');
  //         this.getAll();
  //       }
  //     }
  //   });
  // }

  delete(id: number) {
    const selectedCar = this.cars.find(c => c.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this car?\n${AppUtil.toRawJSONText(selectedCar)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._carService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Car successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting car.');
          }
        })
      }
    });
  }
}
