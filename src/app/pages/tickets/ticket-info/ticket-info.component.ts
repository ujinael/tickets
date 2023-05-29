import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { ITourLocation, NearestTour, Tour } from '../entities';
import { Subscription, map, forkJoin, fromEvent } from 'rxjs';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss'],
})
export class TicketInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  currentTour?: Tour;
  userForm: FormGroup;
  nearestTours: NearestTour[];
  tourLocation: ITourLocation[];
  forkJoinUnsubscriber: Subscription;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];
  ticketSearchValue: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tourStorage: TiсketsStorageService,
    private orderService: OrderService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', { validators: Validators.required }),
      lastName: new FormControl('', { validators: Validators.required }),
      age: new FormControl(22, { validators: Validators.required }),
      birthDate: new FormControl(new Date(), {
        validators: Validators.required,
      }),
      cardNumber: new FormControl('', { validators: Validators.required }),
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tourStorage.getTourById(id ?? '').subscribe((data) => {
      this.currentTour = data;
    });

    this.forkJoinUnsubscriber = forkJoin([
      this.tourStorage.getNearestTours(),
      this.tourStorage.getLocationList(),
    ]).subscribe((data) => {
      this.nearestTours = data[0];
      this.tourLocation = data[1];
    });
  }
  async onSubmit(e: SubmitEvent) {
    e.preventDefault();
    try {
      if(this.userForm.invalid){
              throw Error("Все поля формы должны быть заполнены")

      }
      await this.orderService.createOrder({
        ...this.userForm.value,
        userId: this.userService.getUser()?.id,
        tourId: this.currentTour?.id,
      });
      this.messageService.add({
        closable: true,
        severity: 'succes',
        summary: `Заказ сформирован`,
      });
      this.userForm.reset()
    } catch (error) {
      this.messageService.add({
        closable: true,
        severity: 'warn',
        summary: (<Error>error).message,
      });
    }
  }
  ngAfterViewInit() {
    const fromEventObserver = fromEvent(
      this.ticketSearch.nativeElement,
      'keyup'
    );
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour();
    });
  }

  ngOnDestroy(): void {
    this.forkJoinUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour(): void {
    if (this.ticketSearchValue === '') {
      forkJoin([
        this.tourStorage.getNearestTours(),
        this.tourStorage.getLocationList(),
      ]).subscribe(([tours, location]) => {
        this.tourLocation = location;
        this.nearestTours = this.tourStorage.transformData(tours, location);
      });
    } else {
      const type = Math.floor(Math.random() * this.searchTypes.length);
      // unsubscribe
      if (this.ticketRestSub && !this.searchTicketSub.closed) {
        this.ticketRestSub.unsubscribe();
      }

      this.ticketRestSub = this.tourStorage
        .getRandomNearestEvent(type)
        .subscribe(
          (data) =>
            (this.nearestTours = this.tourStorage.transformData(
              [data],
              this.tourLocation
            ))
        );
    }
  }
}
