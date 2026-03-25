import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Car, CarDTO} from '@classes/car';
import {IDialogData} from '@dialogs/dialogs.component';
import {BaseDialog} from '@dialogs/base-dialog';
import {NotificationService} from '@services/notification.service';
import {CarService} from '@services/car.service';
import {ModelService} from '@services/model.service';
import {TransmissionTypeService} from '@services/transmission-type.service';
import {FuelService} from '@services/fuel.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {DrivetrainService} from '@services/drivetrain.service';
import {Model} from '@classes/model';
import {TransmissionType} from '@classes/transmissionType';
import {Fuel} from '@classes/fuel';
import {Drivetrain} from '@classes/drivetrain';
import {ManufacturerService} from '@services/manufacturer.service';
import {Manufacturer} from '@classes/manufacturer';
import {MatCheckbox} from '@angular/material/checkbox';
import {AppUtil} from '../../../app.util';
import {AppUser} from '../../../app.user';
import {EngineTypeService} from '@services/engine-type.service';
import {EmissionClassService} from '@services/emission-class.service';
import {EngineType} from '@classes/engine-type';
import {EmissionClass} from '@classes/emission-class';

@Component({
  selector: 'car-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatCheckbox
  ],
  templateUrl: 'car-dialog.html',
  standalone: true,
  styleUrls: ['car-dialog.css', '../dialogs.component.css']
})
export class CarDialog extends BaseDialog<Car> {
  manufacturers: Manufacturer[] = [];
  models: Model[] = [];
  transmissionTypes: TransmissionType[] = [];
  fuels: Fuel[] = [];
  drivetrains: Drivetrain[] = [];
  engineTypes: EngineType[] = [];
  emissionClasses: EmissionClass[] = [];
  currentYear = new Date().getFullYear();
  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  private readonly _carService: CarService = inject(CarService);
  private readonly _appUser: AppUser = inject(AppUser);
  private readonly _manufacturerService: ManufacturerService = inject(ManufacturerService);
  private readonly _modelService: ModelService = inject(ModelService);
  private readonly _transmissionTypeService: TransmissionTypeService = inject(TransmissionTypeService);
  private readonly _fuelService: FuelService = inject(FuelService);
  private readonly _drivetrainService: DrivetrainService = inject(DrivetrainService);
  private readonly _engineTypeService: EngineTypeService = inject(EngineTypeService);
  private readonly _emissionClassService: EmissionClassService = inject(EmissionClassService);

