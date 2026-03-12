import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarNavComponent, SidebarNavItem } from './sidebar-nav.component';

describe('SidebarNavComponent', () => {
  const mockItems: readonly SidebarNavItem[] = [
    { key: 'test', label: 'Test', path: '/test' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(SidebarNavComponent);
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe renderizar los ítems del menú', () => {
    const fixture = TestBed.createComponent(SidebarNavComponent);
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test');
  });
});
