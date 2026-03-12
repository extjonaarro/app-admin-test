import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATHS } from '../constants/api.constants';
import {
  CancelSubscriptionResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  UserSubscription,
} from '../interfaces/subscription.interface';
import { RestClientService } from './rest-client.service';

/**
 * Servicio para gestionar las suscripciones del usuario a fondos.
 */
@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private readonly restClient = inject(RestClientService);

  /**
   * Obtiene las suscripciones activas del usuario actual.
   * @returns Observable con el array de suscripciones
   */
  getCurrentUserSubscriptions(): Observable<readonly UserSubscription[]> {
    return this.restClient.get<readonly UserSubscription[]>(API_PATHS.currentUserSubscriptions);
  }

  /**
   * Crea una nueva suscripción a un fondo con el monto indicado.
   * @param body - fundId y amount de la suscripción
   * @returns Observable con el comprobante y el saldo actualizado
   */
  createSubscription(body: CreateSubscriptionRequest): Observable<CreateSubscriptionResponse> {
    return this.restClient.post<CreateSubscriptionResponse, CreateSubscriptionRequest>(
      API_PATHS.subscriptions,
      body,
    );
  }

  /**
   * Cancela una suscripción activa por su ID.
   * @param subscriptionId - ID de la suscripción a cancelar
   * @returns Observable con la suscripción cancelada y el saldo actualizado
   */
  cancelSubscription(subscriptionId: number): Observable<CancelSubscriptionResponse> {
    return this.restClient.post<CancelSubscriptionResponse, Record<string, never>>(
      API_PATHS.cancelSubscription(subscriptionId),
      {},
    );
  }
}
