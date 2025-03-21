import {Component, inject} from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {Manufacturer} from '../../classes/manufacturer';
import {Model} from '../../classes/model';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Transmission} from '../../classes/transmission';
import {Fuel} from '../../classes/fuel';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgOptimizedImage} from '@angular/common';
import {Car} from '../../classes/car';
import {ManufacturerService} from '../../services/manufacturer.service';
import {ModelService} from '../../services/model.service';
import {TransmissionService} from '../../services/transmission.service';
import {FuelService} from '../../services/fuel.service';
import {CarService} from '../../services/car.service';
import {NotificationService} from '../../services/notification.service';
import {AppUtil} from '../../app.util';

export interface ISearchParameters {
  manufacturer: number | null;
  model: number | null;
  transmission: number | null;
  fuel: number | null;
  carColor: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  horsepowerFrom: number | null;
  horsepowerTo: number | null;
  kilowattFrom: number | null;
  kilowattTo: number | null;
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
    NgOptimizedImage
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  manufacturers: Manufacturer[] = [];
  models: Model[] = [];
  transmissions: Transmission[] = [];
  fuel: Fuel[] = [];
  carColors: string[] = [];
  mockupCar: Car = {
    id: 1,
    isPreowned: true,
    color: 'Blue',
    price: 2000,
    chassisNumber: 'asdasd',
    createdAt: new Date(),
    fuel: {id: 1, type: 'Petrol'},
    model: {
      id: 1,
      name: 'Civic',
      yearOfManufacture: 2000,
      manufacturer: {id: 1, name: 'Honda', country: {id: 1, name: 'Japan'}},
      engine: {
        id: 1,
        engineCode: 'asdd',
        volume: 12,
        kilowatt: 12,
        horsepower: 12,
        emissionClass: {id: 1, className: 'EURO6'},
        engineType: {id: 1, type: 'Internal combustion'}
      }
    },
    transmission: {id: 1, gears: 5, type: 'Manual'},
    interior: {id: 1, color: 'Black', steeringWheelLeft: true, seats: 5, doors: 3},
    drivetrain: {id: 1, type: 'FWD'},
    user: {
      id: 1,
      isSuperuser: false,
      username: 'aaaa',
      address: 'aasd',
      email: 'asd',
      isActive: true,
      isReseller: false,
      isStaff: false,
      PIB: null,
      dateJoined: new Date(),
      lastLogin: new Date(),
      password: null,
      phone: 'asdasd'
    }
  };
  private readonly _manufacturerService: ManufacturerService = inject(ManufacturerService);
  private readonly _modelService: ModelService = inject(ModelService);
  private readonly _transmissionService: TransmissionService = inject(TransmissionService);
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
    volume: [null],
    horsepowerFrom: [null],
    horsepowerTo: [null],
    kilowattFrom: [null],
    kilowattTo: [null],
    carColor: [null],
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
        this.manufacturers = data;
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._modelService.getAll().subscribe({
      next: data => {
        this.models = data;
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._transmissionService.getAll().subscribe({
      next: data => {
        this.transmissions = data;
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._fuelService.getAll().subscribe({
      next: data => {
        this.fuel = data;
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });

    this._carService.getAllColor().subscribe({
      next: data => {
        data.forEach((colorJson) => {
          this.carColors.push(colorJson.color);
        });
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    });
  }

  defaultSearch() {
    this._carService.getAll().subscribe({
      next: data => {
        console.warn('Cars:', data);
      },
      error: err => {
        console.error(err);
        this._notifications.showTimedErrorNotification(AppUtil.parseJsonErrorsToString(err.error))
      }
    })
  }

  submitSearch() {
    const searchParameters: ISearchParameters = {
      manufacturer: this.searchForm.get('manufacturer').value,
      model: this.searchForm.get('model').value,
      transmission: this.searchForm.get('transmission').value,
      fuel: this.searchForm.get('fuel').value,
      carColor: this.searchForm.get('carColor').value,
      priceFrom: this.searchForm.get('priceFrom').value,
      priceTo: this.searchForm.get('priceTo').value,
      horsepowerFrom: this.searchForm.get('horsepowerFrom').value,
      horsepowerTo: this.searchForm.get('horsepowerTo').value,
      kilowattFrom: this.searchForm.get('kilowattFrom').value,
      kilowattTo: this.searchForm.get('kilowattTo').value,
      isPreowned: this.searchForm.get('isPreowned').value ? 1 : 0,
      steeringWheelLeft: this.searchForm.get('steeringWheelLeft').value ? 1 : 0
    }

    this._carService.parametrizedSearch(searchParameters).subscribe({
      next: data => {
        console.warn(data);
      }
    })
  }
}
