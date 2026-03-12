import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATHS } from '../constants/api.constants';
import { HistoryEntry } from '../interfaces/history.interface';
import { RestClientService } from './rest-client.service';

/**
 * Servicio para consultar el historial de movimientos del usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly restClient = inject(RestClientService);

  /**
   * Obtiene el historial de suscripciones y cancelaciones del usuario.
   * @returns Observable con el array de entradas de historial ordenadas por fecha
   */
  getCurrentUserHistory(): Observable<readonly HistoryEntry[]> {
    return this.restClient.get<readonly HistoryEntry[]>(API_PATHS.currentUserHistory);
  }
}
