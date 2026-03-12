import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SubscriptionsService } from './subscriptions.service';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SubscriptionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe estar creado', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentUserSubscriptions debe retornar suscripciones', () => {
    const mockSubs = [
      {
        id: 1,
        userId: 1,
        fundId: 1,
        fundName: 'Fondo A',
        category: 'FPV',
        createdAt: '2026-03-12T00:00:00.000Z',
        amount: 200000,
      },
    ];
    service.getCurrentUserSubscriptions().subscribe((subs) => {
      expect(subs).toHaveLength(1);
      expect(subs[0].fundName).toBe('Fondo A');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users/current/subscriptions');
    expect(req.request.method).toBe('GET');
    req.flush(mockSubs);
  });

  it('createSubscription debe enviar POST con fundId y amount', () => {
    const body = { fundId: 1, amount: 300000 };
    service.createSubscription(body).subscribe((res) => {
      expect(res.message).toBeDefined();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/subscriptions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({ message: 'Suscripción creada', receipt: {}, balance: {} });
  });

  it('cancelSubscription debe enviar POST a la ruta de cancelación', () => {
    service.cancelSubscription(5).subscribe((res) => {
      expect(res).toBeDefined();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/subscriptions/5/cancel');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Cancelado', balance: {}, cancelledSubscription: {} });
  });
});
