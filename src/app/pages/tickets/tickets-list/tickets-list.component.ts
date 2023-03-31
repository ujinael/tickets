import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { Tour } from '../entities';
import { BlocksStyleDirective } from 'src/app/directive/block-style.directive';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit,AfterViewInit {
tours:Array<Tour> = []
searchString:string
  constructor(private readonly ticketService:TiсketsStorageService,
   private readonly router:Router) {

   }
   @ViewChild('toursWrap') toursWrap: ElementRef; 

   @ViewChild('toursWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  ngOnInit(): void {
    this.ticketService.getTours().subscribe((tours)=>{      
      this.tours = tours
    })
  }
   ngAfterViewInit(){
    this.toursWrap
  }
  onInput(event:any){
// this.searchString = event.value
  }
  onDbClick(tour:Tour){    
this.router.navigate([`/tickets/${tour.id}`])
  }
 
  getFilteredTours(){
    if(!this.searchString)return this.tours
  return this.tours.filter(tour=>tour.name.includes(this.searchString))
  }
  directiveRenderComplete(ev: boolean){
   
    this.blockDirective.initStyle(0)
  }
}
