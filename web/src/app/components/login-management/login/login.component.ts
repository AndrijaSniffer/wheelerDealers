import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  email: FormControl = new FormControl('',[ Validators.required,Validators.email]);
  password: FormControl = new FormControl('', Validators.required);
  isLoading:boolean=false;

  constructor(private router:Router) {}

  ngOnInit(): void {}


  navigateBack(){
    this.router.navigate(["./"])
  }
  navigateRegister(){
    this.router.navigate(["management/register"])
  }
  navigateForgot(){
    this.router.navigate(["management/forgot"])
  }
}
