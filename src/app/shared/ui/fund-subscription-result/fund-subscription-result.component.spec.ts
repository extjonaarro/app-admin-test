import { TestBed } from '@angular/core/testing';
import { FundSubscriptionResultComponent } from './fund-subscription-result.component';

describe('FundSubscriptionResultComponent', () => {
  const mockReceiptSuccess = {
    id: 1,
    fundId: 1,
    fundName: 'Fondo Test',
    subscribedAmount: 200000,
    createdAt: '2026-03-12T10:00:00.000Z',
    reference: '12345678',
    userId: 1,
    status: 'success' as const,
    message: 'Suscripción exitosa',
  };

  const mockReceiptError = {
    ...mockReceiptSuccess,
    status: 'error' as const,
    message: 'Saldo insuficiente',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundSubscriptionResultComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(FundSubscriptionResultComponent);
    fixture.componentRef.setInput('receipt', mockReceiptSuccess);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar alerta de éxito cuando status es success', () => {
    const fixture = TestBed.createComponent(FundSubscriptionResultComponent);
    fixture.componentRef.setInput('receipt', mockReceiptSuccess);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Suscripción exitosa');
  });

  it('debe mostrar alerta de error cuando status es error', () => {
    const fixture = TestBed.createComponent(FundSubscriptionResultComponent);
    fixture.componentRef.setInput('receipt', mockReceiptError);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Suscripción rechazada');
    expect(compiled.textContent).toContain('Saldo insuficiente');
  });
});
