import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SidebarNavComponent, SidebarNavItem } from '../../shared/ui/sidebar-nav/sidebar-nav.component';

/**
 * Layout principal de la aplicación de inversiones.
 * Incluye header, sidebar/drawer de navegación y área de contenido.
 * En móvil muestra el menú mediante un drawer con botón hamburguesa.
 */
@Component({
  selector: 'app-investment-layout',
  imports: [
    NzAvatarModule,
    NzButtonModule,
    NzDrawerModule,
    NzIconModule,
    NzLayoutModule,
    RouterOutlet,
    SidebarNavComponent,
  ],
  templateUrl: './investment-layout.component.html',
  styleUrl: './investment-layout.component.scss',
})
export class InvestmentLayoutComponent {
  private readonly router = inject(Router);

  protected readonly isMobileMenuOpen = signal(false);

  protected readonly navigationItems: readonly SidebarNavItem[] = [
    {
      key: 'inicio',
      label: 'Inicio',
      path: '/inicio',
    },
    {
      key: 'fondos',
      label: 'Fondos',
      path: '/fondos',
    },
    {
      key: 'historial',
      label: 'Historial',
      path: '/historial',
    },
  ];

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.closeMobileMenu());
  }

  /** Abre el drawer del menú en modo móvil. */
  protected openMobileMenu(): void {
    this.isMobileMenuOpen.set(true);
  }

  /** Cierra el drawer del menú. Se invoca también al navegar. */
  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
