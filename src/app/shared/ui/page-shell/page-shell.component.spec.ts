import { TestBed } from '@angular/core/testing';
import { PageShellComponent } from './page-shell.component';

describe('PageShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageShellComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(PageShellComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar título y subtítulo', () => {
    const fixture = TestBed.createComponent(PageShellComponent);
    fixture.componentRef.setInput('title', 'Página de prueba');
    fixture.componentRef.setInput('subtitle', 'Subtítulo de prueba');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Página de prueba');
    expect(compiled.textContent).toContain('Subtítulo de prueba');
  });
});
