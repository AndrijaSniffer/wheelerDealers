import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

export interface IDialogData<T> {
  object: T,
  isView: boolean
}

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: 'yes-no.dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  standalone: true,
  styles: ''
})
export class YesNoDialogComponent {
  textToDisplay = '';
  private readonly _dialogRef = inject(MatDialogRef<YesNoDialogComponent>);
  private readonly _data = inject<string>(MAT_DIALOG_DATA);

  constructor() {
    this.textToDisplay = this._data;
  }

  dismiss(value: boolean) {
    this._dialogRef.close(value);
  }
}
