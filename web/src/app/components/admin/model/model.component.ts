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
import {ModelDialog, YesNoDialogComponent} from '../../dialogs/dialogs.component';
import {ModelService} from '../../../services/model.service';
import {Model} from '../../../classes/model';

@Component({
  selector: 'app-model',
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
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _modelService = inject(ModelService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'yearOfManufacture', 'manufacturer', 'engine', 'options'];
  dataSource: MatTableDataSource<Model>;
  private models: Model[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._modelService.getAll().subscribe({
      next: data => {
        this.models = data;
        this.dataSource = new MatTableDataSource(this.models);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(ModelDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe({
      next: (model) => {
        if (model) {
          this._notification.showTimedNotification('Model was successfully created!');
          this.getAll();
        }
      }
    });
  }

  view(id: number) {
    const selectedModel = this.models.find(m => m.id === id);

    this._dialog.open(ModelDialog, {
      data: {object: selectedModel, isView: true}
    }).afterClosed().subscribe(() => {
    });
  }

  edit(id: number) {
    const selectedModel = this.models.find(m => m.id === id);

    this._dialog.open(ModelDialog, {
      data: {object: selectedModel, isView: false}
    }).afterClosed().subscribe({
      next: (model) => {
        if (model) {
          this._notification.showTimedNotification('Model was successfully updated!');
          this.getAll();
        }
      }
    });
  }

  delete(id: number) {
    const selectedModel = this.models.find(m => m.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this model?\n${JSON.stringify(selectedModel)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._modelService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Model successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting model.');
          }
        })
      }
    });
  }
}
