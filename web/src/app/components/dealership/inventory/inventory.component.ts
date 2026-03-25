import {Component, inject, OnInit} from '@angular/core';
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
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatList, MatListItem} from '@angular/material/list';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {AppUser} from '../../../app.user';
import {CarService} from '@services/car.service';
import {NotificationService} from '@services/notification.service';
import {Car} from '@classes/car';
import {CarDialog} from '@dialogs/car/car-dialog';
import {YesNoDialogComponent} from '@dialogs/dialogs.component';
import {Router} from '@angular/router';
import {SerbianPricePipe} from '@pipes/serbian-price.pipe';

@Component({
  selector: 'app-dealership-inventory',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    MatMiniFabButton,
    MatIcon,
    MatList,
    MatListItem,
    DatePipe,
    SerbianPricePipe
  ],
  templateUrl: './inventory.component.html',
  standalone: true,
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  private readonly _appUser: AppUser = inject(AppUser);
  private readonly _carService: CarService = inject(CarService);
  private readonly _notification: NotificationService = inject(NotificationService);
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _router: Router = inject(Router);

  displayedColumns = ['model', 'year', 'fuel', 'transmission', 'price', 'isPreowned', 'createdAt', 'options'];
  dataSource: MatTableDataSource<Car>;
  cars: Car[] = [];

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this._carService.getByUserId(this._appUser.user.id).subscribe({
      next: (data: Car[]) => {
        this.cars = data;
        this.dataSource = new MatTableDataSource(this.cars);
      },
      error: (err) => {
        console.error(err);
        this._notification.showTimedErrorNotification('Error loading inventory.');
      }
    });
  }

  addCar() {
    this._dialog.open(CarDialog, {
      minWidth: '50vw',
      data: {object: null, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Car successfully added to inventory!');
        this.loadInventory();
      }
    });
  }

  viewCar(id: number) {
    const selectedCar = this.cars.find(c => c.id === id);

    this._dialog.open(CarDialog, {
      minWidth: '50vw',
      data: {object: selectedCar, isView: true}
    });
  }

  editCar(id: number) {
    const selectedCar = this.cars.find(c => c.id === id);

    this._dialog.open(CarDialog, {
      minWidth: '50vw',
      data: {object: selectedCar, isView: false}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._notification.showTimedNotification('Car successfully updated!');
        this.loadInventory();
      }
    });
  }

  deleteCar(id: number) {
    const selectedCar = this.cars.find(c => c.id === id);

    this._dialog.open(YesNoDialogComponent, {
      data: `Are you sure you want to remove this listing?\n${selectedCar.model.manufacturer.name} ${selectedCar.model.name} (${selectedCar.year})`,
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._carService.delete(id).subscribe({
          next: () => {
            this._notification.showTimedNotification('Car removed from inventory!');
            this.loadInventory();
          },
          error: (err) => {
            console.error(err);
            this._notification.showTimedErrorNotification('Error removing car.');
          }
        });
      }
    });
  }

  previewCar(id: number) {
    this._router.navigate(['/car', id], { queryParams: { preview: true } });
  }

}
