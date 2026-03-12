import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HistoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe estar creado', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentUserHistory debe retornar el historial', () => {
    const mockHistory = [
      {
        id: 1,
        userId: 1,
        fundId: 1,
        fundName: 'Fondo A',
        createdAt: '2026-03-12T10:00:00.000Z',
        type: 'Suscripcion' as const,
      },
    ];
    service.getCurrentUserHistory().subscribe((history) => {
      expect(history).toHaveLength(1);
      expect(history[0].fundName).toBe('Fondo A');
      expect(history[0].type).toBe('Suscripcion');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users/current/history');
    expect(req.request.method).toBe('GET');
    req.flush(mockHistory);
  });
});
