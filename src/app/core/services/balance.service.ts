import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATHS } from '../constants/api.constants';
import { Balance } from '../interfaces/balance.interface';
import { RestClientService } from './rest-client.service';

/**
 * Servicio para consultar el saldo del usuario actual.
 */
@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private readonly restClient = inject(RestClientService);

  /**
   * Obtiene el saldo disponible del usuario autenticado.
   * @returns Observable con el saldo (amount y currency)
   */
  getCurrentUserBalance(): Observable<Balance> {
    return this.restClient.get<Balance>(API_PATHS.currentUserBalance);
  }
}
