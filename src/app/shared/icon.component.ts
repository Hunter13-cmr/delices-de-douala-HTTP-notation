import { Component, input, numberAttribute } from '@angular/core';

/**
 * Icône SVG custom (aucune dépendance extérieure).
 * Toutes les couleurs utilisent currentColor afin d'être cohérentes avec le thème.
 * Usage : <app-icon name="star" [size]="24"></app-icon>
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      class="icon"
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @if (name() === 'sun') {
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l-1.41 1.41M17.66 4.93l-1.41 1.41"/>
      } @else if (name() === 'moon') {
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      } @else if (name() === 'star') {
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" stroke="none"/>
      } @else if (name() === 'star-outline') {
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      } @else if (name() === 'trophy') {
        <path d="M8 21L12 17l4 4-4 4-4-1-4 1-4-4 4-4z"/>
        <path d="M8 21h8"/>
        <path d="M6 3h12v2H6z"/>
      } @else if (name() === 'alert') {
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <path d="M12 10v4M12 16h.01"/>
      } @else if (name() === 'refresh') {
        <path d="M21 12a9 9 0 1 1-2.64-6.36"/>
        <path d="M21 3v6h-6"/>
      } @else if (name() === 'location') {
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      } @else if (name() === 'search') {
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.35-4.35"/>
      } @else if (name() === 'cutlery') {
        <path d="M6 3v16l7-4 7 4V3"/>
        <path d="M13 10h8"/>
      } @else if (name() === 'chevron') {
        <path d="M9 6l-6 6 6 6"/>
      } @else if (name() === 'check') {
        <path d="M20 6L9 17l-5-5"/>
      } @else if (name() === 'cross') {
        <path d="M18 6L6 18M6 6l12 12"/>
      } @else if (name() === 'arrow') {
        <path d="M5 12h14M13 6l6 6-6 6"/>
      } @else if (name() === 'clock') {
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 2"/>
      } @else if (name() === 'sparkle') {
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17.2l-1.8-5.2L5 10l5.2-1.8L12 3z"/>
        <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>
      }
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
      line-height: 1;
    }
    .icon {
      display: block;
      flex-shrink: 0;
      color: currentColor;
      vertical-align: middle;
    }
  `]
})
export class IconComponent {
  name = input.required<string>();
  size = input(24, { transform: numberAttribute });
}
