import {Component, inject} from '@angular/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatList, MatListItem} from '@angular/material/list';
import {NotificationService} from '@services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {AppUtil} from '../../../app.util';
import {YesNoDialogComponent} from '@dialogs/dialogs.component';
import {FuelService} from '@services/fuel.service';
import {Fuel} from '@classes/fuel';
import {FuelDialog} from '@dialogs/fuel/fuel-dialog';

@Component({
  selector: 'app-fuel',
  imports: [
    MatButton,
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
    MatHeaderCellDef
  ],
  templateUrl: './fuel.component.html',
  standalone: true,
  styleUrl: './fuel.component.css'
})
export class FuelComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _fuelService = inject(FuelService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'type', 'options'];
  dataSource: MatTableDataSource<Fuel>;
  private fuel: Fuel[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._fuelService.getAll().subscribe({
      next: data => {
        this.fuel = data;
        this.dataSource = new MatTableDataSource(this.fuel);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(FuelDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('New fuel was successfully created!');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const selectedFuel = this.fuel.find(f => f.id === id);

    this._dialog.open(FuelDialog, {
      data: {object: selectedFuel, isView: true}
    }).afterClosed().subscribe(() => {});
  }

  edit(id: number) {
    const selectedFuel = this.fuel.find(f => f.id === id);

    this._dialog.open(FuelDialog, {
      data: {object: selectedFuel, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Fuel was successfully updated!');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const selectedFuel = this.fuel.find(f => f.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this fuel?\n${JSON.stringify(selectedFuel)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._fuelService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Fuel successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting fuel.');
          }
        })
      }
    });
  }
}
