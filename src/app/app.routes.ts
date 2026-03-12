import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/investment-layout/investment-layout.component').then(
        (m) => m.InvestmentLayoutComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio',
      },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./features/dashboard/dashboard-page.component').then(
            (m) => m.DashboardPageComponent,
          ),
      },
      {
        path: 'fondos',
        loadComponent: () =>
          import('./features/funds/funds-page.component').then((m) => m.FundsPageComponent),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./features/history/history-page.component').then((m) => m.HistoryPageComponent),
      },
    ],
  },
];
