export type HistoryType = 'Suscripcion' | 'Cancelacion';

export interface HistoryEntry {
  readonly id: number;
  readonly userId: number;
  readonly fundId: number;
  readonly fundName: string;
  readonly createdAt: string;
  readonly type: HistoryType;
}
