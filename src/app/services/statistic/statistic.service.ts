import { Injectable } from '@angular/core';
import {RestService} from "../rest/rest.service";
import {Observable} from "rxjs";
import {ICustomStatisticUser, IStatisticUser} from "../../pages/tickets/entities/statistic.entity";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private  readonly restService:RestService) {
  }
  getUserStatistic():Observable<Array<IStatisticUser>>{
    return this.restService.fetchUserStatistic()
  }
  getCustomUserStatistic():Observable<Array<ICustomStatisticUser>>{
    return this.restService.fetchCustomUserStatistic()
  }
}
