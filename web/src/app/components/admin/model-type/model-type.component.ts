import {Component, inject} from '@angular/core';
import {MatButton, MatMiniFabButton} from "@angular/material/button";
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
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {NotificationService} from '@services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {ModelTypeService} from '@services/model-type.service';
import {ModelType} from '@classes/model-type';
import {AppUtil} from '../../../app.util';
import {YesNoDialogComponent} from '@dialogs/dialogs.component';
import {ModelTypeDialog} from '@dialogs/model-type/model-type-dialog';

@Component({
  selector: 'app-model-type',
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
  templateUrl: './model-type.component.html',
  standalone: true,
  styleUrl: './model-type.component.css'
})
export class ModelTypeComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _modelTypeService = inject(ModelTypeService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'type', 'options'];
  dataSource: MatTableDataSource<ModelType>;
  private modelTypes: ModelType[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._modelTypeService.getAll().subscribe({
      next: data => {
        this.modelTypes = data;
        this.dataSource = new MatTableDataSource(this.modelTypes);
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  new() {
    this._dialog.open(ModelTypeDialog, {
      data: {object: null, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Model Type was successfully created!');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const selectedModelType = this.modelTypes.find(mt => mt.id === id);

    this._dialog.open(ModelTypeDialog, {
      data: {object: selectedModelType, isView: true}
    }).afterClosed().subscribe(() => {});
  }

  edit(id: number) {
    const selectedModelType = this.modelTypes.find(mt => mt.id === id);

    this._dialog.open(ModelTypeDialog, {
      data: {object: selectedModelType, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Model Type was successfully updated!');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const selectedModelType = this.modelTypes.find(mt => mt.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this model type?\n${JSON.stringify(selectedModelType)}`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._modelTypeService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Model type successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error deleting model type.');
          }
        })
      }
    });
  }
}
