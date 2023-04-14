import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { ITourTypeSelect, Tour } from 'src/app/pages/tickets/entities';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
tours:Array<Tour>
private ticketSubject:Subject<ITourTypeSelect> = new Subject<ITourTypeSelect>() 

readonly ticketType$ = this.ticketSubject.asObservable(); 

  constructor(private readonly restService:RestService) { }
  setStorage(tours:Array<Tour>){
    this.tours = tours
  }
  getTours():Observable<Array<Tour>>{    
    return this.restService.fetchTickets()
  }
  getError(){
    return this.restService.getRestError()
  }
  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable(); 
   }
    
   updateTour(type:ITourTypeSelect): void {
     this.ticketSubject.next(type);
   }
  
}
