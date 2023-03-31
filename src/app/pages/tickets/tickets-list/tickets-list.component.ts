import { Component, OnInit } from '@angular/core';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { Tour } from '../entities';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
tours:Array<Tour>
searchString:string
  constructor(private readonly ticketService:TiсketsStorageService) {

   }

  ngOnInit(): void {
    this.ticketService.getTours().subscribe((tours)=>{
      console.log(tours);
      
      this.tours = tours
    })
  }
  onInput(event:any){
// this.searchString = event.value
  }
  getFilteredTours(){
    if(!this.searchString)return this.tours
  return this.tours.filter(tour=>tour.name.includes(this.searchString))
  }

}
