import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl, FormBuilder, AbstractControlOptions } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  hideConfirm: boolean = true;
  isLoading:boolean=false;

  registerForm!:FormGroup

  constructor(private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(){
    this.registerForm = this.formBuilder.group({
      name:new FormControl ("",Validators.required),
      lastName: new FormControl("",Validators.required),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",Validators.required),
      confirmPassword: new FormControl("",Validators.required),
      phone:new FormControl("",Validators.maxLength(10))
    },{validators:checkPassword} as AbstractControlOptions)
  }
  navigateBack(){
    this.router.navigate(['./login'])
  }

  submitForm(){
  }
}


function checkPassword(control: AbstractControl) {
  const password = control.get("password")!;
  const confirmPassword = control.get("confirmPassword")!;
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ match: true });
  } else {
    confirmPassword.setErrors(null);
  }
}
