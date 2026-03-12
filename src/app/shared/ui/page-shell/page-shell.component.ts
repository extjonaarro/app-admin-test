import { Component, input } from '@angular/core';

/**
 * Contenedor reutilizable para el encabezado de las páginas.
 * Muestra título y subtítulo opcional de forma consistente.
 */
@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.scss',
})
export class PageShellComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
