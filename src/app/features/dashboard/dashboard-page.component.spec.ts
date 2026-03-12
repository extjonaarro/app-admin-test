import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
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
    const fixture = TestBed.createComponent(DashboardPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar saldo y suscripciones al cargar datos', () => {
    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();

    httpTestingController.expectOne('http://localhost:3000/users/current/balance').flush({
      id: 1,
      userId: 1,
      amount: 750000,
      updatedAt: '2026-03-12T00:00:00.000Z',
    });
    httpTestingController.expectOne('http://localhost:3000/users/current/subscriptions').flush([
      {
        id: 1,
        userId: 1,
        fundId: 1,
        fundName: 'Fondo Conservador',
        category: 'FPV',
        createdAt: '2026-03-10T00:00:00.000Z',
        amount: 500000,
      },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Saldo disponible');
    expect(compiled.textContent).toContain('Fondos suscritos');
    expect(compiled.textContent).toContain('Fondo Conservador');
  });

  it('debe mostrar mensaje cuando no hay suscripciones', () => {
    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();

    httpTestingController.expectOne('http://localhost:3000/users/current/balance').flush({
      id: 1,
      userId: 1,
      amount: 1000000,
      updatedAt: '2026-03-12T00:00:00.000Z',
    });
    httpTestingController.expectOne('http://localhost:3000/users/current/subscriptions').flush([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No tienes fondos suscritos');
  });

  it('debe cancelar suscripción y actualizar la lista', () => {
    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();

    httpTestingController.expectOne('http://localhost:3000/users/current/balance').flush({
      id: 1,
      userId: 1,
      amount: 750000,
      updatedAt: '2026-03-12T00:00:00.000Z',
    });
    httpTestingController
      .expectOne('http://localhost:3000/users/current/subscriptions')
      .flush([
        {
          id: 1,
          userId: 1,
          fundId: 1,
          fundName: 'Fondo Conservador',
          category: 'FPV',
          createdAt: '2026-03-10T00:00:00.000Z',
          amount: 500000,
        },
      ]);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    comp['cancelSubscription']({
      id: 1,
      userId: 1,
      fundId: 1,
      fundName: 'Fondo Conservador',
      category: 'FPV',
      createdAt: '2026-03-10T00:00:00.000Z',
      amount: 500000,
    });

    const cancelReq = httpTestingController.expectOne(
      (req) => req.url.includes('/subscriptions/1/cancel') && req.method === 'POST'
    );
    cancelReq.flush(null);
    fixture.detectChanges();

    httpTestingController.expectOne('http://localhost:3000/users/current/balance').flush({
      id: 1,
      userId: 1,
      amount: 750000,
      updatedAt: '2026-03-12T00:00:00.000Z',
    });
    httpTestingController.expectOne('http://localhost:3000/users/current/subscriptions').flush([]);
    fixture.detectChanges();
    expect(comp['cancellingSubscriptionId']()).toBeNull();
  });
});
