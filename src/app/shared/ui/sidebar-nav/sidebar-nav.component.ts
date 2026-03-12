import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

/** Elemento de navegación del menú lateral. */
export interface SidebarNavItem {
  readonly key: string;
  readonly label: string;
  readonly path: string;
}

/**
 * Menú de navegación lateral.
 * Usado en el sidebar (desktop) y en el drawer (móvil).
 */
@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterLink, RouterLinkActive, NzMenuModule],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss',
})
export class SidebarNavComponent {
  readonly items = input.required<readonly SidebarNavItem[]>();
}
