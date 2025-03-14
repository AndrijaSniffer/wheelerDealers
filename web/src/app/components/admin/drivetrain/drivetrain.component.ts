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
import {DrivetrainDialog, YesNoDialogComponent} from '../../dialogs/dialogs.component';
import {DrivetrainService} from '../../../services/drivetrain.service';
import {Drivetrain} from '../../../classes/drivetrain';

@Component({
  selector: 'app-drivetrain',
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
  templateUrl: './drivetrain.component.html',
  styleUrl: './drivetrain.component.css'
})
export class DrivetrainComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _drivetrainService = inject(DrivetrainService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'type', 'options'];
  dataSource: MatTableDataSource<Drivetrain>;
  private drivetrains: Drivetrain[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._drivetrainService.getAll().subscribe({
      next: data => {
        this.drivetrains = data;
        this.dataSource = new MatTableDataSource(this.drivetrains);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(DrivetrainDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe(result => {
      console.warn(result);
      if (result) {
        this._notification.showTimedNotification('Drivetrain was successfully created!');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const selectedModelType = this.drivetrains.find(mt => mt.id === id);

    this._dialog.open(DrivetrainDialog, {
      data: {object: selectedModelType, isView: true}
    }).afterClosed().subscribe(() => {});
  }

  edit(id: number) {
    const selectedModelType = this.drivetrains.find(mt => mt.id === id);

    this._dialog.open(DrivetrainDialog, {
      data: {object: selectedModelType, isView: false}
    }).afterClosed().subscribe(result => {
      console.warn(result);
      if (result) {
        this._notification.showTimedNotification('Drivetrain was successfully updated!');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const selectedModelType = this.drivetrains.find(mt => mt.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this drivetrain?\n${JSON.stringify(selectedModelType)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._drivetrainService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Drivetrain successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting drivetrain.');
          }
        })
      }
    });
  }
}
