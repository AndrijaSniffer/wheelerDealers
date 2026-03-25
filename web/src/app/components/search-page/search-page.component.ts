import {Component, inject} from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {Manufacturer} from '@classes/manufacturer';
import {Model} from '@classes/model';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TransmissionType} from '@classes/transmissionType';
import {Fuel} from '@classes/fuel';
import {MatCheckbox} from '@angular/material/checkbox';
import {Car} from '@classes/car';
import {ManufacturerService} from '@services/manufacturer.service';
import {ModelService} from '@services/model.service';
import {TransmissionTypeService} from '@services/transmission-type.service';
import {FuelService} from '@services/fuel.service';
import {CarService} from '@services/car.service';
import {NotificationService} from '@services/notification.service';
import {AppUtil} from '../../app.util';
import {RouterLink} from '@angular/router';
import {Drivetrain} from '@classes/drivetrain';
import {EngineType} from '@classes/engine-type';
import {EmissionClass} from '@classes/emission-class';
import {DrivetrainService} from '@services/drivetrain.service';
import {EngineTypeService} from '@services/engine-type.service';
import {EmissionClassService} from '@services/emission-class.service';
import {SerbianPricePipe} from '@pipes/serbian-price.pipe';


export interface ISearchParameters {
  manufacturer: number | null;
  model: number | null;
  transmissionType: number | null;
  fuel: number | null;
  drivetrain: number | null;
  engineType: number | null;
  emissionClass: number | null;
  exteriorColor: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  hpFrom: number | null;
  hpTo: number | null;
  kwFrom: number | null;
  kwTo: number | null;
  engineVolume: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  isPreowned: number | null;
  steeringWheelLeft: number | null;
}

@Component({
  selector: 'app-search-page',
  imports: [
    MatDivider,
    FormsModule,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    MatCheckbox,
    RouterLink,
    SerbianPricePipe
  ],
  templateUrl: './search-page.component.html',
  standalone: true,
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  drivetrains: Drivetrain[] = [];
  engineTypes: EngineType[] = [];
  emissionClasses: EmissionClass[] = [];
  manufacturers: Manufacturer[] = [];
  models: Model[] = [];
  transmissions: TransmissionType[] = [];
  fuel: Fuel[] = [];
  cars: Car[] = [];
  private readonly _drivetrainService: DrivetrainService = inject(DrivetrainService);
  private readonly _engineTypeService: EngineTypeService = inject(EngineTypeService);
  private readonly _emissionClassService: EmissionClassService = inject(EmissionClassService);
  private readonly _manufacturerService: ManufacturerService = inject(ManufacturerService);
  private readonly _modelService: ModelService = inject(ModelService);
  private readonly _transmissionService: TransmissionTypeService = inject(TransmissionTypeService);
  private readonly _fuelService: FuelService = inject(FuelService);
  private readonly _carService: CarService = inject(CarService);
  private readonly _notifications: NotificationService = inject(NotificationService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  searchForm: FormGroup = this._fb.group({
    manufacturer: [null],
    model: [null],
    priceTo: [null],
    priceFrom: [null],
    transmission: [null],
    fuel: [null],
    drivetrain: [null],
    engineType: [null],
    emissionClass: [null],
    volume: [null],
    horsepowerFrom: [null],
    horsepowerTo: [null],
    kilowattFrom: [null],
    kilowattTo: [null],
    carColor: [null],
    yearFrom: [null],
    yearTo: [null],
    isPreowned: [true],
    steeringWheelLeft: [true]
  });

  constructor() {
    this.fillInFilterFields();
    this.defaultSearch();
  }

  fillInFilterFields() {
    this._manufacturerService.getAll().subscribe({
      next: data => {
        this.manufacturers[0] = {id: 0, name: 'All', country: null};

        data.forEach((manufacturer: Manufacturer) => {
          this.manufacturers.push(manufacturer);
        });
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._modelService.getAll().subscribe({
      next: data => {
        this.models[0] = {id: 0, name: 'All', manufacturer: null};

        data.forEach((model: Model) => {
          this.models.push(model);
        });
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._transmissionService.getAll().subscribe({
      next: data => {
        this.transmissions[0] = {id: 0, type: 'All'};

        data.forEach((transmission: TransmissionType) => {
          this.transmissions.push(transmission);
        })
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._fuelService.getAll().subscribe({
      next: data => {
        this.fuel[0] = {id: 0, type: 'All'};

        data.forEach((fuel: Fuel) => {
          this.fuel.push(fuel);
        })
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._drivetrainService.getAll().subscribe({
      next: data => {
        this.drivetrains[0] = {id: 0, type: 'All'};
        data.forEach((drivetrain: Drivetrain) => {
          this.drivetrains.push(drivetrain);
        });
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });

    this._engineTypeService.getAll().subscribe({
      next: data => {
        this.engineTypes[0] = {id: 0, type: 'All'};
        data.forEach((engineType: EngineType) => {
          this.engineTypes.push(engineType);
        });
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });

    this._emissionClassService.getAll().subscribe({
      next: data => {
        this.emissionClasses[0] = {id: 0, className: 'All'};
        data.forEach((emissionClass: EmissionClass) => {
          this.emissionClasses.push(emissionClass);
        });
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  defaultSearch() {
    this._carService.getAll().subscribe({
      next: data => {
        this.cars = data;
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  submitSearch() {
    const searchParameters: ISearchParameters = {
      manufacturer: this.searchForm.get('manufacturer').value,
      model: this.searchForm.get('model').value,
      transmissionType: this.searchForm.get('transmission').value,
      fuel: this.searchForm.get('fuel').value,
      drivetrain: this.searchForm.get('drivetrain').value,
      engineType: this.searchForm.get('engineType').value,
      emissionClass: this.searchForm.get('emissionClass').value,
      exteriorColor: this.searchForm.get('carColor').value?.toLowerCase().trim() ?? null,
      priceFrom: this.searchForm.get('priceFrom').value,
      priceTo: this.searchForm.get('priceTo').value,
      hpFrom: this.searchForm.get('horsepowerFrom').value,
      hpTo: this.searchForm.get('horsepowerTo').value,
      kwFrom: this.searchForm.get('kilowattFrom').value,
      kwTo: this.searchForm.get('kilowattTo').value,
      engineVolume: this.searchForm.get('volume').value,
      yearFrom: this.searchForm.get('yearFrom').value,
      yearTo: this.searchForm.get('yearTo').value,
      isPreowned: this.searchForm.get('isPreowned').value ? 1 : 0,
      steeringWheelLeft: this.searchForm.get('steeringWheelLeft').value ? 1 : 0
    }

    Object.entries(searchParameters).forEach(([key, value]) => {
      if (value === 0 && key !== 'isPreowned' && key !== 'steeringWheelLeft') searchParameters[key] = null;
    });

    this._carService.parametrizedSearch(searchParameters).subscribe({
      next: data => {
        this.cars = data;
      },
      error: err => {
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error));
      }
    });
  }

  resetForm() {
    this.searchForm.reset({isPreowned: true, steeringWheelLeft: true});
    this.defaultSearch();
  }
}
