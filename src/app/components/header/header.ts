import { Component, input } from '@angular/core';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  ratedCount = input.required<number>();

  averageRating = input.required<number>();

}