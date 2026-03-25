import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {DatePipe} from '@angular/common';
import {CarService} from '@services/car.service';
import {Car} from '@classes/car';
import {AppUser} from '../../app.user';
import {NotificationService} from '@services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialog} from '@dialogs/login/login-dialog';
import {SerbianPricePipe} from '@pipes/serbian-price.pipe';


@Component({
  selector: 'app-car-detail',
  imports: [
    MatButton,
    MatIcon,
    MatDivider,
    DatePipe,
    SerbianPricePipe
  ],
  templateUrl: './car-detail.component.html',
  standalone: true,
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly _carService: CarService = inject(CarService);
  private readonly _notification: NotificationService = inject(NotificationService);
  private readonly _dialog: MatDialog = inject(MatDialog);
  protected readonly _appUser: AppUser = inject(AppUser);

  car: Car | null = null;
  isLoading: boolean = true;
  phoneRevealed: boolean = false;
  currentImageIndex: number = 0;
  isOwnListing: boolean = false;

  ngOnInit() {
    const carId = Number(this._route.snapshot.paramMap.get('id'));
    if (carId) {
      this._carService.getById(carId).subscribe({
        next: (car: Car) => {
          this.car = car;
          this.isLoading = false;
          // Check if the logged-in user owns this listing
          if (this._appUser.user && this.car.user.id === this._appUser.user.id) {
            this.isOwnListing = true;
          }
        },
        error: () => {
          this._notification.showTimedErrorNotification('Car not found.');
          this._router.navigate(['/search']).then(() => {});
        }
      });
    }
  }

  revealPhone() {
    if (!this._appUser.user) {
      this._dialog.open(LoginDialog).afterClosed().subscribe(result => {
        if (result) {
          this._notification.showTimedNotification('Logged in successfully!');
          // After login, reveal automatically
          this.phoneRevealed = true;
        }
      });
      return;
    }
    this.phoneRevealed = true;
  }

  previousImage() {
    if (this.car?.images?.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.car.images.length) % this.car.images.length;
    }
  }

  nextImage() {
    if (this.car?.images?.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.car.images.length;
    }
  }

  goBack() {
    this._router.navigate(['/search']).then(() => {});
  }
}
