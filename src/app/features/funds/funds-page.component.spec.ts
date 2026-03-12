import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { FundsPageComponent } from './funds-page.component';

describe('FundsPageComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(FundsPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar la tabla de fondos al cargar', () => {
    const fixture = TestBed.createComponent(FundsPageComponent);
    fixture.detectChanges();

    const mockFunds = [
      { id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' as const },
      { id: 2, name: 'Fondo B', minimumAmount: 500000, category: 'FIC' as const },
    ];
    httpTestingController.expectOne('http://localhost:3000/funds').flush(mockFunds);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fondo A');
    expect(compiled.textContent).toContain('Fondo B');
  });

  it('debe abrir y cerrar el modal de suscripción', () => {
    const fixture = TestBed.createComponent(FundsPageComponent);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:3000/funds').flush([
      { id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' as const },
    ]);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    comp['openSubscriptionModal']({ id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' });
    fixture.detectChanges();
    expect(comp['selectedFund']()).toBeTruthy();

    comp['closeSubscriptionModal']();
    fixture.detectChanges();
    expect(comp['selectedFund']()).toBeNull();
    expect(comp['currentReceipt']()).toBeNull();
  });

  it('debe completar suscripción exitosamente y mostrar comprobante', () => {
    const fixture = TestBed.createComponent(FundsPageComponent);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:3000/funds').flush([
      { id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' as const },
    ]);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    comp['openSubscriptionModal']({ id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' });
    comp['subscribeToFund'](200000);

    const req = httpTestingController.expectOne('http://localhost:3000/subscriptions');
    expect(req.request.body).toEqual({ fundId: 1, amount: 200000 });
    req.flush({
      receipt: {
        id: 1,
        fundId: 1,
        fundName: 'Fondo A',
        subscribedAmount: 200000,
        createdAt: new Date().toISOString(),
        reference: '12345678',
        userId: 1,
      },
    });
    fixture.detectChanges();

    expect(comp['currentReceipt']()?.status).toBe('success');
  });

  it('debe mostrar error al fallar suscripción por saldo insuficiente', () => {
    const fixture = TestBed.createComponent(FundsPageComponent);
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:3000/funds').flush([
      { id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' as const },
    ]);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    comp['openSubscriptionModal']({ id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' });
    comp['subscribeToFund'](999999999);

    const req = httpTestingController.expectOne('http://localhost:3000/subscriptions');
    req.flush(
      { code: 'INSUFFICIENT_BALANCE', message: 'Saldo insuficiente' },
      { status: 400, statusText: 'Bad Request' }
    );
    fixture.detectChanges();

    expect(comp['currentReceipt']()?.status).toBe('error');
    expect(comp['currentReceipt']()?.message).toBe('Saldo insuficiente');
  });
});
