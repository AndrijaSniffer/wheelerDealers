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
import {CarSearchDto} from "../../../classes/car-search-dto";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dataCar: CarSearchDto[] = [];
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

  getAllCars() {
    this._searchService.defaultSearch().subscribe((res: CarSearchDto[]) => {
      console.warn(res)
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

    s.idManufacturer = formValue.manufacturerId ? formValue.manufacturerId : null;

    s.idModel = formValue.modelId ? formValue.modelId : null;

    s.idTransmission = formValue.transmissionId ? formValue.transmissionId : null;

    s.idFuel = formValue.fuelId ? formValue.fuelId : null;

    s.idDrive = formValue.driveId ? formValue.driveId : null;

    s.isPreowned = formValue.isPreOwned ? formValue.isPreOwned : null;

    s.priceFrom = formValue.priceFrom ? formValue.priceFrom : null;

    s.priceTo = formValue.priceTo ? formValue.priceTo : null;

    s.volume = formValue.volume ? formValue.volume : null;

    s.hpFrom = formValue.hpFrom ? formValue.hpFrom : null;

    s.hpTo = formValue.hpTo ? formValue.hpTo : null;

    s.kwFrom = formValue.kwFrom ? formValue.kwFrom : null;

    s.kwTo = formValue.kwTo ? formValue.kwTo : null;

    s.carColor = formValue.carColor ? formValue.carColor : null;

    s.leftSideSteeringWheel = formValue.leftSideSteeringWheel ? formValue.leftSideSteeringWheel : null;

    this._searchService.normalSearch(s).subscribe((res: CarSearchDto[]) => {
      console.warn(res)
      this.dataCar = res;
    })
  }

}