  constructor(
    dialogRef: MatDialogRef<CarDialog>,
    fb: FormBuilder,
    notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) dialogData: IDialogData<Car> | null
  ) {
    super(dialogRef, fb, dialogData, notification);

    this.form = fb.group({
      manufacturer: [null, Validators.required],
      model: [null, Validators.required],
      transmissionType: [null, Validators.required],
      engineType: [null, Validators.required],
      emissionClass: [null, Validators.required],
      fuel: [null, Validators.required],
      drivetrain: [null, Validators.required],
      year: [this.currentYear, [Validators.required, Validators.min(1900), Validators.max(this.currentYear + 1)]],
      horsepower: [null, [Validators.required, Validators.min(1)]],
      kilowatt: [{value: null, disabled: true}, [Validators.required, Validators.min(1)]],
      engineVolume: [null, [Validators.required, Validators.min(1)]],
      transmissionGears: [1, Validators.min(1)],
      doors: [null, [Validators.required, Validators.min(2), Validators.max(7)]],
      seats: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      steeringWheelLeft: [true, Validators.required],
      interiorColor: [null],
      price: [100.00, [Validators.required, Validators.min(0)]],
      exteriorColor: [null],
      chassisNumber: [null],
      isPreowned: [true, Validators.required]
    });

    this.form.get('model')?.disable();

    // Auto-calculate kW from HP
    this.form.get('horsepower')?.valueChanges.subscribe(hp => {
      if (hp) {
        const kw = Math.round(hp * 0.7355);
        this.form.get('kilowatt')?.patchValue(kw, {emitEvent: false});
      }
    });

    if (this.isView) {
      // View mode: Display raw JSON of the object
      this.jsonCurrentObject = AppUtil.toRawJSONText(dialogData?.object);
      this.form.disable();
    } else {
      this._manufacturerService.getAll().subscribe({
        next: manufacturers => {
          this.manufacturers = manufacturers;

          this._transmissionTypeService.getAll().subscribe({
            next: transmissionTypes => {
              this.transmissionTypes = transmissionTypes;

              this._fuelService.getAll().subscribe({
                next: fuels => {
                  this.fuels = fuels;

                  this._drivetrainService.getAll().subscribe({
                    next: drivetrains => {
                      this.drivetrains = drivetrains;

                      this._engineTypeService.getAll().subscribe({
                        next: engineTypes => {
                          this.engineTypes = engineTypes;

                          this._emissionClassService.getAll().subscribe({
                            next: emissionClasses => {
                              this.emissionClasses = emissionClasses;

                              if (dialogData?.object) {
                                this.isNewOrEdit = false;
                                this.models.push(dialogData.object.model);
                                this.form.patchValue({
                                  manufacturer: dialogData.object.model.manufacturer.id,
                                  model: dialogData.object.model.id,
                                  transmissionType: dialogData.object.transmissionType.id,
                                  engineType: dialogData.object.engineType.id,
                                  emissionClass: dialogData.object.emissionClass.id,
                                  fuel: dialogData.object.fuel.id,
                                  drivetrain: dialogData.object.drivetrain.id,
                                  year: dialogData.object.year,
                                  horsepower: dialogData.object.horsepower,
                                  kilowatt: dialogData.object.kilowatt,
                                  engineVolume: dialogData.object.engineVolume,
                                  transmissionGears: dialogData.object.transmissionGears,
                                  doors: dialogData.object.doors,
                                  seats: dialogData.object.seats,
                                  steeringWheelLeft: dialogData.object.steeringWheelLeft,
                                  interiorColor: dialogData.object.interiorColor,
                                  price: dialogData.object.price,
                                  exteriorColor: dialogData.object.exteriorColor,
                                  chassisNumber: dialogData.object.chassisNumber,
                                  isPreowned: dialogData.object.isPreowned
                                });
                              } else {
                                this.isNewOrEdit = true;
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

  onImagesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedImages = [];
    this.imagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        this.selectedImages.push(file);

        // Generate preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();

      const carDTO: CarDTO = {
        id: this.isNewOrEdit ? null : this.dialogData?.object?.id ?? null,
        model: formData.model,
        user: this._appUser.user.id,
        transmissionType: formData.transmissionType,
        engineType: formData.engineType,
        emissionClass: formData.emissionClass,
        drivetrain: formData.drivetrain,
        fuel: formData.fuel,
        year: formData.year,
        horsepower: formData.horsepower,
        kilowatt: formData.kilowatt,
        engineVolume: formData.engineVolume,
        transmissionGears: formData.transmissionGears,
        doors: formData.doors,
        seats: formData.seats,
        steeringWheelLeft: formData.steeringWheelLeft,
        interiorColor: formData.interiorColor,
        exteriorColor: formData.exteriorColor,
        chassisNumber: formData.chassisNumber,
        price: formData.price,
        isPreowned: formData.isPreowned,
        createdAt: this.isNewOrEdit ? new Date() : this.dialogData?.object?.createdAt ?? new Date()
      };

      if (this.isNewOrEdit) {
        this._carService.create(carDTO).subscribe({
          next: (car: any) => {
            if (this.selectedImages.length > 0) {
              this.uploadImages(car.car ?? car.id).then(() => {
                this.dismiss(car);
              });
            } else {
              this.dismiss(car);
            }
          },
          error: (error) => {
            console.error('Error creating car:', error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      } else {
        this._carService.update(carDTO).subscribe({
          next: (car: any) => {
            if (this.selectedImages.length > 0) {
              this.uploadImages(car.car ?? car.id ?? this.dialogData.object.id).then(() => {
                this.dismiss(car);
              });
            } else {
              this.dismiss(car);
            }
          },
          error: (error) => {
            console.error('Error updating car:', error);
            this.notification.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(error.error));
          }
        });
      }
    } else {
      this.notification.showTimedErrorNotification('Please fill out all required fields');
    }
  }

  private uploadImages(carId: number): Promise<void> {
    return new Promise((resolve) => {
      this._carService.uploadImages(carId, this.selectedImages).subscribe({
        next: () => resolve(),
        error: (err) => {
          console.error('Image upload failed:', err);
          this.notification.showTimedErrorNotification('Car saved, but image upload failed.');
          resolve(); // Still dismiss — car was saved
        }
      });
    });
  }
}
