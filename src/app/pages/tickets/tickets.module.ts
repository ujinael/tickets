import { BlocksStyleDirective } from './../../directive/block-style.directive';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsHeaderComponent } from './tickets-header/tickets-header.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsAsideComponent } from './tickets-aside/tickets-aside.component';
import {MenubarModule} from 'primeng/menubar'
import { TicketCardComponent } from './ticket-card/ticket-card.component';
import { DropdownModule } from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordChangeComponent } from './settings/password-change/password-change.component';
import {PaginatorModule} from "primeng/paginator";
import {CarouselModule} from "primeng/carousel";
import { InformationComponent } from './settings/information/information.component';
import { StatisticComponent } from './settings/statistic/statistic.component';
import {TableModule} from "primeng/table";
import { OrdersComponent } from './orders/orders.component';
import { TourFormComponent } from './settings/tour-form/tour-form.component';

@NgModule({
  declarations: [
    TicketsListComponent,
    TicketsComponent,
    TicketsHeaderComponent,
    TicketsAsideComponent,
    TicketCardComponent,
    SettingsComponent,
    TicketInfoComponent,
    BlocksStyleDirective,
    PasswordChangeComponent,
    InformationComponent,
    StatisticComponent,
    OrdersComponent,
    TourFormComponent
  ],
  imports: [
    TicketsRoutingModule,
    CommonModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    TabViewModule,
    CheckboxModule,
    ReactiveFormsModule,
    PaginatorModule,
    CarouselModule,
    TableModule,

  ],
  providers:[MessageService]

})
export class TicketsModule { }
