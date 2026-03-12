import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, startWith } from 'rxjs/operators';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  DataTableColumnDef,
  ResponsiveDataTableComponent,
} from '../../shared/ui/responsive-data-table';
import { FundCategoryColor } from '../../core/enums/fund-category-color.enum';
import { Fund, FundSubscriptionReceipt } from '../../core/interfaces/fund.interface';
import { FundsService } from '../../core/services/funds.service';
import { SubscriptionsService } from '../../core/services/subscriptions.service';
import { generateNumericReference } from '../../core/utils/reference.util';
import { FundSubscriptionModalComponent } from '../../shared/ui/fund-subscription-modal/fund-subscription-modal.component';
import { PageShellComponent } from '../../shared/ui/page-shell/page-shell.component';

/**
 * Página de listado de fondos disponibles.
 * Permite suscribirse a cada fondo mediante un modal.
 */
@Component({
  selector: 'app-funds-page',
  imports: [
    AsyncPipe,
    FundSubscriptionModalComponent,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    PageShellComponent,
    ResponsiveDataTableComponent,
  ],
  templateUrl: './funds-page.component.html',
  styleUrl: './funds-page.component.scss',
})
export class FundsPageComponent {
  private readonly fundsService = inject(FundsService);
  private readonly subscriptionsService = inject(SubscriptionsService);

  protected readonly fundCategoryColor = FundCategoryColor;
  protected readonly funds$ = this.fundsService.getFunds().pipe(startWith(null));
  protected readonly selectedFund = signal<Fund | null>(null);
  protected readonly currentReceipt = signal<FundSubscriptionReceipt | null>(null);
  protected readonly subscriptionLoading = signal(false);

  protected readonly fundColumns: DataTableColumnDef<Fund>[] = [
    { key: 'id', title: 'ID', type: 'text' },
    { key: 'name', title: 'Nombre', type: 'text' },
    {
      key: 'minimumAmount',
      title: 'Monto mínimo',
      type: 'currency',
      currencyCode: 'COP',
    },
    {
      key: 'category',
      title: 'Categoría',
      type: 'tag',
      tagColor: (fund) => FundCategoryColor[fund.category],
    },
  ];

  /** Función trackBy para la lista de fondos. */
  protected trackByFundId(_: number, fund: Fund): number {
    return fund.id;
  }

  /** Abre el modal de suscripción con el fondo seleccionado. */
  protected openSubscriptionModal(fund: Fund): void {
    this.currentReceipt.set(null);
    this.selectedFund.set(fund);
  }

  /** Cierra el modal y limpia el estado de suscripción. */
  protected closeSubscriptionModal(): void {
    this.currentReceipt.set(null);
    this.subscriptionLoading.set(false);
    this.selectedFund.set(null);
  }

  /**
   * Envía la solicitud de suscripción al fondo seleccionado.
   * Actualiza el comprobante en éxito o error (ej. saldo insuficiente).
   * @param amount - Monto a suscribir
   */
  protected subscribeToFund(amount: number): void {
    const selectedFund = this.selectedFund();

    if (!selectedFund) {
      return;
    }

    this.subscriptionLoading.set(true);

    this.subscriptionsService
      .createSubscription({
        fundId: selectedFund.id,
        amount,
      })
      .pipe(finalize(() => this.subscriptionLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.currentReceipt.set({
            ...response.receipt,
            status: 'success',
            message: 'La inversión fue registrada correctamente y se generó el comprobante.',
          });
        },
        error: (error: HttpErrorResponse) => {
          this.currentReceipt.set({
            id: 0,
            fundId: selectedFund.id,
            fundName: selectedFund.name,
            subscribedAmount: amount,
            createdAt: new Date().toISOString(),
            reference: generateNumericReference(),
            userId: 1,
            status: 'error',
            message:
              error.error?.code === 'INSUFFICIENT_BALANCE'
                ? error.error.message
                : 'No fue posible completar la suscripción. Intenta nuevamente.',
          });
        },
      });
  }
}
