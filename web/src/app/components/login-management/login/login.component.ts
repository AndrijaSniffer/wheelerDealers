import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {jwtTokens} from "../../../../AppConstants";

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

          this._userService.parseJwtToUser(tokens);

          sessionStorage.setItem('refresh', tokens.refresh == null ? "" : tokens.refresh);
          sessionStorage.setItem('access', tokens.access);

          this._userService.changeIsAuth(true);

          console.warn(this._userService.currentUser);
          if (this._userService.currentUser && this._userService.currentUser.isAdmin) {
            this.router.navigate(['/admin/general']);
          } else {
            this.router.navigate(['/main/home']);
          }
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
