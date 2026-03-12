import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HistoryPageComponent } from './history-page.component';

describe('HistoryPageComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPageComponent],
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
    const fixture = TestBed.createComponent(HistoryPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar el historial al cargar', () => {
    const fixture = TestBed.createComponent(HistoryPageComponent);
    fixture.detectChanges();

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
    httpTestingController.expectOne('http://localhost:3000/users/current/history').flush(mockHistory);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fondo A');
  });
});
