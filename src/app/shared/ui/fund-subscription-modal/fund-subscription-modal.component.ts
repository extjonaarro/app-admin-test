import { Component, computed, input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Fund, FundSubscriptionReceipt } from '../../../core/interfaces/fund.interface';
import { FundSubscriptionFormComponent } from '../fund-subscription-form/fund-subscription-form.component';
import { FundSubscriptionResultComponent } from '../fund-subscription-result/fund-subscription-result.component';

/**
 * Modal para suscribirse a un fondo de inversión.
 * Muestra formulario de monto y, tras enviar, el comprobante de resultado.
 */
@Component({
  selector: 'app-fund-subscription-modal',
  imports: [
    FundSubscriptionFormComponent,
    FundSubscriptionResultComponent,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fund-subscription-modal.component.html',
  styleUrl: './fund-subscription-modal.component.scss',
})
export class FundSubscriptionModalComponent {
  readonly fund = input.required<Fund>();
  readonly visible = input(false);
  readonly submitting = input(false);
  readonly receipt = input<FundSubscriptionReceipt | null>(null);
  readonly closed = output<void>();
  readonly subscriptionSubmitted = output<number>();

  protected readonly amountControl = new FormControl<number | null>(null, {
    validators: [Validators.required, Validators.min(0)],
  });

  protected readonly minimumAmountPlaceholder = computed(() =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(this.fund().minimumAmount),
  );

  /**
   * Maneja el clic en Aceptar.
   * Si hay comprobante, cierra. Si no, valida y emite el monto para suscribir.
   */
  protected handlePrimaryAction(): void {
    if (this.receipt()) {
      this.handleClose();
      return;
    }

    this.amountControl.setValidators([
      Validators.required,
      Validators.min(this.fund().minimumAmount),
    ]);
    this.amountControl.markAsTouched();
    this.amountControl.updateValueAndValidity();

    if (this.amountControl.invalid) {
      return;
    }

    this.subscriptionSubmitted.emit(this.amountControl.value ?? 0);
  }

  /** Cierra el modal, resetea el formulario y emite el evento closed. */
  protected handleClose(): void {
    this.amountControl.reset();
    this.amountControl.clearValidators();
    this.amountControl.setValidators([Validators.required, Validators.min(0)]);
    this.amountControl.updateValueAndValidity();
    this.closed.emit();
  }

  /** Mensaje de error de validación del campo monto. */
  protected get errorMessage(): string {
    if (!this.amountControl.touched || !this.amountControl.errors) {
      return '';
    }

    if (this.amountControl.hasError('required')) {
      return 'Debes ingresar un valor para suscribirte.';
    }

    if (this.amountControl.hasError('min')) {
      return `El valor debe ser igual o mayor a ${this.minimumAmountPlaceholder()}.`;
    }

    return 'El valor ingresado no es valido.';
  }
}
