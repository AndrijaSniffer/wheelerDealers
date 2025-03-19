import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Car} from '../../../classes/car';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'car-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: 'car-dialog.html',
  styleUrl: 'car-dialog.css'
})
export class CarDialog extends BaseDialog<Car> {
  private readonly _dialogRef = inject(MatDialogRef<CarDialog>);
  private readonly _data = inject<IDialogData<Car> | null>(MAT_DIALOG_DATA);
  // private readonly _carService: CarService = inject(CarService);
  // private readonly _authService: AuthService = inject(AuthService);
  // private readonly _modelService: ModelService = inject(ModelService);
  // private readonly _transmissionService: TransmissionService = inject(TransmissionService);
  // private readonly _fuelService: FuelService = inject(FuelService);
  // private readonly _interiorService: InteriorService = inject(InteriorService);

  constructor(
    dialogRef: MatDialogRef<CarDialog>,
    fb: FormBuilder,
    notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Car> | null
  ) {
    super(dialogRef, fb, dialogData, notification);
  }

  submit() {
  }
}
