import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MenuOutline } from '@ant-design/icons-angular/icons';
import { routes } from '../../app.routes';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { InvestmentLayoutComponent } from './investment-layout.component';

describe('InvestmentLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentLayoutComponent],
      providers: [provideRouter(routes), provideNzIcons([MenuOutline])],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(InvestmentLayoutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe abrir y cerrar el menú móvil', () => {
    const fixture = TestBed.createComponent(InvestmentLayoutComponent);
    const comp = fixture.componentInstance;
    expect(comp['isMobileMenuOpen']()).toBe(false);

    comp['openMobileMenu']();
    expect(comp['isMobileMenuOpen']()).toBe(true);

    comp['closeMobileMenu']();
    expect(comp['isMobileMenuOpen']()).toBe(false);
  });

  it('debe mostrar los ítems de navegación', () => {
    const fixture = TestBed.createComponent(InvestmentLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Inicio');
    expect(compiled.textContent).toContain('Fondos');
    expect(compiled.textContent).toContain('Historial');
  });
});
