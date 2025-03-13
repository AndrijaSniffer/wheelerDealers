import {Component, inject} from '@angular/core';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Country} from '../../../classes/country';
import {CountryService} from '../../../services/country.service';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {CountryDialog, YesNoDialogComponent} from '../../dialogs/dialogs.component';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-country',
  imports: [
    MatList,
    MatListItem,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {
  private readonly _notification = inject(NotificationService);
  private readonly _countryService = inject(CountryService);
  private readonly _dialog = inject(MatDialog);

  displayedColumns = ['id', 'name', 'options'];
  dataSource: MatTableDataSource<Country>;
  private countries: Country[];

  constructor() {
    this.getAll();
  }

  getAll() {
    this._countryService.getAll().subscribe({
      next: data => {
        this.countries = data;
        this.dataSource = new MatTableDataSource(this.countries);
        // this._notification.showTimedNotification('Countries loaded');
      },
      error: err => {
        console.error(err);
        this._notification.showTimedErrorNotification("Error getting countries!");
      }
    });
  }

  new() {
    this._dialog.open(CountryDialog, {
      data: {object: null, isView: false},
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('New country successfully created!');
        this.getAll();
      }
    });
  }

  view(id: number) {
    const countrySelected = this.countries.find(country => country.id === id);

    this._dialog.open(CountryDialog, {
      data: {object: countrySelected, isView: true}
    }).afterClosed().subscribe(result => {
      console.warn(result);
    });
  }

  edit(id: number) {
    const countrySelected = this.countries.find(country => country.id === id);

    this._dialog.open(CountryDialog, {
      data: {object: countrySelected, isView: false},
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Country successfully updated!');
        this.getAll();
      }
    });
  }

  delete(id: number) {
    const countrySelected = this.countries.find(country => country.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to delete this country?\n${JSON.stringify(countrySelected)}?`,
    }).afterClosed().subscribe((result: boolean) => {
      if(result) {
        this._countryService.delete(id).subscribe({
          next: _ => {
            this._notification.showTimedNotification('Country successfully deleted!');
            this.getAll();
          },
          error: err => {
            console.error(err);
          }
        })
      }
    });
  }
}
