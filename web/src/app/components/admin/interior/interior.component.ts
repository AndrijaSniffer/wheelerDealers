import {Component, inject} from '@angular/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
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
import {InteriorDialog, YesNoDialogComponent} from '../../dialogs/dialogs.component';
import {InteriorService} from '../../../services/interior.service';
import {Interior} from '../../../classes/interior';

@Component({
  selector: 'app-interior',
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
  templateUrl: './interior.component.html',
  styleUrl: './interior.component.css'
})
export class InteriorComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _interiorService = inject(InteriorService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'doors', 'seats', 'steeringWheelLeft', 'color', 'options'];
  dataSource: MatTableDataSource<Interior>;
  private interiors: Interior[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._interiorService.getAll().subscribe({
      next: data => {
        this.interiors = data;
        this.dataSource = new MatTableDataSource(this.interiors);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(InteriorDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe(result => {
      console.warn(result);
      if (result) {
        this._notification.showTimedNotification('New interior was successfully created!');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const selectedInterior = this.interiors.find(i => i.id === id);

    this._dialog.open(InteriorDialog, {
      data: {object: selectedInterior, isView: true}
    }).afterClosed().subscribe(() => {});
  }

  edit(id: number) {
    const selectedInterior = this.interiors.find(i => i.id === id);

    this._dialog.open(InteriorDialog, {
      data: {object: selectedInterior, isView: false}
    }).afterClosed().subscribe(result => {
      console.warn(result);
      if (result) {
        this._notification.showTimedNotification('Interior was successfully updated!');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const selectedInterior = this.interiors.find(i => i.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this interior?\n${JSON.stringify(selectedInterior)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._interiorService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Interior successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting interior.');
          }
        })
      }
    });
  }
}
