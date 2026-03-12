import { TestBed } from '@angular/core/testing';
import { ResponsiveDataTableComponent } from './responsive-data-table.component';
import { DataTableColumnDef } from './data-table-column.interface';

describe('ResponsiveDataTableComponent', () => {
  const mockColumns: DataTableColumnDef[] = [
    { key: 'id', title: 'ID', type: 'text' },
    { key: 'name', title: 'Nombre', type: 'text' },
  ];
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveDataTableComponent],
    }).compileComponents();
  });

  it('debe crear el componente', () => {
    const fixture = TestBed.createComponent(ResponsiveDataTableComponent);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar los datos en la tabla', () => {
    const fixture = TestBed.createComponent(ResponsiveDataTableComponent);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Item 1');
    expect(compiled.textContent).toContain('Item 2');
  });

  it('debe actualizar página y tamaño al cambiar paginación', () => {
    const fixture = TestBed.createComponent(ResponsiveDataTableComponent);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('pagination', {
      pageSize: 5,
      pageSizeOptions: [5, 10, 20],
      showSizeChanger: true,
    });
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    comp['onPageIndexChange'](2);
    expect(comp['pageIndex']()).toBe(2);

    comp['onPageSizeChange'](20);
    expect(comp['pageSize']()).toBe(20);
    expect(comp['pageIndex']()).toBe(1);
  });

  it('debe retornar scroll cuando tableScrollX está definido', () => {
    const fixture = TestBed.createComponent(ResponsiveDataTableComponent);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('tableScrollX', '1200px');
    fixture.detectChanges();

    expect(fixture.componentInstance['getTableScroll']()).toEqual({ x: '1200px' });
  });
});
