import {Component, inject, OnInit} from '@angular/core';
import {AppUser} from '../../../app.user';
import {CarService} from '@services/car.service';
import {Car} from '@classes/car';
import {DatePipe} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {User} from '@classes/user';
import {SerbianPricePipe} from '@pipes/serbian-price.pipe';

@Component({
  selector: 'app-dealership-dashboard',
  imports: [
    DatePipe,
    MatDivider,
    SerbianPricePipe
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DealershipDashboardComponent implements OnInit {
  user: User;
  totalListings: number = 0;
  newestListing: Car | null = null;
  oldestListing: Car | null = null;
  averagePrice: number = 0;
  companyName: string = '';
  private readonly _appUser: AppUser = inject(AppUser);
  private readonly _carService: CarService = inject(CarService);

  ngOnInit() {
    this.user = this._appUser.user;
    this.companyName = this.user.username;
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this._carService.getByUserId(this.user.id).subscribe({
      next: (myCars: Car[]) => {
        this.totalListings = myCars.length;

        if (myCars.length > 0) {
          this.newestListing = myCars[0];
          this.oldestListing = myCars[myCars.length - 1];

          const total = myCars.reduce((sum, car) => sum + Number(car.price), 0);
          this.averagePrice = Math.round(total / myCars.length);
        }
      }
    });
  }
}
