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
  constructor(private readonly ticketService:TiсketsStorageService) {

   }

  ngOnInit(): void {
    this.ticketService.getTours().subscribe((tours)=>{
      console.log(tours);
      
      this.tours = tours
    })
  }

}
