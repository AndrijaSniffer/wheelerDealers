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
import {EmissionClassService} from '@services/emission-class.service';
import {EmissionClass} from '@classes/emission-class';
import {YesNoDialogComponent} from '@dialogs/dialogs.component';
import {EmissionClassDialog} from '@dialogs/emission-class/emission-class-dialog';

@Component({
  selector: 'app-emission-class',
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
  templateUrl: './emission-class.component.html',
  standalone: true,
  styleUrl: './emission-class.component.css'
})
export class EmissionClassComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _emissionClassService = inject(EmissionClassService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'className', 'options'];
  dataSource: MatTableDataSource<EmissionClass>;
  private emissionClasses: EmissionClass[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._emissionClassService.getAll().subscribe({
      next: data => {
        this.emissionClasses = data;
        this.dataSource = new MatTableDataSource(this.emissionClasses);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(err.message);
      }
    });
  }

  new() {
    this._dialog.open(EmissionClassDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this._notification.showTimedNotification('New emission class has been created');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const emissionClassSelected = this.emissionClasses.find(ec => ec.id === id);

    this._dialog.open(EmissionClassDialog, {
      data: {object: emissionClassSelected, isView: true}
    }).afterClosed().subscribe(() => {});
  }

  edit(id: number) {
    const emissionClassSelected = this.emissionClasses.find(ec => ec.id === id);

    this._dialog.open(EmissionClassDialog, {
      data: {object: emissionClassSelected, isView: false}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this._notification.showTimedNotification('Emission class has been updated');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const emissionClassSelected = this.emissionClasses.find(ec => ec.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this emission class?\n${JSON.stringify(emissionClassSelected)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._emissionClassService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Engine type successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting emission class.');
          }
        })
      }
    });
  }
}
