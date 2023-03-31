import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { SettingsComponent } from './settings/settings.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';

const routes: Routes = [
  { path: '', component: TicketsComponent,
  children:[
    {
      path:'list',
      component:TicketsListComponent
  //       loadChildren: ()  => import('./tickets-list/tickets-list.module')
  // .then(m => m.TicketsListModule)
    },
    {
      path:'settings',
      component:SettingsComponent
  //       loadChildren: ()  => import('./tickets-list/tickets-list.module')
  // .then(m => m.TicketsListModule)
    },
    {
      path: ':id',
      component:TicketInfoComponent

    },
  ]


},
{path:'**',
redirectTo:'list'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
