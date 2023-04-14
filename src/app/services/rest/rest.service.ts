import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../../pages/tickets/entities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private readonly httpClient: HttpClient) {}
  fetchTickets(): Observable<Tour[]> {
return this.httpClient.get<Tour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')

  }
  getRestError(): Observable<any> {
    return this.httpClient.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }
}
