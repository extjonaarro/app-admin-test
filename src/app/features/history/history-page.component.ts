import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HistoryTypeColor } from '../../core/enums/history-type-color.enum';
import { HistoryEntry } from '../../core/interfaces/history.interface';
import { HistoryService } from '../../core/services/history.service';
import {
  DataTableColumnDef,
  DataTablePaginationConfig,
  ResponsiveDataTableComponent,
} from '../../shared/ui/responsive-data-table';
import { PageShellComponent } from '../../shared/ui/page-shell/page-shell.component';

/**
 * Página del historial de movimientos.
 * Muestra suscripciones y cancelaciones con paginación y vista responsive (tabla/cards).
 */
@Component({
  selector: 'app-history-page',
  imports: [
    AsyncPipe,
    NzCardModule,
    PageShellComponent,
    ResponsiveDataTableComponent,
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
})
export class HistoryPageComponent {
  private readonly historyService = inject(HistoryService);

  protected readonly historyTypeColor = HistoryTypeColor;
  protected readonly history$ = this.historyService.getCurrentUserHistory().pipe(startWith(null));

  protected readonly historyColumns: DataTableColumnDef<HistoryEntry>[] = [
    {
      key: 'createdAt',
      title: 'Fecha',
      type: 'date',
      dateFormat: 'dd/MM/yyyy HH:mm',
    },
    {
      key: 'fundName',
      title: 'Fondo',
      type: 'text',
    },
    {
      key: 'type',
      title: 'Tipo',
      type: 'tag',
      tagColor: (entry) => HistoryTypeColor[entry.type],
    },
  ];

  protected readonly paginationConfig: DataTablePaginationConfig = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
    showSizeChanger: true,
  };

  /** Función trackBy para la lista de historial. */
  protected trackByHistoryId(_: number, entry: HistoryEntry): number {
    return entry.id;
  }
}
