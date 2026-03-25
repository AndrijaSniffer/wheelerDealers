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
import {TransmissionTypeService} from '@services/transmission-type.service';
import {TransmissionType} from '@classes/transmissionType';
import {YesNoDialogComponent} from '@dialogs/dialogs.component';
import {TransmissionDialog} from '@dialogs/transmission/transmission-dialog';

@Component({
  selector: 'app-transmission',
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
  templateUrl: './transmission-type.component.html',
  standalone: true,
  styleUrl: './transmission-type.component.css'
})
export class TransmissionTypeComponent {
  displayedColumns = ['id', 'type', 'options'];
  dataSource: MatTableDataSource<TransmissionType>;
  private readonly _notification = inject(NotificationService);
  private readonly _transmissionService = inject(TransmissionTypeService);
  private readonly _dialog = inject(MatDialog);
  private transmissionTypes: TransmissionType[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._transmissionService.getAll().subscribe({
      next: data => {
        this.transmissionTypes = data;
        this.dataSource = new MatTableDataSource(this.transmissionTypes);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(TransmissionDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('New transmission successfully created!');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const selectedTransmission: TransmissionType = this.transmissionTypes.find((t) => t.id === id);

    this._dialog.open(TransmissionDialog, {
      data: {object: selectedTransmission, isView: true}
    }).afterClosed().subscribe(() => {
    });
  }

  edit(id: number) {
    const selectedTransmission: TransmissionType = this.transmissionTypes.find((t) => t.id === id);

    this._dialog.open(TransmissionDialog, {
      data: {object: selectedTransmission, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Transmission successfully updated!');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const selectedTransmission: TransmissionType = this.transmissionTypes.find((t) => t.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this transmission?\n${JSON.stringify(selectedTransmission)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._transmissionService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Transmission successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting transmission.');
          }
        })
      }
    });
  }
}
