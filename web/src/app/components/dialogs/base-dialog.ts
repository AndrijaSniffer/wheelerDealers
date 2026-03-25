import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {IDialogData} from '@dialogs/dialogs.component';
import {AppUtil} from '../../app.util';
import {NotificationService} from '@services/notification.service';

export abstract class BaseDialog<T> {
  isView: boolean = true;
  isNewOrEdit: boolean = true;
  jsonCurrentObject: string = '';
  form: FormGroup;

  constructor(
    protected dialogRef: MatDialogRef<any>,
    protected fb: FormBuilder,
    protected dialogData: IDialogData<T> | null,
    protected notification: NotificationService,
  ) {
    this.isView = this.dialogData?.isView ?? true;
    if (this.isView) {
      this.jsonCurrentObject = AppUtil.toRawJSONText(this.dialogData?.object);
    }
  }

  dismiss(value: any) {
    this.dialogRef.close(value);
  }

  abstract submit(): void; // Force subclasses to implement their own submit logic
}
