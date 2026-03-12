import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FundSubscriptionFormComponent } from './fund-subscription-form.component';

describe('FundSubscriptionFormComponent', () => {
  const mockFund = {
    id: 1,
    name: 'Fondo Test',
    minimumAmount: 100000,
    category: 'FPV' as const,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundSubscriptionFormComponent, ReactiveFormsModule],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(FundSubscriptionFormComponent);
    fixture.componentRef.setInput('fund', mockFund);
    fixture.componentRef.setInput('amountControl', new FormControl<number | null>(null));
    fixture.componentRef.setInput('minimumAmountPlaceholder', '$ 100.000');
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar el nombre del fondo', () => {
    const fixture = TestBed.createComponent(FundSubscriptionFormComponent);
    fixture.componentRef.setInput('fund', mockFund);
    fixture.componentRef.setInput('amountControl', new FormControl<number | null>(null));
    fixture.componentRef.setInput('minimumAmountPlaceholder', '$ 100.000');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fondo Test');
  });
});
