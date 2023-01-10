import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../classes/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  hideConfirm: boolean = true;
  isLoading: boolean = false;

  registerForm!: FormGroup

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private registerUserService: UserService) {
  }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
      // phone:new FormControl("",Validators.maxLength(10))
    }, {validators: checkPassword} as AbstractControlOptions)
  }

  navigateBack() {
    this.router.navigate(['management/login'])
  }

  submitForm() {
    if (this.registerForm.valid) {
      let user: User = {
        username: this.registerForm.value.username,
        firstName: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }

      this.registerUserService.registerUser(user).subscribe(data => {
        if (data.status == 200) {
          this.navigateBack();
        }
      });
    }
  }
}

function checkPassword(control: AbstractControl) {
  const password = control.get("password")!;
  const confirmPassword = control.get("confirmPassword")!;
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({match: true});
  } else {
    confirmPassword.setErrors(null);
  }
}
