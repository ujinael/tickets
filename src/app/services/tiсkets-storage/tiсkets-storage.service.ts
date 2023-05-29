import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import {
  ICustomTourLocation,
  ITourLocation,
  ITourTypeSelect,
  NearestTour,
  Tour,
} from 'src/app/pages/tickets/entities';
import { Observable, Subject, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiсketsStorageService {
  tours: Array<Tour>;
  private ticketSubject: Subject<ITourTypeSelect> =
    new Subject<ITourTypeSelect>();

  readonly ticketType$ = this.ticketSubject.asObservable();

  private ticketUpdateSubject: Subject<Tour[]> =
  new Subject<Tour[]>();

readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();
  constructor(private readonly restService: RestService) {}
  setStorage(tours: Array<Tour>) {
    this.tours = tours;
  }
  initTours(): Observable<Array<Tour>> {
   return this.restService.initTours()
  }
  async createTour(tour:Record<string,any>): Promise<Tour> {
    return await lastValueFrom(this.restService.createTour(tour))
   }
  updateTours(): Observable<Array<Tour>> {
    return this.restService.initTours()
   }
  removeTours(): Observable<any> {
    return this.restService.removeTours()

  }
  getTours(): Observable<Array<Tour>> {
    return this.restService.fetchTickets()
  }
  getTourById(id: string): Observable<Tour> {
    return this.restService.fetchTicket(id);
  }
  getError() {
    return this.restService.getRestError();
  }
  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }
  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }
  updateTourList(tours: Tour[]): void {
    this.ticketUpdateSubject.next(tours);
  }

  getNearestTours(): Observable<NearestTour[]> {
    return this.restService.fetchNearestTour();
  }
  getLocationList(): Observable<ITourLocation[]> {
    return this.restService.getLocationList();
  }

  transformData(
    data: NearestTour[],
    regions: ITourLocation[]
  ): ICustomTourLocation[] {
    const newTicketData: ICustomTourLocation[] = [];
    data.forEach((el) => {
      const newEl = <ICustomTourLocation>{ ...el };
      newEl.regions =
        <ICustomTourLocation>(
          regions.find((regions) => el.locationId === regions.id)
        ) || {};
      newTicketData.push(newEl);
    });
    return newTicketData;
  }
  getRandomNearestEvent(type: number): Observable<NearestTour> {
    return this.restService.getRandomNearestEvent(type);
  }

  sendTourData(data: any): Observable<any> {
    return this.restService.sendTourData(data);
  }
}
