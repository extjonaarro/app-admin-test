import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RestClientService } from './rest-client.service';

describe('RestClientService', () => {
  let service: RestClientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestClientService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RestClientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe estar creado', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('debe realizar GET y retornar datos', () => {
      const mockData = { id: 1, name: 'test' };
      service.get<{ id: number; name: string }>('/test').subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/test');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('debe incluir parámetros de query cuando se pasan', () => {
      service.get('/test', { page: 1, limit: 10 }).subscribe();

      const req = httpTestingController.expectOne((r) =>
        r.url.includes('http://localhost:3000/test'),
      );
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('limit')).toBe('10');
      req.flush({});
    });

    it('debe usar URL absoluta cuando se pasa ruta con http', () => {
      service.get<{ ok: boolean }>('https://api.example.com/data').subscribe();

      const req = httpTestingController.expectOne('https://api.example.com/data');
      expect(req.request.method).toBe('GET');
      req.flush({ ok: true });
    });

    it('debe omitir parámetros null y undefined', () => {
      service.get('/test', { a: 1, b: null, c: undefined }).subscribe();

      const req = httpTestingController.expectOne((r) => r.url.includes('/test'));
      expect(req.request.params.get('a')).toBe('1');
      expect(req.request.params.get('b')).toBeNull();
      expect(req.request.params.get('c')).toBeNull();
      req.flush({});
    });
  });

  describe('post', () => {
    it('debe realizar POST con body', () => {
      const body = { fundId: 1, amount: 100000 };
      service.post<{ message: string }, { fundId: number; amount: number }>('/subscriptions', body).subscribe();

      const req = httpTestingController.expectOne('http://localhost:3000/subscriptions');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush({ message: 'ok' });
    });
  });
});
