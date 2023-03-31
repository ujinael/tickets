import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Tour } from 'src/app/pages/tickets/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
tours:Array<Tour>
  constructor(private readonly restService:RestService) { }
  getTours():Observable<Array<Tour>>{
    console.log("oki");
    
    return this.restService.fetchTickets()
  }
}
