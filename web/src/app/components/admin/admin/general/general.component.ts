import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../../../services/country.service";
import {Country} from "../../../../classes/country";
import {MatDialog} from "@angular/material/dialog";
import {CountryDialogComponent} from "../../../dialogs/country-dialog/country-dialog.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'options'];
  countriesData: Country[] = [];
  createForm!: FormGroup;

  constructor(private _countryService: CountryService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCountries();
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      countryName: new FormControl("", Validators.required)
    });
  }

  getCountries(){
    this._countryService.getAllCountry().subscribe(response => {
      console.warn(response)
      this.countriesData = response as Country[];
    })
  }

  openCountryDialog(mode: "view" | "edit" | "delete", countryId: number) {
    let buttons: {confirm: string, cancel: string};
    switch (mode) {
      case "view":
        buttons = {
          confirm: "Ok",
          cancel: "Close"
        }
        break;
      case "edit":
        buttons = {
          confirm: "Save",
          cancel: "Discard"
        }
        break;
      case "delete":
        buttons = {
          confirm: "Delete",
          cancel: "Cancel"
        }
    }

    const dialogRef = this.dialog.open(CountryDialogComponent, {
      data: {
        mode: mode,
        countryId: countryId,
        buttons: buttons
      }
    }).afterClosed().subscribe(() => {
      this.getCountries();
    })
  }

  submitCreateForm() {
    if(this.createForm.valid){
      this._countryService.createCountry({nameCountry: this.createForm.value.countryName}).subscribe(res => {
        console.warn(res);
        this.getCountries();
      });
    }
  }
}
