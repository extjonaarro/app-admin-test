import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATHS } from '../constants/api.constants';
import { Fund } from '../interfaces/fund.interface';
import { RestClientService } from './rest-client.service';

/**
 * Servicio para consultar los fondos de inversión disponibles.
 */
@Injectable({
  providedIn: 'root',
})
export class FundsService {
  private readonly restClient = inject(RestClientService);

  /**
   * Obtiene la lista de fondos disponibles para suscripción.
   * @returns Observable con el array de fondos
   */
  getFunds(): Observable<readonly Fund[]> {
    return this.restClient.get<readonly Fund[]>(API_PATHS.funds);
  }
}
