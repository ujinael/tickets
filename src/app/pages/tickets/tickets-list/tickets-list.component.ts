import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { ITourTypeSelect, Tour } from '../entities';
import { BlocksStyleDirective } from 'src/app/directive/block-style.directive';
import { Subscription, debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit, OnDestroy, AfterViewInit {
  tours: Array<Tour> = [];
  searchString: string;
  tourUnsubscriber: Subscription;
  ticketsCopy: Tour[];
  directiveReady = false
  constructor(
    private readonly ticketService: TiсketsStorageService,
    private readonly router: Router
  ) {}
  @ViewChild('toursWrap') toursWrap: ElementRef;

  @ViewChild('toursWrap', { read: BlocksStyleDirective })
  blockDirective: BlocksStyleDirective;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
searchTicketSub:Subscription

  ngOnInit(): void {
    this.ticketService.getTours().subscribe((tours) => {
      this.tours = tours;      
      this.ticketsCopy = [...this.tours];
      // this.ticketService.setStorage(tours);
    });
    this.ticketService.ticketUpdateSubject$.subscribe((tours) => {
      this.tours = tours;      
      this.ticketsCopy = [...this.tours];
      // this.ticketService.setStorage(tours);
    });
    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe(
      (data: ITourTypeSelect) => {
        switch (data.value) {
          case 'single':
            this.tours = this.ticketsCopy.filter((el) => el.type === 'single');
            break;
          case 'multi':
            this.tours = this.ticketsCopy.filter((el) => el.type === 'multi');
            break;
          case 'all':
            this.tours = [...this.ticketsCopy];
            break;
        }

        if (data.date) {
          const dateWithoutTime = new Date(data.date).toISOString().split('T');
          const dateValue = dateWithoutTime[0];
          this.tours = this.ticketsCopy.filter((el) => el.date === dateValue);
        }

        setTimeout(() => {
          this.blockDirective.updateItems();
          this.blockDirective.initStyle(0);
        },500);
      }
    );

    // this.tourUnsubscriber = this.ticketService
    //   .getTicketTypeObservable()
    //   .subscribe((data: ITourTypeSelect) => {
    //     console.log('data', data);
    //   });
  }
  ngOnDestroy(): void {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe()
  }
  ngAfterViewInit() {
    this.toursWrap;
    const fromEventObserver = fromEvent<InputEvent>(this.ticketSearch.nativeElement,'keyup',{passive:true})
  this.searchTicketSub = fromEventObserver.pipe(
    debounceTime(100)
  ).subscribe((ev:InputEvent)=>{
if(this.searchString){
  this.tours = this.ticketsCopy.filter(tour=>
tour.name.toLowerCase().includes(this.searchString.toLowerCase())
)
}
else {
  this.tours = [...this.ticketsCopy]
}
  })

  }
  getActiveElementIndex() {
  if(!this.blockDirective) return 0
    if(Number.isNaN(this.blockDirective.activeElementIndex))return 0
  return (this.blockDirective.activeElementIndex+1) ?? 0;
  }
  onDbClick(tour: Tour) {
    this.router.navigate([`/tickets/${tour.id}`]);
  }

  // getFilteredTours() {
  //   if (!this.searchString) return this.tours;
  //   return this.tours.filter((tour) => tour.name.includes(this.searchString));
  // }
  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(0);
    this.directiveReady = true
  }
}
