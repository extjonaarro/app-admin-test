import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FundsService } from './funds.service';

describe('FundsService', () => {
  let service: FundsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FundsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe estar creado', () => {
    expect(service).toBeTruthy();
  });

  it('getFunds debe retornar la lista de fondos', () => {
    const mockFunds = [
      { id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' as const },
    ];
    service.getFunds().subscribe((funds) => {
      expect(funds).toHaveLength(1);
      expect(funds[0].name).toBe('Fondo A');
      expect(funds[0].minimumAmount).toBe(100000);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/funds');
    expect(req.request.method).toBe('GET');
    req.flush(mockFunds);
  });
});
