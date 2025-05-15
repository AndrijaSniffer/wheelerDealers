import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Car, CarDTO} from '../../../classes/car';
import {IDialogData} from '../dialogs.component';
import {BaseDialog} from '../base-dialog';
import {NotificationService} from '../../../services/notification.service';
import {CarService} from '../../../services/car.service';
import {AuthService} from '../../../services/auth.service';
import {ModelService} from '../../../services/model.service';
import {TransmissionService} from '../../../services/transmission.service';
import {FuelService} from '../../../services/fuel.service';
import {InteriorService} from '../../../services/interior.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatList, MatListItem} from '@angular/material/list';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {DrivetrainService} from '../../../services/drivetrain.service';
import {Model} from '../../../classes/model';
import {Transmission} from '../../../classes/transmission';
import {Fuel} from '../../../classes/fuel';
import {Interior} from '../../../classes/interior';
import {Drivetrain} from '../../../classes/drivetrain';
import {ManufacturerService} from '../../../services/manufacturer.service';
import {Manufacturer} from '../../../classes/manufacturer';
import {ConvertEngineVolumePipe} from '../../../pipes/convert-engine-volume.pipe';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {AppUtil} from '../../../app.util';
import {AppUser} from '../../../app.user';

@Component({
  selector: 'car-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatOption,
    MatSelect,
    ConvertEngineVolumePipe,
    MatIconButton,
    MatIcon,
    MatCheckbox
  ],
  templateUrl: 'car-dialog.html',
  styleUrl: 'car-dialog.css'
})
export class CarDialog extends BaseDialog<Car> {
  manufacturers: Manufacturer[] = [];
  models: Model[] = [];
  transmissions: Transmission[] = [];
  fuel: Fuel[] = [];
  interiors: Interior[] = [];
  drivetrains: Drivetrain[] = [];
  private readonly _carService: CarService = inject(CarService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _appUser: AppUser = inject(AppUser);
  private readonly _manufacturerService: ManufacturerService = inject(ManufacturerService);
  private readonly _modelService: ModelService = inject(ModelService);
  private readonly _transmissionService: TransmissionService = inject(TransmissionService);
  private readonly _fuelService: FuelService = inject(FuelService);
  private readonly _interiorService: InteriorService = inject(InteriorService);
  private readonly _drivetrainService: DrivetrainService = inject(DrivetrainService);

  constructor(
    dialogRef: MatDialogRef<CarDialog>,
    fb: FormBuilder,
    notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Car> | null
  ) {
    super(dialogRef, fb, dialogData, notification);

    this.form = fb.group({
      manufacturer: [null, Validators.required],
      model: [null, Validators.required,],
      transmission: [null, Validators.required],
      fuel: [null, Validators.required],
      interior: [null, Validators.required],
      drivetrain: [null, Validators.required],
      price: [100.00, Validators.required],
      color: [null],
      chassisNumber: [null],
      isPreowned: [true, Validators.required]
    });

    this.form.get('model')?.disable();

    if (this.isView) {
      // View mode: Display raw JSON of the object
      this.jsonCurrentObject = AppUtil.toRawJSONText(dialogData?.object);
      this.form.disable(); // Optionally disable the form in view mode
    } else {
      this._manufacturerService.getAll().subscribe({
        next: manufacturers => {
          this.manufacturers = manufacturers;

          this._transmissionService.getAll().subscribe({
            next: transmissions => {
              this.transmissions = transmissions;

              this._fuelService.getAll().subscribe({
                next: fuel => {
                  this.fuel = fuel;

                  this._interiorService.getAll().subscribe({
                    next: interiors => {
                      this.interiors = interiors;

                      this._drivetrainService.getAll().subscribe({
                        next: drivetrains => {
                          this.drivetrains = drivetrains;

                          if (dialogData.object) {
                            this.models.push(dialogData.object.model);
                            this.form.patchValue({
                              manufacturer: dialogData.object.model.manufacturer.id,
                              model: dialogData.object.model.id,
                              transmission: dialogData.object.transmission.id,
                              fuel: dialogData.object.fuel.id,
                              interior: dialogData.object.interior.id,
                              drivetrain: dialogData.object.drivetrain.id,
                              price: dialogData.object.price,
                              color: dialogData.object.color,
                              chassisNumber: dialogData.object.chassisNumber,
                              isPreowned: dialogData.object.isPreowned
                            });
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }

  updateModel(event: MatSelectChange) {
    this._modelService.getByManufacturerId(event.value).subscribe({
      next: models => {
        this.models = models;
        this.form.get('model')?.enable();
      }
    });
  }

  submit() {
    if(this.form.valid){
      if(this.isNewOrEdit){
        const newCar: CarDTO = {
          id: null,
          model: this.form.get('model')!.value,
          user: this._appUser.user.id,
          transmission: this.form.get('transmission')!.value,
          drivetrain: this.form.get('drivetrain')!.value,
          fuel: this.form.get('fuel')!.value,
          color: this.form.get('color')!.value,
          chassisNumber: this.form.get('chassisNumber')!.value,
          interior: this.form.get('interior')!.value,
          price: this.form.get('price')!.value,
          isPreowned: this.form.get('isPreowned')!.value,
          createdAt: new Date()
        };

        console.warn(newCar);

        this._carService.create(newCar).subscribe({
          next: car => {
            this.dismiss(car);
          },
          error: (error) => {
            console.error('Error creating car:', error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        })
      }
    }
  }
}
