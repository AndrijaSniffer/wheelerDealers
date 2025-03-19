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
import {MatDialog} from '@angular/material/dialog';
import {AppUtil} from '../../../app.util';
import {YesNoDialogComponent} from '../../dialogs/dialogs.component';
import {EngineService} from '../../../services/engine.service';
import {Engine} from '../../../classes/engine';
import {EngineDialog} from '../../dialogs/engine/engine-dialog';

@Component({
  selector: 'app-engine',
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
  templateUrl: './engine.component.html',
  styleUrl: './engine.component.css'
})
export class EngineComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _engineService = inject(EngineService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'engineType', 'emissionClass', 'engineCode', 'horsepower', 'kilowatt', 'volume', 'options'];
  dataSource: MatTableDataSource<Engine>;
  private engines: Engine[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._engineService.getAll().subscribe({
      next: data => {
        this.engines = data;
        this.dataSource = new MatTableDataSource(this.engines);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(EngineDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe({
      next: (engine) => {
        if (engine) {
          this._notification.showTimedNotification('Engine was successfully created!');
          this.getAll();
        }
      }
    });
  }

  view(id: number) {
    const selectedEngine = this.engines.find(e => e.id === id);

    this._dialog.open(EngineDialog, {
      data: {object: selectedEngine, isView: true}
    }).afterClosed().subscribe(() => {
    });
  }

  edit(id: number) {
    const selectedEngine = this.engines.find(e => e.id === id);

    this._dialog.open(EngineDialog, {
      data: {object: selectedEngine, isView: false}
    }).afterClosed().subscribe({
      next: (engine) => {
        if (engine) {
          this._notification.showTimedNotification('Engine was successfully updated!');
          this.getAll();
        }
      }
    });
  }

  delete(id: number) {
    const selectedEngine = this.engines.find(e => e.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this engine?\n${JSON.stringify(selectedEngine)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._engineService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Engine successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting engine.');
          }
        })
      }
    });
  }
}
