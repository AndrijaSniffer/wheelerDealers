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
import {NotificationService} from '../../../services/notification.service';
import {EngineTypeService} from '../../../services/engine-type.service';
import {MatDialog} from '@angular/material/dialog';
import {EngineType} from '../../../classes/engine-type';
import {EngineTypeDialog, YesNoDialogComponent} from '../../dialogs/dialogs.component';

@Component({
  selector: 'app-engine-type',
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
  templateUrl: './engine-type.component.html',
  styleUrl: './engine-type.component.css'
})
export class EngineTypeComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _engineTypeService = inject(EngineTypeService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'type', 'options'];
  dataSource: MatTableDataSource<EngineType>;
  private engineTypes: EngineType[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._engineTypeService.getAll().subscribe({
      next: data => {
        this.engineTypes = data;
        this.dataSource = new MatTableDataSource(this.engineTypes);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(err.message);
      }
    });
  }


  new() {
    this._dialog.open(EngineTypeDialog, {
      data: {object: null, isView: false},
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('New engine type successfully created!');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const engineTypeSelected = this.engineTypes.find(type => type.id === id);

    this._dialog.open(EngineTypeDialog, {
      data: {object: engineTypeSelected, isView: true},
    }).afterClosed().subscribe(() => {
    });
  }

  edit(id: number) {
    const engineTypeSelected = this.engineTypes.find(type => type.id === id);

    this._dialog.open(EngineTypeDialog, {
      data: {object: engineTypeSelected, isView: false},
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Engine type successfully updated!');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const engineTypeSelected = this.engineTypes.find(type => type.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this engine type?\n${JSON.stringify(engineTypeSelected)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._engineTypeService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Engine type successfully deleted!');
            this.getAll();
          },
          error: () => {
            this._notification.showTimedErrorNotification('Error deleting engine type.');
          }
        })
      }
    });
  }
}
