import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { environment } from '../environments/environment';
import { IconComponent } from './shared/icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconComponent],
  template: `
    <button class="theme-toggle" (click)="themeService.toggle()" [attr.aria-label]="'Basculer en mode ' + (themeService.theme() === 'light' ? 'sombre' : 'clair')">
      @if (themeService.theme() === 'light') {
        <app-icon name="moon" size="22"></app-icon>
      } @else {
        <app-icon name="sun" size="22"></app-icon>
      }
    </button>
    <router-outlet></router-outlet>
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} {{ restaurantName }} - Tous droits réservés</p>
      <p class="footer-email"><app-icon name="cutlery" size="18"></app-icon> contact&#64;delicesdedouala.cm</p>
    </footer>
  `,
})
export class App {
  readonly themeService = inject(ThemeService);
  readonly restaurantName = environment.restaurantName;
  readonly currentYear = new Date().getFullYear();
}