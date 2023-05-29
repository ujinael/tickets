import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITourLocation, NearestTour, Tour } from '../../pages/tickets/entities';
import { HttpClient } from '@angular/common/http';
import {
  ICustomStatisticUser,
  IStatisticUser,
} from '../../pages/tickets/entities/statistic.entity';
import { User } from 'src/app/pages/auth/entities/users.entity';
import { ConfigService } from '../config/config.service';
import { JWTToken } from 'src/app/entities/jwt_token.entity';
import { IOrder } from 'src/app/entities/order.entity';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService
  ) {}
  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/users`,
      user
    );
  }

  loginUser(
    login: string,
    password: string,
    loyalityCardNumber: string
  ): Observable<JWTToken> {
    return this.httpClient.post<JWTToken>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/users/login`,
      {
        login,
        password,
      }
    );
  }
  getUser(id: string): Observable<User> {
    const req = this.httpClient.get<User>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/users/${id}`
    );
    return req;
  }
  changePassword(user:{userId:string,oldPassword:string,newPassword:string}):Observable<User>{
    const req = this.httpClient.put<User>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/users/change_password/${user.userId}`,user
    );
    return req;
  }

  initTours(): Observable<Tour[]> {
    const req = this.httpClient.post<Tour[]>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/tours`,
      {}
    );
    return req;
  }
  createTour(tour:Record<string,any>): Observable<Tour> {
    const req = this.httpClient.post<Tour>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/tours/create_tour`,
      tour,{
        // headers:{
        //   "Content-Type":"multipart/form-data"
        // }
      }
    );
    return req;
  }
  removeTours(): Observable<any> {
    const req = this.httpClient.delete<any>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/tours/remove`,
      {}
    );
    return req;
  }
  fetchTickets(): Observable<Tour[]> {
    return this.httpClient.get<Tour[]>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/tours`
    );
  }

  fetchTicket(id: string): Observable<Tour> {
    return this.httpClient.get<Tour>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/tours/${id}`
    );
  }
  createOrder(order: IOrder): Observable<IOrder> {
    return this.httpClient.post<IOrder>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/orders`,
      order
    );
  }
  fetchOrders(userId: string): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(
      `${this.configService.getConfig().backendHost}:${
        this.configService.getConfig().backendPort
      }/orders`,{
        params:{
          userId
        }
      }
    );
  }
  fetchNearestTour(): Observable<Array<NearestTour>> {
    return this.httpClient.get<NearestTour[]>(
      `https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours`
    );
  }
  getLocationList(): Observable<Array<ITourLocation>> {
    return this.httpClient.get<ITourLocation[]>(
      `https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location`
    );
  }
  getRestError(): Observable<any> {
    return this.httpClient.get<any>(
      'https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound'
    );
  }
  fetchUserStatistic() {
    return this.httpClient.get<IStatisticUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
  fetchCustomUserStatistic() {
    return this.httpClient.get<ICustomStatisticUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

  getRandomNearestEvent(type: number): Observable<NearestTour> {
    switch (type) {
      case 0:
        return this.httpClient.get<NearestTour>(
          '../assets/mocks/nearestTours1.json'
        );
      case 1:
        return this.httpClient.get<NearestTour>(
          '../assets/mocks/nearestTours2.json'
        );
      case 2:
        return this.httpClient.get<NearestTour>(
          '../assets/mocks/nearestTours3.json'
        );
      default:
        return this.httpClient.get<NearestTour>(
          '../assets/mocks/nearestTours2.json'
        );
    }
  }

  sendTourData(data: any): Observable<any> {
    return this.httpClient.post('/assets/mocks/', data);
  }
}
