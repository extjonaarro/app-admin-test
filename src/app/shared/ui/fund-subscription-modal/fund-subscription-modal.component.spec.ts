import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { provideRouter } from '@angular/router';
import { FundSubscriptionModalComponent } from './fund-subscription-modal.component';

describe('FundSubscriptionModalComponent', () => {
  const mockFund = {
    id: 1,
    name: 'Fondo Test',
    minimumAmount: 100000,
    category: 'FPV' as const,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundSubscriptionModalComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(FundSubscriptionModalComponent);
    fixture.componentRef.setInput('fund', mockFund);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe cerrar y emitir closed al llamar handleClose', () => {
    const fixture = TestBed.createComponent(FundSubscriptionModalComponent);
    fixture.componentRef.setInput('fund', mockFund);
    const closedSpy = vi.fn();
    fixture.componentRef.setInput('visible', true);
    fixture.componentInstance.closed.subscribe(closedSpy);
    fixture.detectChanges();

    fixture.componentInstance['handleClose']();
    expect(closedSpy).toHaveBeenCalled();
  });

  it('debe cerrar cuando hay comprobante y se llama handlePrimaryAction', () => {
    const fixture = TestBed.createComponent(FundSubscriptionModalComponent);
    fixture.componentRef.setInput('fund', mockFund);
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('receipt', {
      id: 1,
      fundId: 1,
      fundName: 'Fondo Test',
      subscribedAmount: 100000,
      createdAt: '',
      reference: '12345678',
      userId: 1,
      status: 'success',
      message: 'ok',
    });
    const closedSpy = vi.fn();
    fixture.componentInstance.closed.subscribe(closedSpy);
    fixture.detectChanges();

    fixture.componentInstance['handlePrimaryAction']();
    expect(closedSpy).toHaveBeenCalled();
  });

  it('debe emitir subscriptionSubmitted con monto válido', () => {
    const fixture = TestBed.createComponent(FundSubscriptionModalComponent);
    fixture.componentRef.setInput('fund', mockFund);
    fixture.componentRef.setInput('visible', true);
    const submitSpy = vi.fn();
    fixture.componentInstance.subscriptionSubmitted.subscribe(submitSpy);
    fixture.detectChanges();

    fixture.componentInstance['amountControl'].setValue(200000);
    fixture.componentInstance['handlePrimaryAction']();
    expect(submitSpy).toHaveBeenCalledWith(200000);
  });

  it('debe mostrar error de validación cuando monto es menor al mínimo', () => {
    const fixture = TestBed.createComponent(FundSubscriptionModalComponent);
    fixture.componentRef.setInput('fund', mockFund);
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    comp['amountControl'].setValue(50000);
    comp['amountControl'].markAsTouched();
    comp['handlePrimaryAction']();
    fixture.detectChanges();

    expect(comp['errorMessage']).toContain('igual o mayor');
  });
});
