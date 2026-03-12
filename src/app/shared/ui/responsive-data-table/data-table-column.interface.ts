export type DataTableCellType = 'text' | 'currency' | 'date' | 'tag';

export interface DataTableColumnDef<T = unknown> {
  readonly key: string;
  readonly title: string;
  readonly type?: DataTableCellType;
  readonly dateFormat?: string;
  readonly currencyCode?: string;
  readonly tagColor?: (item: T) => string;
  readonly value?: (item: T) => unknown;
}

export interface DataTablePaginationConfig {
  readonly pageSize: number;
  readonly pageSizeOptions: number[];
  readonly showSizeChanger: boolean;
}
