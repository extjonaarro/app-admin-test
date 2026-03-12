import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FundCategoryColor } from '../../../core/enums/fund-category-color.enum';
import { Fund } from '../../../core/interfaces/fund.interface';

/**
 * Formulario del modal de suscripción.
 * Muestra la descripción del fondo y el campo de valor a suscribir.
 */
@Component({
  selector: 'app-fund-subscription-form',
  imports: [
    CurrencyPipe,
    NzDescriptionsModule,
    NzFormModule,
    NzInputModule,
    NzTagModule,
    ReactiveFormsModule,
  ],
  templateUrl: './fund-subscription-form.component.html',
  styleUrl: './fund-subscription-form.component.scss',
})
export class FundSubscriptionFormComponent {
  protected readonly fundCategoryColor = FundCategoryColor;

  readonly fund = input.required<Fund>();
  readonly amountControl = input.required<FormControl<number | null>>();
  readonly minimumAmountPlaceholder = input.required<string>();
  readonly errorMessage = input('');
}
