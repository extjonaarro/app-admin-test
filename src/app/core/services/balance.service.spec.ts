import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BalanceService } from './balance.service';

describe('BalanceService', () => {
  let service: BalanceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BalanceService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BalanceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe estar creado', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentUserBalance debe retornar el saldo', () => {
    const mockBalance = {
      id: 1,
      userId: 1,
      amount: 500000,
      updatedAt: '2026-03-12T00:00:00.000Z',
    };
    service.getCurrentUserBalance().subscribe((balance) => {
      expect(balance.amount).toBe(500000);
      expect(balance.userId).toBe(1);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users/current/balance');
    expect(req.request.method).toBe('GET');
    req.flush(mockBalance);
  });
});
