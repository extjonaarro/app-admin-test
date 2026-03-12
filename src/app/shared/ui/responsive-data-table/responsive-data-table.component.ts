import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, Input, signal, TemplateRef } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  DataTableColumnDef,
  DataTablePaginationConfig,
} from './data-table-column.interface';

/**
 * Tabla responsive que muestra datos en tabla (desktop) o cards (móvil).
 * Soporta columnas configurables, paginación opcional y slot de acción por fila.
 * Usa CSS media queries para el cambio de vista (sin lógica JS).
 */
@Component({
  selector: 'app-responsive-data-table',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NzCardModule,
    NzDescriptionsModule,
    NzPaginationModule,
    NzSpinModule,
    NzTableModule,
    NzTagModule,
  ],
  templateUrl: './responsive-data-table.component.html',
  styleUrl: './responsive-data-table.component.scss',
})
export class ResponsiveDataTableComponent {

  @Input({ required: true }) columns!: DataTableColumnDef<unknown>[];
  @Input() data: readonly unknown[] = [];
  @Input() loading = false;
  @Input() trackByFn?: (index: number, item: unknown) => unknown;
  private _pagination?: DataTablePaginationConfig;
  @Input() set pagination(config: DataTablePaginationConfig | undefined) {
    this._pagination = config;
    if (config) {
      this.pageSize.set(config.pageSize);
    }
  }
  get pagination(): DataTablePaginationConfig | undefined {
    return this._pagination;
  }
  @Input() tableScrollX?: string;

  rowAction = contentChild<TemplateRef<{ $implicit: unknown }>>('rowAction');

  protected readonly pageIndex = signal(1);
  protected readonly pageSize = signal(10);

  /** Devuelve los datos de la página actual cuando hay paginación. */
  protected getDisplayData(): readonly unknown[] {
    if (!this.pagination) {
      return this.data;
    }
    const idx = this.pageIndex();
    const size = this.pageSize();
    const start = (idx - 1) * size;
    return this.data.slice(start, start + size);
  }

  /** Actualiza la página actual al cambiar en la paginación. */
  protected onPageIndexChange(index: number): void {
    this.pageIndex.set(index);
  }

  /** Actualiza el tamaño de página y resetea al índice 1. */
  protected onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.pageIndex.set(1);
  }

  /** Configuración de scroll horizontal de la tabla. */
  protected getTableScroll(): { x?: string } {
    return this.tableScrollX ? { x: this.tableScrollX } : {};
  }

  /** Obtiene el valor de una celda usando el extractor de la columna o la propiedad por key. */
  protected getCellValue(item: unknown, col: DataTableColumnDef<unknown>): unknown {
    const valueFn = col.value ?? ((i: unknown) => (i as Record<string, unknown>)[col.key]);
    return valueFn(item);
  }

  /** Formatea el valor de la celda según el tipo (text, currency, date, tag). */
  protected formatCellValue(item: unknown, col: DataTableColumnDef<unknown>): string {
    const value = this.getCellValue(item, col);
    const type = col.type ?? 'text';

    switch (type) {
      case 'currency':
        return typeof value === 'number'
          ? new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: col.currencyCode ?? 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value)
          : String(value);
      case 'date':
        return typeof value === 'string' || value instanceof Date
          ? new Date(value as string | Date).toLocaleString('es', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : String(value);
      case 'tag':
        return String(value);
      default:
        return value != null ? String(value) : '';
    }
  }

  /** Obtiene el color del tag si la columna es de tipo tag. */
  protected getTagColor(item: unknown, col: DataTableColumnDef<unknown>): string | undefined {
    return col.tagColor?.(item as never);
  }

  /** Indica si la columna debe mostrarse como nz-tag. */
  protected isTagColumn(col: DataTableColumnDef<unknown>): boolean {
    return col.type === 'tag';
  }
}
