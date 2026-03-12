import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { forkJoin, Subject, switchMap } from 'rxjs';
import { finalize, startWith } from 'rxjs/operators';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FundCategoryColor } from '../../core/enums/fund-category-color.enum';
import { BalanceService } from '../../core/services/balance.service';
import { UserSubscription } from '../../core/interfaces/subscription.interface';
import { SubscriptionsService } from '../../core/services/subscriptions.service';
import { PageShellComponent } from '../../shared/ui/page-shell/page-shell.component';

/**
 * Página de inicio del panel de inversiones.
 * Muestra el saldo disponible y las suscripciones activas con opción de cancelar.
 */
@Component({
  selector: 'app-dashboard-page',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    NzButtonModule,
    NzCardModule,
    NzDescriptionsModule,
    NzGridModule,
    NzPopconfirmModule,
    NzSpinModule,
    NzTagModule,
    PageShellComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly balanceService = inject(BalanceService);
  private readonly subscriptionsService = inject(SubscriptionsService);
  private readonly refreshSubject = new Subject<void>();

  protected readonly fundCategoryColor = FundCategoryColor;
  protected readonly cancellingSubscriptionId = signal<number | null>(null);
  protected readonly dashboardData$ = this.refreshSubject.pipe(
    startWith(void 0),
    switchMap(() =>
      forkJoin({
        balance: this.balanceService.getCurrentUserBalance(),
        subscriptions: this.subscriptionsService.getCurrentUserSubscriptions(),
      }),
    ),
  );

  /**
   * Cancela una suscripción activa y actualiza la vista al finalizar.
   * @param subscription - Suscripción a cancelar
   */
  protected cancelSubscription(subscription: UserSubscription): void {
    this.cancellingSubscriptionId.set(subscription.id);

    this.subscriptionsService
      .cancelSubscription(subscription.id)
      .pipe(finalize(() => this.cancellingSubscriptionId.set(null)))
      .subscribe(() => {
        this.refreshSubject.next();
      });
  }
}
