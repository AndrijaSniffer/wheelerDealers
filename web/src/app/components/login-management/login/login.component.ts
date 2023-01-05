import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {User} from "../../../classes/user";

interface jwtTokens {
  refresh: string;
  access: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', Validators.required);
  isLoading: boolean = false;
  authValid = true;

  constructor(private router: Router,
              public _userService: UserService) {
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.username.valid && this.password.valid) {
      this._userService.loginUser(this.username.value, this.password.value).subscribe({
        next: response => {
          let tokens = response.body as jwtTokens;

          this._userService.currentUser = JSON.parse(atob(tokens.access.split('.')[1])) as User;

          sessionStorage.setItem('refresh', tokens.refresh);
          sessionStorage.setItem('access', tokens.access);

          this._userService.changeIsAuth(true);

          this.router.navigate(['/main/home'])/*.then(() => this._userService.isAuthenticated.next(true))*/;
        },
        error: err => {
          if (err.status == 401) {
            console.warn("Username or password wrong");
            this.authValid = false;
          }
        }
      });
    }
  }

  navigateBack() {
    this.router.navigate(["./"])
  }

  navigateRegister() {
    this.router.navigate(["management/register"])
  }

  navigateForgot() {
    this.router.navigate(["management/forgot"])
  }
}
