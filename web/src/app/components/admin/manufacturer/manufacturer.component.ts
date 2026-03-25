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
import {ManufacturerService} from '@services/manufacturer.service';
import {Manufacturer} from '@classes/manufacturer';
import {YesNoDialogComponent} from '@dialogs/dialogs.component';
import {ManufacturerDialog} from '@dialogs/manufacturer/manufacturer-dialog';

@Component({
  selector: 'app-manufacturer',
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
  templateUrl: './manufacturer.component.html',
  standalone: true,
  styleUrl: './manufacturer.component.css'
})
export class ManufacturerComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _manufacturerService = inject(ManufacturerService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'countryName', 'name', 'options'];
  dataSource: MatTableDataSource<Manufacturer>;
  private manufacturers: Manufacturer[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._manufacturerService.getAll().subscribe({
      next: data => {
        this.manufacturers = data;
        this.dataSource = new MatTableDataSource(this.manufacturers);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(ManufacturerDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe({
      next: (manufacturer) => {
        if(manufacturer) {
          this._notification.showTimedNotification('Manufacturer was successfully created!');
          this.getAll();
        }
      }
    });
  }

  view(id: number) {
    const selectedManufacturer = this.manufacturers.find(m => m.id === id);

    this._dialog.open(ManufacturerDialog, {
      data: {object: selectedManufacturer, isView: true}
    }).afterClosed().subscribe(() => {});
  }

  edit(id: number) {
    const selectedManufacturer = this.manufacturers.find(m => m.id === id);

    this._dialog.open(ManufacturerDialog, {
      data: {object: selectedManufacturer, isView: false}
    }).afterClosed().subscribe({
      next: (manufacturer) => {
        if(manufacturer) {
          this._notification.showTimedNotification('Manufacturer was successfully updated!');
          this.getAll();
        }
      }
    });
  }

  delete(id: number) {
    const selectedManufacturer = this.manufacturers.find(m => m.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this manufacturer?\n${JSON.stringify(selectedManufacturer)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._manufacturerService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Manufacturer successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting manufacturer.');
          }
        })
      }
    });
  }
}
