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
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';

@NgModule({
  declarations: [
    TicketsListComponent,
    TicketsComponent,
    TicketsHeaderComponent,
    TicketsAsideComponent,
    TicketCardComponent,
    SettingsComponent,
    TicketInfoComponent,
    BlocksStyleDirective
  ],
  imports: [
    TicketsRoutingModule,
    CommonModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    InputTextModule

  ]
})
export class TicketsModule { }
