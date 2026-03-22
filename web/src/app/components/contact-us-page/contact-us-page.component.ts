import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-contact-us-page',
  imports: [
    MatIcon,
    MatDivider
  ],
  templateUrl: './contact-us-page.component.html',
  standalone: true,
  styleUrl: './contact-us-page.component.css'
})
export class ContactUsPageComponent {
}
