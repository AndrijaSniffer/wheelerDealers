import {Component, OnInit} from '@angular/core';
import {Manufacturer} from "../../../classes/manufacturer";
import {Model} from "../../../classes/model";
import {Transmission} from "../../../classes/transmission";
import {Fuel} from "../../../classes/fuel";
import {Drive} from "../../../classes/drive";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../../../classes/car";
import {SearchService} from "../../../services/search.service";
import {Search} from "../../../../AppConstants";
import {ManufacturerService} from "../../../services/car-properties-services/manufacturer.service";
import {ModelService} from "../../../services/model.service";
import {FuelService} from "../../../services/car-parts-services/fuel.service";
import {TransmissionService} from "../../../services/car-parts-services/transmission.service";
import {DriveService} from "../../../services/car-parts-services/drive.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dataCar: Car[] = [];
  dataManufacturer: Manufacturer[] = [];
  dataModel: Model[] = [];
  dataTransmission: Transmission[] = [];
  dataFuel: Fuel[] = [];
  dataDrive: Drive[] = []

  form: FormGroup

  constructor(private fb: FormBuilder,
              private _searchService: SearchService,
              private _manufacturerService: ManufacturerService,
              private _modelService: ModelService,
              private _fuelService: FuelService,
              private _transmissionService: TransmissionService,
              private _driveService: DriveService) {
    this.getAllCars();
    this.buildForm();

    this._manufacturerService.getAllManufacturer().subscribe((res: Manufacturer[]) => {
      this.dataManufacturer = res;
    })

    this._modelService.getAllModel().subscribe((res: Model[]) => {
      this.dataModel = res;
    })

    this._fuelService.getAllFuel().subscribe((res: Fuel[]) => {
      this.dataFuel = res;
    })

    this._transmissionService.getAllTrasmission().subscribe((res: Transmission[]) => {
      this.dataTransmission = res;
    })

    this._driveService.getAllDrive().subscribe((res: Drive[]) => {
      this.dataDrive = res;
    })
  }

  getAllCars(){
    this._searchService.defaultSearch().subscribe((res: Car[]) => {
      this.dataCar = res;
    })
  }

  buildForm(){
    this.form = this.fb.group({
      manufacturerId: new FormControl(undefined),
      modelId: new FormControl(undefined),
      transmissionId: new FormControl(undefined),
      fuelId: new FormControl(undefined),
      driveId: new FormControl(undefined),
      isPreOwned: new FormControl(false),
      priceFrom: new FormControl(undefined),
      priceTo: new FormControl(undefined),
      volume: new FormControl(undefined),
      hpFrom: new FormControl(undefined),
      hpTo: new FormControl(undefined),
      kwFrom: new FormControl(undefined),
      kwTo: new FormControl(undefined),
      carColor: new FormControl(undefined),
      leftSideSteeringWheel: new FormControl(true),
    })
  }

  ngOnInit(): void {
  }

  search(){
    let formValue = this.form.value;

    let s: Search = {};

    if(formValue.manufacturerId)
      s.id_manufacturer = formValue.manufacturerId;

    if(formValue.modelId)
      s.id_model = formValue.modelId;

    if(formValue.transmissionId)
      s.id_transmission = formValue.transmissionId;

    if(formValue.fuelId)
      s.id_fuel = formValue.fuelId;

    if(formValue.driveId)
      s.id_drive = formValue.driveId;

    if(formValue.isPreOwned)
      s.is_preowned = formValue.isPreOwned;

    if(formValue.priceFrom)
      s.price_from = formValue.priceFrom;

    if(formValue.priceTo)
      s.price_to = formValue.priceTo;

    if(formValue.volume)
      s.volume = formValue.volume;

    if(formValue.hpFrom)
      s.hp_from = formValue.hpFrom;

    if(formValue.hpTo)
      s.hp_to = formValue.hpTo;

    if(formValue.kwFrom)
      s.kw_from = formValue.kwFrom;

    if(formValue.kwTo)
      s.kw_to = formValue.kwTo;

    if(formValue.carColor)
      s.car_color = formValue.carColor;

    if(formValue.leftSideSteeringWheel)
      s.left_side_steering_wheel = formValue.leftSideSteeringWheel;

    this._searchService.normalSearch(s).subscribe((res: Car[]) => {
      this.dataCar = res;
    })
  }

}
