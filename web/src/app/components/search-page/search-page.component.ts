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

export interface mockupData {
  manufacturers: Manufacturer[];
  models: Model[];
  transmission: Transmission[];
  fuel: Fuel[];
  carColors: string[];
}

export function getMockupData(): mockupData {
  return {
    manufacturers: [
      {
        id: 1,
        name: 'Honda',
        country: {id: 1, name: 'Japan'}
      }
    ],
    models: [
      {
        id: 1,
        name: 'Civic',
        yearOfManufacture: 2000,
        manufacturer: {
          id: 1,
          name: 'Honda',
          country: {id: 1, name: 'Japan'}
        },
        engine: {
          id: 1,
          engineType: {id: 1, type: 'Internal combustion'},
          engineCode: 'asdad',
          horsepower: 12,
          volume: 12,
          kilowatt: 12,
          emissionClass: {id: 1, className: 'EURO6'}
        }
      }
    ],
    transmission: [
      {id: 1, gears: 5, type: 'Manual'}
    ],
    fuel: [
      {id: 1, type: 'Petrol'}
    ],
    carColors: ['Blue']
  }
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
    const mockupData = getMockupData();
    this.manufacturers = mockupData.manufacturers;
    this.models = mockupData.models;
    this.transmissions = mockupData.transmission;
    this.fuel = mockupData.fuel;
    this.carColors = mockupData.carColors;
  }
}
