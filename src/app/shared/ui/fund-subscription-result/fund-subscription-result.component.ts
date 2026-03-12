import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FundSubscriptionReceipt } from '../../../core/interfaces/fund.interface';

/**
 * Vista de resultado de la suscripción (éxito o rechazo).
 * Muestra una alerta y el comprobante con fecha, fondo, valor y referencia.
 */
@Component({
  selector: 'app-fund-subscription-result',
  imports: [CurrencyPipe, DatePipe, NzAlertModule, NzDescriptionsModule, NzDividerModule],
  templateUrl: './fund-subscription-result.component.html',
  styleUrl: './fund-subscription-result.component.scss',
})
export class FundSubscriptionResultComponent {
  readonly receipt = input.required<FundSubscriptionReceipt>();

  /** Tipo de alerta según el estado del comprobante. */
  protected get alertType(): 'success' | 'error' {
    return this.receipt().status;
  }

  /** Título de la alerta según éxito o rechazo. */
  protected get alertTitle(): string {
    return this.receipt().status === 'success' ? 'Suscripción exitosa' : 'Suscripción rechazada';
  }
}
