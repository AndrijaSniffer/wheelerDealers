import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate() {
    this.router.navigate(['./login']);
  }
  
  navigateTo(path:string){
    this.router.navigate([`main/${path}`]);
  }
}
