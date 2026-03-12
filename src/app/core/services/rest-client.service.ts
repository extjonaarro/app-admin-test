import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constants';

type RestClientParamsValue = string | number | boolean | null | undefined;
type RestClientParams = Record<string, RestClientParamsValue>;

/**
 * Servicio cliente HTTP para las peticiones a la API.
 * Construye las URLs base y gestiona los parámetros de consulta.
 */
@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  private readonly http = inject(HttpClient);

  /**
   * Realiza una petición GET a la API.
   * @param path - Ruta del endpoint (ej: '/funds' o 'http://...')
   * @param params - Parámetros opcionales de la query string
   * @returns Observable con la respuesta tipada
   */
  get<TResponse>(path: string, params?: RestClientParams): Observable<TResponse> {
    return this.http.get<TResponse>(this.createUrl(path), {
      params: this.createHttpParams(params),
    });
  }

  /**
   * Realiza una petición POST a la API.
   * @param path - Ruta del endpoint
   * @param body - Cuerpo de la petición
   * @param params - Parámetros opcionales de la query string
   * @returns Observable con la respuesta tipada
   */
  post<TResponse, TBody>(path: string, body: TBody, params?: RestClientParams): Observable<TResponse> {
    return this.http.post<TResponse>(this.createUrl(path), body, {
      params: this.createHttpParams(params),
    });
  }

  /**
   * Construye la URL completa concatenando la base de la API con la ruta.
   * Si la ruta ya es absoluta (http/https), la devuelve tal cual.
   * @param path - Ruta del endpoint
   * @returns URL completa concatenada con la base de la API
   */
  private createUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${API_BASE_URL}${normalizedPath}`;
  }

  /**
   * Convierte un objeto de parámetros en HttpParams de Angular.
   * Omite valores null o undefined.
   * @param params - Parámetros opcionales de la query string
   * @returns HttpParams de Angular
   */
  private createHttpParams(params?: RestClientParams): HttpParams | undefined {
    if (!params) {
      return undefined;
    }

    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) {
        continue;
      }

      httpParams = httpParams.set(key, String(value));
    }

    return httpParams;
  }
}
